import React from 'react';
import { history } from 'umi';
import styles from '../LandingPage.less';
import anh1 from '../../../assets/anh1.png';

const HeroSection: React.FC = () => {
  const handleRegister = () => {
    history.push('/user/register');
  };

  const handleLearnMore = () => {
    history.push('/about');
  };

  return (
    <section className={styles.heroSection} style={{ background: 'rgb(248 213 220)' }}>
      <div style={{ maxWidth: 1200, margin: '0 auto', display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: 32 }}>
        <div style={{ flex: 1, minWidth: 300 }} className={styles.heroText}>
          <div style={{ display: 'inline-block', background: '#94221e', color: '#fff', borderRadius: 999, padding: '6px 18px', fontSize: 16, fontWeight: 500, marginBottom: 16 }}>
            Tuyển sinh đại học 2025
          </div>
          <h1 className={styles.title} style={{ margin: '16px 0' }}>
            Nền tảng tuyển sinh đại học <span style={{ color: '#94221e', fontWeight: 'bold' }}>thông minh</span> và hiệu quả
          </h1>
          <p style={{ color: '#94221e', fontSize: 18, maxWidth: 600, margin: '16px 0' }}>
            University giúp bạn dễ dàng đăng ký xét tuyển đại học, theo dõi trạng thái hồ sơ và nhận thông báo kết quả nhanh chóng.
          </p>
          <div style={{ display: 'flex', gap: 16, flexWrap: 'wrap', margin: '24px 0' }}>
            <button style={{ background: '#94221e', color: '#fff', border: 'none', borderRadius: 8, padding: '12px 32px', fontSize: 18, fontWeight: 600, cursor: 'pointer' }} onClick={handleRegister}>
              Bắt đầu ngay
            </button>
            <button style={{ background: '#fff', color: '#94221e', border: '2px solid ', borderRadius: 8, padding: '12px 32px', fontSize: 18, fontWeight: 600, cursor: 'pointer' }} onClick={handleLearnMore}>
              Tìm hiểu thêm
            </button>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 16, fontSize: 15 }}>
            <div style={{ display: 'flex', gap: 0 }}>
              {[1,2,3,4].map(i => (
                <div key={i} style={{ width: 32, height: 32, borderRadius: '50%', overflow: 'hidden', border: '2px solid #fff', background: '#f3f4f6', marginLeft: i!==1 ? -8 : 0 }}>
                  <img src={`https://placehold.co/32x32?text=${i}`} alt={`User ${i}`} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                </div>
              ))}
            </div>
            <div style={{ color: '#666' }}>
              <span style={{ fontWeight: 700, color: '#222' }}>10,000+</span> thí sinh đã đăng ký
            </div>
          </div>
        </div>
        <div style={{ flex: 1, minWidth: 300, display: 'flex', justifyContent: 'center', position: 'relative', marginTop: 32 }}>
          <div style={{ width: '100%', maxWidth: 400, aspectRatio: '4/3', borderRadius: 16, overflow: 'hidden', background: 'linear-gradient(135deg,#e0edff,#e0e7ff)', boxShadow: '0 8px 32px rgba(0,0,0,0.08)' }}>
            <img src={anh1} alt="University students" style={{ width: '100%', height: '100%', objectFit: 'contain' }} />
          </div>
          <div style={{ position: 'absolute', left: -24, bottom: -24, background: '#fff', borderRadius: 12, boxShadow: '0 4px 24px rgba(0,0,0,0.10)', padding: 16, minWidth: 220, display: 'flex', alignItems: 'center', gap: 16 }}>
            <div style={{ width: 48, height: 48, borderRadius: '50%', background: '#94221e', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              {/* Icon sẽ thêm sau */}
            </div>
            <div>
              <div style={{ color: '#888', fontSize: 14 }}>Tỷ lệ trúng tuyển</div>
              <div style={{ fontWeight: 700, fontSize: 24 }}>97.5%</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection; 