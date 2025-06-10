import React from 'react';
import StatisticCards from './components/StatisticCards';
import StatusPieChart from './components/StatusPieChart';
import MajorBarChart from './components/MajorBarChart';
import MajorDetailTable from './components/MajorDetailTable';

const Statistic: React.FC = () => {
  return (
    <div>
      <StatisticCards />
      <div style={{ display: 'flex', gap: 16, marginBottom: 16 }}>
        <StatusPieChart />
        <MajorBarChart />
      </div>
      <MajorDetailTable />
    </div>
  );
};

export default Statistic;

