import {combineEpics} from 'redux-observable';
import giphyApi from '../../../services/api/giphy';

import * as actions from './actions';
import {Observable} from "rxjs";

const loadRandomEpic = action$ =>
    action$.ofType(actions.LOAD_RANDOM)
        .switchMap(action => {
            return giphyApi.loadRandom()
                .map(response => {
                    return actions.loadSuccess(response.data);
                })
                .catch(error => {
                    return Observable.of(actions.loadError(error.message));
                });
        });

export default combineEpics(
    loadRandomEpic
);


