import React from 'react';
import { Layout, Menu } from 'antd';
import type { MenuProps } from 'antd';
import { Link, useLocation, useModel } from 'umi';
import {
  DashboardOutlined,
  UserOutlined,
  FileTextOutlined,
  SettingOutlined,
  LogoutOutlined,
} from '@ant-design/icons';
import styles from './index.less';
import { logoutAdmin} from '@/services/Admin/Auth/Login'

const { Header, Sider, Content, Footer } = Layout;

const AdminLayout: React.FC = ({ children }) => {
  const location = useLocation();
  const { initialState, setInitialState } = useModel('@@initialState');

  const handleLogout = async () => {
    await setInitialState((s) => ({ ...s, currentUser: undefined }));
    await logoutAdmin();
    window.location.href = '/admin/login';
  };

  const menuItems: MenuProps['items'] = [
    {
      key: '/admin/dashboard',
      icon: <DashboardOutlined />,
      label: <Link to="/admin/dashboard">Dashboard</Link>,
    },
    {
      key: '/admin/statistics',
      icon: <FileTextOutlined />,
      label: <Link to="/admin/statistics">Thống kê</Link>,
    },
    {
        key: '/admin/university',
      icon: <FileTextOutlined />,
      label: <Link to="/admin/university">Quản lý trường đại học</Link>,
    },
    {
      key: '/admin/subject-combinations',
      icon: <FileTextOutlined />,
      label: <Link to="/admin/subject-combinations">Quản lý tổ hợp môn</Link>,
    },
    {
      type: 'divider',
    },
    {
      key: 'logout',
      icon: <LogoutOutlined />,
      label: 'Đăng xuất',
      onClick: handleLogout,
    },
  ];

  return (
    <Layout className={styles.adminLayout}>
      <Header className={styles.adminHeader}>
        <div className={styles.headerContainer}>
          <div className={styles.logo}>
            <h2>Admin Panel</h2>
          </div>
          <div className={styles.userInfo}>
            {initialState?.currentUser?.name}
          </div>
        </div>
      </Header>

      <Layout className={styles.adminBodyLayout}>
        <Sider
          className={styles.adminSider}
          width={250}
          breakpoint="lg"
          collapsedWidth="0"
          trigger={null}
        >
          <Menu
            mode="inline"
            selectedKeys={[location.pathname]}
            items={menuItems}
            className={styles.siderMenu}
          />
        </Sider>

        <Content className={styles.adminMainContent}>
          {children}
        </Content>
      </Layout>

      <Footer className={styles.adminFooter}>
        <div className={styles.footerContainer}>
          © {new Date().getFullYear()} UniAdmit Admin Panel
        </div>
      </Footer>
    </Layout>
  );
};

export default AdminLayout; 