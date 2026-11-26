import React, { useState } from 'react';
import { Box, Checkbox, Divider, Grid, TextField, Typography } from '@mui/material';
import { Controller, useForm } from 'react-hook-form';
import RemarksLayout from './RemarksLayout';
import apiClient from '../../API/API-client';
import { useNavigate } from 'react-router-dom';
import { Girl } from '@mui/icons-material';
import { extractApiErrorMessage, showRemarkErrorAlert } from './remarkErrorAlert';

interface RemarkFormData {
  title: string;
  text: string;
  roomSelection: string;
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
    register,
    reset,
    formState: { errors },
  } = useForm<RemarkFormData>({
    defaultValues: {
      title: '',
      text: '',
      roomSelection: localStorage.getItem("roomType") || '',
    },
  });

  const roomTypeMap: { [key: string]: number } = {
    normal: 1,
    anxiety: 2,
    blackmail: 3,
    other: 4,
    growingup: 5,
    diary: 6,
  };

  const roomLabelMap: { [key: string]: string } = {
    normal: '普通の部屋',
    anxiety: '不安の部屋',
    blackmail: '強迫の部屋',
    other: 'その他の部屋',
    growingup: '成長の部屋',
    diary: '日記',
  };

  const submitRemark = async (data: RemarkFormData) => {
    const selectedRoom = data.roomSelection;
    if (!selectedRoom || roomTypeMap[selectedRoom] === undefined) {
      setSubmissionError('送信先を選択して下さい。');
      return;
    }

    const result = roomTypeMap[selectedRoom];
    console.log("Selected Room:", selectedRoom);

    setSubmissionError('');
    try {
      const requestData = {
        type: result,
        title: data.title,
        text: data.text,
        memberId: memberId,
      };
      const apiData = await apiClient.post("api/reply/remarks", requestData, {});
      if (apiData?.data?.code === 0 || apiData?.data?.error) {
        const msg = showRemarkErrorAlert(apiData?.data?.error || apiData?.data?.message);
        setSubmissionError(msg);
        return;
      }
      if (apiData) {
        navigate('/remarksuccess');
      } else {
        const msg = showRemarkErrorAlert();
        setSubmissionError(msg);
      }
    } catch (error: any) {
      console.error("Error sending Data:", error);
      const msg = showRemarkErrorAlert(extractApiErrorMessage(error));
      setSubmissionError(msg);
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
        <Grid className="heading-container" style={{ 'borderRadius': '8px' }}>
          <Typography className="heading">メッセージをどうぞ（新規発言）</Typography>
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
            <Grid className="content-card">
              <Grid className="row-left">
                <Typography className="member-label">送信先</Typography>
              </Grid>
              <Grid className="textbox-right">
                <Typography className="remark-text">{roomLabelMap[previewData.roomSelection] || previewData.roomSelection}</Typography>
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
          <Grid className="remark_container" padding={3}>
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
              <Grid className="content-card-new" marginTop={4}>
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
                          backgroundColor: '#fff'
                        }}
                      />
                    )}
                  />
                </Grid>
              </Grid>
              <Grid className="content-card-new">
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
                        sx={{ width: '90%', backgroundColor: '#fff' }}
                        multiline
                        rows={4}
                      />
                    )}
                  />
                </Grid>
              </Grid>
              <Grid className="content-card" marginTop={2}>
                <Grid className="row-left">
                  <Typography className="member-label">
                    送信先を選択して下さい <span style={{ color: 'red' }}>*</span>
                  </Typography>
                </Grid>
                <Grid className="textbox-right">
                  <Box
                    sx={{
                      display: 'flex',
                      flexWrap: 'wrap',
                      gap: '12px 20px',
                      fontSize: '14px',
                      alignItems: 'center',
                      '@media (max-width: 600px)': {
                        flexDirection: 'column',
                        alignItems: 'flex-start',
                        gap: '10px',
                      },
                    }}
                  >
                    <label style={{ cursor: 'pointer', display: 'inline-flex', alignItems: 'center', fontSize: '14px' }}>
                      <input type="radio" value="normal" {...register('roomSelection')} style={{ marginRight: '6px' }} />
                      普通の部屋
                    </label>
                    <label style={{ cursor: 'pointer', display: 'inline-flex', alignItems: 'center', fontSize: '14px' }}>
                      <input type="radio" value="anxiety" {...register('roomSelection')} style={{ marginRight: '6px' }} />
                      不安の部屋
                    </label>
                    <label style={{ cursor: 'pointer', display: 'inline-flex', alignItems: 'center', fontSize: '14px' }}>
                      <input type="radio" value="blackmail" {...register('roomSelection')} style={{ marginRight: '6px' }} />
                      強迫の部屋
                    </label>
                    <label style={{ cursor: 'pointer', display: 'inline-flex', alignItems: 'center', fontSize: '14px' }}>
                      <input type="radio" value="other" {...register('roomSelection')} style={{ marginRight: '6px' }} />
                      その他の部屋
                    </label>
                    <label style={{ cursor: 'pointer', display: 'inline-flex', alignItems: 'center', fontSize: '14px' }}>
                      <input type="radio" value="growingup" {...register('roomSelection')} style={{ marginRight: '6px' }} />
                      成長の部屋
                    </label>
                    <label style={{ cursor: 'pointer', display: 'inline-flex', alignItems: 'center', fontSize: '14px' }}>
                      <input type="radio" value="diary" {...register('roomSelection')} style={{ marginRight: '6px' }} />
                      日記
                    </label>
                  </Box>
                </Grid>
              </Grid>
              <Divider className="remark-divider" />
              {submissionError && <Typography role="alert">{submissionError}</Typography>}
              <Grid container className="submitbtn-container-new">
                <button type="submit" className="submitbtn">送信</button>
                <button type="reset" className="submitbtn" onClick={handleReset}>リセット</button>
              </Grid>
              <Grid container className="submitbtn-container-new" marginLeft={8}>
                <Grid className="previewbtn-container">
                  <Checkbox
                    checked={isPreviewChecked}
                    onChange={(event) => setIsPreviewChecked(event.target.checked)}
                    inputProps={{ 'aria-label': 'preview checkbox' }}
                    style={{ padding: 0, marginRight: 4 }}
                  />
                  <Typography className="previewtext">プレビュー（送信内容の確認)</Typography>
                </Grid>
              </Grid>
            </form>
          </Grid>
        )
        }
      </Grid >
    </RemarksLayout >
  );
};

export default NewRemark;
