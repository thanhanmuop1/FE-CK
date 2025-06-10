import React from 'react';

const quickLinks = [
	{ label: 'Tính năng', href: '#features' },
	{ label: 'Quy trình', href: '#process' },
	{ label: 'Trường đại học', href: '#universities' },
	{ label: 'Đánh giá', href: '#testimonials' },
	{ label: 'Hỏi đáp', href: '#faq' },
];

const Footer: React.FC = () => {
	return (
		<footer style={{ background: '#f9fafb', padding: '48px 0 0 0', marginTop: 64 }}>
			<div style={{ maxWidth: 1200, margin: '0 auto', padding: '0 16px' }}>
				<div style={{ display: 'flex', flexWrap: 'wrap', gap: 32, justifyContent: 'space-between', marginBottom: 32 }}>
					<div style={{ flex: 1, minWidth: 220 }}>
						<div style={{ fontSize: 28, fontWeight: 700, color: '#2563eb', marginBottom: 8 }}>UniAdmit</div>
						<div style={{ color: '#666', fontSize: 16, marginBottom: 16 }}>Hệ thống tuyển sinh đại học trực tuyến hàng đầu Việt Nam</div>
						<div style={{ display: 'flex', gap: 16, marginTop: 16 }}>
							<a href="#" style={{ color: '#666' }}>Facebook</a>
							<a href="#" style={{ color: '#666' }}>Instagram</a>
							<a href="#" style={{ color: '#666' }}>Twitter</a>
							<a href="#" style={{ color: '#666' }}>LinkedIn</a>
						</div>
					</div>
					<div style={{ flex: 1, minWidth: 180 }}>
						<div style={{ fontWeight: 700, fontSize: 17, marginBottom: 12 }}>Liên kết nhanh</div>
						<ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
							{quickLinks.map((link) => (
								<li key={link.href} style={{ marginBottom: 8 }}>
									<a href={link.href} style={{ color: '#666', textDecoration: 'none' }}>{link.label}</a>
								</li>
							))}
						</ul>
					</div>
					<div style={{ flex: 1, minWidth: 180 }}>
						<div style={{ fontWeight: 700, fontSize: 17, marginBottom: 12 }}>Liên hệ</div>
						<ul style={{ listStyle: 'none', padding: 0, margin: 0, color: '#666', fontSize: 15 }}>
							<li style={{ marginBottom: 8 }}>0123 456 789</li>
							<li style={{ marginBottom: 8 }}>info@uniadmit.vn</li>
							<li>123 Đường ABC, Quận XYZ, Hà Nội</li>
						</ul>
					</div>
				</div>
				<div style={{ borderTop: '1px solid #e5e7eb', padding: '24px 0', textAlign: 'center', color: '#888', fontSize: 15 }}>
					© 2025 UniAdmit. Hệ thống Tuyển sinh Đại học Trực tuyến.
				</div>
			</div>
		</footer>
	);
};

export default Footer;
