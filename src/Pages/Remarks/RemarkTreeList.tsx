import React, { useEffect, useRef, useState } from 'react';
import { Grid, Typography } from '@mui/material';
import manimage from '../../../src/assets/men-pict.gif';
import womenimage from '../../../src/assets/women-pict.gif';
import { useLocation } from 'react-router-dom';
import RemarkInfoReplyCard from './RemarkInfoReplyCard';
import DepthCount from '../../Components/Common/DepthCount';
import PreviewComponent from './RemarkReplyPreview';
import RemarkListSubHeader from "../../Components/Common/RemarkListSubHeader";
/**
 * to display the remark tree and allow user to reply to the remark 
 * @returns 
 */
function RemarkTreeList() {
  const location = useLocation();
  const { expandedRemarkData, remarkdata, id ,parentid} = location.state || {};
  const { parentcountvalue, tree } = DepthCount(remarkdata,parentid?parentid:id);
  const [expandedReplyContainer, setExpandedReplyContainer] = useState<string | null>(null);
  const [isPreviewVisible, setIsPreviewVisible] = useState(false); 
  const [previewData, setPreviewData] = useState(null);
  const [textareaValue, setTextAreaValue] = useState(null);
  const [selectedRemarkReply, setSelectedRemarkReply] = useState(null);
  const [remarktitle, setRemarkTitle] = useState(null);
  
  
useEffect(()=>{
setExpandedReplyContainer(id)

},[id])

/**
 * display the preview of the remarks if the preview is selected
 * @param data 
 * @param id 
 */
  const handlePreviewClick = (data: any,id:any,remarkTitle:any) => {

    setPreviewData(data);
    setRemarkTitle(remarkTitle);
    setTextAreaValue(data.textarea);
    setIsPreviewVisible(true);
    setSelectedRemarkReply(id)
    
  };

  /**
   * handle the return from the preview
   */
  const handleReturnClick = () => {
    setIsPreviewVisible(false);
    setPreviewData(null);
  };

  /**
   * to toggle the  reply container with the remark no
   * @param remarkNo 
   */
  const handleToggleReplyContainer = (remarkNo: string) => {
    setExpandedReplyContainer((prev) => (prev === remarkNo ? null : remarkNo));
  };


  /**
   * render the tree node
   * @param nodes 
   * @returns 
   */
  const renderTree = (nodes: any): JSX.Element => (
    <Grid container spacing={2}>
      {nodes.map((node: any) => (
        <Grid item key={node.item.id} xs={12}>
       
          <RemarkInfoReplyCard
            key={node.item.id}
            image={node.item.memberSex ==1?manimage:womenimage}
            name={node.item.memberName}
            remarkTitle={node.item.title}
            remarkText={node.item.text}
            date={node.item.date}
            remarkNo={node.item.remarkNo}
            depth={node.item.depth}
            isReplyContainerOpen={expandedReplyContainer === node.item.id}
            onToggle={() => handleToggleReplyContainer(node.item.id)}
            onPreviewClick={handlePreviewClick}
            textareaValue={selectedRemarkReply?node.item.id === selectedRemarkReply ? textareaValue : '':""}
            id={node.item.id}
            parentId={node.item.remarks}
          />
          {node.children.length > 0 && renderTree(node.children)}
        </Grid>
      ))}
    </Grid>
  );

  return (
    <Grid>
      <RemarkListSubHeader/>
      <Grid className='container-remarkdetails'>
        {isPreviewVisible  && previewData ? (
          <PreviewComponent 
          onReturnClick={handleReturnClick} 
          data={previewData}
          remarktitle={remarktitle}
          selectedRemarkReply={selectedRemarkReply}
         />
        ) : (
          <>
            <Grid className="heading-container">
              <Typography className="heading">発言</Typography>
            </Grid>
           
            {expandedRemarkData && (parentcountvalue==0||parentcountvalue>0) && (
              <>
               
              <RemarkInfoReplyCard
              key={expandedRemarkData.id}
                image={expandedRemarkData.memberSex ==1?manimage:womenimage}
                name={expandedRemarkData.memberName}
                remarkTitle={expandedRemarkData.title}
                remarkText={expandedRemarkData.text}
                date={expandedRemarkData.date}
                remarkNo={expandedRemarkData.remarkNo}
                depth={`Re-${parentcountvalue}`}
                isReplyContainerOpen={expandedRemarkData.id === expandedReplyContainer}
                onToggle={() => handleToggleReplyContainer(expandedRemarkData.id)}
                onPreviewClick={handlePreviewClick}
                textareaValue={selectedRemarkReply?expandedRemarkData.id=== selectedRemarkReply ? textareaValue : '':""}
                id={expandedRemarkData.id}
                parentId={expandedRemarkData.remarks}
              />
              </>
            )}
            {tree && <Grid>{renderTree(tree)}</Grid>}
          </>
        )}
      </Grid>
    </Grid>
  );
}

export default RemarkTreeList;
