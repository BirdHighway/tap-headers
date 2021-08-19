const ExchangeObject = require('../../lib/ExchangeObject');

const initialState = [];

export default function feedReducer(state = initialState, action) {
  switch(action.type) {
    case 'feed/addRequest': {
      const exchange = new ExchangeObject(action.payload.data, action.payload.options);
      return [...state, exchange];
    }
    case 'feed/addResponse': {
      const exchange = state.find((ex) => ex.id === action.payload.data.id);
      exchange.addResponse(action.payload.data);
      return [...state];
    }
    case 'feed/addBody': {
      return [...state];
    }
    case 'feed/expandAll': {
      return [...state];
    }
    case 'feed/collapseAll': {
      return [...state];
    }
    default:
      return state;
  }
}
