import React from 'react';
import styles from '../LandingPage.less';
import { 
  FileTextOutlined, 
  ClockCircleOutlined, 
  SafetyCertificateOutlined,
  CheckCircleOutlined,
  UploadOutlined,
  BellOutlined 
} from '@ant-design/icons';

const features = [
  {
    title: 'Đa dạng phương thức xét tuyển',
    description: 'Hỗ trợ tất cả các phương thức xét tuyển: học bạ, điểm thi THPT, đánh giá năng lực,...',
    icon: <FileTextOutlined />
  },
  {
    title: 'Theo dõi trạng thái hồ sơ',
    description: 'Cập nhật trạng thái hồ sơ xét tuyển theo thời gian thực, giúp thí sinh nắm bắt tiến độ xét tuyển',
    icon: <ClockCircleOutlined />
  },
  {
    title: 'Quản lý hồ sơ thông minh',
    description: 'Lưu trữ và quản lý tất cả giấy tờ, thông tin cá nhân và học tập một cách an toàn và hiệu quả',
    icon: <SafetyCertificateOutlined />
  },
  {
    title: 'Xác thực thông tin',
    description: 'Hệ thống xác thực thông tin tự động, đảm bảo tính chính xác và tin cậy của hồ sơ xét tuyển',
    icon: <CheckCircleOutlined />
  },
  {
    title: 'Nộp hồ sơ trực tuyến',
    description: 'Nộp hồ sơ nhanh chóng, dễ dàng và hiệu quả',
    icon: <UploadOutlined />
  },
  {
    title: 'Thông báo kết quả',
    description: 'Nhận thông báo kết quả xét tuyển qua email và trên hệ thống ngay khi có kết quả',
    icon: <BellOutlined />
  },
];

const FeaturesSection: React.FC = () => {
  return (
    <section className={styles.featuresSection}>
      <div className={styles.featuresContainer}>
        <div className={styles.featuresHeader}>
          <span className={styles.featuresBadge}>Tính năng</span>
          <h2 className={styles.featuresTitle}>Tính năng nổi bật</h2>
          <p className={styles.featuresSubtitle}>
            University cung cấp đầy đủ các tính năng cần thiết cho quá trình xét tuyển đại học
          </p>
        </div>
        <div className={styles.featuresGrid}>
          {features.map((feature, idx) => (
            <div key={idx} className={styles.featureCard}>
              <div className={styles.featureIcon}>
                {feature.icon}
              </div>
              <h3 className={styles.featureTitle}>{feature.title}</h3>
              <p className={styles.featureDescription}>{feature.description}</p>
              <div className={styles.featureHoverEffect} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection; 