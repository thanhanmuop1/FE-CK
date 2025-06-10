import React, { useEffect, useState } from 'react';
import { Card, Table, Button, Modal, Space, Tag } from 'antd';
import { PlusOutlined, EditOutlined, DeleteOutlined } from '@ant-design/icons';
import { useModel, useParams } from 'umi';
import { AdmissionPeriod } from '@/models/Admin/AdmissionPeriods';
import AdmissionPeriodForm from './AdmissionPeriodForm';
import styles from './index.less';
import dayjs from 'dayjs';

const STATUS_COLORS = {
  open: 'green',
  closed: 'red',
  pending: 'orange',
};

const STATUS_LABELS = {
  open: 'Đang mở',
  closed: 'Đã đóng',
  pending: 'Chờ mở',
};

const AdmissionPeriodsManagement: React.FC = () => {
  const { universityId } = useParams<{ universityId: string }>();
  const {
    admissionPeriods,
    loading,
    fetchAdmissionPeriodsByUniversity,
    createAdmissionPeriodItem,
    updateAdmissionPeriodItem,
    deleteAdmissionPeriodItem,
  } = useModel('Admin.AdmissionPeriods');

  const [showForm, setShowForm] = useState(false);
  const [editingPeriod, setEditingPeriod] = useState<AdmissionPeriod | null>(null);

  useEffect(() => {
    if (universityId) {
      fetchAdmissionPeriodsByUniversity(universityId);
    }
  }, [universityId, fetchAdmissionPeriodsByUniversity]);

  const handleAdd = () => {
    setEditingPeriod(null);
    setShowForm(true);
  };

  const handleEdit = (period: AdmissionPeriod) => {
    setEditingPeriod(period);
    setShowForm(true);
  };

  const handleDelete = (id: string) => {
    Modal.confirm({
      title: 'Xác nhận xóa',
      content: 'Bạn có chắc chắn muốn xóa đợt tuyển sinh này?',
      okText: 'Xóa',
      okType: 'danger',
      cancelText: 'Hủy',
      onOk: async () => {
        await deleteAdmissionPeriodItem(id);
      },
    });
  };

  const handleFormSubmit = async (values: any) => {
    if (editingPeriod) {
      await updateAdmissionPeriodItem(editingPeriod._id, { ...values, universityId: universityId });
    } else {
      await createAdmissionPeriodItem({ ...values, universityId: universityId });
    }
    setShowForm(false);
  };

  const columns = [
    {
      title: 'Tên đợt tuyển sinh',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Ngày bắt đầu',
      dataIndex: 'startDate',
      key: 'start_date',
      render: (date: string) => dayjs(date).format('DD/MM/YYYY'),
    },
    {
      title: 'Ngày kết thúc',
      dataIndex: 'endDate',
      key: 'end_date',
      render: (date: string) => dayjs(date).format('DD/MM/YYYY'),
    },
    {
      title: 'Trạng thái',
      dataIndex: 'status',
      key: 'status',
      render: (status: string) => (
        <Tag color={STATUS_COLORS[status as keyof typeof STATUS_COLORS]}>
          {STATUS_LABELS[status as keyof typeof STATUS_LABELS]}
        </Tag>
      ),
    },
    {
      title: 'Thao tác',
      key: 'action',
      render: (_: any, record: AdmissionPeriod) => (
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
        title="Quản lý đợt tuyển sinh"
        extra={
          <Button type="primary" icon={<PlusOutlined />} onClick={handleAdd}>
            Thêm đợt tuyển sinh
          </Button>
        }
      >
        <Table
          columns={columns}
          dataSource={admissionPeriods}
          loading={loading}
          rowKey="_id"
        />
      </Card>

      <AdmissionPeriodForm
        visible={showForm}
        onCancel={() => setShowForm(false)}
        onSubmit={handleFormSubmit}
        initialValues={editingPeriod}
      />
    </div>
  );
};

export default AdmissionPeriodsManagement; 