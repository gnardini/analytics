import { countryInfo, mapLanguageToCountryCode } from '@backend/utils/countries';
import { useMetricsData } from '@frontend/components/dashboard/hooks/useMetricsData';
import React from 'react';
import MetricTable from './MetricTable';

interface MetricsTablesProps {
  organizationId: string;
}

const mapReferrerName = (name: string | null): string => {
  if (!name) return 'Direct';
  return name.endsWith('/') ? name.slice(0, -1) : name;
};

const getFlagEmoji = (countryCode: string) => {
  const codePoints = countryCode
    .toUpperCase()
    .split('')
    .map((char) => 127397 + char.charCodeAt(0));
  return String.fromCodePoint(...codePoints);
};

const getCountryCode = (countryName: string): string | null => {
  for (const [code, name] of Object.entries(countryInfo.countries)) {
    if (name === countryName) {
      return code;
    }
  }
  return null;
};

const transformCountryName = (name: string): React.ReactNode => {
  const countryCode = getCountryCode(name);
  if (countryCode) {
    const flagEmoji = getFlagEmoji(countryCode);
    return (
      <>
        {flagEmoji} {name}
      </>
    );
  }
  return name;
};

const transformLanguageName = (name: string): React.ReactNode => {
  const countryCode = mapLanguageToCountryCode(name);
  if (countryCode) {
    const flagEmoji = getFlagEmoji(countryCode);
    return (
      <>
        {flagEmoji} {name}
      </>
    );
  }
  return name;
};

const MetricsTables: React.FC<MetricsTablesProps> = ({ organizationId }) => {
  const { metricsData, uniqueBy, loading, error } = useMetricsData(organizationId);

  const valueColumnText = uniqueBy === 'user' ? 'Users' : 'Visits';

  if (error) return <div>Error: {error.message}</div>;
  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <MetricTable
          title="Pages"
          data={metricsData.pages}
          nameColumnText="Page"
          valueColumnText={valueColumnText}
          isLoading={loading}
        />
        <MetricTable
          title="Referrers"
          data={metricsData.referrers.map((referrer) => ({
            name: mapReferrerName(referrer.name),
            count: referrer.count,
          }))}
          nameColumnText="Referrer"
          valueColumnText={valueColumnText}
          isLoading={loading}
        />
        <MetricTable
          title="Devices"
          data={metricsData.devices}
          nameColumnText="Device"
          valueColumnText={valueColumnText}
          isLoading={loading}
        />
        <MetricTable
          title="Browsers"
          data={metricsData.browsers}
          nameColumnText="Browser"
          valueColumnText={valueColumnText}
          isLoading={loading}
        />
        <MetricTable
          title="Countries"
          data={metricsData.countries.filter((country) => country.name.length > 0)}
          nameTransform={transformCountryName}
          nameColumnText="Country"
          valueColumnText={valueColumnText}
          isLoading={loading}
        />
        <MetricTable
          title="Languages"
          data={metricsData.languages}
          nameTransform={transformLanguageName}
          nameColumnText="Language"
          valueColumnText={valueColumnText}
          isLoading={loading}
        />
      </div>
    </>
  );
};

export default MetricsTables;
