
import wmsvrApi from 'network/api'

// init state
const initState = {
  folders: {
    pending: false,
    data: [],
    hasError: false
  },
  messageListMap: {},
  activeFolderFid: 1,
  activeReadMid: null,
}

// reducer
export function mail(state = initState, action) {
  switch (action.type) {
    // case 'GETALLFOLDER_FAILURE':
    // case 'GETALLFOLDER_PENDING':
    // case 'GETALLFOLDER_SUCCESS':
    //   return { ...state, ...action.payload }
    case 'ACTIVE_FOLDER':
      return { ...state, ...action.payload }
    case 'ACTIVE_READ_MID':
      return { ...state, ...action.payload }
    case 'SAVE_MESSAGE':
      state.messageListMap = { ...state.messageListMap, ...action.payload }
      return { ...state }
    default:
      return state
  }
}

export function activeFolder(fid) {
  return {
    type: 'ACTIVE_FOLDER',
    payload: {
      activeFolderFid: fid
    }
  }
}
export function activeReadMid(mid) {
  return {
    type: 'ACTIVE_READ_MID',
    payload: {
      activeReadMid: mid
    }
  }
}
// getAllFolders相关actionCreator
// function getAllFoldersPending() {
//   return {
//     type: 'GETALLFOLDER_PENDING',
//     payload: {
//       folders: {
//         pending: true,
//         data: [],
//         hasError: false
//       }
//     }
//   }
// }
// function getAllFoldersSuccess(foldList) {
//   return {
//     type: 'GETALLFOLDER_SUCCESS',
//     payload: {
//       folders: {
//         pending: false,
//         data: foldList,
//         hasError: false
//       }
//     }
//   }
// }
// export function getAllFoldersFailure() {
//   return {
//     type: 'GETALLFOLDER_FAILURE',
//     payload: {
//       folders: {
//         pending: false,
//         data: [],
//         hasError: true
//       }
//     }
//   }
// }

// export function getAllFolders() {
//   return dispatch => {
//     dispatch(getAllFoldersPending())
//     wmsvrApi.getAllFolders().then(data => {
//       if (data && data.code === 'S_OK') {
//         dispatch(getAllFoldersSuccess(data.var))
//       }
//     }, error => {
//       console.log(error)
//       dispatch(getAllFoldersFailure())
//     })
//   }
// }
// // 保存特定文件夹的信件列表数据到store中
// export function saveMessage(fid, messageList) {
//   return {
//     type: 'SAVE_MESSAGE',
//     payload: {
//       [fid]: messageList
//     }
//   }
// }
