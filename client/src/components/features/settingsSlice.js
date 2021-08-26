const initialState = {
  autoCompact: false,
  autoUpdate: true,
  connected: false
};

export default function settingsReducer(state = initialState, action) {
  switch(action.type) {
    case 'settings/toggleAutoCompact':
      return {
        ...state,
        autoCompact: !state.autoCompact
      }
    case 'settings/toggleAutoUpdate':
      return {
        ...state,
        autoCompact: !state.autoUpdate
      }
    case 'settings/openConnection':
      return {
        ...state,
        connected: true
      }
    case 'settings/closeConnection':
      return {
        ...state,
        connected: false
      }
    default:
      return state;
  }
}