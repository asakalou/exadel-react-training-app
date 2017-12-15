import React from 'react';
import PropTypes from 'prop-types';

import './GifItem.css';

const propTypes = {
    url: PropTypes.string.isRequired,
    alt: PropTypes.string.isRequired
};

const GifItem = ({url, alt}) => {
    return (
        <div className="gif-item">
            <img src={url} alt={alt}/>
        </div>
    )
};
GifItem.propTypes = propTypes;

export default GifItem;