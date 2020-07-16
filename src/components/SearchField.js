import React from 'react';

const input = {
    display: 'inlineBlock',
    float: 'right',
    fontSize: '22px',
    marginRight: '2%',
    textAlign: 'center',
    width: '20%',
}
    
class SearchField extends React.Component {
   //// constructor() {
    //    super();
    //    this.state = {
    //        search: ''
    //    }
   // }

    onInputChange = (event) => {
        //this.setState({ search : event.target.value });
        this.props.handleChange(event.target.value);
    }

    render() {
        return (
            <div className="search">
                <h1 style={{paddingLeft:'2%'}}>
                    <span> Giphy Search!
                        <input style={input} placeholder="Search for gifs!" onChange={this.onInputChange} />
                    </span>
                </h1>
            </div>

        );
    }
}

export default SearchField;

