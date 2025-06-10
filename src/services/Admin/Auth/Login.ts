// api.ts

import request from '@/utils/axios';

interface LoginParams {
    phone: string;
    password: string;
  }
  
  interface LoginResponse {
    token: string;
    [key: string]: any; // phòng trường hợp API trả thêm dữ liệu
  }
  
  export async function loginApi(data: { phone: string; password: string }): Promise<any> {
    return request('http://localhost:3456/admin/auth/login', {
      method: 'POST',
      data,
    });
  }

  export async function logoutAdmin() {
    return request('http://localhost:3456/admin/auth/logout', {
      method: 'POST'
    })
  }