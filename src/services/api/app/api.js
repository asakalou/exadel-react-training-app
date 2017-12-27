import {ajax} from 'rxjs/observable/dom/ajax';
import {Observable} from 'rxjs';
import queryString from 'query-string';

const API_KEY = 'AIzaSyCWFTfVjyWhyvj3PlXMwOYiqp2CSpt7MDw';
const FIREBASE_DATA_URL = 'https://giphy-search-a225c.firebaseio.com';
const FIREBASE_AUTH_URL = 'https://www.googleapis.com/identitytoolkit/v3/relyingparty';

const SIGN_UP_URL = `${FIREBASE_AUTH_URL}/signupNewUser`;
const LOGIN_URL = `${FIREBASE_AUTH_URL}/verifyPassword`;
const ACCOUNT_INFO = `${FIREBASE_AUTH_URL}/getAccountInfo`;

const AUTH_CATCH_CB = ({response: {error: {message}}}) => {
    return Observable.throw(message);
};

const api = {
    signUp: (email, password) => {
        return request({
            url: SIGN_UP_URL,
            method: 'POST'
        }, null, {
            email,
            password,
            returnSecureToken: true
        });
    },

    login: (email, password) => {
        return request({
            url: LOGIN_URL,
            method: 'POST'
        }, null, {
            email,
            password,
            returnSecureToken: true
        }, AUTH_CATCH_CB);
    },

    getAccountInfo: (idToken) => {
        return request({
            url: ACCOUNT_INFO,
            method: 'POST'
        }, null, {
            idToken
        }, AUTH_CATCH_CB);
    },

    loadFavourites: (currentUser) => {
        return request({
            url: `${FIREBASE_DATA_URL}/users/${currentUser.id}/favourites.json`,
            method: 'GET'
        }, {
            auth: currentUser.token
        }).map(response => {
            const convertedResponse = {
                items: [],
                itemsIds: {}
            };

            if (response) {
                for (let key of Object.keys(response)) {
                    convertedResponse.items.push(response[key]);
                    convertedResponse.itemsIds[key] = true;
                }
            }

            return convertedResponse;
        });
    },

    addToFavourites: (item, currentUser) => {
        return request({
            url: `${FIREBASE_DATA_URL}/users/${currentUser.id}/favourites/${item.id}.json`,
            method: 'PUT'
        }, {auth: currentUser.token}, item);
    },

    removeFromFavourites: (item, currentUser) => {
        return request({
            url: `${FIREBASE_DATA_URL}/users/${currentUser.id}/favourites/${item.id}.json`,
            method: 'DELETE'
        }, {auth: currentUser.token}, item);
    }
};

const request = (config, params, body, catchCb) => {
    const rParams = queryString.stringify({
        key: API_KEY,
        ...params
    });

    return ajax({
        ...config,
        url: `${config.url}?${rParams}`,
        headers: {
            'Content-Type': 'application/json'
        },
        body
    }).map(response => response.response)
        .catch(catchCb);


};

export default api;