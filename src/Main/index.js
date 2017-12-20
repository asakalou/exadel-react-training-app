import Main from './containers/Main';
import mainReducer from './services/reducer';
import * as mainActions from './services/actions';
import mainEpic from './services/epics';


export {
    Main as default,
    mainActions,
    mainReducer,
    mainEpic
};