import React, { useEffect, useState } from 'react';
import {
  Card,
  Tabs,
  Button,
  Typography,
  Spin,
  Empty,
} from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import { history, useModel } from 'umi';
import ApplicationCard from '@/components/ApplicationCard';
import styles from './index.less';

const { Title } = Typography;
const { TabPane } = Tabs;

const ApplicationsPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState('all');
  
  const {
    applications,
    loading,
    fetchApplications,
    getApplicationsByStatus,
    getStatusCounts,
  } = useModel('User.applications');

  useEffect(() => {
    fetchApplications();
  }, [fetchApplications]);

  const handleCreateNew = () => {
    history.push('/user/applications/new');
  };

  const renderTabContent = (status: string) => {
    const filteredApplications = getApplicationsByStatus(status);
    
    if (loading) {
      return (
        <div className={styles.loadingContainer}>
          <Spin size="large" />
        </div>
      );
    }

    if (filteredApplications.length === 0) {
      return (
        <Empty
          description="Chưa có hồ sơ nào"
          image={Empty.PRESENTED_IMAGE_SIMPLE}
        />
      );
    }

    return (
      <div className={styles.applicationsGrid}>
        {filteredApplications.map(application => (
          <ApplicationCard key={application._id} application={application} />
        ))}
      </div>
    );
  };

  const statusCounts = getStatusCounts();

  return (
    <div className={styles.applicationsPage}>
      <div className={styles.pageHeader}>
        <Title level={2}>Hồ sơ xét tuyển</Title>
        <Button 
          type="primary" 
          icon={<PlusOutlined />}
          onClick={handleCreateNew}
          size="large"
        >
          Tạo hồ sơ mới
        </Button>
      </div>

      <Card className={styles.mainCard}>
        <Tabs 
          activeKey={activeTab} 
          onChange={setActiveTab}
          className={styles.applicationTabs}
        >
          <TabPane tab={`Tất cả (${statusCounts.all})`} key="all">
            {renderTabContent('all')}
          </TabPane>
          <TabPane tab={`Chờ duyệt (${statusCounts.cho_duyet})`} key="cho_duyet">
            {renderTabContent('cho_duyet')}
          </TabPane>
          <TabPane tab={`Đã duyệt (${statusCounts.da_duyet})`} key="da_duyet">
            {renderTabContent('da_duyet')}
          </TabPane>
          <TabPane tab={`Từ chối (${statusCounts.tu_choi})`} key="tu_choi">
            {renderTabContent('tu_choi')}
          </TabPane>
        </Tabs>
      </Card>
    </div>
  );
};

export default ApplicationsPage;