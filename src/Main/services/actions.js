export const INIT_APP = 'main/init-app';
export const INIT_APP_SUCCESS = 'main/init-app-success';
export const INIT_APP_ERROR = 'main/init-app-error';


export const initApp = () => {
    return {
        type: INIT_APP
    };
};

export const initAppSuccess = () => {
    return {
        type: INIT_APP_SUCCESS
    };
};

export const initAppError = () => {
    return {
        type: INIT_APP_ERROR
    };
};






