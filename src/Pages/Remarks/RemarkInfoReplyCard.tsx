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
  ref?: React.Ref<HTMLDivElement>;
  depth: string;
  onPreviewClick: (data: any, id: number,remarkTitle:string) => void;
  textareaValue?: any;
  onToggle: () => void;
  id: number;
  parentId?: number;
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
    ref, 
    depth, 
    onPreviewClick, 
    textareaValue, 
    onToggle, 
    id, 
    parentId 
  } = props;


  const { handleSubmit, control, formState: { errors },reset } = useForm();

  const [depthvalue, setDepthValue] = useState<any>()
  const [isReplyContainerOpenStatus, setIsReplyContainerOpen] = useState(false);
  const [isPreviewChecked, setIsPreviewChecked] = useState(false);
  let memberId =localStorage.getItem("memberNo")
  let memberName = localStorage.getItem("memberName")
  const navigate = useNavigate();

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
    setIsReplyContainerOpen(isReplyContainerOpen);
  }, [isReplyContainerOpen]);

 


  const onSubmit = async (data: any) => {
    let demo = localStorage.getItem("roomType") || "other";
    const roomTypeMap : { [key: string]: number }= {
      anxiety: 2,
      normal: 1,
      blackmail: 3,
      other: 4
    };
    
    let result = roomTypeMap[demo as string] || 0;
    if (isPreviewChecked) {
      onPreviewClick(data, id,remarkTitle);
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

  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setIsPreviewChecked(e.target.checked);
  };
  //reset the form field 
 const handleReset = async (data: any) => {
  reset();

};
  return (
    <>
      <Box ref={ref} sx={{ border: '1px solid #e0e0e0', padding: 1 }}>
        <div className="content-card">
          <div className="row-left">
            <div className="row-image">
              <img src={image} alt="Profile" />
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
          <Typography className='remark-text'>{remarkTitle}</Typography>
          <Typography className='remark-text'>{remarkText}</Typography>
        </Grid>
      </Box>

      <Grid className="btn-container">
        <button className='followbtn' onClick={onToggle}>フォロー発言</button>
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
              <Grid className="content-card">
                <Grid className="row-left">
                  <Typography className='remark-text'>タイトル</Typography>
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
                            height: '30px',
                            fontSize: '10px',
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
              <Divider className="remark-divider" />
              <Grid className="content-card">
                <Grid className="row-left">
                  <Typography className='remark-text'>発言内容</Typography>
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
                        sx={{ width: '90%' }}
                        multiline
                        rows={4}
                      />
                    )}
                  />
                </Grid>
              </Grid>
              <Divider className="remark-divider" />
              <Grid container justifyContent="center" className="submitbtn-container">
                <button type="submit" className='submitbtn'>
                  送信
                </button>
                <button type="reset" className='submitbtn' onClick={handleReset}>
                  リセット
                </button>
                <Grid className='previewbtn-container'>
                  <Checkbox
                    onChange={handleCheckboxChange}
                    inputProps={{ 'aria-label': 'preview checkbox' }}
                    style={{ padding: 0, marginRight: 4 }}
                  />
                  <Typography className='previewtext'>プレビュー</Typography>
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
