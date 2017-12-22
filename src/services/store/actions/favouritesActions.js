export const TOGGLE_FAVOURITE_ITEM = 'app/favourites/toggle-favourite-item';

export const ADD_TO_FAVOURITES = 'app/favourites/add-to-favourites';
export const ADD_TO_FAVOURITES_SUCCESS = 'app/favourites/add-to-favourites/success';
export const ADD_TO_FAVOURITES_ERROR = 'app/favourites/add-to-favourites/error';

export const REMOVE_FROM_FAVOURITES = 'app/favourites/remove';
export const REMOVE_FROM_FAVOURITES_SUCCESS = 'app/favourites/remove-success';
export const REMOVE_FROM_FAVOURITES_ERROR = 'app/favourites/remove-error';

export const toggleFavouriteItem = (item) => {
    return {type: TOGGLE_FAVOURITE_ITEM, item};
};

export const addToFavourites = (item) => {
    return {type: ADD_TO_FAVOURITES, item};
};

export const addToFavouritesSuccess = (item) => {
    return {type: ADD_TO_FAVOURITES_SUCCESS, item};
};

export const addToFavouritesError = (error) => {
    return {type: ADD_TO_FAVOURITES_ERROR, error};
};

export const removeFromFavourites = (item) => {
    return {type: REMOVE_FROM_FAVOURITES, item}
};

export const removeFromFavouritesSuccess = () => {
    return {type: REMOVE_FROM_FAVOURITES_SUCCESS}
};

export const removeFromFavouritesError = () => {
    return {type: REMOVE_FROM_FAVOURITES_ERROR}
};