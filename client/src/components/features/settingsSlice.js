const initialState = {
  autoCompact: false,
  autoUpdate: true,
  connected: true
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
    case 'settings/closeConnection':
      return {
        ...state,
        connected: false
      }
    default:
      return state;
  }
}