import React from 'react';
import PropTypes from 'prop-types';

import './GifItem.css';
import {Icon} from "semantic-ui-react";

const propTypes = {
    /** any valid url of gif image */
    url: PropTypes.string.isRequired,
    /** alternative text */
    alt: PropTypes.string.isRequired,
    /** is favourite or usual */
    favourite: PropTypes.bool,
    /** display favourite icon or not */
    fav: PropTypes.bool,
    /** click handler on fav icon */
    onFavClick: PropTypes.func
};

/**
 * Gif Item component.
 * Display gif for url.
 *
 * @version 1.0.0
 * @author me
 */
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
GifItem.defaultProps = {
    fav: false
};

export default GifItem;