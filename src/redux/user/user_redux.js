// action types
const AUTH_SUCCESS = 'AUTH_SUCCESS'
const ERROR_MSG = 'ERROR_MSG'
const LOAD_DATA = 'LOAD_DATA'
const LOGOUT = 'LOGOUT'

// init state
const initState = {
  userConfigInfo: '',
  test: '测试connect'
}

// reducer
export function user(state = initState, action) {
  switch (action.type) {
    case AUTH_SUCCESS:
      return { ...state, ...action.payload }
    default:
      return state
  }
}
// action creator
export function authSuccess(userConfigInfo) {
  return { type: 'AUTH_SUCCESS', payload: { userConfigInfo: userConfigInfo } }
}