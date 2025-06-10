import React from 'react';

const universities = [
  'HUST', 'USSH', 'NEU', 'FTU', 'PTIT', 'UMP'
];

const TrustedBySection: React.FC = () => {
  return (
    <section style={{ background: '#f9fafb', padding: '40px 0' }}>
      <div style={{ maxWidth: 1200, margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: 32 }}>
          <h2 style={{ 
            fontSize: 24, 
            fontWeight: 700, 
            color: '#252525',
            marginBottom: '16px'
          }}>
            Được tin dùng bởi các trường đại học hàng đầu
          </h2>
        </div>
        <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: 32, opacity: 0.7 }}>
          {universities.map((uni, idx) => (
            <div key={idx} style={{ 
              height: 48, 
              width: 128, 
              background: '#fff', 
              borderRadius: 8, 
              display: 'flex', 
              alignItems: 'center', 
              justifyContent: 'center', 
              fontWeight: 700, 
              fontSize: 22, 
              color: '#94221e', 
              boxShadow: '0 2px 8px rgba(0,0,0,0.03)',
              border: '1.5px solid #94221e',
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
              {uni}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TrustedBySection; 