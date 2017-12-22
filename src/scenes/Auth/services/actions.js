export const CLEAR_AUTH_FORM_STATE = 'auth/clear-auth-form-state';

export const LOGIN = 'auth/login';
export const LOGIN_SUCCESS = 'auth/login/success';
export const LOGIN_ERROR = 'auth/login/error';
export const LOGIN_CANCEL = 'auth/login/cancel';

export const LOGOUT = 'auth/logout';
export const LOGOUT_SUCCESS = 'auth/logout-success';

export const REGISTER = 'auth/register';
export const REGISTER_SUCCESS = 'auth/register/success';
export const REGISTER_ERROR = 'auth/register/error';
export const REGISTER_CANCEL = 'auth/register/cancel';


export const clearAuthFormState = () => {
    return {
        type: CLEAR_AUTH_FORM_STATE
    };
};

export const login = (email, password) => {
    return {
        type: LOGIN,
        email,
        password
    };
};

export const loginSuccess = (token, refreshToken, user) => {
    return {
        type: LOGIN_SUCCESS,
        token,
        refreshToken,
        user
    };
};

export const loginError = (error) => {
    return {
        type: LOGIN_ERROR,
        error
    };
};

export const loginCancel = () => {
    return {
        type: LOGIN_CANCEL
    }
};

export const logout = () => {
    return {
        type: LOGOUT
    }
};

export const logoutSuccess = () => {
    return {
        type: LOGOUT_SUCCESS
    }
};

export const register = (email, password) => {
    return {
        type: REGISTER,
        email,
        password
    }
};

export const registerSuccess = (token, refreshToken, user) => {
    return {
        type: REGISTER_SUCCESS,
        token,
        refreshToken,
        user
    }
};

export const registerError = (error) => {
    return {
        type: REGISTER_ERROR,
        error
    }
};

export const registerCancel = () => {
    return {
        type: REGISTER_CANCEL
    }
};




