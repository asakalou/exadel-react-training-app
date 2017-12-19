import {applyMiddleware, combineReducers, compose, createStore} from "redux";
import {routerMiddleware, routerReducer} from 'react-router-redux';
import {combineEpics, createEpicMiddleware} from 'redux-observable';

import {authEpic, authReducer} from "../../scenes/Auth";
import {homeEpic, homeReducer} from "../../scenes/Home";
import {randomEpic, randomReducer} from "../../scenes/Random";
import giphyApi from '../api/giphy';
import appApi from '../api/app';


export default (history) => {

    const routerHistoryMiddleware = routerMiddleware(history);

// configuring epics (side effects and middleware)
    const rootEpic = combineEpics(
        homeEpic,
        randomEpic,
        authEpic
    );
    const epicMiddleware = createEpicMiddleware(rootEpic, {
        dependencies: {
            giphyApi,
            appApi
        }
    });

// needed to setup redux dev tools
    const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;


// creating the store
    return createStore(
        combineReducers({
            router: routerReducer,
            auth: authReducer,
            home: homeReducer,
            random: randomReducer
        }),
        composeEnhancers(
            applyMiddleware(
                //   loggerMiddleware,
                routerHistoryMiddleware,
                epicMiddleware
            )
        )
    );

};