import React from 'react';
import { Card, Tabs, Breadcrumb } from 'antd';
import { useParams, history } from 'umi';
import { useModel } from 'umi';
import MajorsManagement from './components/MajorsManagement';
import ApplicationsManagement from './components/ApplicationsManagement';
import Statistic from './components/Statistic';
import AdmissionPeriodsManagement from './components/AdmissionPeriodsManagement';
import styles from './index.less';

const { TabPane } = Tabs;

const UniversityDetailPage: React.FC = () => {
  const { universityId } = useParams<{ universityId: string }>();
  const { universityDetail, fetchUniversityDetail } = useModel('Admin.University');

  React.useEffect(() => {
    if (universityId) {
      fetchUniversityDetail(universityId);
    }
  }, [universityId]);

  const handleTabChange = (key: string) => {
    // Handle tab changes if needed
  };

  return (
    <div className={styles.container}>
      <Breadcrumb className={styles.breadcrumb}>
        <Breadcrumb.Item>
          <a onClick={() => history.push('/admin/university')}>Danh sách trường đại học</a>
        </Breadcrumb.Item>
        <Breadcrumb.Item>{universityDetail?.name || 'Chi tiết trường'}</Breadcrumb.Item>
      </Breadcrumb>

      <Card>
        <Tabs defaultActiveKey="majors" onChange={handleTabChange}>
          <TabPane tab="Quản lý ngành học" key="majors">
            <MajorsManagement />
          </TabPane>
          <TabPane tab="Quản lý đơn xét tuyển" key="applications">
            <ApplicationsManagement universityId={universityId}/>
          </TabPane>
          <TabPane tab="Quản lý đơn đợt xét tuyển" key="admissions">
            <AdmissionPeriodsManagement/>
          </TabPane>
          <TabPane tab="Thống kê" key="statistics">
            <Statistic />
          </TabPane>
        </Tabs>
      </Card>
    </div>
  );
};

export default UniversityDetailPage; 