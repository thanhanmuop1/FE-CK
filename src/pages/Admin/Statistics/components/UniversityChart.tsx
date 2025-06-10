import React from 'react';
import { Column } from '@ant-design/plots';
import { useModel } from 'umi';
import styles from '../index.less';

const UniversityChart: React.FC = () => {
  const { universityStats, getTopUniversities } = useModel('Admin.Statistics');
  const data = getTopUniversities(10);

  const config = {
    data,
    xField: 'universityName',
    yField: 'count',
    label: {
      position: 'middle',
      style: {
        fill: '#FFFFFF',
        opacity: 0.6,
      },
    },
    meta: {
      universityName: {
        alias: 'Trường đại học',
      },
      count: {
        alias: 'Số lượng hồ sơ',
      },
    },
    color: ({ universityName }: { universityName: string }) => {
      return `l(270) 0:${universityName} 1:${universityName}`;
    },
    animation: {
      appear: {
        animation: 'wave-in',
        duration: 1000,
      },
    },
  };

  return (
    <div className={`${styles.chartContainer} ${styles.slideUp}`}>
      <Column {...config} />
    </div>
  );
};

export default UniversityChart; 