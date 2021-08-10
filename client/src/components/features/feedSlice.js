const initialState = [];

export default function feedReducer(state = initialState, action) {
  switch(action.type) {
    case 'feed/addRequest':
      return {
        ...state
      }
    case 'feed/addResponse':
      return {
        ...state
      }
    case 'feed/addBody':
      return {
        ...state
      }
    case 'feed/expandAll':
      return {
        ...state
      }
    case 'feed/collapseAll':
      return {
        ...state
      }
    default:
      return state;
  }
}
