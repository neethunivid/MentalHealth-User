import { Box, Button, Checkbox, Divider, Grid, TextField, Typography } from '@mui/material';
import React, { useState, useEffect } from 'react';
import { Controller, useForm } from 'react-hook-form';
import DateConversion from '../../Components/Common/DateConversion';
import apiClient from '../../API/API-client';
import { useNavigate } from 'react-router-dom';
interface RemarkInfoReplyCardProps {
  image?: string;
  name: string;
  remarkTitle: string;
  remarkText: string;
  remarkNo: string;
  date: string;
  isReplyContainerOpen: boolean;
  isAddDiaryContainerOpen?: boolean;
  ref?: React.Ref<HTMLDivElement>;
  depth: string;
  onPreviewClick: (data: any, id: number, remarkTitle: string) => void;
  textareaValue?: any;
  onToggle: () => void;
  onToggleAddDiary?: () => void;
  id: number;
  parentId?: number;
  type?: number | string;
}

/**
 * to handle the remark and its reply 
 * @param props 
 * @returns 
 */
const RemarkInfoReplyCard: React.FC<RemarkInfoReplyCardProps> = (props) => {
  const {
    image,
    name,
    remarkTitle,
    remarkText,
    remarkNo,
    date,
    isReplyContainerOpen,
    isAddDiaryContainerOpen,
    ref,
    depth,
    onPreviewClick,
    textareaValue,
    onToggle,
    onToggleAddDiary,
    id,
    parentId,
    type
  } = props;


  const { handleSubmit, control, formState: { errors }, reset } = useForm();

  const [depthvalue, setDepthValue] = useState<any>()
  const [isReplyContainerOpenStatus, setIsReplyContainerOpen] = useState(false);
  const [isAddDiaryContainerOpenStatus, setIsAddDiaryContainerOpen] = useState(false);
  const [isPreviewChecked, setIsPreviewChecked] = useState(false);
  let memberId = localStorage.getItem("memberNo")
  let memberName = localStorage.getItem("memberName")
  const navigate = useNavigate();

  const demo = localStorage.getItem("roomType") || "other";
  const roomTypeMap: { [key: string]: number } = {
        normal: 1,
        anxiety: 2,
        blackmail: 3,
        other: 4,
        growingup: 5,
        diary: 6,
  };
  const numType = Number(type);
  const result = (numType >= 1 && numType <= 6)
    ? numType
    : (roomTypeMap[demo as string] ?? 1);

  /**
   * increment the depth by one 
   * @param depth 
   * @returns 
   */
  function incrementDepth(depth: any) {

    const parts = depth?.split('-');
    const lastPart = parseInt(parts?.pop(), 10);
    if (!isNaN(lastPart)) {
      parts?.push(lastPart + 1);
    }
    return parts?.join('-');
  }
  useEffect(() => {
    const value = incrementDepth(depth)
    setDepthValue(value)
    setIsReplyContainerOpen(Boolean(isReplyContainerOpen));
    setIsAddDiaryContainerOpen(Boolean(isAddDiaryContainerOpen));
  }, [isReplyContainerOpen, isAddDiaryContainerOpen, depth]);




  const onSubmit = async (data: any) => {
    if (isPreviewChecked) {
      onPreviewClick({ ...data, type: result }, id, remarkTitle);
    } else {
      try {
        const requestData = {
          remarkId: id,
          parentRemark: id,
          type: result,
          title: data.textField,
          text: data.textarea,
          memberId: memberId,
          remarkTitle: remarkTitle
        };
        const apiData = await apiClient.post("api/reply/reply", requestData, {});
        if (apiData) {
          navigate('/remarksuccess')
        }
      } catch (error) {
        console.error("Error sending Data:", error);
      }
    }
  };

  const onSubmitDiary = async (data: any) => {
    if (isPreviewChecked) {
      onPreviewClick({ ...data, type: 6 }, id, remarkTitle);
    } else {
      try {
        const requestData = {
          remarkId: id,
          parentRemark: id,
          type: 6,
          title: data.textField,
          text: data.textarea,
          memberId: memberId,
          remarkTitle: remarkTitle
        };
        const apiData = await apiClient.post("api/reply/reply", requestData, {});
        if (apiData) {
          navigate('/remarksuccess')
        }
      } catch (error) {
        console.error("Error sending Data:", error);
      }
    }
  };

  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setIsPreviewChecked(e.target.checked);
  };
  //reset the form field 
  const handleReset = async (data: any) => {
    reset();

  };
  return (
    <>
      <Box ref={ref} sx={{ border: '1px solid #e0e0e0', padding: 2 }}>
        <div className="content-card">
          <div className="row-left">
            <div className="row-image">
              <img src={(() => {
                if (!image) return image;
                // Numeric icon (e.g. "5") → "images/icon5.png"
                if (/^\d+$/.test(image)) return `images/icon${image}.png`;
                // Already a full/absolute URL or path
                if (image.startsWith('blob:') || image.startsWith('http') || image.startsWith('/') || image.startsWith('data:')) return image;
                // Legacy format e.g. "icon4.png" → "images/icon4.png"
                return `images/${image}`;
              })()} alt="Profile" />
            </div>
            <Typography className='name'>{name}</Typography>
          </div>
          <div className="row-right">
            <Typography className='remark-title'>{remarkTitle}</Typography>
            <Typography className='date'>{`${DateConversion(date)} ${remarkNo}`}</Typography>

          </div>
        </div>
        <Divider className="remark-divider" />
        <Grid>
          <Typography className='remark-text'>{remarkText}</Typography>
        </Grid>
      </Box>

      <Grid className="btn-container">
        {(result === 5 || result === 6) && (
          <button
            className="followbtn"
            onClick={() => {
              if (onToggleAddDiary) {
                onToggleAddDiary();
              } else {
                setIsAddDiaryContainerOpen((prev) => !prev);
              }
            }}
          >
            日記を追加
          </button>
        )}
        <button
          className="followbtn"
          onClick={onToggle}
        >
          フォロー発言
        </button>
      </Grid>

      {(isReplyContainerOpenStatus) && (
        <>
          <Grid className="heading-container">
            <Typography className="heading">フォロー発言</Typography>
          </Grid>
          <Grid className="remark_container">
            <div className="content-card">
              <div className="row-left">
                <Typography className='member-label'>発言者</Typography>
              </div>
              <Grid className="textbox-right">
                <Typography className='remark-text'>{memberName}</Typography>
              </Grid>
            </div>
            <Divider className="remark-divider" />
            <form onSubmit={handleSubmit(onSubmit)}>
              <Grid className="content-card" marginTop={4}>
                <Grid className="row-left">
                  <Typography className='member-label'>タイトル</Typography>
                </Grid>
                <Grid className="textbox-right">
                  <Controller
                    name="textField"
                    control={control}
                    defaultValue={depthvalue}
                    rules={{ required: 'This field is required' }}
                    render={({ field }) => (
                      <TextField
                        {...field}
                        variant="outlined"
                        sx={{
                          width: '90%',
                          '& .MuiInputBase-root': {
                            height: '40px',
                            fontSize: '14px',
                          },
                          '& .MuiOutlinedInput-input': {
                            padding: '0 14px',
                          }
                        }}
                      />
                    )}
                  />
                </Grid>
              </Grid>

              <Grid className="content-card">
                <Grid className="row-left">
                  <Typography className='member-label'>発言内容</Typography>
                </Grid>
                <Grid className="textbox-right">
                  <Controller
                    name="textarea"
                    control={control}
                    defaultValue={textareaValue}
                    rules={{ required: 'This field is required' }}
                    render={({ field }) => (
                      <TextField
                        {...field}
                        variant="outlined"
                        sx={{
                          width: '90%', '& .MuiInputBase-root': {

                            fontSize: '14px',
                          },
                          '& .MuiOutlinedInput-input': {
                            padding: '0 14px',
                          }
                        }}
                        multiline
                        rows={4}
                      />
                    )}
                  />
                </Grid>
              </Grid>

              <Grid container className="submitbtn-container">
                <button type="submit" className='submitbtn'>
                  送信
                </button>
                <button type="reset" className='submitbtn' onClick={handleReset}>
                  リセット
                </button>

              </Grid>
              <Grid container className="submitbtn-container">
                <Grid className='previewbtn-container'>
                  <Checkbox
                    onChange={handleCheckboxChange}
                    inputProps={{ 'aria-label': 'preview checkbox' }}
                    style={{ padding: 0, marginRight: 4 }}
                  />
                  <Typography className='previewtext'>プレビュー（確認)</Typography>
                </Grid>
              </Grid>
            </form>
          </Grid>
        </>
      )}
      {(isAddDiaryContainerOpenStatus) && (
        <>
          <Grid className="heading-container">
            <Typography className="heading">日記を追加する</Typography>
          </Grid>
          <Grid className="remark_container">
            <div className="content-card">
              <div className="row-left">
                <Typography className='member-label'>発言者</Typography>
              </div>
              <Grid className="textbox-right">
                <Typography className='remark-text'>{memberName}</Typography>
              </Grid>
            </div>
            <Divider className="remark-divider" />
            <form onSubmit={handleSubmit(onSubmitDiary)}>
              <Grid className="content-card" marginTop={4}>
                <Grid className="row-left">
                  <Typography className='member-label'>タイトル（日記）</Typography>
                </Grid>
                <Grid className="textbox-right">
                  <Controller
                    name="textField"
                    control={control}
                    defaultValue=""
                    rules={{ required: 'This field is required' }}
                    render={({ field }) => (
                      <TextField
                        {...field}
                        variant="outlined"
                        sx={{
                          width: '90%',
                          '& .MuiInputBase-root': {
                            height: '40px',
                            fontSize: '14px',
                          },
                          '& .MuiOutlinedInput-input': {
                            padding: '0 14px',
                          }
                        }}
                      />
                    )}
                  />
                </Grid>
              </Grid>

              <Grid className="content-card">
                <Grid className="row-left">
                  <Typography className='member-label'>発言内容</Typography>
                </Grid>
                <Grid className="textbox-right">
                  <Controller
                    name="textarea"
                    control={control}
                    defaultValue={textareaValue}
                    rules={{ required: 'This field is required' }}
                    render={({ field }) => (
                      <TextField
                        {...field}
                        variant="outlined"
                        sx={{
                          width: '90%', '& .MuiInputBase-root': {

                            fontSize: '14px',
                          },
                          '& .MuiOutlinedInput-input': {
                            padding: '0 14px',
                          }
                        }}
                        multiline
                        rows={4}
                      />
                    )}
                  />
                </Grid>
              </Grid>

              <Grid container className="submitbtn-container">
                <button type="submit" className='submitbtn'>
                  送信
                </button>
                <button type="reset" className='submitbtn' onClick={handleReset}>
                  リセット
                </button>

              </Grid>
              <Grid container className="submitbtn-container">
                <Grid className='previewbtn-container'>
                  <Checkbox
                    onChange={handleCheckboxChange}
                    inputProps={{ 'aria-label': 'preview checkbox' }}
                    style={{ padding: 0, marginRight: 4 }}
                  />
                  <Typography className='previewtext'>プレビュー（確認)</Typography>
                </Grid>
              </Grid>
            </form>
          </Grid>
        </>
      )}
    </>
  );
}

export default RemarkInfoReplyCard;
