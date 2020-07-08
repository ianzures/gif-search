import React from 'react';
import GifCard from './GifCard';

const GifList = (props) => {
    const gifItems = props.gifs.map(image => {
        return <GifCard key={image.id} gif={image} />
    });

    return (
        <ul>{gifItems}</ul>
    );
};

export default GifList;