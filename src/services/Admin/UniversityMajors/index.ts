import axios from '@/utils/axios';
import type { 
  UniversityMajors, 
  UniversityMajorsListResponse, 
  UniversityMajorsDetailResponse 
} from '@/models/Admin/UniversityMajors';
import { BASE_URL } from '@/utils/utils';

export async function getAllUniversityMajors(universityId: string): Promise<UniversityMajorsListResponse> {
  const response = await axios.get(`${BASE_URL}/admin/university-majors/${universityId}/majors`);
  return response.data;
}

export async function getUniversityMajorsById(id: string): Promise<UniversityMajorsDetailResponse> {
  const response = await axios.get(`${BASE_URL}/admin/university-majors/${id}`);
  return response.data;
}

export async function createUniversityMajors(
  universityId: string,
  data: Omit<UniversityMajors, '_id' | 'created_at' | 'updated_at'>
): Promise<UniversityMajorsDetailResponse> {
  const response = await axios.post(`${BASE_URL}/admin/university-majors`, { ...data, university_id: universityId });
  return response.data;
}

export async function updateUniversityMajors(
  id: string,
  data: Partial<Omit<UniversityMajors, '_id' | 'created_at' | 'updated_at'>>
): Promise<UniversityMajorsDetailResponse> {
  const response = await axios.put(`${BASE_URL}/admin/university-majors/${id}`, data);
  return response.data;
}

export async function deleteUniversityMajors(id: string): Promise<UniversityMajorsDetailResponse> {
  const response = await axios.delete(`${BASE_URL}/admin/university-majors/${id}`);
  return response.data;
} 