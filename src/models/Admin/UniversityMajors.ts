import { useState, useCallback } from 'react';
import { message } from 'antd';
import {
  getAllUniversityMajors,
  getUniversityMajorsById,
  createUniversityMajors,
  updateUniversityMajors,
  deleteUniversityMajors,
} from '@/services/Admin/UniversityMajors';

export interface SubjectCombination {
  _id: string;
  code: string;
  subjects: string[];
}

export interface UniversityMajors {
  _id: string;
  university_id: string;
  name: string;
  code: string;
  admission_methods: string[];
  subject_combination_ids: SubjectCombination[];
  created_at?: string;
  updated_at?: string;
}

export interface UniversityMajorsListResponse {
  status: number;
  success: boolean;
  message: string;
  data: UniversityMajors[];
}

export interface UniversityMajorsDetailResponse {
  status: number;
  success: boolean;
  message: string;
  data: UniversityMajors;
}

export default () => {
  const [majors, setMajors] = useState<UniversityMajors[]>([]);
  const [majorDetail, setMajorDetail] = useState<UniversityMajors | null>(null);
  const [loading, setLoading] = useState(false);

  // Fetch all majors by university id
  const fetchMajors = useCallback(async (universityId: string) => {
    setLoading(true);
    try {
      const res = await getAllUniversityMajors(universityId);
      if (res.success) {
        setMajors(res.data);
        return res.data;
      } else {
        message.error('Không thể tải danh sách ngành học');
        return [];
      }
    } catch (error) {
      message.error('Lỗi kết nối API');
      console.error('Error fetching majors:', error);
      return [];
    } finally {
      setLoading(false);
    }
  }, []);

  // Fetch major by id
  const fetchMajorDetail = useCallback(async (id: string) => {
    setLoading(true);
    try {
      const res = await getUniversityMajorsById(id);
      if (res.success) {
        setMajorDetail(res.data);
      } else {
        message.error('Không thể tải thông tin ngành học');
      }
    } catch (error) {
      message.error('Lỗi kết nối API');
      console.error('Error fetching major detail:', error);
    } finally {
      setLoading(false);
    }
  }, []);

  // Create major
  const createMajor = useCallback(async (universityId: string, data: Omit<UniversityMajors, '_id' | 'created_at' | 'updated_at'>) => {
    setLoading(true);
    try {
      const res = await createUniversityMajors(universityId, data);
      if (res.success) {
        message.success('Thêm ngành học thành công');
        fetchMajors(universityId);
      } else {
        message.error('Không thể thêm ngành học');
      }
    } catch (error) {
      message.error('Lỗi kết nối API');
      console.error('Error creating major:', error);
    } finally {
      setLoading(false);
    }
  }, [fetchMajors]);

  // Update major
  const updateMajor = useCallback(async (id: string, data: Partial<Omit<UniversityMajors, '_id' | 'created_at' | 'updated_at'>>) => {
    setLoading(true);
    try {
      const res = await updateUniversityMajors(id, data);
      if (res.success) {
        message.success('Cập nhật ngành học thành công');
        if (data.university_id) {
          fetchMajors(data.university_id);
        }
      } else {
        message.error('Không thể cập nhật ngành học');
      }
    } catch (error) {
      message.error('Lỗi kết nối API');
      console.error('Error updating major:', error);
    } finally {
      setLoading(false);
    }
  }, [fetchMajors]);

  // Delete major
  const deleteMajor = useCallback(async (id: string, universityId: string) => {
    setLoading(true);
    try {
      const res = await deleteUniversityMajors(id);
      if (res.success) {
        message.success('Xóa ngành học thành công');
        fetchMajors(universityId);
      } else {
        message.error('Không thể xóa ngành học');
      }
    } catch (error) {
      message.error('Lỗi kết nối API');
      console.error('Error deleting major:', error);
    } finally {
      setLoading(false);
    }
  }, [fetchMajors]);

  return {
    majors,
    majorDetail,
    loading,
    fetchMajors,
    fetchMajorDetail,
    createMajor,
    updateMajor,
    deleteMajor,
  };
}; 