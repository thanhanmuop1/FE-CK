import React, { useState, useEffect } from 'react';
import { useHistory } from 'umi';
import { handleLogin } from '@/models/User/auth';
import { Divider } from 'antd';
import GoogleLoginButton from '@/components/Google/GoogleLoginButton';
import './Login.less';

const Login: React.FC = () => {
  const history = useHistory();
  const [form, setForm] = useState({
    email: '',
    password: '',
  });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  useEffect(() => {
    const token = localStorage.getItem('userToken');
    if (token) {
      history.replace('/User/Dashboard');
    }
  }, [history]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    console.log(form);
    const result = await handleLogin(form);
    if (result.error) setError(result.error);
    if (result.success) {
      setSuccess(result.success);
      setTimeout(() => history.push('/User/Dashboard'), 1200);
    }
  };

  return (
    <div className="login-container">
      <div className="login-form">
        <h2 className="title">Đăng nhập</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Email</label>
            <input type="email" name="email" value={form.email} onChange={handleChange} required />
          </div>
          <div className="form-group">
            <label>Mật khẩu</label>
            <input type="password" name="password" value={form.password} onChange={handleChange} required />
          </div>
          {error && <div className="error-message">{error}</div>}
          {success && <div className="success-message">{success}</div>}
          <button onClick={handleSubmit} className="submit-button">Đăng nhập</button>
        </form>
        <div className="register-link">
          Chưa có tài khoản? <a href="/User/Register">Đăng ký</a>
        </div>
        <Divider>HOẶC TIẾP TỤC VỚI</Divider>
        <GoogleLoginButton />
      </div>
    </div>
  );
};

export default Login; 