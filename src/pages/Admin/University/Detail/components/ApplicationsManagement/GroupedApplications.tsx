import React from 'react';
import { Card, Collapse, Empty, Spin, Tag } from 'antd';
import { useModel } from 'umi';
import ApplicationList from './ApplicationList';
import styles from './index.less';

const { Panel } = Collapse;

interface GroupedApplicationsProps {
  universityId: string;
}

const GroupedApplications: React.FC<GroupedApplicationsProps> = ({ universityId }) => {
  const { groupedApplications, loading, fetchApplicationsGroupedByMajor } = useModel('Admin.Applications');

  React.useEffect(() => {
    fetchApplicationsGroupedByMajor(universityId);
  }, [universityId]);

  if (loading) {
    return (
      <div className={styles.loadingContainer}>
        <Spin size="large" />
      </div>
    );
  }

  if (!groupedApplications.length) {
    return <Empty description="Không có đơn xét tuyển nào" />;
  }

  return (
    <div className={styles.groupedApplications}>
      <Collapse defaultActiveKey={['0']}>
        {groupedApplications.map((group, index) => (
          <Panel
            key={index}
            header={
              <div className={styles.panelHeader}>
                <span className={styles.majorName}>{group.majorName}</span>
                <Tag color="blue">{group.applications.length} đơn</Tag>
              </div>
            }
          >
            <ApplicationList
              applications={group.applications}
              loading={loading}
              status="cho_duyet"
            />
          </Panel>
        ))}
      </Collapse>
    </div>
  );
};

export default GroupedApplications; 