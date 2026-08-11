import { Box, Divider, Grid, IconButton } from "@mui/material";
import { Typography } from "@material-ui/core";
import { useEffect, useState } from "react";
import apiClient from "../../API/API-client";
import Heading from "../../Components/Common/Heading";
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import Pagination from "../../Components/Common/PaginationComponent";
import TreeView from "../../Components/Common/TreeData";
import { useNavigate } from "react-router-dom";
import DateConversion from "../../Components/Common/DateConversion";
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
import Breadcrumb from "../../Components/Common/BreadCrumb";
import RemarkListSubHeader from "../../Components/Common/RemarkListSubHeader";


/**
 * dispaly the  main remark and the tree view of its children remarks 
 * @returns 
 */
const RemarkList = () => {
  const [remarkList, setRemarkList] = useState<any[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [expandedRemark, setExpandedRemark] = useState<string | null>(null);
  const [remarkdata, setRemarkTreData] = useState<any>();
  const navigate = useNavigate();
  const [expandedRemarkData, setExpandedReamarkData] = useState<any>();
const [loaded,SetLoaded]=useState(false)
const resultsPerPage = 10;
const [totalPages, setTotalPages] = useState(1);
const [count, setCount] = useState(0);

const breadcrumbItems = [
  { title: 'HOME', href: '/home.html' },
  { title: '市民の皆様 ',href: '/home.html'  },
  { title: '体験フォーラム ',href: '/home.html'  },
  { title: '掲示板〈普通神経症の部屋' }
];


/**
 * get the reamrk based on the current page 
 */
  useEffect(() => {
    getRemarkList();
  }, [currentPage]);


  /**
   * function to get the remarks
   */
  const getRemarkList = async () => {
    let roomType =localStorage.getItem("roomType")
    try {
      const DataRequest = { 
        type:roomType ,
        page:currentPage-1,
        size :10
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

  /**
   * setting the current page  based on page number
   * @param pageNumber 
   */
  const handlePageChange = (pageNumber: any) => {
    setCurrentPage(pageNumber);
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
      
        let apiData:any
        
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

  /**
   * handle the node click to navigate to remarktree reply 
   * @param id 
   */
  const handleNodeClick = (id: number) => {
    navigate('/remarktree_reply', { 
      state: { expandedRemarkData: expandedRemarkData, remarkdata: remarkdata, id:id , parentid:expandedRemarkData.id}
    });
  };

/**
 * to check whether the remark is within 48 hours 
 * @param dateArray 
 * @returns 
 */
  const isWithin48Hours = (dateArray:any) => {
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



  return (
    <Grid>
      <Heading title="体験フォーラム" />
      <RemarkListSubHeader/>
  
      <Grid className="remark-main-container">
        <Grid className="remark-border">
       
          <Grid className="remark_container">
            <Grid className="info">
              <Grid className="info-container">
              <Typography >{`•` }</Typography>
               <Typography className="info-text">48時間以内の記事は</Typography>
               <Typography className="info-text-red">new!</Typography><Typography className="info-text">で表示されます。</Typography>
              </Grid>
              <Grid className="info-container">
              <Typography >{`•` }</Typography>
              <Typography className="info-text">右窓枠の数字はフォロー返信数を表示。数字が</Typography>
              <Typography className="info-text-red">赤文字 </Typography><Typography className="info-text">の場合は、新着返信があります。</Typography>
              </Grid>
            </Grid>
            <Divider className="remark-divider" />
            {remarkList && remarkList.map((item: any, index: number) => (
              <div key={index}>
                <Grid container xs={12} className="sub-container" alignItems="center" justifyContent="space-between">
                  <Grid item xs={10} className="left-side" >
                    <Typography className="staricon">{`★` }</Typography>
                    <Typography className="titles" onClick={() => toggleExpandRemark(item, true)}>{item?.title}</Typography>
                    <Typography className="membername">{`By ${item.memberName}`}</Typography>
                    <Typography className="date">{DateConversion(item?.date)}</Typography>
                    <Typography className="remark-no">{item?.remarkNo}</Typography>
                    {isWithin48Hours(item?.date) && <Typography className="info-text-red">new!</Typography>}
                  </Grid>
                  <Grid item xs={2} className="remark-right">
                    <Box className="remark-count">
                      <Typography className="remark-count-text">{item?.count}</Typography>
                    </Box>
                    {item?.count===0?
                     <IconButton className="remark-icon-container" onClick={() => toggleExpandRemark(item,true)}>
                     <KeyboardArrowRightIcon className="remark-icon" />
                   </IconButton> :
                    <IconButton className="remark-icon-container" onClick={() => toggleExpandRemark(item)}>
                    <KeyboardArrowDownIcon className="remark-icon" />
                  </IconButton>
                    }
                   
                  </Grid>
                </Grid>
                {expandedRemark === item.id && remarkdata && item.id && loaded &&(
                  <Grid container>
                    <Box>
                      <TreeView value={remarkdata} id={item.id} onNodeClick={handleNodeClick} />
                    </Box>
                  </Grid>
                )}
                <Divider className="remark-divider" />
              </div>
            ))}
           {count > resultsPerPage  &&(
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
      </Grid>
    </Grid>
  );
};

export default RemarkList;
