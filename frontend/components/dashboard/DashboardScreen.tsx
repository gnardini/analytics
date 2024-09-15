import { Container } from '@frontend/components/common/Container';
import { Dropdown } from '@frontend/components/common/Dropdown';
import { Organization } from '@type/organization';
import { Tab } from '@type/tabs';
import React, { useState } from 'react';
import CountsView from './components/CountsView';
import Chart from './components/LineChart';
import MetricsTables from './components/MetricsTables';
import { OrganizationSelector } from './components/OrganizationSelector';
import { useDashboardStore } from './data/dashboardStore';
import { useDataPoints } from './hooks/useDataPoints';
import SetupView from './views/SetupView';

interface DashboardScreenProps {
  activeOrg: Organization;
  membershipType: 'owner' | 'admin' | 'member';
}

type DateRange = {
  label: string;
  value: string;
  granularity: 'day' | 'week' | 'month';
};

const dateRangeOptions: DateRange[] = [
  { label: 'Last 30 days', value: 'last_30_days', granularity: 'day' },
  { label: 'Last 7 days', value: 'last_7_days', granularity: 'day' },
  { label: 'Last 6 months', value: 'last_6_months', granularity: 'week' },
  { label: 'Last year', value: 'last_year', granularity: 'month' },
  { label: 'All time', value: 'all_time', granularity: 'month' },
];

const DashboardScreen: React.FC<DashboardScreenProps> = ({ activeOrg, membershipType }) => {
  const [isSetupComplete, setIsSetupComplete] = useState(activeOrg.setup_complete_at !== null);
  const { dataType, setDataType, dateRange, setDateRange } = useDashboardStore();
  const {
    dataPoints,
    loading: dataPointsLoading,
    error: dataPointsError,
  } = useDataPoints(activeOrg.id, dateRange);

  return (
    <Container activeTab={Tab.App} showSideBar={false} className="flex-1 px-6 pb-6 overflow-auto">
      <div className="max-w-[1000px] mx-auto">
        <OrganizationSelector activeOrg={activeOrg} membershipType={membershipType} />
        {!isSetupComplete ? (
          <SetupView
            domain={activeOrg.name}
            organizationId={activeOrg.id}
            onSetupComplete={() => setIsSetupComplete(true)}
          />
        ) : (
          <div className="relative">
            <div className="sticky top-0 z-10 bg-primary-background py-4 mb-4 flex space-x-2 items-center">
              <div className="flex rounded-full overflow-hidden border border-secondary-accent">
                {['users', 'sessions', 'visits'].map((type) => (
                  <button
                    key={type}
                    onClick={() => setDataType(type as 'users' | 'sessions' | 'visits')}
                    className={`px-4 py-2 text-sm font-medium capitalize ${
                      dataType === type
                        ? 'bg-primary-accent/80 text-white'
                        : 'bg-transparent text-secondary-accent hover:bg-secondary-accent/10'
                    } ${type !== 'visits' ? 'border-r border-secondary-accent' : ''}`}
                  >
                    {type}
                  </button>
                ))}
              </div>
              <Dropdown
                options={dateRangeOptions}
                selectedOption={dateRange}
                setSelectedOption={setDateRange}
                renderOption={(option) => <span>{option.label}</span>}
                placeholder="Select date range"
                className="w-48"
              />
            </div>
            <CountsView organizationId={activeOrg.id} />
            {dataPointsError ? (
              <div>Error loading chart data: {dataPointsError.message}</div>
            ) : (
              <Chart
                loading={dataPointsLoading}
                data={dataPoints}
                dataType={dataType}
                granularity={dateRange.granularity}
              />
            )}
            <div className="mt-8">
              <MetricsTables organizationId={activeOrg.id} />
            </div>
          </div>
        )}
      </div>
    </Container>
  );
};

export default DashboardScreen;
