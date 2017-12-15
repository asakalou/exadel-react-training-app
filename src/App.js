import React, { Component } from 'react';
import './App.css';

import {createStore, combineReducers, applyMiddleware, compose} from 'redux';
import {Provider } from 'react-redux';
import createHistory from 'history/createBrowserHistory';
import {Route, Link} from 'react-router-dom';
import {ConnectedRouter, routerReducer, routerMiddleware} from 'react-router-redux';
import { createEpicMiddleware, combineEpics } from 'redux-observable';

import loggerMiddleware from './services/logger-middleware';

import Home, {homeReducer, homeEpic} from "./scenes/Home";
import Random, {randomReducer, randomEpic} from "./scenes/Random";
import giphyApi from './services/api/giphy';

// configuring router and router middleware
const history = createHistory();
const routerHistoryMiddleware = routerMiddleware(history);

// configuring epics (side effects and middleware)
const rootEpic = combineEpics(
    homeEpic,
    randomEpic
);
const epicMiddleware = createEpicMiddleware(rootEpic, {
    dependencies: {
        giphyApi
    }
});

// needed to setup redux dev tools
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;


// creating the store
const store = createStore(
    combineReducers({
        router: routerReducer,
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


class App extends Component {
  render() {
    return (
      <div className="app">
        <Provider store={store}>
            <ConnectedRouter history={history}>
                <div>
                    <header>
                        <ul>
                            <li><Link to="/">Home</Link></li>
                            <li><Link to="/random">Random</Link></li>
                        </ul>
                    </header>


                    <Route exact path="/" component={Home}/>
                    <Route exact path="/random" component={Random}/>
                </div>
            </ConnectedRouter>
        </Provider>
      </div>
    );
  }
}

export default App;
