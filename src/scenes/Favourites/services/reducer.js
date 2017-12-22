import * as actions from './actions';
import * as favouritesActions from '../../../services/store/actions/favouritesActions';

export const defaultState = {
    items: [],
    itemsIds: {},
    totalItems: 0,
    initialized: false,
    loading: false,
    error: null
};

const reducer = (state = defaultState, action) => {
    switch (action.type) {
        case actions.LOAD_FAVOURITES: {
            return {
                ...state,
                loading: true
            }
        }

        case actions.LOAD_FAVOURITES_SUCCESS: {
            return {
                ...state,
                items: action.items,
                itemsIds: action.itemsIds,
                totalItems: action.totalItems,
                initialized: true,
                loading: false,
                error: null
            }
        }

        case actions.LOAD_FAVOURITES_ERROR: {
            return {
                ...state,
                loading: false,
                error: action.error
            }
        }

        case favouritesActions.REMOVE_FROM_FAVOURITES: {
            return {
                ...state,
                loading: true
            }
        }

        case favouritesActions.REMOVE_FROM_FAVOURITES_SUCCESS: {
            return {
                ...state,
                loading: false,
                error: null
            }
        }

        case favouritesActions.REMOVE_FROM_FAVOURITES_ERROR: {
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