import React from 'react';
import SearchField from './components/SearchField.js';
import GifList from './components/GifList';


class App extends React.Component {

    constructor() {
        super();
        this.state = {
            gifs: [
                {
                    id: 1,
                    url: 'http://fakeimg.pl/300/'
                },
                {
                    id: 2,
                    url: 'http://fakeimg.pl/300/'
                },
                {
                    id: 3,
                    url: 'http://fakeimg.pl/300/'
                }
            ]
        }
    }

    render() {
        return (
            <div className="App">
                <SearchField />
                <GifList gifs={this.state.gifs}/>
            </div>
        );
    }
}

export default App;
