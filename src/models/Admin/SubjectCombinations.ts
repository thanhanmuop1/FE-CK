import { useState, useCallback } from 'react';
import { message } from 'antd';
import {
  getAllSubjectCombinations,
  getSubjectCombinationById,
  createSubjectCombination,
  updateSubjectCombination,
  deleteSubjectCombination,
} from '@/services/Admin/SubjectCombinations';

export interface SubjectCombination {
  _id: string;
  code: string;
  subjects: string[];
}

export interface SubjectCombinationListResponse {
  success: boolean;
  data: SubjectCombination[];
  message?: string;
}

export interface SubjectCombinationDetailResponse {
  success: boolean;
  data: SubjectCombination;
  message?: string;
}

export default () => {
  const [subjectCombinations, setSubjectCombinations] = useState<SubjectCombination[]>([]);
  const [subjectCombinationDetail, setSubjectCombinationDetail] = useState<SubjectCombination | null>(null);
  const [loading, setLoading] = useState(false);

  // Fetch all subject combinations
  const fetchSubjectCombinations = useCallback(async () => {
    setLoading(true);
    try {
      const res = await getAllSubjectCombinations();
      if (res.success) {
        setSubjectCombinations(res.data);
      } else {
        message.error('Không thể tải danh sách tổ hợp môn');
      }
    } catch (error) {
      message.error('Lỗi kết nối API');
      console.error('Error fetching subject combinations:', error);
    } finally {
      setLoading(false);
    }
  }, []);

  // Fetch subject combination by id
  const fetchSubjectCombinationDetail = useCallback(async (id: string) => {
    setLoading(true);
    try {
      const res = await getSubjectCombinationById(id);
      if (res.success) {
        setSubjectCombinationDetail(res.data);
      } else {
        message.error('Không thể tải thông tin tổ hợp môn');
      }
    } catch (error) {
      message.error('Lỗi kết nối API');
      console.error('Error fetching subject combination detail:', error);
    } finally {
      setLoading(false);
    }
  }, []);

  // Create subject combination
  const createSubjectCombinationItem = useCallback(async (data: Omit<SubjectCombination, '_id'>) => {
    setLoading(true);
    try {
      const res = await createSubjectCombination(data);
      if (res.success) {
        message.success('Tạo tổ hợp môn thành công');
        fetchSubjectCombinations();
      } else {
        message.error('Không thể tạo tổ hợp môn');
      }
    } catch (error) {
      message.error('Lỗi kết nối API');
      console.error('Error creating subject combination:', error);
    } finally {
      setLoading(false);
    }
  }, [fetchSubjectCombinations]);

  // Update subject combination
  const updateSubjectCombinationItem = useCallback(async (id: string, data: Partial<Omit<SubjectCombination, '_id'>>) => {
    setLoading(true);
    try {
      const res = await updateSubjectCombination(id, data);
      if (res.success) {
        message.success('Cập nhật tổ hợp môn thành công');
        fetchSubjectCombinations();
      } else {
        message.error('Không thể cập nhật tổ hợp môn');
      }
    } catch (error) {
      message.error('Lỗi kết nối API');
      console.error('Error updating subject combination:', error);
    } finally {
      setLoading(false);
    }
  }, [fetchSubjectCombinations]);

  // Delete subject combination
  const deleteSubjectCombinationItem = useCallback(async (id: string) => {
    setLoading(true);
    try {
      const res = await deleteSubjectCombination(id);
      if (res.success) {
        message.success('Xóa tổ hợp môn thành công');
        fetchSubjectCombinations();
      } else {
        message.error('Không thể xóa tổ hợp môn');
      }
    } catch (error) {
      message.error('Lỗi kết nối API');
      console.error('Error deleting subject combination:', error);
    } finally {
      setLoading(false);
    }
  }, [fetchSubjectCombinations]);

  return {
    subjectCombinations,
    subjectCombinationDetail,
    loading,
    fetchSubjectCombinations,
    fetchSubjectCombinationDetail,
    createSubjectCombinationItem,
    updateSubjectCombinationItem,
    deleteSubjectCombinationItem,
  };
}; 