import authReducer, {defaultState} from './reducer';

describe('authReducer', () => {

    describe('Unknown action', () => {
        it('should return previous state on unknown action', () => {
            const currentState = {
                ...defaultState
            };

            const newState = authReducer(currentState, {type: 'unknown'});

            expect(newState).toEqual(currentState);
        });
    });


});