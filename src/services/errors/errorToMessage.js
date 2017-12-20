const CODES = {
    EMAIL_NOT_FOUND: 'There is no user record corresponding to this identifier. The user may have been deleted.',
    INVALID_PASSWORD: 'The password is invalid or the user does not have a password.',
    USER_DISABLED: 'The user account has been disabled by an administrator.',
    INVALID_EMAIL: 'Email is invalid.',
    MISSING_PASSWORD: 'Please enter password.',
    EMAIL_EXISTS: 'User with the same email already registered.',

    DEFAULT_MESSAGE: 'An error occurred.'
};



const errorToMessage = (code) => {
    return CODES[code] || CODES['DEFAULT_MESSAGE'];
};

export default errorToMessage;