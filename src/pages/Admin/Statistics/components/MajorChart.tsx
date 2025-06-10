import React from 'react';
import { Pie } from '@ant-design/plots';
import { useModel } from 'umi';
import styles from '../index.less';

const MajorChart: React.FC = () => {
  const { majorStats } = useModel('Admin.Statistics');
  console.log(majorStats);
  const config = {
    data: majorStats,
    angleField: 'count',
    colorField: 'majorName',
    radius: 0.8,
    label: {
      type: 'outer',
      content: '{majorName}: {count} ({percentage})',
      style: {
        fontSize: 14,
        textAlign: 'center',
      },
    },
    interactions: [{ type: 'element-active' }],
    animation: {
      appear: {
        animation: 'wave-in',
        duration: 1000,
      },
    },
    legend: {
      position: 'bottom',
      itemHeight: 20,
      itemWidth: 100,
      itemSpacing: 8,
      formatter: (text: string) => {
        const item = majorStats.find(stat => stat.majorName === text);
        return `${text} (${item?.count || 0})`;
      },
    },
    statistic: {
      title: {
        style: {
          fontSize: '16px',
          color: '#666',
        },
        content: 'Tổng số ngành',
      },
      content: {
        style: {
          fontSize: '24px',
          color: '#1890ff',
        },
        formatter: () => {
          const total = majorStats.reduce((sum, item) => sum + item.count, 0);
          return total.toString();
        },
      },
    },
    tooltip: {
      formatter: (datum: any) => {
        return {
          name: datum.majorName,
          value: `${datum.count || 0} hồ sơ`,
        };
      },
    },
  };

  return (
    <div className={`${styles.chartContainer} ${styles.slideUp}`}>
      <Pie {...config} />
    </div>
  );
};

export default MajorChart; 