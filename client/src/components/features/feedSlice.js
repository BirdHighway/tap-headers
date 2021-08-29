const ExchangeObject = require('../../lib/ExchangeObject');

const initialState = [];

export default function feedReducer(state = initialState, action) {
  switch(action.type) {
    case 'feed/addRequest': {
      const exchange = new ExchangeObject(action.payload.data, action.payload.options);
      return [exchange, ...state];
    }
    case 'feed/addResponse': {
      const exchange = state.find((ex) => ex.id === action.payload.data.id);
      exchange.addResponse(action.payload.data);
      return [...state];
    }
    case 'feed/addBody': {
      const exchange = state.find((ex) => ex.id === action.payload.data.id);
      exchange.addBody(action.payload.data);
      return [...state];
    }
    case 'feed/expandAll': {
      return state.map((exchange) => {
        return exchange.setCompact(false);
      });
    }
    case 'feed/compactAll': {
      return state.map((exchange) => {
        return exchange.setCompact(true);
      });
    }
    case 'feed/compactOne': {
      return state.map((exchange) => {
        if (exchange.id === action.payload.id) {
          return exchange.toggleCompact();
        }
        return exchange;
      });
    }
    default:
      return state;
  }
}
