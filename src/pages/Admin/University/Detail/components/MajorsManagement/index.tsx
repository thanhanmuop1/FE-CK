import React, { useEffect, useState } from 'react';
import { Card, Table, Button, Modal, message, Space, Tag } from 'antd';
import { PlusOutlined, EditOutlined, DeleteOutlined } from '@ant-design/icons';
import { useModel, useParams } from 'umi';
import { UniversityMajors } from '@/models/Admin/UniversityMajors';
import MajorForm from './MajorForm';
import styles from './index.less';
import { getAdmissionMethodLabel } from '@/utils/utils';

const MajorsManagement: React.FC = () => {
  const { universityId } = useParams<{ universityId: string }>();
  const {
    majors,
    loading,
    fetchMajors,
    createMajor,
    updateMajor,
    deleteMajor,
  } = useModel('Admin.UniversityMajors');

  const [showForm, setShowForm] = useState(false);
  const [editingMajor, setEditingMajor] = useState<UniversityMajors | null>(null);

  useEffect(() => {
    if (universityId) {
      fetchMajors(universityId);
    }
  }, [universityId, fetchMajors]);

  const handleAdd = () => {
    setEditingMajor(null);
    setShowForm(true);
  };

  const handleEdit = (major: UniversityMajors) => {
    setEditingMajor(major);
    setShowForm(true);
  };

  const handleDelete = (id: string) => {
    Modal.confirm({
      title: 'Xác nhận xóa',
      content: 'Bạn có chắc chắn muốn xóa ngành học này?',
      okText: 'Xóa',
      okType: 'danger',
      cancelText: 'Hủy',
      onOk: async () => {
        if (universityId) {
          await deleteMajor(id, universityId);
        }
      },
    });
  };

  const handleFormSubmit = async (values: any) => {
    if (editingMajor) {
      await updateMajor(editingMajor._id, { ...values, university_id: universityId });
    } else {
      await createMajor(universityId!, values);
    }
    setShowForm(false);
  };

  const columns = [
    {
      title: 'Mã ngành',
      dataIndex: 'code',
      key: 'code',
    },
    {
      title: 'Tên ngành',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Phương thức xét tuyển',
      dataIndex: 'admission_methods',
      key: 'admission_methods',
      render: (method: string) => getAdmissionMethodLabel(method),
    },
    {
      title: 'Tổ hợp môn',
      dataIndex: 'subject_combination_ids',
      key: 'subject_combination_ids',
      render: (combinations: any[]) => (
        <Space>
          {combinations.map((combo) => (
            <Tag key={combo._id} color="green">
              {combo.code}
            </Tag>
          ))}
        </Space>
      ),
    },
    {
      title: 'Thao tác',
      key: 'action',
      render: (_: any, record: UniversityMajors) => (
        <Space size="middle">
          <Button
            type="primary"
            icon={<EditOutlined />}
            onClick={() => handleEdit(record)}
          >
            Sửa
          </Button>
          <Button
            danger
            icon={<DeleteOutlined />}
            onClick={() => handleDelete(record._id)}
          >
            Xóa
          </Button>
        </Space>
      ),
    },
  ];

  return (
    <div className={styles.container}>
      <Card
        title="Quản lý ngành học"
        extra={
          <Button type="primary" icon={<PlusOutlined />} onClick={handleAdd}>
            Thêm ngành học
          </Button>
        }
      >
        <Table
          columns={columns}
          dataSource={majors}
          loading={loading}
          rowKey="_id"
        />
      </Card>

      <MajorForm
        visible={showForm}
        onCancel={() => setShowForm(false)}
        onSubmit={handleFormSubmit}
        initialValues={editingMajor}
      />
    </div>
  );
};

export default MajorsManagement; 