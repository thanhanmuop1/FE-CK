import axios from '@/utils/axios';
import { request } from 'umi';
import { BASE_URL } from '@/utils/utils';

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
    admission_methods: string[];
    subject_combination_ids: string[];
  };
  admissionMethod: string;
  subjectCombinationId: {
    _id: string;
    code: string;
    subjects: string[];
  };
  status: 'cho_duyet' | 'da_duyet' | 'tu_choi';
  created_at: string;
  updated_at: string;
}

export interface ApplicationsResponse {
  status: number;
  success: boolean;
  message: string;
  data: Application[];
}

export interface UpdateStatusRequest {
  status: 'da_duyet' | 'tu_choi';
}

export interface GroupedApplication {
  majorId: string;
  majorName: string;
  universityName: string;
  applications: Application[];
}

export interface GroupedApplicationsResponse {
  status: number;
  success: boolean;
  message: string;
  data: GroupedApplication[];
}

// Get all applications
export async function getAllApplications() {
  const response = await axios.get<ApplicationsResponse>(`${BASE_URL}/admin/applications`);
  return response.data;
}

// Get applications by university
export async function getApplicationsByUniversity(universityId: string) {
  const response = await axios.get<ApplicationsResponse>(`${BASE_URL}/admin/applications/university/${universityId}`);
  return response.data;
}

// Update application status
export async function updateApplicationStatus(applicationId: string, data: UpdateStatusRequest) {
  const response = await axios.patch<ApplicationsResponse>(`${BASE_URL}/admin/applications/${applicationId}/status`, data);
  return response.data;
}

export async function getCompleteApplicationById(applicationId: string) {
  const response = await request(`${BASE_URL}/users/applications/complete/${applicationId}`, {
    method: 'GET',
  });
  return response.data;
}

// Get applications grouped by major of university
export async function getApplicationsGroupedByMajorOfUniversity(universityId: string) {
  const response = await axios.get<GroupedApplicationsResponse>(
    `${BASE_URL}/admin/applications/university/${universityId}/grouped-by-major`
  );
  return response.data;
}