import React from 'react';

const testimonials = [
  {
    name: 'Nguyễn Văn Anh',
    avatar: 'A',
    university: 'Đại học Bách Khoa Hà Nội',
    quote: 'University giúp tôi dễ dàng đăng ký xét tuyển vào Đại học Bách Khoa Hà Nội. Giao diện thân thiện và dễ sử dụng.',
  },
  {
    name: 'Trần Thị Linh',
    avatar: 'L',
    university: 'Đại học Quốc gia Hà Nội',
    quote: 'Tôi đã tiết kiệm rất nhiều thời gian và công sức nhờ University. Hệ thống thông báo kết quả nhanh chóng và chính xác.',
  },
  {
    name: 'Lê Văn Chung',
    avatar: 'C',
    university: 'Đại học Kinh tế Quốc dân',
    quote: 'Tính năng so sánh ngành học giữa các trường đại học giúp tôi đưa ra quyết định đúng đắn cho tương lai của mình.',
  },
  {
    name: 'Phạm Thị Dung',
    avatar: 'D',
    university: 'Đại học Y Hà Nội',
    quote: 'Đội ngũ hỗ trợ của University rất nhiệt tình và chuyên nghiệp. Họ đã giải đáp mọi thắc mắc của tôi trong quá trình xét tuyển.',
  },
  {
    name: 'Hoàng Văn Minh',
    avatar: 'M',
    university: 'Đại học Ngoại thương',
    quote: 'University là công cụ tuyệt vời cho việc quản lý hồ sơ xét tuyển. Tôi có thể theo dõi trạng thái hồ sơ mọi lúc, mọi nơi.',
  },
  {
    name: 'Vũ Thị Trang',
    avatar: 'T',
    university: 'Đại học Sư phạm Hà Nội',
    quote: 'Nhờ University, tôi đã trúng tuyển vào ngành học mơ ước. Cảm ơn UniAdmit đã đồng hành cùng tôi trong hành trình này.',
  },
];

const TestimonialsSection: React.FC = () => {
  return (
    <section style={{ background: 'linear-gradient(to bottom, #fff, #f0f6ff)', padding: '40px 0' }}>
      <div style={{ maxWidth: 1200, margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: 48 }}>
          <h2 style={{ fontSize: 36, fontWeight: 700 }}>Đánh giá từ người dùng</h2>
          <p style={{ marginTop: 16, color: '#666', fontSize: 18, maxWidth: 700, marginLeft: 'auto', marginRight: 'auto' }}>
            Hàng nghìn thí sinh đã thành công trong kỳ tuyển sinh đại học với Universersity
          </p>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 32 }}>
          {testimonials.map((t, idx) => (
            <div key={idx} style={{ background: '#f8d5dc', borderRadius: 16, boxShadow: '0 4px 24px rgba(0,0,0,0.06)', padding: 32, textAlign: 'left', display: 'flex', flexDirection: 'column', gap: 16 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
                <div style={{ width: 48, height: 48, borderRadius: '50%', background: '#f3f4f6', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 700, fontSize: 22, color: '#888' }}>
                  {t.avatar}
                </div>
                <div>
                  <div style={{ fontWeight: 700 }}>{t.name}</div>
                  <div style={{ color: '#666', fontSize: 15 }}>{t.university}</div>
                </div>
              </div>
              <div style={{ color: '#666', fontSize: 16, marginTop: 8 }}>
                "{t.quote}"
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection; 