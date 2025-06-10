import React from 'react';
import { Typography, Row, Col, Card } from 'antd';
import styles from '../LandingPage.less';

const { Title, Paragraph } = Typography;

const AboutSection: React.FC = () => (
  <section className={styles.aboutSection}>
    <Row justify="center">
      <Col xs={24} md={16}>
        <Card bordered={false} className={styles.aboutCard}>
          <Title level={3}>Về hệ thống</Title>
          <Paragraph>
            Hệ thống quản lý Tuyển sinh Đại học Trực tuyến giúp số hóa toàn bộ quy trình xét tuyển, giảm thiểu thủ tục giấy tờ, tiết kiệm thời gian cho thí sinh và nhà trường. Dữ liệu được bảo mật, quy trình minh bạch, hỗ trợ tư vấn trực tuyến và cập nhật thông báo liên tục.
          </Paragraph>
        </Card>
      </Col>
    </Row>
  </section>
);

export default AboutSection; 