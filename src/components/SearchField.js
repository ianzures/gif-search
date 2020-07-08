import React from 'react';

class SearchField extends React.Component {
    constructor() {
        super();
        this.state = {
            term: ''
        }
    }

    handleChange = (event) =>  {
        this.setState({ term: event.target.value });
        this.props.searchGif(this.state.term);
        //this.props.onTermChange(term);
    }

    render() {
        return (
            <div className="search">
                <h1>Search!</h1>
                <input onChange={this.handleChange} />
            </div>
        );
    }
}

export default SearchField;