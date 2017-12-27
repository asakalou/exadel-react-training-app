import {routerReducer} from 'react-router-redux';
import {combineReducers} from "redux";
import {authReducer} from "../../scenes/Auth";
import homeReducer from "../../scenes/Home/services/reducer";
import {randomReducer} from "../../scenes/Random";
import {favouritesReducer} from "../../scenes/Favourites";
import {mainReducer} from "../../Main";
import {authActions} from '../../scenes/Auth';


const reducers = combineReducers({
    router: routerReducer,
    main: mainReducer,
    auth: authReducer,
    home: homeReducer,
    random: randomReducer,
    favourites: favouritesReducer
});

export default (state, action) => {
    switch (action.type) {
        case authActions.LOGIN_SUCCESS: {
            const {router, main} = state;
            state = {
                router,
                main
            };
        }
    }

    return reducers(state, action)
};