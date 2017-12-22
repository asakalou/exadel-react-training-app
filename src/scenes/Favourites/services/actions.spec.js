import React from 'react';
import * as actions from './actions';

describe('favouritesActions', () => {

    it('should return action with type LOAD_FAVOURITES', () => {
        const action = actions.loadFavourites();

        expect(action).toEqual({type: actions.LOAD_FAVOURITES});
    });

});