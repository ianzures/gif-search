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

    sort = (event) => {
        let sorted = [];
        if (event.target.value === "ar") {
            let numG = 0;
            let numR = 1;
            this.state.gifs.forEach(gif => {
                if (gif.rating === 'g') {
                    numG++;
                    sorted.unshift(gif);
                }
                else if (gif.rating === 'r') {
                    numR++;
                    sorted.push(gif);
                }
                else if (gif.rating === 'pg') {
                    sorted.splice(numG,0,gif);
                }
                else {
                    sorted.splice(this.state.gifs.length-numR,0,gif);
                }
            });
            console.log(sorted);
            this.setState({ gifs: sorted });
        }
       
    }

    render() {
        return (
            <div>
                <SearchField handleChange={this.handleChange} />

                <label htmlFor="sort">Sort by </label>
                <select name="sort" id="sort" onChange={this.sort}>
                        <option value ="default"></option>
                        <option value="ar">Age Rating</option>
                        <option value="new">Newest First</option>
                        <option value="old">Oldest First</option>
                    </select>

                <GifList gifs={this.state.gifs} />
            </div>
        );
    }
}

export default App;


