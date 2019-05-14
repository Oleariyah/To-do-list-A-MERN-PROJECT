import React from 'react';
import TextField from '@material-ui/core/TextField';

export default class Form extends React.Component {

//declare the state of each element
state = {
    text : ""
};

//when new text are typed into the the text form, set new text
handleChange = e => {
    const newText = e.target.value;
    this.setState({
    text:newText
    })
};

//when enter key is pressed, then submit 
handleKeyDown = e => {
    if (e.key === "Enter") {
        this.props.submit(this.state.text);
        this.setState({text:""});
    }
};

//form rendering part
render() {   
    const {text} = this.state;
    return (
        <TextField 
        label="todo..." 
        margin="normal" 
        value={text} 
        onKeyDown={this.handleKeyDown}
        onChange={this.handleChange} 
        fullWidth
        />
    );
  }
}
