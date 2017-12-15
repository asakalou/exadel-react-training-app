import React from 'react';

import {ActionsObservable} from 'redux-observable';
import {Observable} from 'rxjs';
import {loadRandomEpic} from './epics';
import * as randomActions from './actions';


describe('randomEpics', () => {

    const store = {
        getState: () => {
            return {
                random: {
                    item: null,
                    interval: 100
                }
            }
        }
    };

    const action$ = ActionsObservable.of({type: randomActions.LOAD_RANDOM});

    describe('loadRandomEpic', () => {

        it('should receive LOAD_SUCCESS', () => {
            const dependencies = {
                giphyApi: {
                    loadRandom: () => Observable.of({
                        url: 'url 1'
                    })
                }
            };

            loadRandomEpic(action$, store, dependencies)
                .toArray()
                .subscribe(actions => {
                    expect(actions).toEqual([{
                        type: randomActions.LOAD_SUCCESS,
                        item: {
                            url: 'url 1'
                        }
                    }]);
                })
        });

        it('should not receive LOAD_SUCCESS if LOAD_CANCEL called', () => {
            const dependencies = {
                giphyApi: {
                    loadRandom: () => Observable.of({
                        url: 'url 1'
                    })
                }
            };

            const actions$ = ActionsObservable.of(
                {type: randomActions.LOAD_RANDOM},
                {type: randomActions.LOAD_CANCEL}
            );

            loadRandomEpic(actions$, store, dependencies)
                .toArray()
                .subscribe(actions => {
                    expect(actions.length).toBe(0);
                })
        });

    });
});