import React from 'react';
import connection from '../websockets';
import CycleObject from '../lib/CycleObject';

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
      console.log(data);
    }
  }

  render() {
    return (
      <h1>App working!</h1>
    );
  }
}

export default App;
