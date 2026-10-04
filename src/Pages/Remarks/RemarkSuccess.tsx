import React from 'react';
import { Grid, Box } from '@mui/material';
import RemarksLayout from './RemarksLayout';

/**
 * to display the remark has been sent
 * @returns
 */
const RemarkSuccess = () => {
  return (
    <RemarksLayout>
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
    </RemarksLayout>
  );
};

export default RemarkSuccess;

