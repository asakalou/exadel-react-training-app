import React from 'react';
import * as actions from './actions';

describe('actions', () => {

    it('should return action with type SEARCH', () => {
        const action = actions.search();

        expect(action).toEqual({type: actions.SEARCH});
    });

    it('should return action with type QUERY_CHANGE', () => {
        const action = actions.queryChange();

        expect(action).toEqual({type: actions.QUERY_CHANGE});
    });

    it('should return action with type LOAD_MORE', () => {
        const action = actions.loadMore();

        expect(action).toEqual({type: actions.LOAD_MORE});
    });

    it('should return action with type LOAD_SUCCESS', () => {
        const action = actions.loadSuccess({clearItems: true, items: 10});

        expect(action).toEqual({type: actions.LOAD_SUCCESS, payload: {clearItems: true, items: 10}});
    });

    it('should return action with type LOAD_ERROR', () => {
        const action = actions.loadError();

        expect(action).toEqual({type: actions.LOAD_ERROR});
    });

    it('should return action with type LOAD_CANCEL', () => {
        const action = actions.loadCancel();

        expect(action).toEqual({type: actions.LOAD_CANCEL});
    });

    it('should return action with type ', () => {
        const action = actions.changePageSize(10);

        expect(action).toEqual({type: actions.CHANGE_PAGE_SIZE, pageSize: 10});
    });


});