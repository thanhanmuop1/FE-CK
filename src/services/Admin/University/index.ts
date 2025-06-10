import axios from '@/utils/axios';
import type { University, UniversityListResponse, UniversityDetailResponse } from '@/models/Admin/University';

const BASE_URL = 'http://localhost:3456/admin/universities';

export async function getAllUniversities(): Promise<UniversityListResponse> {
  const response = await axios.get(BASE_URL);
  return response.data;
}

export async function getUniversityById(universityId: string): Promise<UniversityDetailResponse> {
  const response = await axios.get(`${BASE_URL}/${universityId}`);
  return response.data;
}

export async function createUniversity(data: Omit<University, '_id' | 'created_at' | 'updated_at'>): Promise<UniversityDetailResponse> {
  const response = await axios.post(BASE_URL, data);
  return response.data;
}

export async function updateUniversity(universityId: string, data: Partial<Omit<University, '_id' | 'created_at' | 'updated_at'>>): Promise<UniversityDetailResponse> {
  const response = await axios.put(`${BASE_URL}/${universityId}`, data);
  return response.data;
}

export async function deleteUniversity(universityId: string): Promise<UniversityDetailResponse> {
  const response = await axios.delete(`${BASE_URL}/${universityId}`);
  return response.data;
}
