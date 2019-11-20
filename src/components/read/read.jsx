import React, { useState, useEffect } from 'react'
import CssBaseline from '@material-ui/core/CssBaseline'
import { makeStyles } from '@material-ui/core/styles'
import Container from '@material-ui/core/Container'
import ReadContent from 'components/read/readContent'
import ReadHeader from 'components/read/readHeader'
import wmsvrApi from 'network/api'
import Loading from 'components/loading/loading'

const useStyles = makeStyles((theme) => ({
  container: {
    backgroundColor: theme.palette.background.paper
  },
  header: {
    marginTop: '20px'
  },
}))
export default function Read(props) {
  const classes = useStyles()
  const { match, mid } = props
  const [mailInfo, setMailInfo] = useState({})
  const [mailContent, setMailContent] = useState('')
  const [headerInfo, setHeaderInfo] = useState({})
  const [isLoading, setIsLoading] = useState(false)

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
    setIsLoading(true)
    wmsvrApi.readMessage(params).then(data => {
      if (data.code === 'S_OK') {
        setMailInfo(data.var)
        setMailContent(data.var.html.content)
        setHeaderInfo(data.var)
      }
    }, error => {
      console.log(error)
    }).finally(() => {
      setIsLoading(false)
    })
  }, [mid])
  return (
    <React.Fragment>
      <CssBaseline />
      <Container maxWidth={false} className={classes.container}>
        <div className={classes.header}><ReadHeader headerInfo={headerInfo} /></div>
        <ReadContent mailContent={mailContent} />
      </Container>
    </React.Fragment>
  )
}
