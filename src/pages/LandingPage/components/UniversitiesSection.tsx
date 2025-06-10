import React from 'react';
import styles from '../LandingPage.less';
import hust from '../../../assets/hust.png';
import ussh from '../../../assets/ussh.png';
import neu from '../../../assets/neu.png';
import ftu from '../../../assets/ftu.png';
import ptit from '../../../assets/ptit.png';
import Y from '../../../assets/Y.png';
const universities = [
  {
    name: 'Đại học Bách Khoa Hà Nội',
    programs: 25,
    students: '5,000+',
    logo: hust,
  },
  {
    name: 'Đại học KHXH và Nhân Văn ',
    programs: 30,
    students: '6,500+',
    logo: ussh,
  
  },
  {
    name: 'Đại học Kinh tế Quốc Dân',
    programs: 20,
    students: '4,500+',
    logo: neu,
  
  },
  {
    name: 'Đại học Ngooại Thương',
    programs: 22,
    students: '4,000+',
    logo: ftu,
  },
  {
    name: 'Học viện Công nghệ Bưu Chính Viễn Thông',
    programs: 22,
    students: '4,000+',
    logo: ptit,
  },
  {
    name: 'Đại học Y-Dược',
    programs: 10,
    students: '2,000+',
    logo: Y,
  },
];

const UniversitiesSection: React.FC = () => {
  return (
    <section className={styles.featuresSection}>
      <div style={{ maxWidth: 1200, margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: 48 }}>
          <h2 style={{ fontSize: 36, fontWeight: 700 }}>Các trường đại học liên kết</h2>
          <p style={{ marginTop: 16, color: '#666', fontSize: 18, maxWidth: 700, marginLeft: 'auto', marginRight: 'auto' }}>
            University hợp tác với các trường đại học hàng đầu trên cả nước
          </p>
        </div>
        <div style={{ 
          display: 'grid', 
          gridTemplateColumns: 'repeat(3, 1fr)',
          gap: 32,
          maxWidth: '1200px',
          margin: '0 auto'
        }}>
          {universities.slice(0, 6).map((university, idx) => (
            <div key={idx} 
              style={{ 
                background: '#fff', 
                borderRadius: 16, 
                boxShadow: '0 4px 24px rgba(0,0,0,0.06)', 
                padding: 32,
                textAlign: 'center', 
                transition: 'all 0.3s',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                cursor: 'pointer',
                overflow: 'hidden',
              }}
              onMouseEnter={e => {
                const target = e.currentTarget;
                target.style.transform = 'translateY(-8px) scale(1.04)';
                target.style.boxShadow = '0 12px 36px 0 rgba(148,34,30,0.18)';
                target.style.background = 'rgba(248,213,220,0.25)';
              }}
              onMouseLeave={e => {
                const target = e.currentTarget;
                target.style.transform = 'translateY(0) scale(1)';
                target.style.boxShadow = '0 4px 24px rgba(0,0,0,0.06)';
                target.style.background = '#fff';
              }}
            >
              <div style={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                width: '100%',
                marginBottom: '12px'
              }}>
                <img 
                  src={university.logo} 
                  alt={university.name}
                  style={{ 
                    width: '80px', 
                    height: '80px', 
                    objectFit: 'contain'
                  }}
                />
              </div>
              <h3 style={{ 
                fontSize: 20, 
                fontWeight: 700, 
                margin: '8px 0 4px',
                minHeight: '40px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                lineHeight: '1.3'
              }}>{university.name}</h3>
              <div style={{ marginTop: 4, display: 'flex', justifyContent: 'space-between', color: '#666', fontSize: 15, width: '100%' }}>
                <span>{university.programs} ngành học</span>
                <span>{university.students} sinh viên</span>
              </div>
              <div style={{ marginTop: 12, width: '100%' }}>
                <button style={{ 
                  border: '1.5px solid #94221e', 
                  color: '#94221e', 
                  background: '#fff', 
                  borderRadius: 8, 
                  padding: '8px 0', 
                  width: '100%', 
                  fontWeight: 600, 
                  fontSize: 15, 
                  cursor: 'pointer',
                  transition: 'all 0.3s ease'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = '#94221e';
                  e.currentTarget.style.color = '#fff';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = '#fff';
                  e.currentTarget.style.color = '#94221e';
                }}>
                  Xem chi tiết
                </button>
              </div>
            </div>
          ))}
        </div>
        <div style={{ marginTop: 40, textAlign: 'center' }}>
          <button style={{ 
            border: '1.5px solid #94221e', 
            color: '#94221e', 
            background: '#fff', 
            borderRadius: 8, 
            padding: '14px 40px', 
            fontWeight: 600, 
            fontSize: 18, 
            cursor: 'pointer',
            transition: 'all 0.3s ease'
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.background = '#94221e';
            e.currentTarget.style.color = '#fff';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.background = '#fff';
            e.currentTarget.style.color = '#94221e';
          }}>
            Xem tất cả trường đại học
          </button>
        </div>
      </div>
    </section>
  );
};

export default UniversitiesSection; 