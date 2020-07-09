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
        let sorted = this.state.gifs;
        if (event.target.value === "ar") {
            sorted.sort((a, b) => {
                if (a.rating < b.rating) {
                    return -1;
                }
                if (a.rating > b.rating) {
                    return 1;
                }
                return 0;

            });
            
            this.setState({ gifs: sorted });
        }
        else {
            sorted = this.state.gifs;
            sorted.sort((a, b) => {
                if (this.convertToDate(a) < this.convertToDate(b)) {
                    return -1;
                }
                if (this.convertToDate(a) > this.convertToDate(b)) {
                    return 1;
                }
                return 0;
            });

            if (event.target.value === "old") {
                this.setState({ gifs: sorted });
            }
            else {
                sorted.reverse();
                this.setState({ gifs: sorted });
            }

        }     
    }

    convertToDate = (gifObject) => {
        let parts = gifObject.import_datetime.substring(0, 10).split('-');
        let myDate = new Date(parts[0], parts[1] - 1, parts[2]);
        return myDate;
    }

    render() {
        return (
            <div>
                <SearchField handleChange={this.handleChange} />

                <label htmlFor="sort">Sort by </label>
                <select name="sort" id="sort" onChange={this.sort}>
                        <option value ="default"></option>
                        <option value="ar">Age Rating</option>
                        <option value="new">Newest</option>
                        <option value="old">Oldest</option>
                    </select>

                <GifList gifs={this.state.gifs} />
            </div>
        );
    }
}

export default App;


