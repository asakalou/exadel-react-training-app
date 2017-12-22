import React from 'react';
import * as actions from './favouritesActions';

describe('appActions', () => {

    it('should return action with type TOGGLE_FAVOURITE_ITEM', () => {
        const action = actions.toggleFavouriteItem();

        expect(action).toEqual({type: actions.TOGGLE_FAVOURITE_ITEM});
    });

});