import React, { useState, useEffect } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import Button from '@material-ui/core/Button'
import InputBase from '@material-ui/core/InputBase'

const useStyles = makeStyles((theme) => ({
  container: {
  },
  from: {
    height: '53px',
    borderBottom: '1px solid rgba(0,0,0,0.1)',
    display: 'flex',
    alignItems: 'center'
  },
  to: {
    height: '53px',
    borderBottom: '1px solid rgba(0,0,0,0.1)',
    display: 'flex',
    alignItems: 'center'
  },
  cc: {
    height: '53px',
    borderBottom: '1px solid rgba(0,0,0,0.1)',
    display: 'flex',
    alignItems: 'center'
  },
  bcc: {
    height: '53px',
    borderBottom: '1px solid rgba(0,0,0,0.1)',
    display: 'flex',
    alignItems: 'center'
  },
  subject: {
    height: '53px',
    borderBottom: '1px solid rgba(0,0,0,0.1)',
    display: 'flex',
    alignItems: 'center'
  },
  contactSelectLabel: {
    backgroundColor: theme.palette.primary.light
  },
  input: {
    border: 'none',
    flex: 1,
    height: '35px',
    paddingLeft: '12px',
    outline: 'none'
  }
}))
export default function Compose(props) {
  const classes = useStyles()
  // 新建邮件
  useEffect(() => {

  }, [])
  // 回复邮件
  useEffect(() => {

  }, [])
  // 转发邮件
  useEffect(() => {

  }, [])
  // 获取签名档
  useEffect(() => {
  }, [])
  return (
    <React.Fragment>
      <div className={classes.container}>
        <div className={classes.contactArea}>
          <div className={classes.from}>
            <Button variant="contained" color="primary" classes={{ root: classes.contactSelectLabel }} boxShadow={0}>发件人</Button>
            <input type="text" className={classes.input} />
          </div>
          <div className={classes.to}>
            <Button variant="contained" color="primary" classes={{ root: classes.contactSelectLabel }}>收件人</Button>
            <input type="text" className={classes.input} />
          </div>
          <div className={classes.cc}>
            <Button variant="contained" color="primary" classes={{ root: classes.contactSelectLabel }}>抄送</Button>
            <input type="text" className={classes.input} />
          </div>
          <div className={classes.bcc}>
            <Button variant="contained" color="primary" classes={{ root: classes.contactSelectLabel }}>密送</Button>
            <input type="text" className={classes.input} />
          </div>
          <div className={classes.subject}>
            <Button variant="contained" color="primary" classes={{ root: classes.contactSelectLabel }}>主题</Button>
            <input type="text" className={classes.input} />
          </div>
        </div>
        <div className={classes.editArea}></div>
        <div className={classes.toolArea}></div>
      </div>
    </React.Fragment>
  )
}
