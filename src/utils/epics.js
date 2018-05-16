import {TestScheduler} from 'rxjs/Rx';
import {ActionsObservable} from 'redux-observable';

// Related docs
// https://www.nexthink.com/blog/marble-testing-redux-observable-epics/
// https://github.com/redux-observable/redux-observable/issues/108
// https://github.com/ReactiveX/rxjs/blob/master/doc/writing-marble-tests.md
// https://github.com/redux-observable/redux-observable/issues/144

const frames = (n, unit = '-') => {
    return n === 1 ? unit : unit + frames(n - 1, unit);
};

const createTestScheduler = () => new TestScheduler((actual, expected) =>
    expect(actual).toEqual(expected));

function createTestActionFromMarbles(testScheduler, marbles, values) {
    return new ActionsObservable(testScheduler.createHotObservable(marbles, values));
}

const expectEpic = (epic, dependencies, store, actions, beforeCallback) => {
    const testScheduler = createTestScheduler();

    const action$ = createTestActionFromMarbles(
        testScheduler,
        actions.i.t,
        actions.i.a
    );

    const epicDependencies = {
        ...dependencies,
        scheduler: testScheduler
    };

    if (beforeCallback) {
        beforeCallback(testScheduler);
    }


    const output = epic(action$, store, epicDependencies);

    testScheduler.expectObservable(output).toBe(actions.o.t, actions.o.a);
    testScheduler.flush();
};

export {
    expectEpic,
    frames,
    createTestScheduler
};