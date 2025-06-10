import axios from '@/utils/axios';
import type { University, UniversityListResponse, UniversityDetailResponse } from '@/models/Admin/University';
import { BASE_URL } from '@/utils/utils';

export async function getAllUniversities(): Promise<UniversityListResponse> {
  const response = await axios.get(`${BASE_URL}/admin/universities`);
  return response.data;
}

export async function getUniversityById(universityId: string): Promise<UniversityDetailResponse> {
  const response = await axios.get(`${BASE_URL}/admin/universities/${universityId}`);
  return response.data;
}

export async function createUniversity(data: Omit<University, '_id' | 'created_at' | 'updated_at'>): Promise<UniversityDetailResponse> {
  const response = await axios.post(`${BASE_URL}/admin/universities`, data);
  return response.data;
}

export async function updateUniversity(universityId: string, data: Partial<Omit<University, '_id' | 'created_at' | 'updated_at'>>): Promise<UniversityDetailResponse> {
  const response = await axios.put(`${BASE_URL}/admin/universities/${universityId}`, data);
  return response.data;
}

export async function deleteUniversity(universityId: string): Promise<UniversityDetailResponse> {
  const response = await axios.delete(`${BASE_URL}/admin/universities/${universityId}`);
  return response.data;
}
