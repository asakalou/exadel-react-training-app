import React from 'react';

import {ActionsObservable} from 'redux-observable';
import {Observable} from 'rxjs';
import {loadFavouritesEpic} from './epics';
import * as favouritesActions from './actions';


describe('favouriteEpics', () => {

    const store = {
        getState: () => {
            return {}
        }
    };

    const action$ = ActionsObservable.of({type: favouritesActions.LOAD_FAVOURITES});

    describe('loadFavouritesEpic', () => {

        it('should receive LOAD_FAVOURITES_SUCCESS', () => {
            const dependencies = {
                appApi: {
                    loadFavourites: () => Observable.of({
                        items: [],
                        itemsIds: {},
                        totalItems: 0
                    })
                },
                appStorage: {
                    getUser: () => {
                        return {id: 1, token: 2}
                    }
                }
            };

            loadFavouritesEpic(action$, store, dependencies)
                .toArray()
                .subscribe(actions => {
                    expect(actions).toEqual([{
                        type: favouritesActions.LOAD_FAVOURITES_SUCCESS,
                        items: [],
                        itemsIds: {},
                        totalItems: 0
                    }]);
                })
        });

    });
});