import React from 'react';
import { Table, Button, Space, Popconfirm, message, Tag } from 'antd';
import { EditOutlined, DeleteOutlined } from '@ant-design/icons';
import { useModel } from 'umi';
import type { SubjectCombination } from '@/models/Admin/SubjectCombinations';

const SubjectCombinationTable: React.FC = () => {
  const {
    subjectCombinations,
    loading,
    deleteSubjectCombinationItem,
  } = useModel('Admin.SubjectCombinations');

  const columns = [
    {
      title: 'Mã tổ hợp',
      dataIndex: 'code',
      key: 'code',
      width: 120,
      render: (code: string) => (
        <Tag color="blue" style={{ fontSize: '14px', padding: '4px 8px' }}>
          {code}
        </Tag>
      ),
    },
    {
      title: 'Các môn học',
      dataIndex: 'subjects',
      key: 'subjects',
      render: (subjects: string[]) => (
        <Space size={[0, 8]} wrap>
          {subjects.map((subject, index) => (
            <Tag key={index} color="green">
              {subject}
            </Tag>
          ))}
        </Space>
      ),
    },
    {
      title: 'Thao tác',
      key: 'action',
      width: 200,
      render: (_: any, record: SubjectCombination) => (
        <Space size="middle">
          <Button
            type="primary"
            icon={<EditOutlined />}
            onClick={() => handleEdit(record)}
          >
            Sửa
          </Button>
          <Popconfirm
            title="Bạn có chắc chắn muốn xóa tổ hợp môn này?"
            onConfirm={() => handleDelete(record._id)}
            okText="Có"
            cancelText="Không"
            placement="left"
          >
            <Button danger icon={<DeleteOutlined />}>
              Xóa
            </Button>
          </Popconfirm>
        </Space>
      ),
    },
  ];

  const handleEdit = (record: SubjectCombination) => {
    // TODO: Implement edit functionality
    message.info('Chức năng đang được phát triển');
  };

  const handleDelete = async (id: string) => {
    await deleteSubjectCombinationItem(id);
  };

  return (
    <Table
      columns={columns}
      dataSource={subjectCombinations}
      rowKey="_id"
      loading={loading}
      pagination={{
        pageSize: 10,
        showSizeChanger: true,
        showTotal: (total) => `Tổng số ${total} tổ hợp môn`,
      }}
    />
  );
};

export default SubjectCombinationTable; 