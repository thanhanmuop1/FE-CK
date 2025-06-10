import React from 'react';
import { Typography, Steps } from 'antd';
import styles from '../LandingPage.less';

const { Title } = Typography;

const steps = [
  {
    title: 'Tạo tài khoản',
    desc: 'Đăng ký tài khoản thí sinh để bắt đầu xét tuyển.',
  },
  {
    title: 'Nộp hồ sơ',
    desc: 'Điền thông tin, tải lên giấy tờ và chọn phương thức xét tuyển.',
  },
  {
    title: 'Nhận kết quả',
    desc: 'Theo dõi tiến trình và nhận kết quả qua hệ thống.',
  },
];

const StepsSection: React.FC = () => (
  <section className={styles.stepsSection}>
    <Title level={2} className={styles.sectionTitle}>Quy trình đăng ký</Title>
    <Steps
      direction="horizontal"
      current={-1}
      className={styles.steps}
      responsive
    >
      {steps.map((s) => (
        <Steps.Step key={s.title} title={s.title} description={s.desc} />
      ))}
    </Steps>
  </section>
);

export default StepsSection; 