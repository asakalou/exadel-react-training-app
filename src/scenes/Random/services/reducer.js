import * as actions from './actions';


export const defaultState = {
    item: null,
    interval: 5,
    timerStarted: false,
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

        case actions.LOAD_CANCEL: {
            return {
                ...state,
                loading: false,
                error: null
            }
        }

        case actions.START_TIMER: {
            return {
                ...state,
                timerStarted: true
            }
        }

        case actions.STOP_TIMER: {
            return {
                ...state,
                timerStarted: false
            }
        }

        case actions.CHANGE_INTERVAL: {
            return {
                ...state,
                interval: action.interval
            }
        }

        default:
            return state;
    }
};

export default reducer;