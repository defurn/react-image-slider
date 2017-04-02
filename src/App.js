import React, { Component } from 'react';
import './App.css';
import Slider from './Slider';
import photosArray from './img-src-data';




class App extends Component {

  render() {
    return (
      <div className="App">
        <div className="App-header">

          <h2>react image slider</h2>
        </div>

        <Slider
          data={photosArray}
          />

      </div>
    );
  }
}

export default App;
