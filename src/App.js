import React, {Component} from 'react';
import 'semantic-ui-css/semantic.min.css';
import './App.css';

import {Provider} from 'react-redux';
import createHistory from 'history/createBrowserHistory';
import {ConnectedRouter} from 'react-router-redux';
import createStore from "./services/store/createStore";
import Main from "./Main";


const history = createHistory();
const store = createStore(history);



class App extends Component {
    render() {
        return (
            <div className="app">
                <Provider store={store}>
                    <ConnectedRouter history={history}>
                        <Main/>
                    </ConnectedRouter>
                </Provider>
            </div>
        );
    }
}

export default App;
