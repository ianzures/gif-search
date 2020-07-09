import React from 'react';
import SearchField from './components/SearchField';
import GifList from './components/GifList';
import axios from 'axios';


/******************************************************
 * rare case user might not exist
 * 
 * filter by
 *          age rating
 *          height and width
 *          time since upload
 *          username
 *          verified user
 * 
 * sort by
 *          age rating
 *          size
 *          time since upload
 * 
 * 
 * 
 * 
 * */
class App extends React.Component {
    constructor() {
        super();
        this.state = {
            gifs: []
        }
    }

    componentDidMount() {
        axios.get('http://api.giphy.com/v1/gifs/trending?api_key=9S4WDGPk7Csoi0lZi4HPSHIwlejTxR2I')
            .then(result => {
                console.log(result.data.data);
                this.setState({ gifs : result.data.data });
            })
            .catch(err => console.error(err));
    }

    handleChange = (search) => {
        axios.get(`http://api.giphy.com/v1/gifs/search?q=${search.replace(/\s/g, '+')}&api_key=9S4WDGPk7Csoi0lZi4HPSHIwlejTxR2I`)
            .then(result => {
                this.setState({ gifs: result.data.data });
            })
            .catch(err => console.error(err));        
    }

    render() {
        return (
            <div>
                <SearchField handleChange={this.handleChange} />
                <GifList gifs={this.state.gifs} />
            </div>
        );
    }
}

export default App;


