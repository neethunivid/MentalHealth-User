import { Grid } from "@material-ui/core";
import { Typography } from "@mui/material";

const Form2Header = () => {
  return (
    <>
    <Grid item xs={12} className="header">
            <Typography className="text-bold">
              研究活動助成の申請フォーム
            </Typography>
          </Grid>
          <Grid className="hr"></Grid>
          <Grid className="header-row">
          <Grid  xs={7} className="content-row">
            <Grid item xs={8}>
              <Typography className="text-bold"> ■様式1-2 (Form2)</Typography>
            </Grid>
            <Grid item xs={4}>
              <Typography className="text-bold">
                記入項目 (Item Questions)
              </Typography>
            </Grid>
            </Grid>
            <Grid  xs={5} className="content-row">
            <Grid item xs={6}>
              <Typography className="text-bold">
                {"   "}
                記入欄 (Fill in Answers)
              </Typography>
            </Grid>
            <Grid item xs={6}>
              <Typography className="text-bold txt_lft"> 記入例 (Example)</Typography>
            </Grid>
            </Grid>
          </Grid>
  </>
  )
}

export default Form2Header