import { useState, useCallback } from 'react';
import { message } from 'antd';
import { getCompleteApplicationById } from '@/services/User/applications';
import { ApplicationDetailResponse, NormalizedApplication } from '@/pages/User/DetailApplications/types';
import { getPriorityScore } from '@/utils/priorityScore';
import { getDocumentTypeLabel } from '@/utils/utils';

export interface DetailApplicationState {
  data: ApplicationDetailResponse | null;
  loading: boolean;
  error: string | null;
}

const methodMap: Record<string, string> = {
  hoc_ba: 'Xét tuyển học bạ',
  tot_nghiep: 'Điểm thi THPT Quốc gia',
  dgnl: 'Đánh giá năng lực',
  tu_duy: 'Đánh giá tư duy'
};

export default () => {
  const [state, setState] = useState<DetailApplicationState>({
    data: null,
    loading: false,
    error: null,
  });

  // Fetch chi tiết đơn xét tuyển
  const fetchApplicationDetail = useCallback(async (id: string) => {
    try {
      setState(prev => ({ ...prev, loading: true, error: null }));
      const response = await getCompleteApplicationById(id);
      
      if (response?.data) {
        setState(prev => ({ ...prev, data: response.data }));
      } else {
        throw new Error('Không thể tải chi tiết hồ sơ');
      }
    } catch (error: any) {
      setState(prev => ({ 
        ...prev, 
        error: error.message || 'Lỗi khi tải chi tiết hồ sơ' 
      }));
      message.error(error.message || 'Lỗi khi tải chi tiết hồ sơ');
    } finally {
      setState(prev => ({ ...prev, loading: false }));
    }
  }, []);

  // Chuẩn hóa data cho UI
  const getNormalizedData = useCallback((): NormalizedApplication | null => {
    if (!state.data) return null;
    const { application, applicationResult, documents, profile } = state.data;
    const method = methodMap[applicationResult?.method || application?.admissionMethod || ''];
    const isHocBa = method === 'Xét tuyển học bạ';
    let totalScore = applicationResult?.totalScore || 0;

    if (isHocBa) {
      const g10 = applicationResult?.gpaGrade10 || 0;
      const g11 = applicationResult?.gpaGrade11 || 0;
      const g12 = applicationResult?.gpaGrade12 || 0;
      totalScore = g10 + g11 + g12;
    } else if (method === 'Điểm thi THPT Quốc gia') {
      // Tính tổng điểm cho phương thức tot_nghiep
      totalScore = Object.values(applicationResult.subjectScores || {}).reduce((sum, score) => sum + score, 0);
    }
    
    const priorityScore = getPriorityScore(profile?.priorityArea, profile?.priorityGroup);
    
    const normalizedData: NormalizedApplication = {
      name: profile?.name || '',
      email: profile?.email || '',
      phone: profile?.phone || '',
      university: application.universityMajorId.university || '',
      admissionPeriod: application.admissionPeriodId.name || '',
      major: application.universityMajorId.name || '',
      status: application.status || '',
      dates: {
        submitted: new Date(application.created_at).toLocaleString(),
        updated: new Date(application.updated_at).toLocaleString(),
      },
      scores: {
        ...(applicationResult.gpaGrade10 !== undefined && { 'GPA 10': applicationResult.gpaGrade10 }),
        ...(applicationResult.gpaGrade11 !== undefined && { 'GPA 11': applicationResult.gpaGrade11 }),
        ...(applicationResult.gpaGrade12 !== undefined && { 'GPA 12': applicationResult.gpaGrade12 }),
      },
      subjectScores: applicationResult.subjectScores || {},
      totalScore,
      method,
      priority: {
        area: profile?.priorityArea || 'none',
        group: profile?.priorityGroup || 'none',
        score: priorityScore,
      },
      documents: documents.map(doc => ({
        name: getDocumentTypeLabel(doc.type),
        type: doc.fileType,
        url: `http://localhost:3456/static/${doc.fileUrl}`
      }))
    };

    // Chỉ thêm tổ hợp môn nếu là phương thức Điểm thi THPT Quốc gia
    if (method === 'Điểm thi THPT Quốc gia') {
      normalizedData.combination = application.subjectCombinationId.code;
    }

    return normalizedData;
  }, [state.data]);

  return {
    ...state,
    fetchApplicationDetail,
    getNormalizedData,
  };
}; 