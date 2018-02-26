import React, { Component } from 'react';
import '../App.css';
import ZipForm from './ZipForm';
import DisplayBox from '../components/DisplayBox';


class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      response: '',
      firstZip: {},
      secondZip: {}
    }
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(submission) {
    let first =submission.firstZip;
    this.getCoordinates(first)
      .then(res => this.setState({firstZip: res}))
      .catch(err =>
        {this.setState({firstZip: {}})
        console.log(err)});

    let second =submission.secondZip
    this.getCoordinates(second)
      .then(res => this.setState({secondZip: res}))
      .catch(err =>{ this.setState({secondZip: {}})
      console.log(err)});
  }

  getCoordinates = async (zip) => {
    const response = await fetch(`/api/${zip}`);
    const body = await response.json();

    if (response.status !== 200) throw Error(body.error);

    return body;
  };


  render() {
    let distanceDiv;
    if(this.state.firstZip.zip && this.state.secondZip.zip){
      let first = this.state.firstZip
      let second = this.state.secondZip
      console.log(first)
      distanceDiv=
      <DisplayBox
        firstZip={first}
        secondZip={second}
      />
    }else{
      distanceDiv=<div>
        <h1 className="App-title">
          Enter Your Zipcodes to Calculate the Distance
        </h1>
      </div>
    }
    return (
      <div className="App">
        <header className="App-header">
          {distanceDiv}
        </header>
        <ZipForm
          handleSubmit={this.handleSubmit}
        />
      </div>
    );
  }
}

export default App;
