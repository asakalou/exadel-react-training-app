import {combineEpics} from 'redux-observable';
import * as actions from './actions';
import {favouritesActions} from '../../../services/store';
import {authActions} from '../../Auth';
import {Observable} from 'rxjs';

export const loadFavouritesEpic = (action$, store, {appApi, appStorage}) =>
    action$.ofType(actions.LOAD_FAVOURITES, authActions.LOGIN_SUCCESS)
        .switchMap(action => {
            return appApi.loadFavourites(appStorage.getUser())
                .map(response => actions.loadFavouritesSuccess(response.items, response.itemsIds, response.items.length))
                .catch(error => Observable.of(actions.loadFavouritesError(error.message)))
                .takeUntil(action$.ofType(actions.LOAD_FAVOURITES_CANCEL));
        });

export const toggleFavouriteItemEpic = (action$, store) =>
    action$.ofType(favouritesActions.TOGGLE_FAVOURITE_ITEM)
        .switchMap(action => {
            const isSelected = store.getState().favourites.itemsIds[action.item.id];
            const toggleAction = isSelected ? favouritesActions.removeFromFavourites
                : favouritesActions.addToFavourites;

            return Observable.of(toggleAction(action.item));
        });

export const removeFromFavouritesEpic = (action$, store, {appApi, appStorage}) =>
    action$.ofType(favouritesActions.REMOVE_FROM_FAVOURITES)
        .switchMap(action => {
            return appApi.removeFromFavourites(action.item, appStorage.getUser())
                .flatMap(result => {
                    return Observable.concat(
                        Observable.of(favouritesActions.removeFromFavouritesSuccess()),
                        Observable.of(actions.loadFavourites()),
                    );
                })
                .catch(error => Observable.of(favouritesActions.removeFromFavouritesError(error)));
        });


export const addToFavouritesEpic = (action$, store, {appApi, appStorage}) =>
    action$.ofType(favouritesActions.ADD_TO_FAVOURITES)
        .switchMap(action => {
            return appApi.addToFavourites(action.item, appStorage.getUser())
                .flatMap(result => {
                    return Observable.concat(
                        Observable.of(favouritesActions.addToFavouritesSuccess(result)),
                        Observable.of(actions.loadFavourites())
                    );
                })
                .catch(error => Observable.of(favouritesActions.addToFavouritesError(error)));
        });


export default combineEpics(
    loadFavouritesEpic,
    toggleFavouriteItemEpic,
    removeFromFavouritesEpic,
    addToFavouritesEpic
);


