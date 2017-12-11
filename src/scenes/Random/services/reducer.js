import * as actions from './actions';


const defaultState = {
    item: null,
    interval: 500,
    loading: false,
    error: null
};

const reducer = (state = defaultState, action) => {
    switch (action.type) {
        case actions.LOAD_RANDOM: {
            return {
                ...state,
                loading: true
            }
        }

        case actions.LOAD_SUCCESS: {
            return {
                ...state,
                item: action.item,
                loading: false,
                error: null
            }
        }

        case actions.LOAD_ERROR: {
            return {
                ...state,
                loading: false,
                error: action.error
            }
        }

        default:
            return state;
    }
};

export default reducer;