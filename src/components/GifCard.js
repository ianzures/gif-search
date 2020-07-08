import React from 'react';

const GifCard = (image) => {
    return (
        <li>
            <img src={image.gif.url} alt="" />
        </li>
    )
};

export default GifCard;
