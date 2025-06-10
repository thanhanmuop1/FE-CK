import request from '@/utils/axios';
import { BASE_URL } from '@/utils/utils';


// Hàm đăng ký user
export async function registerUser(data: {
  email: string;
  password: string;
  name: string;
  phone: string;
}) {
  return request(`${BASE_URL}/users/auth/register`, {
    method: 'POST',
    data,
  });
}

// Hàm đăng nhập user
export async function loginUser(data: {
  email: string;
  password: string;
}) {
  return request(`${BASE_URL}/users/auth/login`, {
    method: 'POST',
    data,
  });
}

export async function logoutUser(data: {
  email: string;
  password: string;
}) {
  return request(`${BASE_URL}/users/auth/logout`, {
    method: 'POST',
    data,
  });
} 

export async function loginWithGoogle(data: {
  id_token: string;
}) {
  return request(`${BASE_URL}/users/auth/login/google`, {
    method: 'POST',
    data,
  });
} 