import request from '@/utils/axios';
import { BASE_URL } from '@/utils/utils';

interface LoginParams {
  phone: string;
  password: string;
}
 
interface LoginResponse {
  token: string;
  [key: string]: any;
}
 
export async function loginApi(data: { phone: string; password: string }): Promise<any> {
  return request(`${BASE_URL}/admin/auth/login`, {
    method: 'POST',
    data,
  });
}

export async function logoutAdmin() {
  return request(`${BASE_URL}/admin/auth/logout`, {
    method: 'POST'
  });
}