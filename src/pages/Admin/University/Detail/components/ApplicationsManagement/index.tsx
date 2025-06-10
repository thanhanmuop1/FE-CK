import React, { useEffect, useState } from 'react';
import { Card, Tabs, Badge, Space } from 'antd';
import { useModel, useParams } from 'umi';
import ApplicationList from './ApplicationList';
import GroupedApplications from './GroupedApplications';
import styles from './index.less';

const { TabPane } = Tabs;

const ApplicationsManagement: React.FC = () => {
  const { universityId } = useParams<{ universityId: string }>();
  const {
    applications,
    loading,
    fetchApplicationsByUniversity,
    updateStatus,
  } = useModel('Admin.Applications');

  useEffect(() => {
    fetchApplicationsByUniversity(universityId);
  }, []);

  const [activeTab, setActiveTab] = useState('cho_duyet');

  // Đếm số lượng đơn theo trạng thái
  const getApplicationCount = (status: string) => {
    return applications.filter(app => app.status === status).length;
  };

  const handleTabChange = (key: string) => {
    setActiveTab(key);
  };

  return (
    <div className={styles.container}>
      <Card>
        <Tabs activeKey={activeTab} onChange={handleTabChange}>
          <TabPane
            tab={
              <Space>
                Chờ duyệt
                <Badge count={getApplicationCount('cho_duyet')} style={{ backgroundColor: '#faad14' }} />
              </Space>
            }
            key="cho_duyet"
          >
            <ApplicationList
              status="cho_duyet"
              applications={applications.filter(app => app.status === 'cho_duyet')}
              loading={loading}
              onApprove={updateStatus}
              onReject={updateStatus}
            />
          </TabPane>

          <TabPane
            tab={
              <Space>
                Đã duyệt
                <Badge count={getApplicationCount('da_duyet')} style={{ backgroundColor: '#52c41a' }} />
              </Space>
            }
            key="da_duyet"
          >
            <ApplicationList
              status="da_duyet"
              applications={applications.filter(app => app.status === 'da_duyet')}
              loading={loading}
            />
          </TabPane>

          <TabPane
            tab={
              <Space>
                Đã từ chối
                <Badge count={getApplicationCount('tu_choi')} style={{ backgroundColor: '#ff4d4f' }} />
              </Space>
            }
            key="tu_choi"
          >
            <ApplicationList
              status="tu_choi"
              applications={applications.filter(app => app.status === 'tu_choi')}
              loading={loading}
            />
          </TabPane>

          <TabPane
            tab={
              <Space>
                Đơn theo ngành
                <Badge count={applications.length} style={{ backgroundColor: '#1890ff' }} />
              </Space>
            }
            key="grouped"
          >
            <GroupedApplications universityId={universityId} />
          </TabPane>
        </Tabs>
      </Card>
    </div>
  );
};

export default ApplicationsManagement; 