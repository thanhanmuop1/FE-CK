import request from '@/utils/axios';
import { BASE_URL } from '@/utils/utils';


// Lấy thông tin user
export async function getUserProfile() {
  const res = await request(`${BASE_URL}/users/profile`, { method: 'GET' });
  return res.data;
}

// Lấy danh sách hồ sơ xét tuyển
export async function getAdmissionList() {
  return request(`${BASE_URL}/users/applications`, { method: 'GET' });
}
