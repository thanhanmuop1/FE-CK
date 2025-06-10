import React from 'react';
import { Button, Typography } from 'antd';
import { SaveOutlined } from '@ant-design/icons';
import styles from './index.less';

const { Title } = Typography;

interface ProfileHeaderProps {
  onSave: () => void;
  loading?: boolean;
}

const ProfileHeader: React.FC<ProfileHeaderProps> = ({ onSave, loading = false }) => {
  return (
    <div className={styles.contentHeader}>
      <Title level={2}>Hồ sơ cá nhân</Title>
      <Button 
        type="primary" 
        icon={<SaveOutlined />} 
        onClick={onSave} 
        loading={loading}
        className={styles.saveButtonDesktop}
      >
        Lưu thông tin
      </Button>
    </div>
  );
};

export default ProfileHeader; 