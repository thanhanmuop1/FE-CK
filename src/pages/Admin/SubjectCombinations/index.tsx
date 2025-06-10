import React, { useEffect } from 'react';
import { Card, Typography, Space } from 'antd';
import { useModel } from 'umi';
import SubjectCombinationTable from './components/SubjectCombinationTable';
import SubjectCombinationForm from './components/SubjectCombinationForm';

const { Title } = Typography;

const SubjectCombinationsPage: React.FC = () => {
  const { fetchSubjectCombinations } = useModel('Admin.SubjectCombinations');

  useEffect(() => {
    fetchSubjectCombinations();
  }, [fetchSubjectCombinations]);

  return (
    <div style={{ padding: '24px' }}>
      <Space direction="vertical" size="large" style={{ width: '100%' }}>
        <Title level={2}>Quản lý tổ hợp môn xét tuyển</Title>
        
        <Card title="Thêm tổ hợp môn mới" bordered={false}>
          <SubjectCombinationForm />
        </Card>

        <Card title="Danh sách tổ hợp môn" bordered={false}>
          <SubjectCombinationTable />
        </Card>
      </Space>
    </div>
  );
};

export default SubjectCombinationsPage; 