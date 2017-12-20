import React from 'react';
import * as actions from './actions';

describe('randomActions', () => {

    it('should return action with type LOAD_RANDOM', () => {
        const action = actions.loadRandom();

        expect(action).toEqual({type: actions.LOAD_RANDOM});
    });

    it('should return action with type LOAD_SUCCESS', () => {
        const action = actions.loadSuccess({title: 1});

        expect(action).toEqual({type: actions.LOAD_SUCCESS, item: {title: 1}});
    });

    it('should return action with type LOAD_ERROR', () => {
        const action = actions.loadError('error message');

        expect(action).toEqual({type: actions.LOAD_ERROR, error: 'error message'});
    });

    it('should return action with type LOAD_CANCEL', () => {
        const action = actions.loadCancel();

        expect(action).toEqual({type: actions.LOAD_CANCEL});
    });

    it('should return action with type START_TIME', () => {
        const action = actions.startTimer();

        expect(action).toEqual({type: actions.START_TIMER});
    });

    it('should return action with type STOP_TIMER', () => {
        const action = actions.stopTimer();

        expect(action).toEqual({type: actions.STOP_TIMER});
    });

    it('should return action with type CHANGE_INTERVAL', () => {
        const action = actions.changeInterval(10);

        expect(action).toEqual({type: actions.CHANGE_INTERVAL, interval: 10});
    });

});