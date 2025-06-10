import React, { useEffect, useMemo } from 'react';
import { Card, Table } from 'antd';
import { useParams, useModel } from 'umi';

const MajorDetailTable: React.FC = () => {
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

  // Tính toán số lượng từng trạng thái cho từng ngành đúng trường
  const dataSource = useMemo(() => {
    return majors.map(major => {
      const apps = applications.filter(app => app.universityMajorId?.code === major.code);
      const pending = apps.filter(app => app.status === 'cho_duyet').length;
      const approved = apps.filter(app => app.status === 'da_duyet').length;
      const rejected = apps.filter(app => app.status === 'tu_choi').length;
      const total = apps.length;
      const approvalRate = total ? ((approved / total) * 100).toFixed(1) + '%' : '0%';
      return {
        name: major.name,
        code: major.code,
        count: total,
        pending,
        approved,
        rejected,
        approvalRate,
      };
    });
  }, [majors, applications]);

  const columns = [
    { title: 'Ngành', dataIndex: 'name', key: 'name' },
    { title: 'Tổng', dataIndex: 'count', key: 'count' },
    { title: 'Chờ duyệt', dataIndex: 'pending', key: 'pending' },
    { title: 'Đã duyệt', dataIndex: 'approved', key: 'approved' },
    { title: 'Từ chối', dataIndex: 'rejected', key: 'rejected' },
    { title: 'Tỷ lệ duyệt', dataIndex: 'approvalRate', key: 'approvalRate' },
  ];

  return (
    <Card title="Chi tiết theo ngành" style={{ marginBottom: 16 }}>
      <Table
        dataSource={dataSource}
        columns={columns}
        rowKey="code"
        pagination={false}
      />
    </Card>
  );
};

export default MajorDetailTable;
