export const LOAD_FAVOURITES = 'favourites/load';
export const LOAD_FAVOURITES_SUCCESS = 'favourites/load-success';
export const LOAD_FAVOURITES_ERROR = 'favourites/load-error';
export const LOAD_FAVOURITES_CANCEL = 'favourites/load-cancel';

export const loadFavourites = () => {
    return {type: LOAD_FAVOURITES}
};

export const loadFavouritesSuccess = (items, itemsIds, totalItems) => {
    return {type: LOAD_FAVOURITES_SUCCESS, items, itemsIds, totalItems}
};

export const loadFavouritesError = (error) => {
    return {type: LOAD_FAVOURITES_ERROR, error}
};

export const loadFavouritesCancel = () => {
    return {type: LOAD_FAVOURITES_CANCEL}
};




