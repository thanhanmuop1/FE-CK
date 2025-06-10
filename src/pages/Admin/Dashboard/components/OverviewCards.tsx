import React from 'react';
import { Card, Row, Col } from 'antd';
import { HomeOutlined, LaptopOutlined, AimOutlined } from '@ant-design/icons';

interface Props {
  universityCount: number;
  majorCount: number;
  subjectCombinationCount: number;
}

const iconStyle = (bg: string) => ({
  background: bg,
  borderRadius: '50%',
  padding: 12,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  fontSize: 28,
  color: '#fff',
  position: 'absolute' as const,
  top: 16,
  right: 16,
  boxShadow: '0 2px 8px rgba(0,0,0,0.08)',
  opacity: 0.15,
});

const OverviewCards: React.FC<Props> = ({ universityCount, majorCount, subjectCombinationCount }) => (
  <Row gutter={16} style={{ marginBottom: 24 }}>
    <Col span={8}>
      <Card style={{ position: 'relative' }}>
        <div style={{ fontSize: 24, fontWeight: 600 }}>Tổng số trường</div>
        <div style={{ fontSize: 24, fontWeight: 600, color: '#222' }}>{universityCount}</div>
        <div style={{ color: '#888' }}>trường đại học</div>
        <HomeOutlined style={iconStyle('#1890ff')} />
      </Card>
    </Col>
    <Col span={8}>
      <Card style={{ position: 'relative' }}>
        <div style={{ fontSize: 24, fontWeight: 600 }}>Ngành học</div>
        <div style={{ fontSize: 24, fontWeight: 600, color: '#222' }}>{majorCount}</div>
        <div style={{ color: '#888' }}>ngành đào tạo</div>
        <LaptopOutlined style={iconStyle('#52c41a')} />
      </Card>
    </Col>
    <Col span={8}>
      <Card style={{ position: 'relative' }}>
        <div style={{ fontSize: 24, fontWeight: 600 }}>Tổ hợp môn</div>
        <div style={{ fontSize: 24, fontWeight: 600, color: '#222' }}>{subjectCombinationCount}</div>
        <div style={{ color: '#888' }}>tổ hợp xét tuyển</div>
        <AimOutlined style={iconStyle('#faad14')} />
      </Card>
    </Col>
  </Row>
);

export default OverviewCards;
