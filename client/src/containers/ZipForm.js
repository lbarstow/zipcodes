import React, { Component } from 'react';
import Zipbox from '../components/Zipbox';

class ZipForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      errors: {first: 'The first zipcode must be 5 numbers long',
              second: 'The second zipcode must be 5 numbers long'},
      firstZip: '',
      secondZip: ''
    }
    this.handleFirstZip = this.handleFirstZip.bind(this);
    this.validateFirst = this.validateFirst.bind(this);
    this.handleSecondZip = this.handleSecondZip.bind(this);
    this.handleFormSubmit = this.handleFormSubmit.bind(this);
  }

  handleFirstZip(event) {
    this.setState({ firstZip: event.target.value });
    this.validateFirst(event.target.value);
  }

  validateFirst(zip){
    if(zip.length !== 5 || isNaN(zip)){
      let newError = {first: 'The first zipcode must be 5 numbers long'};
      this.setState({errors: Object.assign(this.state.errors, newError)});
      return false;
    }else {
      let errorState = this.state.errors;
      delete errorState.first;
      this.setState({ errors: errorState });
      return true;
    }
  }
  handleSecondZip(event) {
    this.setState({secondZip: event.target.value});
    this.validateSecond(event.target.value);
  }

  validateSecond(zip){
    if(zip.length !== 5 || isNaN(zip)){
      let newError = {second: 'The second zipcode must be 5 numbers long'};
      this.setState({errors: Object.assign(this.state.errors, newError)});
      return false;
    }else {
      let errorState = this.state.errors;
      delete errorState.second;
      this.setState({ errors: errorState });
      return true;
    }
  }


  handleFormSubmit(event) {
    event.preventDefault();
    if (
      this.validateFirst(this.state.firstZip) &&
      this.validateSecond(this.state.secondZip)
    ) {
      let formPayload = {
        firstZip: this.state.firstZip,
        secondZip: this.state.secondZip
      };
      this.props.handleSubmit(formPayload);
    }
  }

  render() {
    let errorList;
    let errorItems;
    if (Object.keys(this.state.errors).length > 0) {
      errorItems = Object.values(this.state.errors).map(error => {
        return(<li key={error}>{error}</li>)
      })
      errorList= <ul className="callout alert">{errorItems}</ul>
    }
    return (

      <form onSubmit={this.handleFormSubmit}>
        {errorList}
        <Zipbox
          label="First Zip Code"
          value={this.state.firstZip}
          handlerFunction={this.handleFirstZip}
        />

        <Zipbox
          label="Second Zip Code"
          value={this.state.secondZip}
          handlerFunction={this.handleSecondZip}
        />

        <input className="button" type="submit" value="Submit" />
      </form>
    );
  }
}

export default ZipForm;
