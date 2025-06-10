import React from 'react';
import { history } from 'umi';


const CTASection: React.FC = () => {
  const handleRegister = () => {
    history.push('/user/register');
  };

  const handleLogin = () => {
    history.push('/user/login');
  };

  return (
    <section style={{ padding: '40px 0' }}>
      <div style={{ maxWidth: 900, margin: '0 auto' }}>
        <div style={{ borderRadius: 24, background: '#94221e', padding: '48px 24px', textAlign: 'center', color: '#fff' }}>
          <h2 style={{ fontSize: 36, fontWeight: 700, color:"#fff", }}>Sẵn sàng cho kỳ tuyển sinh đại học?</h2>
          <p style={{ marginTop: 16, fontSize: 18, maxWidth: 700, marginLeft: 'auto', marginRight: 'auto', }}>
            Đăng ký ngay hôm nay để bắt đầu hành trình xét tuyển đại học của bạn với University
          </p>
          <div style={{ marginTop: 32, display: 'flex', flexWrap: 'wrap', gap: 16, justifyContent: 'center' }}>
            <button 
              onClick={handleRegister}
              style={{ 
                background: '#fff', 
                color: '#252021', 
                border: '2px solid #252021', 
                borderRadius: 8, 
                padding: '14px 40px', 
                fontSize: 18, 
                fontWeight: 700, 
                cursor: 'pointer',
                transition: 'all 0.3s ease'
              }}
              onMouseOver={(e) => {
                e.currentTarget.style.transform = 'scale(1.05)';
                e.currentTarget.style.boxShadow = '0 4px 8px rgba(0,0,0,0.2)';
              }}
              onMouseOut={(e) => {
                e.currentTarget.style.transform = 'scale(1)';
                e.currentTarget.style.boxShadow = 'none';
              }}
            >
              Đăng ký ngay
            </button>
            <button 
              onClick={handleLogin}
              style={{ 
                background: '#fff', 
                color: '#252021', 
                border: '2px solid #252021', 
                borderRadius: 8, 
                padding: '14px 40px', 
                fontSize: 18, 
                fontWeight: 700, 
                cursor: 'pointer',
                transition: 'all 0.3s ease'
              }}
              onMouseOver={(e) => {
                e.currentTarget.style.transform = 'scale(1.05)';
                e.currentTarget.style.boxShadow = '0 4px 8px rgba(0,0,0,0.2)';
              }}
              onMouseOut={(e) => {
                e.currentTarget.style.transform = 'scale(1)';
                e.currentTarget.style.boxShadow = 'none';
              }}
            >
              Đăng nhập
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CTASection; 