import {combineEpics} from 'redux-observable';

import * as actions from './actions';
import {Observable} from "rxjs";
import errorToMessage from "../../../services/errors/errorToMessage";
import {appActions} from "../../../services/store";
import * as localStore from 'store';


export const preLoginEpic = (action$, store, {appApi}) =>
    action$.ofType(actions.PRE_LOGIN)
        .switchMap(action => {
            const idToken = localStore.get('idToken');

            return appApi.getAccountInfo(idToken)
                .map(({users}) => {
                    const {
                        localId: id,
                        email,
                        idToken,
                        refreshToken
                    } = users[0];

                    return actions.loginSuccess(idToken, refreshToken, {id, email});
                })
                .catch(error => {
                    return appActions.emptyAction();
                });
        });


export const loginEpic = (action$, store, {appApi}) =>
    action$.ofType(actions.LOGIN)
        .switchMap(action => {
            return appApi.login(action.email, action.password)
                .map(({idToken, refreshToken, localId}) => {
                    const user = {
                        id: localId,
                        email: action.email
                    };

                    localStore.set('idToken', idToken);
                    localStore.set('refreshToken', refreshToken);

                    return actions.loginSuccess(idToken, refreshToken, user);
                })
                .catch((error) => {
                    return Observable.of(
                        actions.loginError(errorToMessage(error))
                    );
                })
                .takeUntil(action$.ofType(actions.LOGIN_CANCEL));
        });

export const logoutEpic = (action$, store) =>
    action$.ofType(actions.LOGOUT)
        .switchMap(action => {
            localStore.remove('idToken');
            localStore.remove('refreshToken');

            return Observable.of(actions.logoutSuccess());
        });

export const signUpEpic = (action$, store, {appApi}) =>
    action$.ofType(actions.REGISTER)
        .switchMap(action => {
            return appApi.signUp(action.email, action.password)
                .map(({idToken, refreshToken, localId}) => {
                    const user = {
                        id: localId,
                        email: action.email
                    };

                    return actions.registerSuccess(idToken, refreshToken, user);
                })
                .catch(error => {
                    return Observable.of(
                        actions.registerError(errorToMessage(error))
                    );
                })
                .takeUntil(action$.ofType(actions.REGISTER_CANCEL));
        });


export default combineEpics(
    preLoginEpic,
    loginEpic,
    logoutEpic,
    signUpEpic
);