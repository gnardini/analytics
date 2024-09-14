import { CountsData, DataPoint, MetricData, MetricsData } from '@type/dashboard';
import { clickhouse } from '../db/clickhouse';
import { parseDate, parseNumber } from './dbHelpers';

interface InputEventData {
  user_id: string;
  organization_id: string;
  session_id: string;
  created_at: number;
  event: string;
  data: string | null;
  extra_data: Record<string, any> | null;
  device: string | null;
  browser: string | null;
  language: string | null;
  location: string | null;
  country: string | null;
  referrer: string | null;
}

export const ClickHouseService = {
  async insertEvent(data: InputEventData): Promise<void> {
    try {
      await clickhouse.insert({
        table: 'event',
        values: [data],
        format: 'JSONEachRow',
      });
    } catch (error) {
      console.error('Error inserting event:', error);
      throw new Error('Failed to insert event');
    }
  },

  async getEventsCountLastHour(
    organizationIds: string[],
    startTime: string,
    endTime: string,
  ): Promise<number> {
    console.log({
      organizationIds,
      startTime,
      endTime,
    });
    const query = `
SELECT COUNT(*) as count
FROM event
WHERE organization_id IN {organizationIds:Array(String)}
  AND created_at BETWEEN {startTime:DateTime} AND {endTime:DateTime}
    `;
    const result = await clickhouse.query({
      query,
      query_params: {
        organizationIds,
        startTime,
        endTime,
      },
      format: 'JSONEachRow',
    });
    const data = await result.json<{ count: string }>();
    return parseInt(data[0].count, 10);
  },

  async getCounts(organizationId: string, startDate: Date, endDate: Date): Promise<CountsData> {
    try {
      const query = `
        SELECT
          COUNT(DISTINCT user_id) AS users,
          COUNT(DISTINCT session_id) AS sessions,
          COUNT(*) AS visits
        FROM event
        WHERE organization_id = {organizationId:String}
          AND event = 'pageview'
          AND created_at BETWEEN {startDate:DateTime} AND {endDate:DateTime}
      `;

      const result = await clickhouse.query({
        query,
        query_params: {
          organizationId,
          startDate: parseDate(startDate),
          endDate: parseDate(endDate),
        },
        format: 'JSONEachRow',
      });

      const data = await result.json<CountsData>();
      return data[0]
        ? {
            users: parseNumber(data[0].users),
            sessions: parseNumber(data[0].sessions),
            visits: parseNumber(data[0].visits),
          }
        : { users: 0, sessions: 0, visits: 0 };
    } catch (error) {
      console.error('Error fetching counts:', error);
      throw new Error('Failed to fetch counts');
    }
  },

  async getMetricData(
    organizationId: string,
    startDate: Date,
    endDate: Date,
    metric: 'page' | 'referrer' | 'device' | 'browser' | 'country' | 'language',
    uniqueBy: 'user' | 'visit' = 'visit',
  ): Promise<MetricData[]> {
    try {
      const uniqueClause = uniqueBy === 'user' ? 'COUNT(DISTINCT user_id)' : 'COUNT(*)';
      const query = `
        SELECT
          ${metric === 'page' ? 'data' : metric} AS name,
          ${uniqueClause} AS count
        FROM event
        WHERE organization_id = {organizationId:String}
          AND event = 'pageview'
          AND created_at BETWEEN {startDate:DateTime} AND {endDate:DateTime}
        GROUP BY name
        ORDER BY count DESC
        LIMIT 100
      `;

      const result = await clickhouse.query({
        query,
        query_params: {
          organizationId,
          startDate: parseDate(startDate),
          endDate: parseDate(endDate),
        },
        format: 'JSONEachRow',
      });

      const data = await result.json<MetricData>();
      return data.map((item) => ({
        name: item.name,
        count: parseNumber(item.count),
      }));
    } catch (error) {
      console.error(`Error fetching ${metric} data:`, error);
      throw new Error(`Failed to fetch ${metric} data`);
    }
  },

  async getDataPoints(
    organizationId: string,
    startDate: Date,
    endDate: Date,
    granularity: 'day' | 'week' | 'month',
  ): Promise<DataPoint[]> {
    try {
      let dateFunction: string;
      switch (granularity) {
        case 'day':
          dateFunction = 'toDate(created_at)';
          break;
        case 'week':
          dateFunction = 'toMonday(created_at)';
          break;
        case 'month':
          dateFunction = 'toStartOfMonth(created_at)';
          break;
      }

      const query = `
        SELECT
          ${dateFunction} AS date,
          COUNT(DISTINCT user_id) AS users,
          COUNT(DISTINCT session_id) AS sessions,
          COUNT(*) AS visits
        FROM event
        WHERE organization_id = {organizationId:String}
          AND event = 'pageview'
          AND created_at BETWEEN {startDate:DateTime} AND {endDate:DateTime}
        GROUP BY date
        ORDER BY date
      `;

      const result = await clickhouse.query({
        query,
        query_params: {
          organizationId,
          startDate: parseDate(startDate),
          endDate: parseDate(endDate),
        },
        format: 'JSONEachRow',
      });

      const data = await result.json<DataPoint>();
      return data.map((item) => ({
        date: parseDate(item.date),
        users: parseNumber(item.users),
        sessions: parseNumber(item.sessions),
        visits: parseNumber(item.visits),
      }));
    } catch (error) {
      console.error('Error fetching data points:', error);
      throw new Error('Failed to fetch data points');
    }
  },

  async getMetricsData(
    organizationId: string,
    startDate: Date,
    endDate: Date,
    uniqueBy: 'user' | 'visit' = 'visit',
  ): Promise<MetricsData> {
    const metrics = ['page', 'referrer', 'device', 'browser', 'country', 'language'] as const;

    const results = await Promise.all(
      metrics.map((metric) =>
        this.getMetricData(organizationId, startDate, endDate, metric, uniqueBy),
      ),
    );

    return {
      pages: results[0],
      referrers: results[1],
      devices: results[2],
      browsers: results[3],
      countries: results[4],
      languages: results[5],
    };
  },
};
