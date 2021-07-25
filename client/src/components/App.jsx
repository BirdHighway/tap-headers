import React from 'react';
import connection from '../websockets';
import CycleObject from '../lib/CycleObject';
import CycleList from './CycleList';

class App extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      cycles: []
    };
  }

  componentDidMount() {
    connection.onmessage = (message) => {
      const data = JSON.parse(message.data);
      if (data.type === 'request') {
        this.addCycle(data);
        return;
      }
      if (data.type === 'response') {
        this.addResponse(data);
        return;
      }
    }
  }

  addCycle(request) {
    const cycleObject = new CycleObject(request);
    this.setState((prevState) => {
      const cycles = [cycleObject, ...prevState.cycles];
      return {
        ...prevState,
        cycles: cycles
      };
    });
  }

  addResponse(response) {
    const id = response.id;
    this.setState((prevState) => {
      const cycles = prevState.cycles;
      const cycle = cycles.find(cycle => cycle.id === id);
      cycle.addResponse(response);
      return {
        ...prevState,
        cycles: cycles
      };
    });
  }

  render() {
    return (
      <div className="app-container">
        <h1>Tap Headers</h1>
        <CycleList cycles={this.state.cycles} />
      </div>
    );
  }
}

export default App;
