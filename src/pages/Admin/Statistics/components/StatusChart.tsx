import React from 'react';
import { Pie } from '@ant-design/plots';
import { useModel } from 'umi';
import styles from '../index.less';

const StatusChart: React.FC = () => {
  const { statusStats } = useModel('Admin.Statistics');

  // Map status IDs to display names
  const statusMap = {
    'cho_duyet': 'Chờ duyệt',
    'da_duyet': 'Đã duyệt',
    'tu_choi': 'Từ chối'
  };

  // Transform data to include display names
  const transformedData = statusStats.map(stat => ({
    ...stat,
    name: statusMap[stat._id as keyof typeof statusMap] || stat._id
  }));

  const config = {
    data: transformedData,
    angleField: 'count',
    colorField: 'name',
    radius: 0.8,
    label: {
      type: 'outer',
      content: '{name}: {count} ({percentage})',
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
    },
    color: ['#faad14', '#52c41a', '#ff4d4f'], // Màu tương ứng với từng trạng thái
    statistic: {
      title: {
        style: {
          fontSize: '16px',
          color: '#666',
        },
        content: 'Tổng số hồ sơ',
      },
      content: {
        style: {
          fontSize: '24px',
          color: '#1890ff',
        },
        formatter: () => {
          const total = transformedData.reduce((sum, item) => sum + item.count, 0);
          return total.toString();
        },
      },
    },
  };

  return (
    <div className={`${styles.chartContainer} ${styles.slideUp}`}>
      <Pie {...config} />
    </div>
  );
};

export default StatusChart; 