import React from 'react';

import './GifItem.css';

const GifItem = ({item}) => {
    return (
        <div className="gif-item">
            <img src={item.images.fixed_width.url} alt={item.slug}/>
        </div>
    )
};

export default GifItem;