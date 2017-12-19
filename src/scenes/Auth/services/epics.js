import {combineEpics} from 'redux-observable';
import {Observable} from 'rxjs';
import errorToMessage from "../../../services/errors/errorToMessage";

import * as actions from './actions';

export const loginEpic = (action$, store, {appApi}) =>
    action$.ofType(actions.LOGIN)
        .switchMap(action => {
            return appApi.login(action.email, action.password)
                .map(response => {
                    const user = {
                        id: response.localId,
                        email: action.email
                    };
                    return actions.loginSuccess(
                        response.idToken,
                        response.refreshToken,
                        user
                    );
                }).catch(error => {
                    return Observable.of(
                        actions.loginError(errorToMessage(error.response.error.message))
                    );
                }).takeUntil(action$.ofType(actions.LOGIN_CANCEL));
        });

export const signUpEpic = (action$, store, {appApi}) =>
    action$.ofType(actions.REGISTER)
        .switchMap(action => {
            return appApi.signUp(action.email, action.password)
                .map(response => {
                    const user = {
                        id: response.localId,
                        email: action.email
                    };
                    return actions.registerSuccess(
                        response.idToken,
                        response.refreshToken,
                        user
                    );
                }).catch(error => {
                    return Observable.of(
                        actions.registerError(errorToMessage(error.response.error.message))
                    );
                }).takeUntil(action$.ofType(actions.REGISTER_CANCEL));
        });


export default combineEpics(
    loginEpic,
    signUpEpic
);