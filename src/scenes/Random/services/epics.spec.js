import React from 'react';
import {Observable} from 'rxjs';
import 'rxjs/add/operator/delay';
import {loadRandomEpic} from './epics';
import * as randomActions from './actions';
import {expectEpic} from "../../../utils/epics";


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

    describe('loadRandomEpic', () => {

        it('should receive LOAD_SUCCESS', () => {
            const dependencies = {
                giphyApi: {
                    loadRandom: () => Observable.of({
                        url: 'url 1'
                    })
                }
            };

            expectEpic(
                loadRandomEpic,
                dependencies,
                store,
                {
                    i: {t: 'a', a: {a: randomActions.loadRandom()}},
                    o: {
                        t: 'b', a: {
                            b: {
                                type: randomActions.LOAD_SUCCESS,
                                item: {
                                    url: 'url 1'
                                }
                            }
                        }
                    }
                }
            );
        });

        it('should not receive LOAD_SUCCESS if LOAD_CANCEL called', () => {
            const dependencies = {
                giphyApi: {
                    loadRandom: jest.fn()
                }
            };

            expectEpic(
                loadRandomEpic,
                dependencies,
                store,
                {
                    i: {
                        t: 'a-b', a: {
                            a: randomActions.loadRandom(),
                            b: randomActions.loadCancel()
                        }
                    },
                    o: {t: '----'}
                },
                (scheduler) => {
                    dependencies.giphyApi.loadRandom.mockReturnValue(Observable.of({url: 'url-1'}).delay(20, scheduler));
                }
            );
        });

    });
});