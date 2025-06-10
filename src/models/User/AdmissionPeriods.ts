import { useState, useCallback } from 'react';
import { message } from 'antd';
import {
  getAdmissionPeriodsByUniversityId,
} from '@/services/User/AdmissionPeriods';
import { getAdmissionPeriodById } from '@/services/Admin/AdmissionPeriods';

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

  return {
    admissionPeriods,
    admissionPeriodDetail,
    loading,
    fetchAdmissionPeriodsByUniversity,
    fetchAdmissionPeriodDetail
  };
}; 