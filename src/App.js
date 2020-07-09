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
            filter: [],
            reInclude:[],
        }
    }

    componentDidMount() {
        axios.get('http://api.giphy.com/v1/gifs/trending?api_key=9S4WDGPk7Csoi0lZi4HPSHIwlejTxR2I')
            .then(result => {
                this.setState({ gifs: result.data.data });
            })
            .catch(err => console.error(err));
    }

    handleChange = (search) => {
        axios.get(`http://api.giphy.com/v1/gifs/search?q=${search.replace(/\s/g, '+')}&api_key=9S4WDGPk7Csoi0lZi4HPSHIwlejTxR2I`)
            .then(result => {
                this.setState({ gifs: result.data.data });
                this.sort();
                //console.log(this.state.gifs);
            })
            .catch(err => console.error(err));        
    }

    handleCheck = (event) => {
        let f = this.state.filter;
        if (this.state.filter.includes(event.target.value)) {
            let arr = this.state.gifs;
            f.splice(this.state.filter.indexOf(event.target.value), 1);
            this.state.reInclude.forEach(gif => {
                if (gif.rating === event.target.value) {
                    arr.push(gif);
                }
            });
            this.setState({gifs:arr});
        }
        else {
            f.push(event.target.value);
        }
        //console.log(f);
        this.setState({ filter: f });
        this.filter();
        
    }

    filter = () => {
        let filtered = [];
        let filteredOut = this.state.reInclude;
        this.state.gifs.forEach(gif => {
            if (!this.state.filter.includes(gif.rating)) {
                filtered.push(gif);
            }
            else {
                filteredOut.push(gif);
            }
        });
        console.log(filteredOut);
        this.setState({ reInclude: filteredOut });
        this.setState({gifs:filtered });
    }


    handleSort = (event) => {
        this.setState({ sortBy: event.target.value });
        this.sort();
    }

    sort = () => {
        let sorted = this.state.gifs;
        switch (this.state.sortBy) {

            // For some searches, this sort may not appear to work. Some gifs seem to have an incorrect age rating.
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

                <p style={{float:'right',paddingRight:'2%', fontFamily:'Times New Roman'}}>
                    <label htmlFor="sort">Sort by: </label>
                    <select name="sort" id="sort" onChange={this.handleSort} >
                        <option value="default"></option>
                        <option value="ar">Age Rating</option>
                        <option value="new">Newest - Oldest</option>
                        <option value="old">Oldest - Newest</option>
                        <option value="fs">File Size Ascending</option>
                    </select>
                </p>

                <p style={{ float: 'right', paddingRight: '2%', fontFamily: 'Times New Roman' }}>
                    Filter out: 
                    <label htmlFor="g"> G</label>
                    <input type="checkbox" id="g" name="g-rating" value="g" onClick={this.handleCheck}/>
                    <label htmlFor="pg"> PG</label>
                    <input type="checkbox" id="pg" name="pg-rating" value="pg" onClick={this.handleCheck} />
                    <label htmlFor="pg-13"> PG-13</label>
                    <input type="checkbox" id="PG-13" name="pg-13-rating" value="pg-13" onClick={this.handleCheck} />
                    <label htmlFor="r"> R</label>
                    <input type="checkbox" id="r" name="r-rating" value="r" onClick={this.handleCheck} />   
                </p>

                <GifList gifs={this.state.gifs} />
            </div>
        );
    }
}

export default App;


