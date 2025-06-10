import React from 'react';
import { Modal, Descriptions } from 'antd';
import { University } from '@/models/Admin/University';

interface UniversityDetailModalProps {
  visible: boolean;
  onCancel: () => void;
  university: University | null;
}

const UniversityDetailModal: React.FC<UniversityDetailModalProps> = ({ visible, onCancel, university }) => {
  return (
    <Modal
      visible={visible}
      title="Chi tiết trường đại học"
      onCancel={onCancel}
      footer={null}
      destroyOnClose
    >
      {university && (
        <Descriptions bordered column={1} size="middle">
          <Descriptions.Item label="Tên trường">{university.name}</Descriptions.Item>
          <Descriptions.Item label="Mã trường">{university.code}</Descriptions.Item>
          <Descriptions.Item label="Địa chỉ">{university.address}</Descriptions.Item>
          <Descriptions.Item label="Ngày tạo">{new Date(university.created_at).toLocaleString()}</Descriptions.Item>
          <Descriptions.Item label="Ngày cập nhật">{new Date(university.updated_at).toLocaleString()}</Descriptions.Item>
        </Descriptions>
      )}
    </Modal>
  );
};

export default UniversityDetailModal; 