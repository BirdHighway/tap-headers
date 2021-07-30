import React from 'react';
import Headers from './Headers';

const formatFirstLine = (request) => {

}

class Cycle extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      showAllRequestHeaders: false,
      showAllResponseHeaders: false
    }
    this.toggleCompact = this.toggleCompact.bind(this);
    this.toggleShowAllHeaders = this.toggleShowAllHeaders.bind(this);
  }

  toggleCompact() {
    this.props.toggleCompact(this.props.cycle.id);
  }

  toggleShowAllHeaders(type) {
    const field = type === 'request' ? 'showAllRequestHeaders' : 'showAllResponseHeaders';
    this.setState((prevState) => {
      return {
        ...prevState,
        [field]: !prevState[field]
      };
    });
  }

  formatRequestFirstLine(request) {
    const method = request.meta.method;
    const url = request.meta.url;
    const version = request.meta.version;
    return `${method} ${url} HTTP/${version}`;
  }

  render() {
    const request = this.props.cycle.request;
    const response = this.props.cycle.response;
    const compact = this.props.cycle.compact;
    const requestHeaders = request.headers;
    const responseHeaders = response ? response.headers : null;
    const requestFirstLine = this.formatRequestFirstLine(request);
    const responseFirstLine = response ? response.meta.firstLine : 'awaiting response...';

    const backgroundClass = 'background-' + request.meta.method.toLowerCase();
    const showAllBtnTxt = this.state.showAllHeaders ? 'Show Specified Headers' : 'Show All Headers';

    return (
      <div className="cycle-container">
        <div className={'cycle-header ' + backgroundClass}>
          <h4>{request.id}</h4>
          <button className="btn-plain" onClick={this.toggleCompact}>Toggle Compact</button>
        </div>
        <div className="cycle-div">
          <div className="request-div">
            <pre className="meta-line">{requestFirstLine}</pre>
            <Headers
              type="request"
              showAllHeaders={this.state.showAllRequestHeaders}
              displayParams={this.props.reqDisplayParams}
              headerObject={requestHeaders}
              toggleShowAllHeaders={this.toggleShowAllHeaders}
              compact={compact}/>
          </div>
          <div className="response-div">
            <pre className="meta-line">{responseFirstLine}</pre>
            <Headers
              type="response"
              showAllHeaders={this.state.showAllResponseHeaders}
              displayParams={this.props.resDisplayParams}
              headerObject={responseHeaders}
              toggleShowAllHeaders={this.toggleShowAllHeaders}
              compact={compact}/>
          </div>
        </div>
      </div>

    );
  }
};

export default Cycle;
