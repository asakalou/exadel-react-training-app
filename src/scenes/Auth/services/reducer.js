import * as actions from './actions';


export const defaultState = {
    user: null,
    token: null,
    loggedIn: false,
    refreshToken: null,
    loading: false,
    error: null
};

const reducer = (state = defaultState, action) => {
    switch (action.type) {

        case actions.REGISTER:
        case actions.LOGIN: {
            return {
                ...state,
                loading: true
            };
        }

        case actions.REGISTER_SUCCESS:
        case actions.LOGIN_SUCCESS: {
            return {
                ...state,
                user: action.user,
                token: action.token,
                refreshToken: action.refreshToken,
                loggedIn: true,
                loading: false
            };
        }

        case actions.REGISTER_ERROR:
        case actions.LOGIN_ERROR: {
            return {
                ...state,
                error: action.error,
                loading: false
            };
        }

        case actions.REGISTER_CANCEL:
        case actions.LOGIN_CANCEL: {
            return {
                ...state,
                loading: false
            };
        }

        case actions.LOGOUT: {
            return defaultState;
        }


        default:
            return state;
    }
};

export default reducer;