import React, { useEffect, useState } from 'react';
import { Button, Card, Modal, message } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import { useModel, useParams, history } from 'umi';
import type { UniversityMajors } from '@/models/Admin/UniversityMajors';
import styles from './index.less';

const MajorsPage: React.FC = () => {
  const { universityId } = useParams<{ universityId: string }>();
  const {
    majors,
    majorDetail,
    loading,
    fetchMajors,
    fetchMajorDetail,
    createMajor,
    updateMajor,
    deleteMajor,
  } = useModel('Admin.UniversityMajors');

  const [showForm, setShowForm] = useState(false);
  const [editingMajor, setEditingMajor] = useState<UniversityMajors | null>(null);
  const [showDetail, setShowDetail] = useState(false);

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

  const handleDelete = async (id: string) => {
    Modal.confirm({
      title: 'Xác nhận xóa',
      content: 'Bạn có chắc chắn muốn xóa ngành học này?',
      okText: 'Xóa',
      okType: 'danger',
      cancelText: 'Hủy',
      onOk: async () => {
        if (universityId) {
          await deleteMajor({ id, universityId });
        }
      },
    });
  };

  const handleViewDetail = async (id: string) => {
    await fetchMajorDetail(id);
    setShowDetail(true);
  };

  const handleFormSubmit = async (values: any) => {
    if (universityId) {
      if (editingMajor) {
        await updateMajor({ id: editingMajor._id, data: { ...values, university_id: universityId } });
      } else {
        await createMajor({ universityId, data: values });
      }
      setShowForm(false);
    }
  };

  return (
    <div className={styles.container}>
      <Card
        title="Quản lý Ngành học"
        extra={
          <Button type="primary" icon={<PlusOutlined />} onClick={handleAdd}>
            Thêm ngành học
          </Button>
        }
      >
        {/* TODO: Add MajorsTable component */}
        <div>Majors table will be implemented here</div>
      </Card>

      {/* TODO: Add MajorForm component */}
      {/* TODO: Add MajorDetailModal component */}
    </div>
  );
};

export default MajorsPage; 