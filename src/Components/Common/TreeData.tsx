import { Typography } from "@material-ui/core";
import { Grid } from "@mui/material";
import React, { useState } from "react";
import DateConversion from "./DateConversion";

interface DataItem {
  date: number[];
  remarkNo: string;
  remarks: number;
  remark: number;
  text: string;
  id: number;
  title: string;
  depth?: string;
}

interface TreeNode {
  item: DataItem;
  children: TreeNode[];
}

/**
 * create the tree structure
 * @param data 
 * @param parentid 
 * @returns 
 */
function createNestedStructure(data: DataItem[],parentid:any): TreeNode[] {
 
  const itemMap: { [rid: number]: TreeNode } = {};

  let minId = data[0]["id"];
  let index = 0;
  data.map((data, __index) => {
    if (data["id"] < minId) {
      minId = data["id"];
      index = __index;
    }
  });
  data[index]["remarks"] = parentid;

  data.forEach((item) => {
    itemMap[item.id] = {
      item,
      children: [],
    };
  });
  
  const tree: TreeNode[] = [];

  data.forEach((item) => {
    const node = itemMap[item.id];
   
    if (item.remarks === parentid) {
      tree.push(itemMap[item.id]);
      
    } else {
      const parent = itemMap[item.remarks];
     
      parent.children.push(node);
    }
  });
  return tree;
}

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


/**
 * to display the tree view of the remarks
 * @param param0 
 * @returns 
 */
const TreeView = ({ value,id, onNodeClick }: any) => {

  const nestedData: TreeNode[] = createNestedStructure(value,id);
  const renderTree = (nodes: TreeNode[], level = 1): JSX.Element => (
    <Grid>
      {nodes.map((node) => (
        <Grid key={node.item.id} style={{ paddingLeft: `${level * 20}px` }}>
          <Grid item className="left-side" onClick={() => onNodeClick(node.item.id, node.item?.depth)}>
            <Typography className="bulleticon">{`•`}</Typography>
            <Typography className="titles">
              {node.item?.title}   
            </Typography>
            <Typography className="date">{DateConversion(node.item?.date)}</Typography>
            <Typography className="remark-no">{node.item?.remarkNo}</Typography>
            {isWithin48Hours(node.item?.date) && <Typography className="info-text-red">new!</Typography>}
          </Grid>
          {node.children.length > 0 && renderTree(node.children, level + 1)}
        </Grid>
      ))}
    </Grid>
  );

  return <Grid>{renderTree(nestedData)}</Grid>;
};

export default TreeView;
