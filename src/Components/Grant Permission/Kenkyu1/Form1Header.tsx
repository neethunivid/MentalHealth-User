import { Grid, Typography } from '@mui/material'
import React from 'react'

const Form1Header = () => {
  return (
    <>
    <Grid className="header">
      <Typography className="text-bold">
        研究活動助成の申請フォーム
      </Typography>
      <Grid className="hr" />
    </Grid>
    <Grid className="header-row">
      <Grid item xs={3}>
        <Typography className="text-bold">■様式1-1 (Form 1)</Typography>
      </Grid>
      <Grid item xs={2}>
        <Typography className="text-bold">記入項目 (Item Questions)</Typography>
      </Grid>
      <Grid item xs={2}>
        <Typography className="text-bold">記入欄 (Fill in Answers)</Typography>
      </Grid>
      <Grid xs={5}>
        <Typography className="text-bold">記入例 (Example)</Typography>
      </Grid>
    </Grid>
  </>
  )
}

export default Form1Header