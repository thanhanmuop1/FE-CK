import request from '@/utils/axios';
import { BASE_URL } from '@/utils/utils';


export interface ApplicationResponse {
  status: number;
  success: boolean;
  message: string;
  data: any[];
}

export interface CompleteApplicationData {
  universityMajorId: string;
  admissionMethod: string;
  subjectCombinationId?: string;
  resultData: {
    method: string;
    gpaGrade10?: number;
    gpaGrade11?: number;
    gpaGrade12?: number;
    subjectScores?: Record<string, number>;
    totalScore?: number;
  };
  documentsData: {
    type: string;
    file: string;
    fileType: string;
  }[];
}

export async function getApplications(): Promise<ApplicationResponse> {
  const response = await request(`${BASE_URL}/users/applications`, {
    method: 'GET',
  });
  return response.data;
}

export async function getApplicationDetail(applicationId: string) {
  const response = await request(`${BASE_URL}/users/applications/${applicationId}`, {
    method: 'GET',
  });
  return response.data;
}

export async function createApplication(data: any) {
  const response = await request(`${BASE_URL}/users/applications`, {
    method: 'POST',
    data,
  });
  return response.data;
}

export async function updateApplication(applicationId: string, data: any) {
  const response = await request(`${BASE_URL}/users/applications/${applicationId}`, {
    method: 'PUT',
    data,
  });
  return response.data;
}

export async function deleteApplication(applicationId: string) {
  const response = await request(`${BASE_URL}/users/applications/${applicationId}`, {
    method: 'DELETE',
  });
  return response.data;
} 

export async function createCompleteApplication(data: any) {
  const response = await request(`${BASE_URL}/users/applications/complete`, {
    method: 'POST',
    data,
  });
  return response.data;
}

export async function uploadDocument(file: File) {
  const formData = new FormData();
  formData.append('file', file);
  const response = await request(`${BASE_URL}/users/documents`, {
    method: 'POST',
    data: formData,
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
  return response.data;
}

export async function searchApplications(filters: {
  universityId?: string;
  applicationCode?: string;
  status?: string;
  admissionMethod?: string;
  startDate?: string;
  endDate?: string;
}): Promise<ApplicationResponse> {
  const queryParams = new URLSearchParams();
  Object.entries(filters).forEach(([key, value]) => {
    if (value) queryParams.append(key, value);
  });

  const response = await request(`${BASE_URL}/users/applications/search?${queryParams.toString()}`, {
    method: 'GET',
  });
  return response.data;
}

export async function getCompleteApplicationById(applicationId: string) {
  const response = await request(`${BASE_URL}/users/applications/complete/${applicationId}`, {
    method: 'GET',
  });
  return response.data
}