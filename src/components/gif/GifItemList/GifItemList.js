import React from 'react';
import GifItem from '../GifItem';

import './GifItemList.css';
import {CSSTransitionGroup} from "react-transition-group";

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

export default GifItemList;