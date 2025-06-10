import request from '@/utils/axios';

// Lấy thông tin user
export async function getUserProfile() {
  const res = await request('http://localhost:3456/users/profile', { method: 'GET' });
  return res.data;
}

// Lấy danh sách hồ sơ xét tuyển
export async function getAdmissionList() {
  return request('http://localhost:3456/users/applications', { method: 'GET' });
}
