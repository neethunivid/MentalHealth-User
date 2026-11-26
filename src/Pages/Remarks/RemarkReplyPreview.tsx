import React from 'react';
import { Typography, Divider, Grid } from '@mui/material';
import apiClient from '../../API/API-client';
import { useNavigate } from 'react-router-dom';

/**
 * preview component of remark
 * @param param0 
 * @returns 
 */
function PreviewComponent({ onReturnClick, data, remarktitle, selectedRemarkReply, type }: any) {
  const navigate = useNavigate()
  let memberName = localStorage.getItem("memberName")
  let memberId = localStorage.getItem("memberNo")

  const showReplyErrorAlert = (rawMessage?: string) => {
    const msg = rawMessage?.trim() || '送信に失敗しました。';
    if (/Reply title contains prohibited NG words/i.test(msg)) {
      alert(`タイトルに禁止ワード（NGワード）が含まれているため送信できません。\n${msg}`);
    } else if (/prohibited NG words/i.test(msg)) {
      alert(`発言内容に禁止ワード（NGワード）が含まれているため送信できません。\n${msg}`);
    } else {
      alert(msg);
    }
  };

  const onSubmitClick = async () => {
    try {
      let demo = localStorage.getItem("roomType") || "other";
      const roomTypeMap: { [key: string]: number } = {
        normal: 1,
        anxiety: 2,
        blackmail: 3,
        other: 4,
        growth: 5,
        growingup: 5,
        diary: 6,
      };
      const resolvedType = Number(data?.type || type) || roomTypeMap[demo as string] || 1;

      const requestData = {
        remarkId: selectedRemarkReply,
        parentRemark: selectedRemarkReply,
        type: resolvedType,
        title: data.textField,
        text: data.textarea,
        memberId: memberId,
        remarkTitle: remarktitle
      };
      const apiData = await apiClient.post("api/reply/reply", requestData, {});
      if (apiData?.data?.code === 0 || apiData?.data?.error) {
        showReplyErrorAlert(apiData?.data?.error || apiData?.data?.message);
        return;
      }
      if (apiData) {
        navigate('/remarksuccess')

      }
    } catch (error: any) {
      console.error("Error sending Data:", error);
      const errData = error?.response?.data;
      const errMsg =
        errData?.error ||
        errData?.message ||
        (typeof errData === 'string' ? errData : '') ||
        error?.message;
      showReplyErrorAlert(errMsg);
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
            <button className='submitbtn' onClick={onSubmitClick}>送信</button>
            <button className='submitbtn' onClick={onReturnClick}>戻る</button>

          </Grid>
        </Grid>
      </Grid>

      <Divider className="remark-divider" />
    </>
  );
}

export default PreviewComponent
