import React, { useState } from 'react';
import { Box, Checkbox, Divider, Grid, TextField, Typography } from '@mui/material';
import { Controller, useForm } from 'react-hook-form';
import RemarksLayout from './RemarksLayout';
import apiClient from '../../API/API-client';
import { useNavigate } from 'react-router-dom';
import DiaryWritingGuideDialog from './DiaryWritingGuideDialog';

interface RemarkFormData {
  title: string;
  text: string;
}

const Diary: React.FC = () => {
  const memberName = localStorage.getItem('memberName') || '';
  const [previewData, setPreviewData] = useState<RemarkFormData | null>(null);
  const [isPreviewChecked, setIsPreviewChecked] = useState(false);
  const [submissionError, setSubmissionError] = useState('');
  const [isDiaryGuideOpen, setIsDiaryGuideOpen] = useState(false);
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
          <Typography className="heading">発言</Typography>
        </Grid>
          <Grid className="diary_container">
            <Grid className="info">
              <Grid className="info-container">
                <Typography>{`• `}</Typography>
                <Typography className="info-text">48時間以内の日記は</Typography>
                <Typography className="info-text-red">new!</Typography>
                <Typography className="info-text">で表示されます。</Typography>
              </Grid>
              <Grid className="info-container">
                <Typography>{`• `}</Typography>
                <Typography className="info-text">右窓枠の数字は日記の記事数とコメント数の合計を表示。数字が</Typography>
                <Typography className="info-text-red">赤字</Typography>
                <Typography className="info-text">の場合は新着があります。</Typography>
              </Grid>
              <Grid className="info-container">
                <Typography>{`• `}</Typography>
                <Typography className="info-text">日記の書き方はこちらを参照して下さい。</Typography>
                <button
                  type="button"
                  className="diary-guide-button"
                  onClick={() => setIsDiaryGuideOpen(true)}
                >
                  日記の書き方
                </button>
              </Grid>
            </Grid>
          </Grid>
      </Grid>
      <DiaryWritingGuideDialog
        open={isDiaryGuideOpen}
        onClose={() => setIsDiaryGuideOpen(false)}
      />
    </RemarksLayout>
  );
};

export default Diary;
