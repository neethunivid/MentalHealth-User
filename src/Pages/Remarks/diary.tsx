import React, { useEffect, useState } from 'react';
import { Box, Checkbox, Divider, Grid, IconButton, TextField, Typography } from '@mui/material';
import { Controller, useForm } from 'react-hook-form';
import RemarksLayout from './RemarksLayout';
import apiClient from '../../API/API-client';
import { useNavigate } from 'react-router-dom';
import { extractApiErrorMessage, showRemarkErrorAlert } from './remarkErrorAlert';
import DiaryWritingGuideDialog from './DiaryWritingGuideDialog';
import TreeView from '../../Components/Common/TreeData';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
import Pagination from "../../Components/Common/PaginationComponent";


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

  const [remarkList, setRemarkList] = useState<any[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [expandedRemark, setExpandedRemark] = useState<string | null>(null);
  const [remarkdata, setRemarkTreData] = useState<any>();
  const [expandedRemarkData, setExpandedReamarkData] = useState<any>();
  const [loaded, SetLoaded] = useState(false)
  const resultsPerPage = 10;
  const [totalPages, setTotalPages] = useState(1);
  const [count, setCount] = useState(0);
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

  /**
   * get the remark based on the current page
   */
  useEffect(() => {
    getRemarkList();
  }, [currentPage]);


  /**
* function to get the remarks
*/
  const getRemarkList = async () => {
    let roomType = localStorage.getItem("roomType")
    try {
      const DataRequest = {
        type: 'diary',
        page: currentPage - 1,
        size: 10
      };
      const apiData = await apiClient.post("api/reply/tree/list", DataRequest, {});
      if (apiData && apiData.data && apiData.data.data) {
        setRemarkList(apiData.data.data);
        setCount(apiData.data.count);
        setTotalPages(Math.ceil(apiData.data.count / resultsPerPage));
      }
    } catch (error) {
      console.error("Error sending Data:", error);
    }
  };


  const submitRemark = async (data: RemarkFormData) => {
    const demo = localStorage.getItem("roomType") || "other";
    console.log('ROOM TYPE ', demo);
    const roomTypeMap: { [key: string]: number } = {
          normal: 1,
        anxiety: 2,
        blackmail: 3,
        other: 4,
        growingup: 5,
        diary: 6
    };

    let result = roomTypeMap[demo as string] || 6;
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

  /**
   * to toggle the main remark to show its children
   * @param item
   * @param navigateOnExpand
   */
  const toggleExpandRemark = async (item: any, navigateOnExpand = false) => {
    if (expandedRemark === item.id) {
      setExpandedRemark(null);
      setExpandedReamarkData(item);
    } else {

      let apiData: any

      SetLoaded(false)
      setExpandedRemark(item.id);
      try {

        apiData = await apiClient.get(`api/reply/children/${item.id}`, {});
        if (apiData && apiData.data && apiData.data.data) {
          SetLoaded(true)
          setRemarkTreData(apiData.data.data);
        }
      } catch (error) {
        console.error("Error sending Data:", error);
      }

      setExpandedReamarkData(item);
      if (navigateOnExpand) {
        navigate('/remarktree_reply', { state: { expandedRemarkData: item, remarkdata: apiData.data.data, id: item.id } });
      }

    }
  };

  const DateConversion = (dateArray: any) => {
    if (!dateArray || !Array.isArray(dateArray) || dateArray.length < 5 || dateArray.length > 6) {
      return "Invalid date";
    }

    const [year, month, day, hours, minutes, seconds = 0] = dateArray;
    const date = new Date(year, month - 1, day, hours, minutes, seconds);

    if (isNaN(date.getTime())) {
      return "Invalid date";
    }

    const yearShort = date.getFullYear().toString().slice(-2);
    const monthPadded = `0${date.getMonth() + 1}`.slice(-2);
    const dayPadded = `0${date.getDate()}`.slice(-2);
    const hoursPadded = `0${date.getHours()}`.slice(-2);
    const minutesPadded = `0${date.getMinutes()}`.slice(-2);
    const dayOfWeek = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"][date.getDay()];

    return `${yearShort}/${monthPadded}/${dayPadded}(${dayOfWeek}) ${hoursPadded}:${minutesPadded}`;


  };
  /**
   * to check whether the remark is within 48 hours
   * @param dateArray
   * @returns
   */
  const isWithin48Hours = (dateArray: any) => {
    if (!dateArray || !Array.isArray(dateArray) || dateArray.length < 5 || dateArray.length > 6) {
      return false;
    }

    const [year, month, day, hours, minutes, seconds = 0] = dateArray;
    const date = new Date(year, month - 1, day, hours, minutes, seconds);

    if (isNaN(date.getTime())) {
      return false;
    }

    const now = new Date();
    const fortyEightHoursAgo = new Date();
    fortyEightHoursAgo.setHours(now.getHours() - 48);

    return date >= fortyEightHoursAgo && date <= now;
  };

  const handleSubmitRemark = async (data: RemarkFormData) => {
    if (isPreviewChecked) {
      setSubmissionError('');
      setPreviewData(data);
      return;
    }

    await submitRemark(data);
  };

  /**
  * setting the current page based on page number
  * @param pageNumber
  */
  const handlePageChange = (pageNumber: any) => {
    setCurrentPage(pageNumber);
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

  /**
  * handle the node click to navigate to remarktree reply
  * @param id
  */
  const handleNodeClick = async (id: number) => {
    try {
      const apiData = await apiClient.get(`api/reply/children/${expandedRemarkData.id}`, {});
      if (apiData && apiData.data && apiData.data.data) {
        navigate('/remarktree_reply', {
          state: { expandedRemarkData: expandedRemarkData, remarkdata: apiData.data.data, id: id, parentid: expandedRemarkData.id }
        });
      }
    } catch (error) {
      console.error("Error fetching remark data:", error);
    }
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
          <Divider className="remark-divider" />
          {remarkList && remarkList.map((item: any, index: number) => (
            <div key={index}>
              <Grid container xs={12} className="sub-container" alignItems="flex-start" justifyContent="space-between">
                <Grid item xs={9} sm={10} className="left-side" style={{ minWidth: 0 }}>
                  <Typography className="staricon">{`★`}</Typography>
                  <Typography className="titles" onClick={() => toggleExpandRemark(item, true)}>{item?.title}</Typography>
                  <Typography className="membername">{`By ${item.memberName}`}</Typography>
                  <Typography className="date">{DateConversion(item?.date)}</Typography>
                  <Typography className="remark-no">{item?.remarkNo}</Typography>
                  {isWithin48Hours(item?.date) && <Typography className="info-text-red">new!</Typography>}
                </Grid>
                <Grid item xs={3} sm={2} className="remark-right">
                  <Box className="remark-count">
                    <Typography className="remark-count-text">{item?.count}</Typography>
                  </Box>
                  {item?.count === 0 ?
                    <IconButton className="remark-icon-container" onClick={() => toggleExpandRemark(item, true)}>
                      <KeyboardArrowRightIcon className="remark-icon" />
                    </IconButton> :
                    <IconButton className="remark-icon-container" onClick={() => toggleExpandRemark(item)}>
                      <KeyboardArrowDownIcon className="remark-icon" />
                    </IconButton>
                  }
                </Grid>
              </Grid>
              {expandedRemark === item.id && remarkdata && item.id && loaded && (
                <Grid container>
                  <Box>
                    <TreeView value={remarkdata} id={item.id} onNodeClick={handleNodeClick} />
                  </Box>
                </Grid>
              )}
              <Divider className="remark-divider" />
            </div>
          ))}
          {count > resultsPerPage && (
            <Grid className="pagination-container">
              <Typography className="page-info">[直接移動] </Typography>
              <Grid className="page-buttons-container"></Grid>
              <Pagination
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={handlePageChange}
              />
            </Grid>
          )}
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
