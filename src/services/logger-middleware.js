const loggerMiddleware = store => next => action => {
    console.log(`[State] - dispatch`, action, store.getState());

    const result = next(action);

    console.log(`[State] - updated`, store.getState());

    return result;
};

export default loggerMiddleware;