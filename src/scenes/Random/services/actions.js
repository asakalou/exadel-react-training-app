export const LOAD_RANDOM = 'random/load-random';
export const UPDATE_INTERVAL = 'random/update-interval';
export const LOAD_SUCCESS = 'random/load-success';
export const LOAD_ERROR = 'random/load-error';

export const loadRandom = () => {
    return {type: LOAD_RANDOM}
};

export const loadSuccess = (item) => {
    return {type: LOAD_SUCCESS, item}
};

export const loadError = (error) => {
    return {type: LOAD_ERROR, error}
};

export const updateInterval = (interval) => {
    return {type: UPDATE_INTERVAL, interval}
};

