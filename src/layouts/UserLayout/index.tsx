import React from 'react';
import { Link, useLocation } from 'umi';
import {
  Layout,
  Menu,
  Button,
  Space,
  Typography,
} from 'antd';
import {
  BellOutlined,
  HomeOutlined,
  LogoutOutlined,
  SettingOutlined,
  UserOutlined,
  FileTextOutlined,
  SearchOutlined,
} from '@ant-design/icons';
import styles from './index.less';
import { handleLogout } from '@/models/User/auth';

const { Header, Sider, Content, Footer } = Layout;
const { Text } = Typography;

interface UserLayoutProps {
  children: React.ReactNode;
}

const UserLayout: React.FC<UserLayoutProps> = ({ children }) => {
  const location = useLocation();

  // Xác định menu item được chọn dựa trên pathname
  const getSelectedKey = () => {
    const pathname = location.pathname;
    if (pathname.includes('/applications/search')) return 'searchApplicationsPage'
    if (pathname.includes('/profile')) return 'profile';
    if (pathname.includes('/applications')) return 'applications';
    if (pathname.includes('/settings')) return 'settings';
    return 'dashboard';
  };

  const handleLogoutClick = async () => {
    await handleLogout();
    window.location.href = '/user/login';
  };

  return (
    <Layout className={styles.userLayout}>
      <Header className={styles.userHeader}>
        <div className={styles.headerContainer}>
          <Link to="/" className={styles.logo}>
            <span className={styles.logoPrimary}>UniAdmit</span>
            <span className={styles.logoSecondary}>| Hệ thống Tuyển sinh Đại học Trực tuyến</span>
          </Link>
          <Space size="middle">
            <Button type="text" shape="circle" icon={<BellOutlined />} aria-label="Thông báo" />
            <Button type="text" shape="circle" icon={<UserOutlined />} aria-label="Tài khoản" />
            <Button 
              type="text" 
              shape="circle" 
              icon={<LogoutOutlined />} 
              aria-label="Đăng xuất"
              onClick={handleLogoutClick}
            />
          </Space>
        </div>
      </Header>
      
      <Layout className={styles.userBodyLayout}>
        <Sider
          className={styles.userSider}
          width={256}
          breakpoint="lg"
          collapsedWidth="0"
          trigger={null}
        >
          <Menu
            mode="inline"
            selectedKeys={[getSelectedKey()]}
            className={styles.siderMenu}
          >
            <Menu.Item key="dashboard" icon={<HomeOutlined />}>
              <Link to="/user/dashboard">Trang chủ</Link>
            </Menu.Item>
            <Menu.Item key="profile" icon={<UserOutlined />}>
              <Link to="/user/profile">Hồ sơ cá nhân</Link>
            </Menu.Item>
            <Menu.Item key="applications" icon={<FileTextOutlined />}>
              <Link to="/user/applications">Hồ sơ xét tuyển</Link>
            </Menu.Item>
            <Menu.Item key="searchApplicationsPage" icon={<SearchOutlined />}>
              <Link to="/user/applications/search">Tìm hiếm hồ sơ</Link>
            </Menu.Item>
          </Menu>
        </Sider>
        
        <Content className={styles.userMainContent}>
          {children}
        </Content>
      </Layout>
      
      <Footer className={styles.userFooter}>
        <div className={styles.footerContainer}>
          <Text type="secondary">
            © {new Date().getFullYear()} UniAdmit. Hệ thống Tuyển sinh Đại học Trực tuyến.
          </Text>
        </div>
      </Footer>
    </Layout>
  );
};

export default UserLayout; 