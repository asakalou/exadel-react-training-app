import React from 'react';

import homeReducer, {defaultState} from './reducer';
import * as actions from './actions'
import {LOAD_MORE} from "./actions";

describe('homeReducer', () => {


    describe('Unknown action', () => {
        it('should return previous state on unknown action', () => {
            const currentState = {
                ...defaultState
            };

            const newState = homeReducer(currentState, {type: 'unknown'});

            expect(newState).toEqual(currentState);
        });
    });



    describe('QUERY_CHANGE', () => {
        it('should handle QUERY_CHANGE', () => {
            const currentState = {
                ...defaultState,
                tempQuery: ''
            };

            const newState = homeReducer(currentState, {type: actions.QUERY_CHANGE, query: 'test query'});

            expect(newState).toEqual({
                ...defaultState,
                tempQuery: 'test query'
            });
        });
    });

    describe('SEARCH', () => {
        it('should handle SEARCH', () => {
            const currentState = {
                ...defaultState,
                tempQuery: 't query',
                error: 'error',
                loading: false
            };

            const newState = homeReducer(currentState, {type: actions.SEARCH});

            expect(newState).toEqual({
                ...defaultState,
                query: 't query',
                tempQuery: 't query',
                loading: true,
                error: 'error'
            });
        });
    });

    describe('LOAD_MORE', () => {
        it('should handle LOAD_MORE', () => {
            const currentState = {
                ...defaultState,
                loading: false,
                error: 'error'
            };

            const newState = homeReducer(currentState, {type: LOAD_MORE});

            expect(newState).toEqual({
                ...currentState,
                loading: true
            });
        });
    });

    describe('LOAD_SUCCESS', () => {
        it('should handle LOAD_SUCCESS and clear items', () => {
            const currentState = {
                ...defaultState,
                items: [{title: 1}],
                loading: true,
                error: 'error'
            };
            const payload = {
                items: [{title: 2}, {title: 3}],
                clearItems: true,
                totalItems: 2
            };

            const newState = homeReducer(currentState, {type: actions.LOAD_SUCCESS, payload});

            expect(newState).toEqual({
                ...defaultState,
                items: [{title: 2}, {title: 3}],
                totalItems: 2,
                loading: false,
                error: null
            });
        });

        it('should handle LOAD_SUCCESS and append items', () => {
            const currentState = {
                ...defaultState,
                items: [{title: 1}],
                loading: true,
                error: 'error'
            };
            const payload = {
                items: [{title: 2}, {title: 3}],
                clearItems: false,
                totalItems: 3
            };

            const newState = homeReducer(currentState, {type: actions.LOAD_SUCCESS, payload});

            expect(newState).toEqual({
                ...defaultState,
                items: [{title: 1}, {title: 2}, {title: 3}],
                totalItems: 3,
                loading: false,
                error: null
            });
        });
    });

    describe('LOAD_ERROR', () => {
        it('should handle LOAD_ERROR', () => {
            const currentState = {
                ...defaultState,
                loading: true
            };

            const newState = homeReducer(currentState, {type: actions.LOAD_ERROR, error: 'error message'});

            expect(newState).toEqual({
                ...defaultState,
                loading: false,
                error: 'error message'
            });
        });
    });

    describe('LOAD_CANCEL', () => {
        it('should handle LOAD_CANCEL', () => {
            const currentState = {
                ...defaultState,
                loading: true
            };

            const newState = homeReducer(currentState, {type: actions.LOAD_CANCEL});

            expect(newState).toEqual({
                ...defaultState,
                loading: false
            });
        });
    });

    describe('CHANGE_PAGE_SIZE', () => {
        it('should handle CHANGE_PAGE_SIZE', () => {
            const currentState = {
                ...defaultState,
                pageSize: 10
            };

            const newState = homeReducer(currentState, {type: actions.CHANGE_PAGE_SIZE, pageSize: 20});

            expect(newState).toEqual({
                ...defaultState,
                pageSize: 20
            });
        });
    });


});