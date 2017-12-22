import * as localStore from 'store';

const ID_TOKEN = 'id_token';
const USER_ID = 'user_id';
const REFRESH_TOKEN = 'refresh_token';

export default {

    saveUserData: (idToken, refreshToken, userId) => {
        localStore.set(ID_TOKEN, idToken);
        localStore.set(REFRESH_TOKEN, refreshToken);
        localStore.set(USER_ID, userId);
    },

    getUser: () => {
        return {
            id: localStore.get(USER_ID),
            token: localStore.get(ID_TOKEN)
        }
    },

    clearData: () => {
        localStore.remove(ID_TOKEN);
        localStore.remove(REFRESH_TOKEN);
        localStore.remove(USER_ID);
    }

};