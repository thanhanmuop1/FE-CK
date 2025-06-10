import React, { useState } from 'react';
import { Line } from '@ant-design/plots';
import { Radio, Space } from 'antd';
import { useModel } from 'umi';
import styles from '../index.less';

const TimelineChart: React.FC = () => {
  const { dateStats, monthStats, yearStats } = useModel('Admin.Statistics');
  const [timeUnit, setTimeUnit] = useState<'day' | 'month' | 'year'>('day');

  const getData = () => {
    switch (timeUnit) {
      case 'day':
        return dateStats.map(item => ({
          date: new Date(item.date).toLocaleDateString('vi-VN'),
          count: item.count
        }));
      case 'month':
        return monthStats.map(item => ({
          date: new Date(item.date).toLocaleDateString('vi-VN', { month: 'long', year: 'numeric' }),
          count: item.count
        }));
      case 'year':
        return yearStats.map(item => ({
          date: item.year.toString(),
          count: item.count
        }));
      default:
        return [];
    }
  };

  const chartData = getData();
  console.log('Line chart data:', chartData);

  const config = {
    data: getData(),
    xField: 'date',
    yField: 'count',
    point: {
      size: 5,
      shape: 'diamond',
      style: {
        fill: '#1890ff',
        stroke: '#fff',
        lineWidth: 2,
      },
    },
    label: {
      style: {
        fill: '#666',
      },
    },
    smooth: true,
    animation: {
      appear: {
        animation: 'wave-in',
        duration: 1000,
      },
    },
    xAxis: {
      label: {
        autoHide: false,
        autoRotate: false,
      },
    },
    yAxis: {
      label: {
        formatter: (v: string) => `${v} hồ sơ`,
      },
    },
    meta: {
      count: { alias: 'Số lượng hồ sơ' }
    },
  };

  return (
    <div className={`${styles.chartContainer} ${styles.slideUp}`}>
      <div style={{ marginBottom: 16, textAlign: 'right' }}>
        <Radio.Group 
          value={timeUnit} 
          onChange={(e) => setTimeUnit(e.target.value)}
          buttonStyle="solid"
        >
          <Radio.Button value="day">Theo ngày</Radio.Button>
          <Radio.Button value="month">Theo tháng</Radio.Button>
          <Radio.Button value="year">Theo năm</Radio.Button>
        </Radio.Group>
      </div>
      <Line {...config} />
    </div>
  );
};

export default TimelineChart; 