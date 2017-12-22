import {applyMiddleware, compose, createStore} from "redux";
import {routerMiddleware} from 'react-router-redux';
import {combineEpics, createEpicMiddleware} from 'redux-observable';
import {authEpic} from "../../scenes/Auth";
import {homeEpic} from "../../scenes/Home";
import {randomEpic} from "../../scenes/Random";
import {favouritesEpic} from "../../scenes/Favourites";
import {mainEpic} from "../../Main";
import giphyApi from '../api/giphy';
import appApi from '../api/app';
import appStorage from '../api/storage';
import appReducer from "./appReducer";


export default (history) => {

    const routerHistoryMiddleware = routerMiddleware(history);

// configuring epics (side effects and middleware)
    const rootEpic = combineEpics(
        mainEpic,
        authEpic,
        homeEpic,
        randomEpic,
        favouritesEpic
    );
    const epicMiddleware = createEpicMiddleware(rootEpic, {
        dependencies: {
            giphyApi,
            appApi,
            appStorage
        }
    });

// needed to setup redux dev tools
    const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

// creating the store
    return createStore(
        appReducer,
        composeEnhancers(
            applyMiddleware(
                //   loggerMiddleware,
                routerHistoryMiddleware,
                epicMiddleware
            )
        )
    );

};