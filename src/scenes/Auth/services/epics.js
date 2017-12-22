import {combineEpics} from 'redux-observable';
import appStorage from '../../../services/api/storage';
import {Observable} from 'rxjs';
import errorToMessage from '../../../services/errors/errorToMessage';
import * as actions from './actions';


export const loginEpic = (action$, store, {appApi, appStorage}) =>
    action$.ofType(actions.LOGIN)
        .switchMap(action => {
            return appApi.login(action.email, action.password)
                .map(({idToken, refreshToken, localId}) => {
                    const user = {
                        id: localId,
                        email: action.email
                    };

                    appStorage.saveUserData(idToken, refreshToken, localId);

                    return actions.loginSuccess(idToken, refreshToken, user);
                })
                .catch((error) => {
                    return Observable.of(
                        actions.loginError(errorToMessage(error))
                    );
                })
                .takeUntil(action$.ofType(actions.LOGIN_CANCEL));
        });


export const logoutEpic = (action$, store, {appStorage}) =>
    action$.ofType(actions.LOGOUT)
        .switchMap(action => {
            appStorage.clearData();

            return Observable.of(actions.logoutSuccess());
        });

export const signUpEpic = (action$, store, {appApi, appStorage}) =>
    action$.ofType(actions.REGISTER)
        .switchMap(action => {
            return appApi.signUp(action.email, action.password)
                .map(({idToken, refreshToken, localId}) => {
                    const user = {
                        id: localId,
                        email: action.email
                    };

                    appStorage.saveUserData(idToken, refreshToken, localId);

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
    loginEpic,
    logoutEpic,
    signUpEpic
);