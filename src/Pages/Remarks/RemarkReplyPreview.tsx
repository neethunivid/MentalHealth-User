import React from 'react';
import { Typography, Divider, Grid } from '@mui/material';
import apiClient from '../../API/API-client';
import { useNavigate } from 'react-router-dom';

/**
 * preview component of remark
 * @param param0 
 * @returns 
 */
function PreviewComponent({ onReturnClick, data,remarktitle,selectedRemarkReply }:any) {
  const navigate =useNavigate()
  let memberName = localStorage.getItem("memberName")
  let memberId =localStorage.getItem("memberNo")
  const onSubmitClick=async ()=>{
    try {
      const requestData = {
        remarkId: selectedRemarkReply,
        parentRemark: selectedRemarkReply,
        type: 1,
        title: data.textField,
        text: data.textarea,
        memberId: memberId,
        remarkTitle: remarktitle
      };
      const apiData = await apiClient.post("api/reply/reply", requestData, {});
      if (apiData) {
        navigate('/remarksuccess')
        
      }
    } catch (error) {
      console.error("Error sending Data:", error);
    }
  }
  return (
    <>
    <Grid className='preview-container'>
    <Grid className="remark_container">

  
    <Grid className="content-card">
      <Grid className="profile-left">
        <Typography className='member-label'>発言者</Typography>
      </Grid>
      <Grid className="textbox-right">
        <Typography className='remark-text'>{memberName}</Typography>
      </Grid>
    </Grid>
    <Divider className="remark-divider" />
  
      <Grid className="content-card">
        <Grid className="profile-left">
          <Typography className='remark-text'>タイトル</Typography>
        </Grid>
        <Grid className="textbox-right">
        <Typography className='remark-text'>{data.textField}</Typography>
        </Grid>
      </Grid>
      <Divider className="remark-Gridider" />
      <Grid className="content-card">
        <Grid className="profile-left">
          <Typography className='remark-text'>発言内容</Typography>
        </Grid>
        <Grid className="textbox-right">
        <Typography className='remark-text'>{data.textarea}</Typography>
        </Grid>
      </Grid>
      <Divider className="remark-divider" />
      <Grid className="previewpage-btn-container">
        <button className='previewsubmitbtn'onClick={onSubmitClick}>送信</button>
        <button className='submitbtn' onClick={onReturnClick}>戻る</button>

      </Grid>
      </Grid>
  </Grid>

<Divider className="remark-divider" />
</>
  );
}

export default PreviewComponent
