import React, { useState, useEffect } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import { getExtName } from 'utils/attachment'
import { formatSize } from 'utils/file'
import CustomIcon from 'components/customIcon/customIcon'
import IconButton from '@material-ui/core/IconButton'
import { getRequestUrl } from 'network/utils'
import Cookie from 'js-cookie'
import FileTypeImg from 'components/FileTypeImg/FileTypeImg'
import LinearProgress from '@material-ui/core/LinearProgress'

const useStyles = makeStyles((theme) => ({
  container: {
    width: '200px',
    backgroundColor: 'rgb(239,239,239)',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    whiteSpace: 'nowarp',
    position: 'relative'
  },
  fileWrapper: {
    padding: '8px 12px 8px 12px',
    display: 'flex',
    alignItems: 'center',
  },
  fileType: {
    textTransform: 'uppercase'
  },
  fileInfo: {
    marginLeft: '10px',
    display: 'flex',
    flexDirection: 'column',
    whiteSpace: 'nowrap',
    textOverflow: 'ellipsis',
    overflow: 'hidden',
  },
  fileName: {
    whiteSpace: 'nowrap',
    textOverflow: 'ellipsis',
    overflow: 'hidden',
  },
  fileSize: {
    color: '#605e5c',
    fontSize: '13px',
    marginTop: '2px'
  },
  actionCover: {
    position: 'absolute',
    width: '200px',
    height: '100%',
    top: '0',
    left: '0',
    background: 'rgba(0,0,0,0.2)',
    display: 'flex',
    justifyContent: 'flex-end',
    alignItems: 'center',
    padding: '0 10px',
  },
  uploadProgress: {
    position: 'absolute',
    width: '100%',
    bottom: 0,
    backgroundColor: theme.palette.primary.main
  }
}))

export default function AttachmentItem(props) {
  const { attachment, mid } = props
  const classes = useStyles()
  const fileName = attachment.filename || attachment.fileName
  const extName = getExtName(fileName)
  const fileSize = formatSize(attachment.estimateSize || attachment.size)
  const uploadProgress = attachment.uploadProgress || 0
  const [showActionCover, setShowActionCover] = useState(false) // 是否显示操作浮层（下载、预览等操作）
  const downloadUrl = getRequestUrl({
    query: {
      func: 'mbox:getMessageData',
      sid: Cookie.get('Coremail.sid'),
      mid,
      part: attachment.id,
      mode: 'download'
    }
  })
  // 处理鼠标划入
  function handleMouseEnter() {
    setShowActionCover(true)
  }
  // 处理鼠标划出
  function handleMouseLeave() {
    setShowActionCover(false)
  }
  // 下载附件
  function downloadAttachment() {
    window.location.href = downloadUrl
  }
  return (
    <div className={classes.container} onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
      <div className={classes.fileWrapper}>
        <div className={classes.fileType}><FileTypeImg extName={extName} /></div>
        <div className={classes.fileInfo}>
          <div className={classes.fileName}>{fileName}</div>
          <div className={classes.fileSize}>{fileSize}</div>
        </div>
      </div>
      {showActionCover && <div className={classes.actionCover}>
        <IconButton size="small" className={classes.refreshButton} onClick={downloadAttachment}><CustomIcon iconName="icon-icon-filedownload" size={26} color={'#fff'} /></IconButton>
      </div>}
      {uploadProgress > 0 && uploadProgress < 100 ? <div className={classes.uploadProgress}>
        <LinearProgress variant="determinate" value={uploadProgress} />
      </div> : ''}
    </div>
  )
}
