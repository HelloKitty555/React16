
// init state
const initState = {
  openDialog: false,
  dialogConfig: {},
  openSnackBar: false,
  snackBarConfig: {}
}

// reducer
export function status(state = initState, action) {
  switch (action.type) {
    case 'OPEN_DIALOG':
      return { ...state, ...action.payload }
    case 'CLOSE_DIALOG':
      return { ...state, ...action.payload }
    case 'OPEN_SNACKBAR':
      return { ...state, ...action.payload }
    case 'CLOSE_SNACKBAR':
      return { ...state, ...action.payload }
    default:
      return state
  }
}
// action creator
export function openDialog(config) {
  return { type: 'OPEN_DIALOG', payload: { openDialog: true, dialogConfig: config } }
}
export function closeDialog() {
  return { type: 'CLOSE_DIALOG', payload: { openDialog: false, dialogConfig: {} } }
}
export function openSnackBar(config) {
  return { type: 'OPEN_SNACKBAR', payload: { openSnackBar: true, snackBarConfig: config } }
}
export function closeSnackBar() {
  return { type: 'CLOSE_SNACKBAR', payload: { openSnackBar: false, snackBarConfig: {} } }
}
