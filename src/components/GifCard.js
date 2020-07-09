import React from 'react';

const item = {
    boxShadow: '2px 2px 4px 0 #ccc',
    boxSizing: 'borderBox',
    display: 'inlineBlock',
    margin: '0 0 1.5em',
    padding: '1em',
    //width: '100 %',
}

const GifCard = (image) => {
    return (
        <span>
            <img style={item} src={image.gif.images.downsized.url} alt="" />
        </span>
    )
};

export default GifCard;
