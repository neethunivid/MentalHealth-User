import { Grid } from "@material-ui/core";
import { Typography } from "@mui/material";

const Form3Header = () => {
  return (
    <>
     <Grid
            item
            xs={12}
            className="header"
          >
            <Typography className="text-bold">
              研究活動助成の申請フォーム
            </Typography>
          </Grid>
          <Grid className="hr"></Grid>
          <Grid
            className="header-row"
          >
            <Grid item xs={4}>
              <Typography className="text-bold">■様式1-3 （Form 3)</Typography>
            </Grid>
            <Grid item xs={2}>
              <Typography className="text-bold">記入項目 (Item Questions)</Typography>
            </Grid>
            <Grid item xs={3}>
              <Typography className="text-bold"> 記入欄 (Fill in Answers)</Typography>
            </Grid>
            <Grid item xs={3}>
              <Typography className="text-bold"> 記入例 (Example)</Typography>
            </Grid>
          </Grid>
  </>
  )
}

export default Form3Header;