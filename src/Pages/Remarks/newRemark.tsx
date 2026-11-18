import React, { useState } from 'react';
import { Box, Checkbox, Divider, Grid, TextField, Typography } from '@mui/material';
import { Controller, useForm } from 'react-hook-form';
import RemarksLayout from './RemarksLayout';
import apiClient from '../../API/API-client';
import { useNavigate } from 'react-router-dom';

interface RemarkFormData {
  title: string;
  text: string;
}

const NewRemark: React.FC = () => {
  const memberName = localStorage.getItem('memberName') || '';
  const [previewData, setPreviewData] = useState<RemarkFormData | null>(null);
  const [isPreviewChecked, setIsPreviewChecked] = useState(false);
  const [submissionError, setSubmissionError] = useState('');
   let memberId = localStorage.getItem("memberNo")
   const navigate = useNavigate();
  const {
    handleSubmit,
    control,
    reset,
    formState: { errors },
  } = useForm<RemarkFormData>({
    defaultValues: {
      title: '',
      text: '',
    },
  });

  const submitRemark = async (data: RemarkFormData) => {
    const demo = localStorage.getItem("roomType") || "other";
    const roomTypeMap: { [key: string]: number } = {
      anxiety: 2,
      normal: 1,
      blackmail: 3,
      other: 4
    };

    let result = roomTypeMap[demo as string] || 0;
    setSubmissionError('');
    try {
      const requestData = {
        type: result,
        title: data.title,
        text: data.text,
        memberId: memberId,
      };
      const apiData = await apiClient.post("api/reply/remarks", requestData, {});
      if (apiData) {
        navigate('/remarksuccess');
      } else {
        setSubmissionError('新規発言を送信できませんでした。');
      }
    } catch (error) {
      console.error("Error sending Data:", error);
      setSubmissionError('新規発言を送信できませんでした。');
    }
  };

  const handleSubmitRemark = async (data: RemarkFormData) => {
    if (isPreviewChecked) {
      setSubmissionError('');
      setPreviewData(data);
      return;
    }

    await submitRemark(data);
  };

  const handleSendPreview = async () => {
    if (previewData) {
      await submitRemark(previewData);
    }
  };

  const handleEdit = () => {
    setPreviewData(null);
  };

  const handleReset = () => {
    reset();
    setIsPreviewChecked(false);
    setSubmissionError('');
  };

  return (
    <RemarksLayout>
      <Grid className="container-remarkdetails">
        <Grid className="heading-container">
          <Typography className="heading">新規発言</Typography>
        </Grid>
        {previewData ? (
          <Grid className="remark_container">
            <Grid className="content-card">
              <Grid className="row-left">
                <Typography className="member-label">発言者</Typography>
              </Grid>
              <Grid className="textbox-right">
                <Typography className="remark-text">{memberName}</Typography>
              </Grid>
            </Grid>
            <Divider className="remark-divider" />
            <Grid className="content-card">
              <Grid className="row-left">
                <Typography className="member-label">タイトル</Typography>
              </Grid>
              <Grid className="textbox-right">
                <Typography className="remark-text">{previewData.title}</Typography>
              </Grid>
            </Grid>
            <Divider className="remark-divider" />
            <Grid className="content-card">
              <Grid className="row-left">
                <Typography className="member-label">発言内容</Typography>
              </Grid>
              <Grid className="textbox-right">
                <Typography className="remark-text">{previewData.text}</Typography>
              </Grid>
            </Grid>
            <Divider className="remark-divider" />
            {submissionError && <Typography role="alert">{submissionError}</Typography>}
            <Grid container className="submitbtn-container">
              <button type="button" className="submitbtn" onClick={handleEdit}>戻る</button>
              <button type="button" className="submitbtn" onClick={handleSendPreview}>送信</button>
            </Grid>
          </Grid>
        ) : (
          <Grid className="remark_container">
            <Grid className="content-card">
              <Grid className="row-left">
                <Typography className="member-label">発言者</Typography>
              </Grid>
              <Grid className="textbox-right">
                <Typography className="remark-text">{memberName}</Typography>
              </Grid>
            </Grid>
            <Divider className="remark-divider" />
            <form onSubmit={handleSubmit(handleSubmitRemark)}>
              <Grid className="content-card" marginTop={4}>
                <Grid className="row-left">
                  <Typography className="member-label">タイトル</Typography>
                </Grid>
                <Grid className="textbox-right">
                  <Controller
                    name="title"
                    control={control}
                    rules={{ required: 'タイトルを入力してください。' }}
                    render={({ field }) => (
                      <TextField
                        {...field}
                        variant="outlined"
                        error={Boolean(errors.title)}
                        helperText={errors.title?.message}
                        sx={{
                          width: '90%',
                          '& .MuiInputBase-root': {
                            height: '40px',
                            fontSize: '14px',
                          },
                          '& .MuiOutlinedInput-input': {
                            padding: '0 14px',
                          },
                        }}
                      />
                    )}
                  />
                </Grid>
              </Grid>
              <Grid className="content-card">
                <Grid className="row-left">
                  <Typography className="member-label">発言内容</Typography>
                </Grid>
                <Grid className="textbox-right">
                  <Controller
                    name="text"
                    control={control}
                    rules={{ required: '発言内容を入力してください。' }}
                    render={({ field }) => (
                      <TextField
                        {...field}
                        variant="outlined"
                        error={Boolean(errors.text)}
                        helperText={errors.text?.message}
                        sx={{ width: '90%' }}
                        multiline
                        rows={4}
                      />
                    )}
                  />
                </Grid>
              </Grid>
              {submissionError && <Typography role="alert">{submissionError}</Typography>}
              <Grid container className="submitbtn-container">
                <button type="submit" className="submitbtn">送信</button>
                <button type="reset" className="submitbtn" onClick={handleReset}>リセット</button>
              </Grid>
              <Grid container className="submitbtn-container">
                <Grid className="previewbtn-container">
                  <Checkbox
                    checked={isPreviewChecked}
                    onChange={(event) => setIsPreviewChecked(event.target.checked)}
                    inputProps={{ 'aria-label': 'preview checkbox' }}
                    style={{ padding: 0, marginRight: 4 }}
                  />
                  <Typography className="previewtext">プレビュー（確認)</Typography>
                </Grid>
              </Grid>
            </form>
          </Grid>
        )}
      </Grid>
    </RemarksLayout>
  );
};

export default NewRemark;
