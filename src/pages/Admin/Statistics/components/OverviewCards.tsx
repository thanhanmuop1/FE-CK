import React from 'react';
import { Card, Row, Col, Statistic } from 'antd';
import { useModel } from 'umi';
import { FileTextOutlined, CheckCircleOutlined, CloseCircleOutlined, ClockCircleOutlined } from '@ant-design/icons';
import styles from '../index.less';

const OverviewCards: React.FC = () => {
  const { getTotalApplications, statusStats } = useModel('Admin.Statistics');

  const getStatusCount = (status: string) => {
    return statusStats.find((stat: StatusStatistics) => stat._id === status)?.count || 0;
  };

  const cards = [
    {
      title: 'Tổng số hồ sơ',
      value: getTotalApplications(),
      icon: <FileTextOutlined style={{ fontSize: '24px', color: '#1890ff' }} />,
      color: '#1890ff',
    },
    {
      title: 'Đã duyệt',
      value: getStatusCount('da_duyet'),
      icon: <CheckCircleOutlined style={{ fontSize: '24px', color: '#52c41a' }} />,
      color: '#52c41a',
    },
    {
      title: 'Chờ duyệt',
      value: getStatusCount('cho_duyet'),
      icon: <ClockCircleOutlined style={{ fontSize: '24px', color: '#faad14' }} />,
      color: '#faad14',
    },
    {
      title: 'Từ chối',
      value: getStatusCount('tu_choi'),
      icon: <CloseCircleOutlined style={{ fontSize: '24px', color: '#ff4d4f' }} />,
      color: '#ff4d4f',
    },
  ];

  return (
    <Row gutter={[16, 16]} className={styles.fadeIn}>
      {cards.map((card, index) => (
        <Col xs={24} sm={12} lg={6} key={card.title}>
          <div className={styles.statisticCard} style={{ animationDelay: `${index * 0.1}s` }}>
            <Statistic
              title={card.title}
              value={card.value}
              prefix={card.icon}
              valueStyle={{ color: card.color }}
            />
          </div>
        </Col>
      ))}
    </Row>
  );
};

export default OverviewCards; 