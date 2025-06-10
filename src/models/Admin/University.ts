import { useState, useCallback } from 'react';
import { message } from 'antd';
import {
  getAllUniversities,
  getUniversityById,
  createUniversity,
  updateUniversity,
  deleteUniversity,
} from '@/services/Admin/University/index';

export interface University {
  _id: string;
  name: string;
  code: string;
  address: string;
  created_at: string;
  updated_at: string;
}

export default () => {
  const [universities, setUniversities] = useState<University[]>([]);
  const [universityDetail, setUniversityDetail] = useState<University | null>(null);
  const [loading, setLoading] = useState(false);

  // Fetch all universities
  const fetchUniversities = useCallback(async () => {
    setLoading(true);
    try {
      const res = await getAllUniversities();
      if (res.success) {
        setUniversities(res.data);
      } else {
        message.error('Không thể tải danh sách trường đại học');
      }
    } catch (error) {
      message.error('Lỗi kết nối API');
      console.error('Error fetching universities:', error);
    } finally {
      setLoading(false);
    }
  }, []);

  // Fetch university by id
  const fetchUniversityDetail = useCallback(async (id: string) => {
    setLoading(true);
    try {
      const res = await getUniversityById(id);
      if (res.success) {
        setUniversityDetail(res.data);
      } else {
        message.error('Không thể tải thông tin trường đại học');
      }
    } catch (error) {
      message.error('Lỗi kết nối API');
      console.error('Error fetching university detail:', error);
    } finally {
      setLoading(false);
    }
  }, []);

  // Create university
  const createUniversityItem = useCallback(async (data: Omit<University, '_id' | 'created_at' | 'updated_at'>) => {
    setLoading(true);
    try {
      const res = await createUniversity(data);
      if (res.success) {
        message.success('Tạo trường đại học thành công');
        fetchUniversities();
      } else {
        message.error('Không thể tạo trường đại học');
      }
    } catch (error) {
      message.error('Lỗi kết nối API');
      console.error('Error creating university:', error);
    } finally {
      setLoading(false);
    }
  }, [fetchUniversities]);

  // Update university
  const updateUniversityItem = useCallback(async (id: string, data: Partial<Omit<University, '_id' | 'created_at' | 'updated_at'>>) => {
    setLoading(true);
    try {
      const res = await updateUniversity(id, data);
      if (res.success) {
        message.success('Cập nhật trường đại học thành công');
        fetchUniversities();
      } else {
        message.error('Không thể cập nhật trường đại học');
      }
    } catch (error) {
      message.error('Lỗi kết nối API');
      console.error('Error updating university:', error);
    } finally {
      setLoading(false);
    }
  }, [fetchUniversities]);

  // Delete university
  const deleteUniversityItem = useCallback(async (id: string) => {
    setLoading(true);
    try {
      const res = await deleteUniversity(id);
      if (res.success) {
        message.success('Xóa trường đại học thành công');
        fetchUniversities();
      } else {
        message.error('Không thể xóa trường đại học');
      }
    } catch (error) {
      message.error('Lỗi kết nối API');
      console.error('Error deleting university:', error);
    } finally {
      setLoading(false);
    }
  }, [fetchUniversities]);

  return {
    universities,
    universityDetail,
    loading,
    fetchUniversities,
    fetchUniversityDetail,
    createUniversityItem,
    updateUniversityItem,
    deleteUniversityItem,
  };
}; 