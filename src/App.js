import React from 'react';
import SearchField from './components/SearchField.js';
import GifList from './components/GifList';
import axios from 'axios';

class App extends React.Component {

    constructor() {
        super();
        this.state = {
            gifs: []
        }
    }

    searchGif = (term) => {
        console.log(term);
        const url = 'http://api.giphy.com/v1/gifs/trending?api_key=9S4WDGPk7Csoi0lZi4HPSHIwlejTxR2I';
        axios.get(url).then(result => console.log(result.data.data[0]));
    }

    render() {
        return (
            <div className="App">
                <SearchField searchGif={this.searchGif} />
                <GifList gifs={this.state.gifs} />
            </div>
        );
    }
}

export default App;
