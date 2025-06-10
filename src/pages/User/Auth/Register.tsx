import React, { useState } from 'react';
import { useHistory } from 'umi';
import { handleRegister } from '@/models/User/auth';
import './Register.less';

const Register: React.FC = () => {
  const history = useHistory();
  const [form, setForm] = useState({
    email: '',
    password: '',
    name: '',
    phone: '',
  });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    const result = await handleRegister(form);
    if (result.error) setError(result.error);
    if (result.success) {
      setSuccess(result.success);
      setTimeout(() => history.push('/User/Login'), 1200);
    }
  };

  return (
    <div className="register-container">
      <div className="register-form">
        <h2 className="title">Đăng ký tài khoản</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Email</label>
            <input type="email" name="email" value={form.email} onChange={handleChange} required />
          </div>
          <div className="form-group">
            <label>Mật khẩu</label>
            <input type="password" name="password" value={form.password} onChange={handleChange} required />
          </div>
          <div className="form-group">
            <label>Họ tên</label>
            <input type="text" name="name" value={form.name} onChange={handleChange} required />
          </div>
          <div className="form-group">
            <label>Số điện thoại</label>
            <input type="tel" name="phone" value={form.phone} onChange={handleChange} required />
          </div>
          {error && <div className="error-message">{error}</div>}
          {success && <div className="success-message">{success}</div>}
          <button type="submit" className="submit-button">Đăng ký</button>
        </form>
        <div className="login-link">
          Đã có tài khoản? <a href="/User/Login">Đăng nhập</a>
        </div>
      </div>
    </div>
  );
};

export default Register; 