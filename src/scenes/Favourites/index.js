import Favourites from './containers/Favourites';
import favouritesReducer from './services/reducer';
import favouritesEpic from './services/epics';

export {
    Favourites as default,
    favouritesReducer,
    favouritesEpic
};