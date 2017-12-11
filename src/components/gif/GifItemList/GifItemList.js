import React from 'react';
import GifItem from '../GifItem';

import './GifItemList.css';

const GifItemList = ({items}) => {
    return (
        <div className="gif-item-list">
            {items.map(item => {
                return <GifItem key={item.id} item={item}/>;
            })}
        </div>
    );
};

export default GifItemList;