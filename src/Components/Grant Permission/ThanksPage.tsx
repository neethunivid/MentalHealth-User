import { Grid, Typography } from "@material-ui/core";



const Thank_page=()=>{
    return(
        <Grid container>
            <Grid  container  className="mg_top">
                <Grid xs={12}>
                    <Grid  container className="center">
                        <Grid xs={2}></Grid>
                        <Grid xs={8} className="thank">
                            
                            <Typography>研究活動助成のオンライン申請を受付ました</Typography>
                            
                        </Grid>
            
                        <Grid xs={2}></Grid>
                    </Grid>
                      <Grid  container className="center">
                        <Grid xs={2}></Grid>
                    <Grid xs={8} className="body1">
                        <Grid></Grid>
                    </Grid>
                    <Grid xs={2}></Grid>
                    </Grid> 
                    <Grid  container>
                        <Grid xs={2}></Grid>
                    <Grid  xs={8} className="body1">
                     <Typography>ご応募ありがとうございます。申請内容を確認の上、もし何かありましたら、事務局から</Typography>
                       
                    </Grid>
                    <Grid xs={2}></Grid>
                    </Grid>
                    <Grid  container>
                        <Grid xs={2}></Grid>
                    <Grid  xs={8} className="body1">
                    
                        <Typography>ご連絡致します。特に何もなければご連絡は不要です。よろしくお願いします。 </Typography>
                    </Grid>
                    <Grid xs={2}></Grid>
                    </Grid>
                    <Grid  container>
                        <Grid xs={2}></Grid>
                    <Grid  xs={8} className="footer">
                    
                        <Typography>（公財）メンタルヘルス岡本記念財団　事務局 </Typography>
                    </Grid>
                    <Grid xs={2}></Grid>
                    </Grid>
                </Grid>
            </Grid>
        </Grid>
    );

}
export default Thank_page;