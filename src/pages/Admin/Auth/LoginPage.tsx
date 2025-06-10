  import React, { useState } from 'react';
  import { Form, Input, Button, message, Card } from 'antd';
  import { history } from 'umi';
  import { loginApi } from '@/services/Admin/Auth/Login';
  import { setAuthTokenAdmin } from '@/utils/localStorage';


  const LoginPage: React.FC = () => {
    const [loading, setLoading] = useState(false);
    const navigate = history;

    const onFinish = async (values: { phone: string; password: string }) => {
      setLoading(true);
      try {
        const res = await loginApi(values);
        console.log(res.data);
        setAuthTokenAdmin(res.data.data.access_token)
        message.success('Đăng nhập thành công!');
        history.push('/admin/dashboard');
      } catch (err: any) {
        message.error(err.message || 'Đăng nhập thất bại');
      } finally {
        setLoading(false);
      }
    };

    return (
      <div style={{ minHeight: '100vh', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
        <Card title="Đăng nhập Admin" style={{ width: 350 }}>
          <Form
            name="login"
            initialValues={{ phone: '', password: '' }}
            onFinish={onFinish}
            layout="vertical"
          >
            <Form.Item
              label="Số điện thoại"
              name="phone"
              rules={[{ required: true, message: 'Vui lòng nhập số điện thoại!' }]}
            >
              <Input placeholder="Nhập số điện thoại" />
            </Form.Item>

            <Form.Item
              label="Mật khẩu"
              name="password"
              rules={[{ required: true, message: 'Vui lòng nhập mật khẩu!' }]}
            >
              <Input.Password placeholder="Nhập mật khẩu" />
            </Form.Item>

            <Form.Item>
              <Button type="primary" htmlType="submit" block loading={loading}>
                Đăng nhập
              </Button>
            </Form.Item>
          </Form>
        </Card>
      </div>
    );
  };

  export default LoginPage; 