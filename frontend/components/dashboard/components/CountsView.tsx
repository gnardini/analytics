import { Card } from '@frontend/components/common/Card';
import { Loader } from '@frontend/components/common/Loader';
import { useCountsViewData } from '@frontend/components/dashboard/hooks/useCountsViewData';
import { amount } from '@frontend/utils/number';
import React from 'react';

interface CountsViewProps {
  organizationId: string;
}

const CountsView: React.FC<CountsViewProps> = ({ organizationId }) => {
  const { countsData, loading, error } = useCountsViewData(organizationId);

  if (error) return <div>Error: {error.message}</div>;

  return (
    <div className="grid grid-cols-3 gap-4 mb-6">
      <Card>
        <h3 className="text-xl font-semibold mb-2">Users</h3>
        {loading ? <Loader /> : <p className="text-2xl font-bold">{amount(countsData.users)}</p>}
      </Card>
      <Card>
        <h3 className="text-xl font-semibold mb-2">Sessions</h3>
        {loading ? <Loader /> : <p className="text-2xl font-bold">{amount(countsData.sessions)}</p>}
      </Card>
      <Card>
        <h3 className="text-xl font-semibold mb-2">Visits</h3>
        {loading ? <Loader /> : <p className="text-2xl font-bold">{amount(countsData.visits)}</p>}
      </Card>
    </div>
  );
};

export default CountsView;
