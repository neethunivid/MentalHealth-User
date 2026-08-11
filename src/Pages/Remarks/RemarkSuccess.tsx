import React from 'react';
import { Grid, Box, Typography } from '@mui/material';
import RemarkListSubHeader from "../../Components/Common/RemarkListSubHeader";

/**
 * to dispaly the remark has sent
 * @returns 
 */
const RemarkSuccess = () => {
  return (
    <Grid>
    <RemarkListSubHeader/>
    <Box className="remark-successs-container">
      <Grid container spacing={2}>
        <Grid item xs={12} className="green-background">
        <Grid item xs={12} className="message-text">
        メッセージをどうぞ（フォロー発言）
         
        </Grid> 
       
        <Grid item xs={12} className="red-text">
          メッセージは送信されました
         
        </Grid>
        </Grid>
      </Grid>
    </Box>
    </Grid>
  );
};

export default RemarkSuccess;
