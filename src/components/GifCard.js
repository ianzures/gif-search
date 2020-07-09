import React from 'react';

const item = {
    boxShadow: '2px 2px 4px 0 #ccc',
    boxSizing: 'borderBox',
    margin: '0 0 1.5em',
    padding: '1em',
}

const GifCard = (image) => {
    return (
        <span>
            <img style={item} src={image.gif.images.downsized.url} alt="" />
        </span>
    )
};

export default GifCard;
