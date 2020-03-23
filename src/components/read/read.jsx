import React, { useState, useEffect } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import Container from '@material-ui/core/Container'
import ReadContent from 'components/read/readContent'
import ReadHeader from 'components/read/readHeader'
import wmsvrApi from 'network/api'
import ScrollView from 'components/scrollView/scrollView'
import { useParams } from 'react-router-dom'
import SkeletonLoading from 'components/read/skeletonLoading'
import ReadAttachment from 'components/read/readAttachment'

const useStyles = makeStyles((theme) => ({
  container: {
    padding: '0 12px',
    height: '100%',
    overflow: 'scroll',
    backgroundColor: theme.palette.background.paper,
  }
}))
export default function Read(props) {
  const classes = useStyles()
  const { mid } = useParams()
  const [mailInfo, setMailInfo] = useState({})
  const [mailContent, setMailContent] = useState('')
  const [headerInfo, setHeaderInfo] = useState({})
  const [attachments, setAttachments] = useState([])
  const [isFetching, setIsFetching] = useState(false)
  useEffect(() => {
    const params = {
      autoName: true,
      filterImages: false,
      filterLinks: false,
      filterStylesheets: false,
      id: mid,
      markRead: true,
      mode: 'html',
      part: '',
      returnAntispamInfo: true,
      returnHeaders: { Sender: 'A' }
    }
    setIsFetching(true)
    wmsvrApi.readMessage(params).then(data => {
      if (data.code === 'S_OK') {
        setMailInfo(data.var)
        if (data.var.html) {
          setMailContent(data.var.html.content)
        } else {
          setMailContent(data.var.text.html)
        }
        setHeaderInfo(data.var)
        data.var.attachments && setAttachments(data.var.attachments)
      }
    }, error => {
      console.log(error)
    }).finally(() => {
      setIsFetching(false)
    })
  }, [mid])
  return (
    <div className={classes.container}>
      {isFetching ? <SkeletonLoading /> : (
        <React.Fragment>
          <div className={classes.header}><ReadHeader headerInfo={headerInfo} /></div>
          <ReadContent mailContent={mailContent} />
          {attachments.length !== 0 ? <ReadAttachment attachments={attachments} /> : ''}
        </React.Fragment>
      )}
    </div>
  )
}
