import React from 'react';
import { Table, Button, Space } from 'antd';
import { EditOutlined, DeleteOutlined, EyeOutlined, BookOutlined } from '@ant-design/icons';
import { University } from '@/models/Admin/University';

interface UniversityTableProps {
  loading: boolean;
  data: University[];
  onEdit: (university: University) => void;
  onDelete: (id: string) => void;
  onViewDetail: (id: string) => void;
  onManageMajors: (id: string) => void;
}

const UniversityTable: React.FC<UniversityTableProps> = ({
  loading,
  data,
  onEdit,
  onDelete,
  onViewDetail,
  onManageMajors,
}) => {
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
      title: 'Thao tác',
      key: 'action',
      render: (_: any, record: University) => (
        <Space size="middle">
          <Button
            type="primary"
            icon={<BookOutlined />}
            onClick={() => onManageMajors(record._id)}
          >
            Quản lý ngành
          </Button>
          <Button
            type="primary"
            icon={<EditOutlined />}
            onClick={() => onEdit(record)}
          >
            Sửa
          </Button>
          <Button
            type="primary"
            danger
            icon={<DeleteOutlined />}
            onClick={() => onDelete(record._id)}
          >
            Xóa
          </Button>
          <Button
            type="primary"
            icon={<EyeOutlined />}
            onClick={() => onViewDetail(record._id)}
          >
            Chi tiết
          </Button>
        </Space>
      ),
    },
  ];

  return (
    <Table
      columns={columns}
      dataSource={data}
      loading={loading}
      rowKey="_id"
    />
  );
};

export default UniversityTable; 