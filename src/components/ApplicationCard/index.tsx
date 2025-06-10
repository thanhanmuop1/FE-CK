import React from 'react';
import { Card, Button, Row, Col, Typography, Badge, Tooltip } from 'antd';
import { EyeOutlined, ClockCircleOutlined, CalendarOutlined } from '@ant-design/icons';
import { history } from 'umi';
import moment from 'moment';
import type { Application } from '@/models/User/applications';
import styles from './index.less';

const { Title, Text } = Typography;

interface ApplicationCardProps {
  application: Application;
}

const ApplicationCard: React.FC<ApplicationCardProps> = ({ application }) => {
  const getStatusBadge = (status: string) => {
    const statusMap: Record<string, { color: 'warning' | 'success' | 'error'; text: string }> = {
      'cho_duyet': { color: 'warning', text: 'Chờ duyệt' },
      'da_duyet': { color: 'success', text: 'Đã duyệt' },
      'tu_choi': { color: 'error', text: 'Từ chối' },
    };
    
    const statusInfo = statusMap[status] || { color: 'warning', text: status };
    return <Badge status={statusInfo.color} text={statusInfo.text} />;
  };

  const getAdmissionMethodText = (method: string) => {
    const methodMap: Record<string, string> = {
      'dgnl': 'Đánh giá năng lực',
      'tu_duy': 'Đánh giá tư duy',
      'tot_nghiep': 'Thi THPT Quốc gia',
      'hoc_ba': 'Xét học bạ',
    };
    return methodMap[method] || method;
  };

  const handleViewDetail = () => {
    history.push(`/user/applications/${application._id}`);
  };

  // Hiển thị điểm theo phương thức
  const renderResultFields = () => {
    const resultData = application.resultData || {};
    
    if (resultData.method === 'hoc_ba') {
      return (
        <Row gutter={[16, 8]}>
          <Col xs={24} md={8}>
            <div className={styles.infoItem}>
              <Text type="secondary">Điểm TB lớp 10</Text>
              <Text strong>{resultData.gpaGrade10}</Text>
            </div>
          </Col>
          <Col xs={24} md={8}>
            <div className={styles.infoItem}>
              <Text type="secondary">Điểm TB lớp 11</Text>
              <Text strong>{resultData.gpaGrade11}</Text>
            </div>
          </Col>
          <Col xs={24} md={8}>
            <div className={styles.infoItem}>
              <Text type="secondary">Điểm TB lớp 12</Text>
              <Text strong>{resultData.gpaGrade12}</Text>
            </div>
          </Col>
        </Row>
      );
    } else if (resultData.method === 'tot_nghiep' && resultData.subjectScores) {
      return (
        <Row gutter={[16, 8]}>
          {Object.entries(resultData.subjectScores).map(([subject, score]) => (
            <Col xs={24} md={8} key={subject}>
              <div className={styles.infoItem}>
                <Text type="secondary">Điểm {subject}</Text>
                <Text strong>{score}</Text>
              </div>
            </Col>
          ))}
        </Row>
      );
    } else if (resultData.method === 'dgnl' || resultData.method === 'tu_duy') {
      return (
        <Row gutter={[16, 8]}>
          <Col xs={24} md={8}>
            <div className={styles.infoItem}>
              <Text type="secondary">Tổng điểm</Text>
              <Text strong>{resultData.totalScore}</Text>
            </div>
          </Col>
        </Row>
      );
    }
    return null;
  };

  return (
    <Card className={styles.applicationCard}>
      <div className={styles.cardHeader}>
        <div className={styles.cardTitle}>
          <Tooltip title={application.universityMajorId.name}>
            <Title level={4} ellipsis={{ rows: 2 }}>{application.universityMajorId.name}</Title>
          </Tooltip>
          <Text type="secondary">Mã ngành: {application.universityMajorId.code}</Text>
        </div>
        <div className={styles.cardStatus}>
          {getStatusBadge(application.status)}
        </div>
      </div>
      
      <div className={styles.cardContent}>
        <Row gutter={[16, 8]}>
          <Col xs={24} md={12}>
            <div className={styles.infoItem}>
              <Text type="secondary">Phương thức xét tuyển</Text>
              <Text strong>{getAdmissionMethodText(application.admissionMethod)}</Text>
            </div>
          </Col>
          {application.admissionMethod === 'tot_nghiep' && (
            <Col xs={24} md={12}>
              <div className={styles.infoItem}>
                <Text type="secondary">Tổ hợp xét tuyển</Text>
                <Text strong>
                  {application.subjectCombinationId.code} ({application.subjectCombinationId.subjects.join(', ')})
                </Text>
              </div>
            </Col>
          )}
        </Row>

        {renderResultFields()}
        
        <Row gutter={[16, 8]}>
          <Col xs={24} md={12}>
            <div className={styles.infoItem}>
              <Text type="secondary">
                <ClockCircleOutlined style={{ marginRight: 8 }} />
                Ngày nộp
              </Text>
              <Text>{moment(application.created_at).format('DD/MM/YYYY')}</Text>
            </div>
          </Col>
          <Col xs={24} md={12}>
            <div className={styles.infoItem}>
              <Text type="secondary">
                <CalendarOutlined style={{ marginRight: 8 }} />
                Ngày cập nhật
              </Text>
              <Text>{moment(application.updated_at).format('DD/MM/YYYY')}</Text>
            </div>
          </Col>
        </Row>
        
        <div className={styles.cardActions}>
          <Button 
            type="primary" 
            ghost 
            icon={<EyeOutlined />}
            onClick={handleViewDetail}
          >
            Xem chi tiết
          </Button>
        </div>
      </div>
    </Card>
  );
};

export default ApplicationCard; 