import React from 'react';
import { Table } from 'antd';
import { useModel } from 'umi';
import styles from '../index.less';

const ComparisonTable: React.FC = () => {
  const { betweenUniversitiesStats } = useModel('Admin.Statistics');

  const columns = [
    {
      title: 'Tên trường',
      dataIndex: 'universityName',
      key: 'universityName',
      fixed: 'left',
      width: 200,
    },
    {
      title: 'Mã trường',
      dataIndex: 'universityCode',
      key: 'universityCode',
      width: 120,
    },
    {
      title: 'Tổng số hồ sơ',
      dataIndex: 'count',
      key: 'count',
      sorter: (a: UniversityStatistics, b: UniversityStatistics) => a.count - b.count,
      width: 120,
    },
    {
      title: 'Chờ duyệt',
      dataIndex: ['statusBreakdown', 'pending'],
      key: 'pending',
      width: 120,
    },
    {
      title: 'Đã duyệt',
      dataIndex: ['statusBreakdown', 'approved'],
      key: 'approved',
      width: 120,
    },
    {
      title: 'Từ chối',
      dataIndex: ['statusBreakdown', 'rejected'],
      key: 'rejected',
      width: 120,
    },
  ];

  return (
    <div className={`${styles.tableContainer} ${styles.slideUp}`}>
      <Table
        dataSource={betweenUniversitiesStats}
        columns={columns}
        rowKey="universityCode"
        pagination={{ 
          pageSize: 10,
          showSizeChanger: true,
          showQuickJumper: true,
        }}
        scroll={{ x: 1000 }}
      />
    </div>
  );
};

export default ComparisonTable; 