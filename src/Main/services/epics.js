import {combineEpics} from 'redux-observable';

import * as actions from './actions';
import {authActions} from '../../scenes/Auth';
import {appActions} from '../../services/store';
import {Observable} from 'rxjs';
import appStorage from '../../services/api/storage';


export const appInitEpic = (action$, store, {appApi}) =>
    action$.ofType(actions.INIT_APP)
        .switchMap(action => {

            const user = appStorage.getUser();
            const getAccountInfo = appApi.getAccountInfo(user.token)
                .map(({users}) => {
                    const {
                        localId: id,
                        email,
                        idToken,
                        refreshToken
                    } = users[0];

                    return authActions.loginSuccess(idToken, refreshToken, {id, email});
                })
                .catch(error => {
                    return Observable.of(appActions.emptyAction());
                });

            // https://www.learnrxjs.io/operators/combination/concat.html
            // using concat because we need sequence
            // pass appSuccess as soon as getAccountInfo completed
            return Observable.concat(
                getAccountInfo,
                Observable.of(actions.initAppSuccess())
            );
        });


export default combineEpics(
    appInitEpic
);