import React from 'react';
import styles from '../LandingPage.less';
import { useHistory } from 'umi';

const steps = [
  {
    step: '01',
    title: 'Đăng ký tài khoản',
    description: 'Tạo tài khoản cá nhân trên hệ thống University để bắt đầu quá trình xét tuyển',
  },
  {
    step: '02',
    title: 'Cập nhật thông tin cá nhân',
    description: 'Nhập đầy đủ thông tin cá nhân, học tập và tải lên các giấy tờ cần thiết',
  },
  {
    step: '03',
    title: 'Chọn trường và ngành',
    description: 'Lựa chọn trường đại học, ngành học và phương thức xét tuyển phù hợp',
  },
  {
    step: '04',
    title: 'Nộp hồ sơ xét tuyển',
    description: 'Hoàn thiện và nộp hồ sơ xét tuyển trực tuyến, thanh toán lệ phí xét tuyển',
  },
  {
    step: '05',
    title: 'Theo dõi kết quả',
    description: 'Theo dõi trạng thái hồ sơ và nhận thông báo kết quả xét tuyển',
  },
];

const ProcessSection: React.FC = () => {
  const history = useHistory();
  const handleRegisterClick = () => {
    history.push('/User/Register');
  };
  return (
    <section className={styles.stepsSection}>
      <div style={{ maxWidth: 1200, margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: 48 }}>
          <h2 style={{ fontSize: 36, fontWeight: 700 }}>Quy trình xét tuyển</h2>
          <p style={{ marginTop: 16, color: '#666', fontSize: 18, maxWidth: 700, marginLeft: 'auto', marginRight: 'auto' }}>
            Chỉ với vài bước đơn giản, bạn có thể hoàn thành hồ sơ xét tuyển đại học
          </p>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 48 }}>
          {steps.map((step, idx) => (
            <div key={idx} style={{ 
              display: 'flex', 
              flexWrap: 'wrap', 
              alignItems: 'center', 
              gap: 32, 
              flexDirection: idx % 2 === 1 ? 'row-reverse' : 'row',
              background: '#f8d5dc',
              padding: '32px',
              borderRadius: '16px',
              color: '#94221e',
              transition: 'all 0.3s ease',
              cursor: 'pointer'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'translateY(-5px)';
              e.currentTarget.style.boxShadow = '0 8px 24px rgba(248, 213, 220, 0.3)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'translateY(0)';
              e.currentTarget.style.boxShadow = 'none';
            }}>
              <div style={{ flex: 1, minWidth: 280 }}>
                <div style={{ 
                  display: 'inline-block', 
                  background: '#94221e', 
                  color: '#fff', 
                  borderRadius: 999, 
                  padding: '6px 18px', 
                  fontSize: 16, 
                  fontWeight: 500, 
                  marginBottom: 16 
                }}>
                  Bước {step.step}
                </div>
                <h3 style={{ fontSize: 26, fontWeight: 700, color: '#94221e' }}>{step.title}</h3>
                <p style={{ color: '#94221e', fontSize: 17, marginTop: 12, opacity: 0.9 }}>{step.description}</p>
                {idx === 0 && (
                  <div style={{ marginTop: 24 }}>
                    <button style={{ 
                      background: '#94221e', 
                      color: '#fff', 
                      border: 'none', 
                      borderRadius: 8, 
                      padding: '12px 32px', 
                      fontSize: 18, 
                      fontWeight: 600, 
                      cursor: 'pointer',
                      transition: 'all 0.3s ease'
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.background = '#7a1b17';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.background = '#94221e';
                    }}>
                      Đăng ký ngay
                    </button>
                  </div>
                )}
              </div>
              
              <div style={{ 
                width: 320, 
                aspectRatio: '4/3', 
                background: '#fff', 
                borderRadius: 16, 
                overflow: 'hidden', 
                display: 'flex', 
                alignItems: 'center', 
                justifyContent: 'center' 
              }}>
                <span style={{ color: '#94221e', fontSize: 24 }}>Hình minh họa</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProcessSection; 