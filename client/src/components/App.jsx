import React from 'react';
import connection from '../websockets';
import CycleObject from '../lib/CycleObject';
import PageHeader from './header/PageHeader';
import CycleList from './feed/CycleList';
import ControlPanel from './controls/ControlPanel';

class App extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      cycles: [],
      autoCompact: false,
      autoUpdate: true,
      queue: [],
      connected: true,
      reqDisplayParams: [],
      resDisplayParams: []
    };
    this.toggleCompact = this.toggleCompact.bind(this);
    this.setAllCompact = this.setAllCompact.bind(this);
    this.setAutoCompact = this.setAutoCompact.bind(this);
    this.toggleAutoUpdate = this.toggleAutoUpdate.bind(this);
    this.handleQueue = this.handleQueue.bind(this);
    this.closeConnection = this.closeConnection.bind(this);
    this.addDisplayParam = this.addDisplayParam.bind(this);
    this.removeDisplayParam = this.removeDisplayParam.bind(this);
  }

  componentDidMount() {
    connection.onmessage = (message) => {
      const dataObject = JSON.parse(message.data);
      if (this.state.autoUpdate) {
        this.processMessage(dataObject);
      } else {
        this.enqueueMessage(dataObject);
      }
    }
  }

  addDisplayParam(type, param) {
    param = param.toLowerCase();
    const field = type === 'request' ? 'reqDisplayParams' : 'resDisplayParams';
    this.setState((prevState) => {
      const params = prevState[field];
      if (!params.includes(param)) {
        params.push(param);
      }
      return {
        ...prevState,
        [field]: [...params]
      };
    });
  }

  removeDisplayParam(type, param) {
    const field = type === 'request' ? 'reqDisplayParams' : 'resDisplayParams';
    if (param === undefined) {
      this.setState({
        [field]: []
      });
      return;
    }
    param = param.toLowerCase();
    this.setState((prevState) => {
      const params = prevState[field].filter((p) => p !== param);
      return {
        ...prevState,
        [field]: [...params]
      };
    });
  }

  closeConnection() {
    connection.close();
    this.setState({
      connected: false
    });
  }

  processMessage(dataObject) {
    if (dataObject.body !== undefined) {
      this.addBody(dataObject);
      return;
    }
    if (dataObject.type === 'request') {
      this.addCycle(dataObject);
      return;
    }
    if (dataObject.type === 'response') {
      this.addResponse(dataObject);
      return;
    }
  }

  enqueueMessage(dataObject) {
    this.setState((prevState) => {
      const queue = [...prevState.queue, dataObject];
      return {
        ...prevState,
        queue: queue
      };
    });
  }

  addCycle(request) {
    const cycleObject = new CycleObject(request);
    if (this.state.autoCompact) {
      cycleObject.setCompact(true);
    }
    this.setState((prevState) => {
      const cycles = [cycleObject, ...prevState.cycles];
      return {
        ...prevState,
        cycles: cycles
      };
    });
  }

  addBody(dataObject) {
    const id = dataObject.id;
    this.setState((prevState) => {
      const cycles = prevState.cycles;
      const cycle = cycles.find(cycle => cycle.id === id);
      if (!cycle) {
        return prevState;
      }
      cycle.addBody(dataObject);
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

  toggleAutoUpdate() {
    this.setState((prevState) => {
      return {
        ...prevState,
        autoUpdate: !prevState.autoUpdate
      };
    });
  }

  handleQueue(action) {
    if (action === 'merge') {
      this.state.queue.forEach((dataObject) => {
        this.processMessage(dataObject);
      });
      this.setState({
        queue: []
      });
      return;
    }
    if (action === 'delete') {
      this.setState({
        queue: []
      });
      return;
    }
    if (action === 'next') {
      let nextObject;
      this.setState((prevState) => {
        nextObject = prevState.queue.shift();
        return {
          ...prevState,
          queue: [...prevState.queue]
        };
      }, () => {
        this.processMessage(nextObject);
      });
      return;
    }
  }

  toggleCompact(id) {
    this.setState((prevState) => {
      const cycles = prevState.cycles;
      const cycle = cycles.find(cycle => cycle.id === id);
      cycle.toggleCompact();
      return {
        ...prevState,
        cycles: [...cycles]
      };
    });
  }

  setAllCompact(value) {
    this.setState((prevState) => {
      const cycles = prevState.cycles;
      cycles.forEach((cycle) => {
        cycle.setCompact(value);
      });
      return {
        ...prevState,
        autoCompact: value,
        cycles: [...cycles]
      };
    });
  }

  setAutoCompact(value) {
    this.setState({
      autoCompact: value
    });
  }

  render() {
    return (
      <div id="app-container">
        <PageHeader />
        <ControlPanel
          closeConnection={this.closeConnection}
          isConnected={this.state.connected}
          setAllCompact={this.setAllCompact}
          autoCompact={this.state.autoCompact}
          setAutoCompact={this.setAutoCompact}
          toggleAutoUpdate={this.toggleAutoUpdate}
          autoUpdate={this.state.autoUpdate}
          handleQueue={this.handleQueue}
          queueLength={this.state.queue.length}
          reqDisplayParams={this.state.reqDisplayParams}
          resDisplayParams={this.state.resDisplayParams}
          addDisplayParam={this.addDisplayParam}
          removeDisplayParam={this.removeDisplayParam}
          />
        <CycleList
          reqDisplayParams={this.state.reqDisplayParams}
          resDisplayParams={this.state.resDisplayParams}
          cycles={this.state.cycles}
          toggleCompact={this.toggleCompact} />
      </div>
    );
  }
}

export default App;
