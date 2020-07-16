import React from 'react';
import SearchField from './components/SearchField';
import GifList from './components/GifList';
import axios from 'axios';

class App extends React.Component {
    constructor() {
        super();
        this.state = {
            // array of gifs that will be displayed to user after filters and sort are applied.
            displayed: [],

            // reference used to make copy on which filters and sort will be applied.  
            gifs: [],

            // first four elements represent filters from g-r. last element represents sort.
            filtersAndSort: ['', '', '', '', ''],
        }
    }

    // When page loads, the user should be shown trending gifs.
    componentDidMount() {
        axios.get('http://api.giphy.com/v1/gifs/trending?api_key=9S4WDGPk7Csoi0lZi4HPSHIwlejTxR2I')
            .then(result => {
                this.setState({ displayed: result.data.data });
                this.setState({ gifs: result.data.data });
            })
            .catch(err => console.error(err));
    }

    // whenever text in search field is changed we update our gifs. makes the app slower but means the user does not have to press enter 
    handleChange = (search) => {
        axios.get(`http://api.giphy.com/v1/gifs/search?q=${search.replace(/\s/g, '+')}&api_key=9S4WDGPk7Csoi0lZi4HPSHIwlejTxR2I`)
            .then(result => {

                this.setState({ gifs: result.data.data });
                this.setState({ displayed: result.data.data });

                //console.log(this.state.displayed);

                // if some filter or sort has been initialized...
                if (!(this.state.filtersAndSort[0] === '') && (this.state.filtersAndSort[1] === '') && (this.state.filtersAndSort[2] === '')
                    && (this.state.filtersAndSort[3] === '') && (this.state.filtersAndSort[4] === '')) {
                    // Uncheck any checked filter in UI.
                    document.getElementById("g").checked = false
                    document.getElementById("pg").checked = false;
                    document.getElementById("pg-13").checked = false;
                    document.getElementById("r").checked = false;
                    // set sort drop down to default ('');
                    document.getElementById('sort').selectedIndex = 0;

                    this.setState({ filtersAndSort: [] });
                }
                
            })
            .catch(err => console.error(err));
    }

    /* if a sort is selected or a filter is checked, we add it to our filtersAndSort array, then filter then sort gifs using discrete funcitons,
     * the idea being that it is quicker to sort a filtered array than it is to filter a sorted array. */
    handleFS = (event) => {

        let appliedFS = this.state.filtersAndSort;

        switch (event.target.value) {
            case 'g':
                if (this.state.filtersAndSort[0] === '') {
                    // if this filter has not been applied, populate filterAndSort with it.
                    appliedFS[0] = 'g';
                }
                else {
                    // if a filter has already been applied, a click must mean the user wants to disable it. make its index blank.
                    appliedFS[0] = '';
                }
                break;
            case 'pg':
                if (this.state.filtersAndSort[1] === '') {
                    appliedFS[1] = 'pg';
                }
                else {
                    appliedFS[1] = '';
                }
                break;
            case 'pg-13':
                if (this.state.filtersAndSort[2] === '') {
                    appliedFS[2] = 'pg-13';
                }
                else {
                    appliedFS[2] = '';
                }
                break;
            case 'r':
                if (this.state.filtersAndSort[3] === '') {
                    appliedFS[3] = 'r';
                }
                else {
                    appliedFS[3] = '';
                }
                break;
            case 'ar':
                appliedFS[4] = 'ar';
                break;
            case 'new':
                appliedFS[4] = 'new';
                break;
            case 'old':
                appliedFS[4] = 'old';
                break;
            case 'fs':
                appliedFS[4] = 'fs';
                break;
            default:
                appliedFS[4] = '';
                break;
        }

        //console.log(appliedFS);
        this.setState({ filtersAndSort: appliedFS });

        this.filter();
    }

