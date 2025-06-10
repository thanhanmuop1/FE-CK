import React, { useEffect } from 'react';
import { useHistory, useParams } from 'umi';
import { Spin } from 'antd';
import { useModel } from 'umi';
import './index.less';
import ApplicationHeader from './component/ApplicationHeader';
import ApplicationInfoCard from './component/ApplicationInfoCard';
import ApplicationScoresCard from './component/ApplicationScoresCard';
import ApplicationDocumentsCard from './component/ApplicationDocumentsCard';
import { statusMap } from '@/utils/utils'

const DetailApplicationsPage: React.FC = () => {
  const history = useHistory();
  const { id } = useParams<{ id: string }>();
  
  const { 
    data, 
    loading, 
    error, 
    fetchApplicationDetail, 
    getNormalizedData 
  } = useModel('User.detailApplication');

  useEffect(() => {
    if (id) {
      fetchApplicationDetail(id);
    }
  }, [id, fetchApplicationDetail]);

  if (loading) return <Spin size="large" />;
  if (error) return <div className="error-message">{error}</div>;
  
  const application = getNormalizedData();

  if (!application) return null;

  return (
    <div className="detail-applications-page">
      <ApplicationHeader
        status={application.status}
        statusMap={statusMap}
        onBack={() => history.goBack()}
        application={application}
      />
      <ApplicationInfoCard application={application} statusMap={statusMap} />
      <div className="section">
        <ApplicationScoresCard
          scores={application.scores}
          subjectScores={application.subjectScores}
          totalScore={application.totalScore}
          method={application.method}
          priority={application.priority}
        />
      </div>
      <div className="section">
        <ApplicationDocumentsCard documents={application.documents} />
      </div>
    </div>
  );
};

export default DetailApplicationsPage;
