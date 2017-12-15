import React from 'react';

import {ActionsObservable} from 'redux-observable';
import {Observable} from 'rxjs';
import {loadEpic} from './epics';
import * as homeActions from './actions';

describe('homeEpic', () => {

    const store = {
        getState: () => {
            return {
                home: {
                    query: 'q',
                    pageSize: 10,
                    items: [{title: 1}]
                }
            }
        }
    };

    const epicConfigs = [
        {
            name: homeActions.SEARCH,
            action$: ActionsObservable.of({type: homeActions.SEARCH})
        },
        {
            name: homeActions.LOAD_MORE,
            action$: ActionsObservable.of({type: homeActions.LOAD_MORE})}
    ];

    epicConfigs.map(config => {
        describe(config.name, () => {
            it('should receive LOAD_SUCCESS', () => {
                const dependencies = {
                    giphyApi: {
                        loadByQuery: () => Observable.of({
                            data: [{title: 1}],
                            pagination: {
                                total_count: 10
                            }
                        })
                    }
                };

                loadEpic(config.action$, store, dependencies)
                    .toArray()
                    .subscribe(actions => {
                        expect(actions).toEqual([{
                            type: homeActions.LOAD_SUCCESS,
                            payload: {
                                clearItems: config.name === homeActions.SEARCH,
                                items: [{title: 1}],
                                totalItems: 10
                            }
                        }]);
                    })
            });

            it('should receive LOAD_ERROR', () => {
                const dependencies = {
                    giphyApi: {
                        loadByQuery: () => Observable.throw({message: 'error message'})
                    }
                };

                loadEpic(config.action$, store, dependencies)
                    .toArray()
                    .subscribe(actions => {
                        expect(actions).toEqual([{
                            type: homeActions.LOAD_ERROR,
                            error: 'error message'
                        }]);
                    })
            });
        });
    });

});