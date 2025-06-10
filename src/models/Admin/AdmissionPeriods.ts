import { useState, useCallback } from 'react';
import { message } from 'antd';
import {
  getAllAdmissionPeriods,
  getAdmissionPeriodById,
  createAdmissionPeriod,
  updateAdmissionPeriod,
  deleteAdmissionPeriod,
  getAdmissionPeriodsByUniversityId,
} from '@/services/Admin/AdmissionPeriods';

export interface AdmissionPeriod {
  _id: string;
  name: string;
  startDate: string;
  endDate: string;
  university_id: string;
  description?: string;
  academic_year?: string;
  isActive: boolean;
  status?: 'open' | 'closed' | 'pending'; // Optional since it's calculated
  created_at: string;
  updated_at: string;
}

export interface AdmissionPeriodListResponse {
  success: boolean;
  data: AdmissionPeriod[];
  message?: string;
}

export interface AdmissionPeriodDetailResponse {
  success: boolean;
  data: AdmissionPeriod;
  message?: string;
}

export default () => {
  const [admissionPeriods, setAdmissionPeriods] = useState<AdmissionPeriod[]>([]);
  const [admissionPeriodDetail, setAdmissionPeriodDetail] = useState<AdmissionPeriod | null>(null);
  const [loading, setLoading] = useState(false);

  // Fetch all admission periods
  const fetchAdmissionPeriods = useCallback(async () => {
    setLoading(true);
    try {
      const res = await getAllAdmissionPeriods();
      if (res.success) {
        setAdmissionPeriods(res.data);
      } else {
        message.error('Không thể tải danh sách đợt tuyển sinh');
      }
    } catch (error) {
      message.error('Lỗi kết nối API');
      console.error('Error fetching admission periods:', error);
    } finally {
      setLoading(false);
    }
  }, []);

  // Fetch admission period by id
  const fetchAdmissionPeriodDetail = useCallback(async (id: string) => {
    setLoading(true);
    try {
      const res = await getAdmissionPeriodById(id);
      if (res.success) {
        setAdmissionPeriodDetail(res.data);
      } else {
        message.error('Không thể tải thông tin đợt tuyển sinh');
      }
    } catch (error) {
      message.error('Lỗi kết nối API');
      console.error('Error fetching admission period detail:', error);
    } finally {
      setLoading(false);
    }
  }, []);

  // Create admission period
  const createAdmissionPeriodItem = useCallback(async (data: Omit<AdmissionPeriod, '_id' | 'created_at' | 'updated_at'>) => {
    setLoading(true);
    try {
      const res = await createAdmissionPeriod(data);
      if (res.success) {
        message.success('Tạo đợt tuyển sinh thành công');
        fetchAdmissionPeriods();
      } else {
        message.error('Không thể tạo đợt tuyển sinh');
      }
    } catch (error) {
      message.error('Lỗi kết nối API');
      console.error('Error creating admission period:', error);
    } finally {
      setLoading(false);
    }
  }, [fetchAdmissionPeriods]);

  // Update admission period
  const updateAdmissionPeriodItem = useCallback(async (id: string, data: Partial<Omit<AdmissionPeriod, '_id' | 'created_at' | 'updated_at'>>) => {
    setLoading(true);
    try {
      const res = await updateAdmissionPeriod(id, data);
      if (res.success) {
        message.success('Cập nhật đợt tuyển sinh thành công');
        fetchAdmissionPeriods();
      } else {
        message.error('Không thể cập nhật đợt tuyển sinh');
      }
    } catch (error) {
      message.error('Lỗi kết nối API');
      console.error('Error updating admission period:', error);
    } finally {
      setLoading(false);
    }
  }, [fetchAdmissionPeriods]);

  // Delete admission period
  const deleteAdmissionPeriodItem = useCallback(async (id: string) => {
    setLoading(true);
    try {
      const res = await deleteAdmissionPeriod(id);
      if (res.success) {
        message.success('Xóa đợt tuyển sinh thành công');
        fetchAdmissionPeriods();
      } else {
        message.error('Không thể xóa đợt tuyển sinh');
      }
    } catch (error) {
      message.error('Lỗi kết nối API');
      console.error('Error deleting admission period:', error);
    } finally {
      setLoading(false);
    }
  }, [fetchAdmissionPeriods]);

  // Fetch admission periods by university id
  const fetchAdmissionPeriodsByUniversity = useCallback(async (universityId: string) => {
    setLoading(true);
    try {
      const res = await getAdmissionPeriodsByUniversityId(universityId);
      if (res.success) {
        setAdmissionPeriods(res.data);
      } else {
        message.error('Không thể tải danh sách đợt tuyển sinh của trường');
      }
    } catch (error) {
      message.error('Lỗi kết nối API');
      console.error('Error fetching university admission periods:', error);
    } finally {
      setLoading(false);
    }
  }, []);

  return {
    admissionPeriods,
    admissionPeriodDetail,
    loading,
    fetchAdmissionPeriods,
    fetchAdmissionPeriodDetail,
    createAdmissionPeriodItem,
    updateAdmissionPeriodItem,
    deleteAdmissionPeriodItem,
    fetchAdmissionPeriodsByUniversity,
  };
}; 