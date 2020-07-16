import React from 'react';
import GifCard from './GifCard';

const GifList = (props) => {
    const gifItems = props.gifs.map(image =>
        { return <GifCard key={image.id} gif={image} /> }
    );

    return (
        <div style={{paddingLeft:'2%',paddinLeft:'2%', columns:'35% 3'}}>
            {gifItems}
        </div>
    );
};

export default GifList;