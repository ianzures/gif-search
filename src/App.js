import React from 'react';
import SearchField from './components/SearchField';
import GifList from './components/GifList';
import axios from 'axios';

class App extends React.Component {
    constructor() {
        super();
        this.state = {
            gifs: [],
            sortBy: '',
        }
    }

    componentDidMount() {
        axios.get('http://api.giphy.com/v1/gifs/trending?api_key=9S4WDGPk7Csoi0lZi4HPSHIwlejTxR2I')
            .then(result => {
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

    handleSort = (event) => {
        this.setState({ sortBy: event.target.value });
        this.sort();
    }

    sort = () => {
        let sorted = this.state.gifs;
        switch (this.state.sortBy) {
            case 'ar':
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
                break;
            case 'new':
                sorted.sort((a, b) => {
                    if (this.convertToDate(a) < this.convertToDate(b)) {
                        return 1;
                    }
                    if (this.convertToDate(a) > this.convertToDate(b)) {
                        return -1;
                    }
                    return 0;
                });
                this.setState({ gifs: sorted });
                break;
            case 'old':
                sorted.sort((a, b) => {
                    if (this.convertToDate(a) < this.convertToDate(b)) {
                        return -1;
                    }
                    if (this.convertToDate(a) > this.convertToDate(b)) {
                        return 1;
                    }
                    return 0;
                });
                this.setState({ gifs: sorted });
                break;
            case 'fs':
                sorted.sort((a, b) => {
                    if (a.images.downsized.size < b.images.downsized.size) {
                        return -1;
                    }
                    if (a.images.downsized.size > b.images.downsized.size) {
                        return 1;
                    }
                    return 0;
                });
                this.setState({ gifs: sorted });
                break;
            default:
                break;
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
                <select name="sort" id="sort" onChange={this.handleSort}>
                        <option value = ""></option>
                        <option value="ar">Age Rating</option>
                        <option value="new">Newest descending</option>
                        <option value="old">Newest ascending</option>
                        <option value="fs">File size ascending</option>
                </select>

                <GifList gifs={this.state.gifs} />
            </div>
        );
    }
}

export default App;


