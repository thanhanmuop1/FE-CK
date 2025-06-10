import { Application } from './applications';
import { useState, useCallback, useEffect } from 'react';
import { message } from 'antd';
import { getApplications, getApplicationDetail, createCompleteApplication, uploadDocument, searchApplications } from '@/services/User/applications';

export interface Application {
  _id: string;
  userId: {
    _id: string;
    name: string;
    email: string;
  };
  universityMajorId: {
    _id: string;
    university_id: string;
    name: string;
    code: string;
  };
  admissionMethod: string;
  subjectCombinationId: {
    _id: string;
    code: string;
    subjects: string[];
  };
  status: string;
  created_at: string;
  updated_at: string;
}

export interface ApplicationResult {
  _id: string;
  method: string;
  gpaGrade10?: number;
  gpaGrade11?: number;
  gpaGrade12?: number;
  subjectScores?: Record<string, number>;
  totalScore?: number;
}

export interface ApplicationDocument {
  _id: string;
  type: string;
  fileUrl: string;
  fileType: string;
}

export interface ApplicationProfile {
  name: string;
  email: string;
  gender: string;
  dob: string;
  avatar: string;
  cccd: string;
  phone: string;
  ethnic: string;
  province: string;
  district: string;
  address: string;
  highSchoolName: string;
  graduationYear: number;
  priorityArea: string;
  priorityGroup: string;
}

export interface CompleteApplication {
  application: Application;
  profile: ApplicationProfile;
  resultData: ApplicationResult;
  documentsData: ApplicationDocument[];
}

export interface ApplicationResponse {
  // Define the structure of the response from searchApplications
}

export default () => {
  const [applications, setApplications] = useState<Application[]>([]);
  const [loading, setLoading] = useState(false);
  const [currentApplication, setCurrentApplication] = useState<Application | null>(null);
  const [detailLoading, setDetailLoading] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [formData, setFormData] = useState<any>({});

  // Fetch all applications
  const fetchApplications = useCallback(async () => {
    try {
      setLoading(true);
      const response = await getApplications();

      if (response.success) {
        setApplications(response.data);
      } else {
        message.error('Không thể tải danh sách hồ sơ');
      }
    } catch (error) {
      message.error('Lỗi kết nối API');
      console.error('Error fetching applications:', error);
    } finally {
      setLoading(false);
    }
  }, []);

  // Fetch application detail
  const fetchApplicationDetail = useCallback(async (id: string) => {
    try {
      setDetailLoading(true);
      const response = await getApplicationDetail(id);
      
      if (response.success) {
        setCurrentApplication(response.data);
        return response.data;
      } else {
        message.error('Không thể tải chi tiết hồ sơ');
        return null;
      }
    } catch (error) {
      message.error('Lỗi kết nối API');
      console.error('Error fetching application detail:', error);
      return null;
    } finally {
      setDetailLoading(false);
    }
  }, []);

  // Hàm cập nhật formData
  const updateFormData = useCallback((data: any) => {
    setFormData((prev: any) => ({ ...prev, ...data }));
  }, []);

  // Hàm submit chuẩn
  const handleSubmit = useCallback(async () => {
    try {
      setSubmitting(true);

      // 1. Build FormData
      const form = new FormData();
      form.append('universityMajorId', formData.universityMajorId);
      form.append('admissionMethod', formData.admissionMethod);
      form.append('subjectCombinationId', formData.subjectCombinationId);
      form.append('admissionPeriodId', formData.admissionPeriodId);

      // Thêm profileData
      form.append('profileData', JSON.stringify(formData.profileData));

      // resultData là object, nên cần stringify
      form.append('resultData', JSON.stringify(formData.resultData));
      
      // documentsData: append từng file
      formData.documentsData.forEach((doc, idx) => {
        if (doc.file) {
          form.append(`documentsData[${idx}].file`, doc.file, doc.file.name);
        }
        form.append(`documentsData[${idx}].type`, doc.type);
        form.append(`documentsData[${idx}].fileType`, doc.fileType);
      });

      // 2. Gửi FormData lên backend
      const response = await createCompleteApplication(form);

      if (response.success) {
        message.success('Hồ sơ đã được gửi thành công');
        await fetchApplications();
        return true;
      } else {
        message.error(response.message || 'Không thể gửi hồ sơ');
        return false;
      }
    } catch (error: any) {
      message.error(error.message || 'Lỗi khi gửi hồ sơ');
      return false;
    } finally {
      setSubmitting(false);
    }
  }, [formData, fetchApplications]);

  // Filter applications by status
  const getApplicationsByStatus = useCallback((status: string) => {
    if (status === 'all') return applications;
    return applications.filter(app => app.status === status);
  }, [applications]);

  // Get status counts
  const getStatusCounts = useCallback(() => {
    return {
      all: applications.length,
      cho_duyet: applications.filter(app => app.status === 'cho_duyet').length,
      da_duyet: applications.filter(app => app.status === 'da_duyet').length,
      tu_choi: applications.filter(app => app.status === 'tu_choi').length,
    };
  }, [applications]);

  // Clear current application
  const clearCurrentApplication = useCallback(() => {
    setCurrentApplication(null);
  }, []);

  const handleSearchApplications = useCallback(async (filters: any): Promise<ApplicationResponse> => {
    try {
      const result = await searchApplications(filters);
      return result;
    } catch (error) {
      message.error('Lỗi khi tìm kiếm hồ sơ');
      throw error;
    }
  }, []);

  return {
    // State
    applications,
    loading,
    currentApplication,
    detailLoading,
    submitting,
    formData,
    
    // Actions
    fetchApplications,
    fetchApplicationDetail,
    getApplicationsByStatus,
    getStatusCounts,
    clearCurrentApplication,
    handleSubmit,
    updateFormData,
    handleSearchApplications,
  };
}; 