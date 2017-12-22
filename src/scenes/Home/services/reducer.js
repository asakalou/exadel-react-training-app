import * as actions from './actions';


export const defaultState = {
    query: '',
    tempQuery: '',
    items: [],
    totalItems: 0,
    pageSize: 12,
    initialized: false, // this flag identifies that we ran the search at least one time
    loading: false,
    error: null
};

const reducer = (state = defaultState, action) => {
    switch (action.type) {
        case actions.QUERY_CHANGE: {
            return {
                ...state,
                tempQuery: action.query
            };
        }

        case actions.SEARCH: {
            return {
                ...state,
                query: state.tempQuery,
                loading: true
            }
        }

        case actions.LOAD_MORE: {
            return {
                ...state,
                loading: true
            }
        }

        case actions.LOAD_SUCCESS: {
            const payload = action.payload;
            const currentItems = payload.clearItems ? [] : state.items;
            const items = currentItems.concat(payload.items);
            const hasMoreItems = (payload.totalItems != null && items.length < payload.totalItems)
                || (payload.totalItems == null && payload.items.length > 0);

            return {
                ...state,
                loading: false,
                totalItems: payload.totalItems,
                items,
                hasMoreItems: hasMoreItems,
                initialized: true,
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

        case actions.LOAD_CANCEL: {
            return {
                ...state,
                loading: false
            }
        }

        case actions.CHANGE_PAGE_SIZE: {
            return {
                ...state,
                pageSize: action.pageSize
            };
        }


        default:
            return state;
    }
};

export default reducer;