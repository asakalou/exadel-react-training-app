import React from 'react';
import PropTypes from 'prop-types';
import GifItem from '../GifItem';

import './GifItemList.css';
import {CSSTransitionGroup} from "react-transition-group";

const propTypes = {
    /** list of gif items */
    items: PropTypes.arrayOf(PropTypes.shape({
        id: PropTypes.string.isRequired,
        images: PropTypes.shape({
            slug: PropTypes.string,
            fixed_width: PropTypes.shape({
                url: PropTypes.string.isRequired
            }).isRequired
        }).isRequired
    }))
};

/**
 * Display list of gif item components
 */
const GifItemList = ({items, favouriteItems, fav, onFavClick}) => {
    return (
        <CSSTransitionGroup
            component="div"
            className="gif-item-list"
            transitionName="example"
            transitionEnterTimeout={1500}
            transitionLeaveTimeout={700}>
            {items.map(item => {
                return (
                    <GifItem
                        fav={fav}
                        favourite={fav ? favouriteItems[item.id] : false}
                        key={item.id}
                        url={item.images.fixed_width.url}
                        alt={item.slug}
                        onFavClick={() => onFavClick(item)}/>
                );
            })}
        </CSSTransitionGroup>
    );
};

GifItemList.propTypes = propTypes;

GifItemList.defaultProps = {
    items: []
};

export default GifItemList;