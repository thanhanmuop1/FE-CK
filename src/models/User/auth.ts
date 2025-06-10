import { loginUser, registerUser, logoutUser } from '@/services/User/Auth/index';
import { setAuthToken, removeAuthToken } from '@/utils/localStorage'

export async function handleLogin(form: { email: string; password: string }) {
  if (!form.email || !form.password) {
    return { error: 'Vui lòng nhập đầy đủ thông tin!' };
  }
  try {
    const response = await loginUser(form);
    if (response.data && response.data.data && response.data.data) {
      setAuthToken(response.data.data.access_token);
    }
    return { success: 'Đăng nhập thành công!' };
  } catch (err: any) { 
    return { error: err?.message || 'Đăng nhập thất bại!' };
  }
}

export async function handleRegister(form: { email: string; password: string; name: string; phone: string }) {
  if (!form.email || !form.password || !form.name || !form.phone) {
    return { error: 'Vui lòng nhập đầy đủ thông tin!' };
  }
  try {
    await registerUser(form);
    return { success: 'Đăng ký thành công!' };
  } catch (err: any) {
    return { error: err?.message || 'Đăng ký thất bại!' };
  }
}

export async function handleLogout() {
  try {
    await logoutUser({});
    removeAuthToken();
  } catch (err) {
    console.error('Đăng xuất thất bại:', err);
  }
}