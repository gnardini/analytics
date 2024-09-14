import { Loader } from '@frontend/components/common/Loader';
import { primaryAccent, secondaryAccent, textPrimary } from '@frontend/utils/colors';
import { amount } from '@frontend/utils/number';
import { DataPoint } from '@type/dashboard';
import { DateTime } from 'luxon';
import React from 'react';
import { Area, AreaChart, ResponsiveContainer, Text, Tooltip, XAxis, YAxis } from 'recharts';

interface ChartProps {
  loading: boolean;
  data: DataPoint[];
  dataType: 'users' | 'sessions' | 'visits';
  granularity: 'day' | 'week' | 'month';
}

const Chart: React.FC<ChartProps> = ({ loading, data, dataType, granularity }) => {
  return (
    <ResponsiveContainer width="100%" height={400}>
      {loading ? (
        <div className="w-full h-full flex justify-center items-center">
          <Loader size={30} borderWidth={3} />
        </div>
      ) : (
        <AreaChart
          data={data}
          margin={{
            top: 10,
            right: 30,
            left: 0,
            bottom: 0,
          }}
        >
          <XAxis
            dataKey="date"
            className="text-text-primary"
            tick={(props: any) => {
              const label =
                granularity === 'day' || granularity === 'week'
                  ? DateTime.fromISO(props.payload.value).toFormat('LLL d')
                  : DateTime.fromISO(props.payload.value).toFormat('LLL yyyy');
              return (
                <Text {...props} fill={textPrimary}>
                  {label}
                </Text>
              );
            }}
          />
          <YAxis
            tick={(props: any) => (
              <Text {...props} fill={textPrimary}>
                {amount(props.payload.value)}
              </Text>
            )}
          />
          <Tooltip
            content={(props) => {
              if (!props.payload) {
                return null;
              }
              const data = props.payload[0]?.payload;
              if (!data) {
                return null;
              }

              return (
                <div className="bg-tertiary-background p-2 rounded">
                  <p>
                    {granularity === 'day'
                      ? DateTime.fromISO(props.label).toFormat('LLL d')
                      : granularity === 'week'
                      ? `Week of ${DateTime.fromISO(props.label).toFormat('LLL d')}`
                      : DateTime.fromISO(props.label).toFormat('LLL yyyy')}
                  </p>
                  <p>{`${amount(data[dataType])} ${dataType}`}</p>
                </div>
              );
            }}
          />

          <Area
            connectNulls
            type="linear"
            dataKey={dataType}
            stroke={secondaryAccent}
            fill={primaryAccent}
            dot={{ r: 0 }}
            activeDot={(prop: any) => {
              return <circle cx={prop.cx} cy={prop.cy} r="4" fill={secondaryAccent} />;
            }}
          />
        </AreaChart>
      )}
    </ResponsiveContainer>
  );
};

export default Chart;
