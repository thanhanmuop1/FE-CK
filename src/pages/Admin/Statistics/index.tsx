import React, { useEffect } from 'react';
import { Card, Row, Col, Spin, Typography } from 'antd';
import { useModel } from 'umi';
import OverviewCards from './components/OverviewCards';
import UniversityChart from './components/UniversityChart';
import StatusChart from './components/StatusChart';
import TimelineChart from './components/TimelineChart';
import ComparisonTable from './components/ComparisonTable';
import styles from './index.less';

const { Title } = Typography;

const StatisticsPage: React.FC = () => {
  const {
    loading,
    fetchUniversityStats,
    fetchStatusStats,
    fetchDateStats,
    fetchMonthStats,
    fetchYearStats,
    fetchBetweenUniversitiesStats,
  } = useModel('Admin.Statistics');

  useEffect(() => {
    const fetchAllData = async () => {
      await Promise.all([
        fetchUniversityStats(),
        fetchStatusStats(),
        fetchDateStats(),
        fetchMonthStats(),
        fetchYearStats(),
        fetchBetweenUniversitiesStats(),
      ]);
    };
    fetchAllData();
  }, []);

  if (loading) {
    return (
      <div className={styles.loadingContainer}>
        <Spin size="large" />
      </div>
    );
  }

  return (
    <div className={styles.container}>
      <div className={styles.pageHeader}>
        <Title level={2}>Thống kê hồ sơ đăng ký</Title>
        <p className={styles.pageDescription}>
          Tổng quan về tình hình đăng ký xét tuyển đại học
        </p>
      </div>

      <div className={styles.overviewSection}>
        <OverviewCards />
      </div>

      <div className={styles.chartsSection}>
        <Row gutter={[24, 24]}>
          <Col xs={24} lg={12}>
            <Card 
              title="Thống kê theo trường đại học" 
              className={styles.chartCard}
              bordered={false}
            >
              <UniversityChart />
            </Card>
          </Col>
          <Col xs={24} lg={12}>
            <Card 
              title="Thống kê theo trạng thái" 
              className={styles.chartCard}
              bordered={false}
            >
              <StatusChart />
            </Card>
          </Col>
        </Row>

        <Row gutter={[24, 24]} className={styles.timelineRow}>
          <Col span={24}>
            <Card 
              title="Thống kê theo thời gian" 
              className={styles.chartCard}
              bordered={false}
            >
              <TimelineChart />
            </Card>
          </Col>
        </Row>
      </div>

      <div className={styles.comparisonSection}>
        <Card 
          title="So sánh giữa các trường đại học" 
          className={styles.comparisonCard}
          bordered={false}
        >
          <ComparisonTable />
        </Card>
      </div>
    </div>
  );
};

export default StatisticsPage; 