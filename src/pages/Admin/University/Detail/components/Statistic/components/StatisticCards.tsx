import React, { useEffect, useMemo } from 'react';
import { Card, Row, Col } from 'antd';
import { useParams, useModel } from 'umi';

const StatisticCards: React.FC = () => {
  const { universityId } = useParams<{ universityId: string }>();
  // Lấy ngành đúng trường
  const { majors, fetchMajors } = useModel('Admin.UniversityMajors');
  // Lấy đơn xét tuyển đúng trường
  const { applications, fetchApplicationsByUniversity } = useModel('Admin.Applications');

  useEffect(() => {
    if (universityId) {
      fetchMajors(universityId); // Lấy ngành đúng trường
      fetchApplicationsByUniversity(universityId);
    }
  }, [universityId]);

  // Tính toán tổng số đơn, số ngành, tỷ lệ duyệt, số lượng từng trạng thái
  const { pending, approved, rejected, enrolled, total, approveRate, majorCount } = useMemo(() => {
    const pending = applications.filter(app => app.status === 'cho_duyet').length;
    const approved = applications.filter(app => app.status === 'da_duyet').length;
    const rejected = applications.filter(app => app.status === 'tu_choi').length;
    const total = applications.length;
    const approveRate = total ? ((approved / total) * 100).toFixed(1) : '0';
    const majorCount = majors.length;
    return { pending, approved, rejected, enrolled, total, approveRate, majorCount };
  }, [applications, majors]);

  return (
    <Row gutter={16} style={{ marginBottom: 16 }}>
      <Col span={6}><Card title="Chờ duyệt" bordered={false}>{pending}</Card></Col>
      <Col span={6}><Card title="Đã duyệt" bordered={false}>{approved}</Card></Col>
      <Col span={6}><Card title="Từ chối" bordered={false}>{rejected}</Card></Col>
      <Col span={8}><Card bordered={false}><div style={{ color: '#43A047', fontSize: 24 }}>{approveRate}%</div>Tỷ lệ duyệt</Card></Col>
      <Col span={8}><Card bordered={false}><div style={{ fontSize: 24 }}>{total}</div>Tổng đơn</Card></Col>
      <Col span={8}><Card bordered={false}><div style={{ fontSize: 24 }}>{majorCount}</div>Số ngành</Card></Col>
    </Row>
  );
};

export default StatisticCards;

