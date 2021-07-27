import React from 'react';
import SingleParam from './SingleParam';

class SpecifyHeaders extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      inputText: ''
    }
    this.updateText = this.updateText.bind(this);
    this.addHeader = this.addHeader.bind(this);
  }

  updateText(e) {
    const newText = e.target.value;
    this.setState({
      inputText: newText
    });
  }

  addHeader() {
    const newHeader = this.state.inputText;
    this.setState({
      inputText: ''
    });
    this.props.addDisplayParam(this.props.type, newHeader);
  }

  render() {

    const paramElements = this.props.displayParams.map((text) => {
      return (
        <SingleParam
          key={text}
          type={this.props.type}
          paramText={text}
          removeDisplayParam={this.props.removeDisplayParam} />
      );
    });

    const headerText = this.props.type === 'request' ? 'Request Headers' : 'Response Headers';

    return (
      <div className="control-column specify-headers">
        <h4>{headerText}</h4>
        <div className="contents">
          <input className="text-input"
            value={this.state.inputText}
            onChange={this.updateText} />
          <button className="btn btn-plain btn-add-header"
            onClick={this.addHeader} >
            Add
          </button>
          {paramElements}
        </div>
      </div>
    );
  }
};

export default SpecifyHeaders;
