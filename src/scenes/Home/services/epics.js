import {combineEpics} from 'redux-observable';
import {Observable} from 'rxjs';

import * as actions from './actions';

export const loadEpic = (action$, store, {giphyApi}) =>
    action$.ofType(actions.SEARCH, actions.LOAD_MORE)
        .concatMap(action => {
            const homeState = store.getState().home;
            const clearItems = action.type === actions.SEARCH;
            const params = {
                q: homeState.query,
                limit: homeState.pageSize,
                offset: clearItems ? 0 : homeState.items.length
            };

            return giphyApi.loadByQuery(params)
                .map(response => {
                    return actions.loadSuccess(
                        {
                            items: response.data,
                            totalItems: response.pagination.total_count,
                            clearItems
                        }
                    );
                }).catch(error => {
                    return Observable.of(actions.loadError(error.message));
                }).takeUntil(action$.ofType(actions.LOAD_CANCEL));
        });


export default combineEpics(
    loadEpic
);