import React, { useEffect, useState } from 'react';
import { Button, Card, Modal, message } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import UniversityTable from './components/UniversityTable';
import UniversityForm from './components/UniversityForm';
import UniversityDetailModal from './components/UniversityDetailModal';
import { University } from '@/models/Admin/University';
import { useModel, history } from 'umi';
import styles from './index.less';

const UniversityPage: React.FC = () => {
  const {
    universities,
    universityDetail,
    loading,
    fetchUniversities,
    fetchUniversityDetail,
    createUniversityItem,
    updateUniversityItem,
    deleteUniversityItem,
  } = useModel('Admin.University');

  const [showForm, setShowForm] = useState(false);
  const [editingUniversity, setEditingUniversity] = useState<University | null>(null);
  const [showDetail, setShowDetail] = useState(false);

  useEffect(() => {
    fetchUniversities();
  }, [fetchUniversities]);

  const handleAdd = () => {
    setEditingUniversity(null);
    setShowForm(true);
  };

  const handleEdit = (university: University) => {
    setEditingUniversity(university);
    setShowForm(true);
  };

  const handleDelete = async (id: string) => {
    Modal.confirm({
      title: 'Xác nhận xóa',
      content: 'Bạn có chắc chắn muốn xóa trường đại học này?',
      okText: 'Xóa',
      okType: 'danger',
      cancelText: 'Hủy',
      onOk: async () => {
        await deleteUniversityItem(id);
      },
    });
  };

  const handleViewDetail = async (id: string) => {
    history.push(`/admin/university/${id}`);
  };

  const handleFormSubmit = async (values: any) => {
    if (editingUniversity) {
      await updateUniversityItem(editingUniversity._id, values);
    } else {
      await createUniversityItem(values);
    }
    setShowForm(false);
  };

  return (
    <div className={styles.container}>
      <Card
        title="Quản lý Trường Đại học"
        extra={
          <Button type="primary" icon={<PlusOutlined />} onClick={handleAdd}>
            Thêm trường
          </Button>
        }
      >
        <UniversityTable
          loading={loading}
          data={universities}
          onEdit={handleEdit}
          onDelete={handleDelete}
          onViewDetail={handleViewDetail}
        />
      </Card>

      <UniversityForm
        visible={showForm}
        onCancel={() => setShowForm(false)}
        onSubmit={handleFormSubmit}
        initialValues={editingUniversity}
      />
    </div>
  );
};

export default UniversityPage; 