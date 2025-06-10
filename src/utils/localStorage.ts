const AUTH_TOKEN_STORE_KEY = 'userToken';
const AUTH_TOKEN_ADMIN_STORE_KEY = 'adminToken';

export const removeAuthToken = () => {
    return localStorage.removeItem(AUTH_TOKEN_STORE_KEY);
}

export const setAuthToken = (token: string) => {
    return localStorage.setItem(AUTH_TOKEN_STORE_KEY, token);
};

export const getAuthToken = () => {
    return localStorage.getItem(AUTH_TOKEN_STORE_KEY)
}

export const hasAuthToken = () => {
    return !!getAuthToken();
}

export const removeAuthTokenAdmin = () => {
    return localStorage.removeItem(AUTH_TOKEN_ADMIN_STORE_KEY);
}

export const setAuthTokenAdmin = (token: string) => {
    return localStorage.setItem(AUTH_TOKEN_ADMIN_STORE_KEY, token);
}

export const getAuthTokenAdmin = () => {
    return localStorage.getItem(AUTH_TOKEN_ADMIN_STORE_KEY)
}

export const removeItem = (name: string) => {
    return localStorage.removeItem(name);
}