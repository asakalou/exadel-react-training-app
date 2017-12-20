import * as actions from './actions';


export const defaultState = {
    initialised: false
};

const reducer = (state = defaultState, action) => {
    switch (action.type) {

        case actions.INIT_APP: {
            return defaultState;
        }

        case actions.INIT_APP_SUCCESS: {
            return {
                ...state,
                initialised: true
            };
        }

        case actions.INIT_APP_ERROR: {
            return {
                ...state,
                initialised: true
            };
        }

        default:
            return state;
    }
};

export default reducer;