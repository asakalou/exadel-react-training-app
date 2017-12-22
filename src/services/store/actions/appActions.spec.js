import React from 'react';
import * as actions from './appActions';

describe('appActions', () => {

    it('should return action with type EMPTY_ACTION', () => {
        const action = actions.emptyAction();

        expect(action).toEqual({type: actions.EMPTY_ACTION});
    });

});