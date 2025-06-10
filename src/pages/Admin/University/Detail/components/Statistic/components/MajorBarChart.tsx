import React, { useEffect, useMemo } from 'react';
import { Card } from 'antd';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';
import { useParams, useModel } from 'umi';

const MajorBarChart: React.FC = () => {
  const { universityId } = useParams<{ universityId: string }>();
  // Lấy ngành đúng trường
  const { majors, fetchMajors } = useModel('Admin.UniversityMajors');
  // Lấy đơn xét tuyển đúng trường
  const { applications, fetchApplicationsByUniversity } = useModel('Admin.Applications');

  useEffect(() => {
    if (universityId) {
      fetchMajors(universityId);
      fetchApplicationsByUniversity(universityId);
    }
  }, [universityId]);

  // Đếm số đơn theo ngành đúng trường
  const barData = useMemo(() => {
    return majors.map(m => ({
      name: m.name,
      count: applications.filter(app => app.universityMajorId?.code === m.code).length,
    }));
  }, [majors, applications]);

  return (
    <Card title="Đơn theo ngành" style={{ flex: 1 }}>
      <ResponsiveContainer width="100%" height={250}>
        <BarChart data={barData}>
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Bar dataKey="count" fill="#1890ff" />
        </BarChart>
      </ResponsiveContainer>
    </Card>
  );
};

export default MajorBarChart;

