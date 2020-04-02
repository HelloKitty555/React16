import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import Unknown from 'assets/img/unknown.svg'
import word from 'assets/img/word.svg'
import ppt from 'assets/img/ppt.svg'
import zip from 'assets/img/Zip.svg'
import pdf from 'assets/img/pdf.svg'
import excel from 'assets/img/excel.svg'
import psd from 'assets/img/psd.svg'
import txt from 'assets/img/txt.svg'
import gif from 'assets/img/gif.svg'
import css from 'assets/img/css.svg'
import js from 'assets/img/js.svg'
import audio from 'assets/img/audio.svg'
import video from 'assets/img/video.svg'
import image from 'assets/img/image.svg'


const useStyles = makeStyles(theme => ({
}))
export default function FileTypeImg(props) {
  const classes = useStyles(props)
  const { extName } = props
  let fileType = ''
  switch (extName) {
    case 'docx':
      fileType = <img src={word} alt={extName} />
      break
    case 'doc':
      fileType = <img src={word} alt={extName} />
      break
    case 'xls':
      fileType = <img src={excel} alt={extName} />
      break
    case 'xlsx':
      fileType = <img src={excel} alt={extName} />
      break
    case 'ppt':
      fileType = <img src={ppt} alt={extName} />
      break
    case 'pdf':
      fileType = <img src={pdf} alt={extName} />
      break
    case 'zip':
      fileType = <img src={zip} alt={extName} />
      break
    case 'png':
      fileType = <img src={image} alt={extName} />
      break
    case 'psd':
      fileType = <img src={psd} alt={extName} />
      break
    case 'txt':
      fileType = <img src={txt} alt={extName} />
      break
    case 'gif':
      fileType = <img src={gif} alt={extName} />
      break
    case 'css':
      fileType = <img src={css} alt={extName} />
      break
    case 'js':
      fileType = <img src={js} alt={extName} />
      break
    case 'mp3':
      fileType = <img src={audio} alt={extName} />
      break
    case 'mp4':
      fileType = <img src={video} alt={extName} />
      break
    case 'jpg':
      fileType = <img src={image} alt={extName} />
      break
    default:
      fileType = <img src={Unknown} alt={extName} />
  }
  return (
    <React.Fragment>
      {fileType}
    </React.Fragment>
  )
}
