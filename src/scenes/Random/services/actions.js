export const LOAD_RANDOM = 'random/load-random';
export const LOAD_SUCCESS = 'random/load-success';
export const LOAD_ERROR = 'random/load-error';
export const LOAD_CANCEL = 'random/load-cancel';
export const START_TIMER = 'random/start-timer';
export const STOP_TIMER = 'random/stop-timer';
export const CHANGE_INTERVAL = 'random/change-interval';

export const loadRandom = () => {
    return {type: LOAD_RANDOM}
};

export const loadSuccess = (item) => {
    return {type: LOAD_SUCCESS, item}
};

export const loadError = (error) => {
    return {type: LOAD_ERROR, error}
};

export const loadCancel = () => {
    return {type: LOAD_CANCEL}
};

export const startTimer = () => {
    return {type: START_TIMER}
};

export const stopTimer = () => {
    return {type: STOP_TIMER}
};

export const changeInterval = (interval) => {
    return {type: CHANGE_INTERVAL, interval}
};

