export const PRE_LOGIN = 'pre-login';

export const LOGIN = 'login/login';
export const LOGIN_SUCCESS = 'login/success';
export const LOGIN_ERROR = 'login/error';
export const LOGIN_CANCEL = 'login/cancel';

export const LOGOUT = 'logout/logout';
export const LOGOUT_SUCCESS = 'logout/logout-success';

export const REGISTER = 'register/register';
export const REGISTER_SUCCESS = 'register/success';
export const REGISTER_ERROR = 'register/error';
export const REGISTER_CANCEL = 'register/cancel';


export const preLogin = () => {
    return {
        type: PRE_LOGIN
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




