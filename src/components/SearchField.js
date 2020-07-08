import React from 'react';

class SearchField extends React.Component {
    constructor() {
        super();
        this.state = {
            term: ''
        }
    }

    handleChange = (event) =>  {
        this.setState({ term : event.target.value });
        //this.props.onTermChange(term);
    }

    render() {
        return (
            <div className="search">
                <h1>Search!</h1>
                <input onChange={this.handleChange} />
                <p>{this.state.term}</p>
            </div>
        );
    }
}

export default SearchField;