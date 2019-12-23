import React, { Component } from 'react';
import './App.scss';

class App extends Component {
  constructor() {
    super();
    this.state = {
      rmXDimension: [],
      rmYDimension: [],
      max_x: null,
      max_y: null,
      sPosition: [],
      current_x: null,
      current_y: null,
      dirtLocations: [],
      directions: [],
      cleanedPiles: 0,
      combined: ''
    };
  }

  // *** EVENT HANDLERS, each updates state as the user types ***
  dimensionXHandler = e => {
    this.setState({ rmXDimension: e.target.value });
  };
  dimensionYHandler = e => {
    this.setState({ rmYDimension: e.target.value });
  };
  startHandler = e => {
    this.setState({ sPosition: e.target.value });
  };
  dirtHandler = e => {
    this.setState({ dirtLocations: e.target.value });
  };
  directionHandler = e => {
    this.setState({ directions: e.target.value });
  };

  // *** METHODS ***
  processDirections = arr => {
    // console.log(arr);
    let newX = this.state.current_x;
    let newY = this.state.current_y;
    let combined = this.state.current_x + this.state.current_y;

    // Loops through directions and moves the roomba to correct coordinate, and accounts for max/min boundaries.
    for (let i = 0; i < arr.length; i++) {
      if (arr[i] === 'N' && newY < this.state.max_y) {
        this.setState({ current_y: ++newY });
      } else if (arr[i] === 'S' && newY > 1) {
        this.setState({ current_y: --newY });
      } else if (arr[i] === 'E' && newX < this.state.max_x) {
        this.setState({ current_x: ++newX });
      } else if (arr[i] === 'W' && newX > 1) {
        this.setState({ current_x: --newX });
      }
      // Converting to both X & Y to string, then concatinating them together
      this.setState({
        combined:
          this.state.current_x.toString() + this.state.current_y.toString()
      });
      //  Testing current location vs dirt location, if yes, increments cleanedPiles counter, and it will remove it via the .filter method, then updates state
      if (this.state.dirtLocations.includes(this.state.combined)) {
        this.setState({cleanedPiles: this.state.cleanedPiles + 1,
        dirtLocations: this.state.dirtLocations.filter(x => x !== this.state.combined)});
      }
    }
  };

  // Utilizing the async-await pattern to ensure we get asynchonous behavior because the order of each method firing off matters
  runRoomba = async () => {
    await this.setState({max_y: this.state.rmYDimension,max_x: this.state.rmXDimension}); // Initializes Room Dimensions
    await this.setState({current_y: this.state.sPosition[1],current_x: this.state.sPosition[0]}); //Initializes Starting Position
    await this.setState({dirtLocations: this.state.dirtLocations.replace(/\s/g, '').split(',')}); // Regex in conjunction with .split method to remove any whitespace when user enters multiple dirt patches
    await this.processDirections(this.state.directions);
  };

  render() {
    // console.log(this.state);
    return (
      <div className='main'>
        <div className='input'>
          <h1>Input</h1>
          <input
            placeholder='Room Dimensions (X)'
            onChange={e => this.dimensionXHandler(e)}
          />
          <input
            placeholder='Room Dimensions (Y)'
            onChange={e => this.dimensionYHandler(e)}
          />
          <input
            onChange={e => this.startHandler(e)}
            placeholder='Starting Coordinates (X Y)'
          />
          <input
            onChange={e => this.dirtHandler(e)}
            placeholder='Dirt Piles (XY, XY)'
          />
          <input
            onChange={e => this.directionHandler(e)}
            placeholder='Enter Cardinal Directions'
          />
          <button onClick={() => this.runRoomba()}>Submit</button>
        </div>
        <br />
        <div className='output'>
          <h1>Output</h1>
          <h6>
            Current Location: (X:{this.state.current_x}, Y:
            {this.state.current_y})
          </h6>
          <h6>Dirt Piles Cleaned: {this.state.cleanedPiles}</h6>
        </div>
      </div>
    );
  }
}

export default App;
