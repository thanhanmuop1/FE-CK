import React from 'react';
import { Table, Button, Space } from 'antd';
import { EyeOutlined, EditOutlined, DeleteOutlined } from '@ant-design/icons';
import { University } from '@/models/Admin/University';

interface UniversityTableProps {
  loading: boolean;
  data: University[];
  onEdit: (university: University) => void;
  onDelete: (id: string) => void;
  onViewDetail: (id: string) => void;
}

const UniversityTable: React.FC<UniversityTableProps> = ({ loading, data, onEdit, onDelete, onViewDetail }) => {
  const columns = [
    {
      title: 'Tên trường',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Mã trường',
      dataIndex: 'code',
      key: 'code',
    },
    {
      title: 'Địa chỉ',
      dataIndex: 'address',
      key: 'address',
    },
    {
      title: 'Hành động',
      key: 'action',
      render: (_: any, record: University) => (
        <Space>
          <Button icon={<EyeOutlined />} onClick={() => onViewDetail(record._id)} size="small" />
          <Button icon={<EditOutlined />} onClick={() => onEdit(record)} size="small" />
          <Button icon={<DeleteOutlined />} onClick={() => onDelete(record._id)} size="small" danger />
        </Space>
      ),
    },
  ];

  return (
    <Table
      rowKey="_id"
      loading={loading}
      columns={columns}
      dataSource={data}
      pagination={{ pageSize: 10 }}
    />
  );
};

export default UniversityTable; 