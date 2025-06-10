import React from 'react';
import { GoogleLogin } from '@react-oauth/google';
import { loginWithGoogle } from "@/services/User/Auth";
import { message } from "antd";
import { setAuthToken } from "@/utils/localStorage";

const GoogleLoginButton = () => {
    const handleSuccess = async (credentialResponse) => {
        const id_token = credentialResponse.credential;
        try {
            const res = await loginWithGoogle({ id_token });
            const response = res.data?.data.access_token;
            if (response) {
                setAuthToken(response);
                message.success("Đăng nhập Google thành công!");
                setTimeout(() => window.location.href = "/user/dashboard", 500);
            }
        } catch (err) {
            message.error("Đăng nhập Google thất bại!");
        }
    };

    return (
        <GoogleLogin
            onSuccess={handleSuccess}
            onError={() => message.error("Đăng nhập Google thất bại!")}
            width="100%"
        />
    );
};

export default GoogleLoginButton;
