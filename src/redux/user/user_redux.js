
// init state
const initState = {
  userConfigInfo: '',
  userAttr: ''
}

// reducer
export function user(state = initState, action) {
  switch (action.type) {
    case 'AUTH_SUCCESS':
      return { ...state, ...action.payload }
    case 'USER_ATTR':
      return { ...state, ...action.payload }
    default:
      return state
  }
}
// action creator
export function authSuccess(userConfigInfo) {
  return { type: 'AUTH_SUCCESS', payload: { userConfigInfo: userConfigInfo } }
}
export function userAttr(attr) {
  return { type: 'USER_ATTR', payload: { userAttr: attr } }
}
