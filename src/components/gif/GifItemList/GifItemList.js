import React from 'react';
import GifItem from '../GifItem';

import './GifItemList.css';

const GifItemList = ({items}) => {
    return (
        <div className="gif-item-list">
            {items.map(item => {
                return <GifItem key={item.id} url={item.images.fixed_width.url} alt={item.slug}/>;
            })}
        </div>
    );
};

export default GifItemList;