    filter = () => {

        let copyOfReference = this.state.gifs;

        // if none of the indices have been initialized, the must be no filters or sort and we can display our reference array. 
        if ((this.state.filtersAndSort[0] === '') && (this.state.filtersAndSort[1] === '') && (this.state.filtersAndSort[2] === '')
            && (this.state.filtersAndSort[3] === '') && (this.state.filtersAndSort[4] === '')) {
            this.setState({ displayed: copyOfReference });
            //console.log('not impossible');
        }
        else {
            /*muliple if statements as the array could include more than one of these. includes() is used instead of directly accessing the index
              for readability. it is assumed includes() is not resource intensive.*/
            if (this.state.filtersAndSort.includes('g')) {
                copyOfReference = copyOfReference.filter(gif => gif.rating !== 'g');
            }
            if (this.state.filtersAndSort.includes('pg')) {
                copyOfReference = copyOfReference.filter(gif => gif.rating !== 'pg');
            }
            if (this.state.filtersAndSort.includes('pg-13')) {
                copyOfReference = copyOfReference.filter(gif => gif.rating !== 'pg-13');
            }
            if (this.state.filtersAndSort.includes('r')) {
                copyOfReference = copyOfReference.filter(gif => gif.rating !== 'r');
            }

            this.setState({ displayed: copyOfReference });

            // once our gifs have been filtered, we can sort the remaining gifs, assuming filtersAndSort[4] is populated.
            if (this.state.filtersAndSort[4] !== '') {
                this.sort();
            }
        }
    }

    sort = () => {
        // sort our filtered array not our reference.
        let copyOfFiltered = this.state.displayed;

        // elses used as only one sort can be active at a time.
        if (this.state.filtersAndSort.includes('ar')) {
            copyOfFiltered.sort((a, b) => {
                if (a.rating < b.rating) {
                    return -1;
                }
                if (a.rating > b.rating) {
                    return 1;
                }
                return 0;
            });
        }
        else if (this.state.filtersAndSort.includes('new')) {
            copyOfFiltered.sort((a, b) => {
                if (this.convertToDate(a) < this.convertToDate(b)) {
                    return 1;
                }
                if (this.convertToDate(a) > this.convertToDate(b)) {
                    return -1;
                }
                return 0;
             });
        }
        else if (this.state.filtersAndSort.includes('old')) {
            copyOfFiltered.sort((a, b) => {
                if (this.convertToDate(a) > this.convertToDate(b)) {
                    return 1;
                }
                if (this.convertToDate(a) < this.convertToDate(b)) {
                    return -1;
                }
                return 0;
            });
        }
        else if (this.state.filtersAndSort.includes('fs')) {
            copyOfFiltered.sort((a, b) => {
                return a.images.downsized.size - b.images.downsized.size;
            });
        }

        this.setState({ displayed : copyOfFiltered });
    }


/************* Helper function used to compare the upload dates of two gifs. *********************/
    convertToDate = (gifObject) => {
        let parts = gifObject.import_datetime.substring(0, 10).split('-');
        let myDate = new Date(parts[0], parts[1] - 1, parts[2]);
        return myDate;
    }
/*************************************************************************************************/


    render() {
        return (
            <div>
                <SearchField handleChange={this.handleChange} />

                 <p style={{float:'right',paddingRight:'2%', fontFamily:'Times New Roman'}}>
                    <label htmlFor="sort">Sort by: </label>
                    <select id="sort">
                        <option value="blank" onClick={this.handleFS}></option>
                        <option value="ar" onClick={this.handleFS}>Age Rating</option>
                        <option value="new" onClick={this.handleFS}>Newest - Oldest</option>
                        <option value="old" onClick={this.handleFS}>Oldest - Newest</option>
                        <option value="fs" onClick={this.handleFS}>File Size Ascending</option>
                    </select>
                </p>
                
                <p style={{ float: 'right', paddingRight: '2%', fontFamily: 'Times New Roman' }}>
                    Filter out: 
                    <label htmlFor="g"> G</label>
                    <input type="checkbox" id="g" name="rating" value="g" onClick={this.handleFS}/>
                    <label htmlFor="pg"> PG</label>
                    <input type="checkbox" id="pg" name="rating" value="pg" onClick={this.handleFS} />
                    <label htmlFor="pg-13"> PG-13</label>
                    <input type="checkbox" id="pg-13" name="rating" value="pg-13" onClick={this.handleFS} />
                    <label htmlFor="r"> R</label>
                    <input type="checkbox" id="r" name="rating" value="r" onClick={this.handleFS} />   
                </p>

                <GifList gifs={this.state.displayed} />
            </div>
        );
    }
}

export default App;
