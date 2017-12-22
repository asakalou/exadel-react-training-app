import React from 'react';
import PropTypes from 'prop-types';

import './GifItem.css';
import {Icon} from "semantic-ui-react";

const propTypes = {
    url: PropTypes.string.isRequired,
    alt: PropTypes.string.isRequired,
    favourite: PropTypes.bool,
    fav: PropTypes.bool,
    onFavClick: PropTypes.func
};

const GifItem = ({url, alt, favourite, fav, onFavClick}) => {
    return (
        <div className="gif-item">
            <img src={url} alt={alt}/>
            {fav ?
                <div className="gif-item-fav">
                    <Icon link name="star" color={favourite ? 'orange' : null} onClick={onFavClick}/>
                </div>
                :
                null
            }
        </div>
    )
};
GifItem.propTypes = propTypes;

export default GifItem;