import {ajax} from 'rxjs/observable/dom/ajax';
import {Observable} from 'rxjs';
import queryString from 'query-string';

const API_KEY = '<YOUR_API_KEY>';
const FIREBASE_URL = 'https://www.googleapis.com/identitytoolkit/v3/relyingparty';

const SIGN_UP_URL = `${FIREBASE_URL}/signupNewUser`;
const LOGIN_URL = `${FIREBASE_URL}/verifyPassword`;
const ACCOUNT_INFO = `${FIREBASE_URL}/getAccountInfo`;


const api = {
    signUp: (email, password) => {
        return request({
            url: SIGN_UP_URL,
            method: 'POST'
        }, {
            email,
            password,
            returnSecureToken: true
        });
    },

    login: (email, password) => {
        return request({
            url: LOGIN_URL,
            method: 'POST'
        }, {
            email,
            password,
            returnSecureToken: true
        });
    },

    getAccountInfo: (idToken) => {
        return request({
            url: ACCOUNT_INFO,
            method: 'POST'
        }, {
            idToken
        });
    }
};

const request = (config, body) => {
    const rParams = queryString.stringify({
        key: API_KEY
    });

    return ajax({
        ...config,
        url: `${config.url}?${rParams}`,
        headers: {
            'Content-Type': 'application/json'
        },
        body
    }).map(response => response.response)
        .catch(({response: {error: {message}}}) => {
            return Observable.throw(message);
        });


};

export default api;