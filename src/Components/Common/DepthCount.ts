import React from 'react';
/**
 * calculate the depth count
 */
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
 * function to create the nested structure
 * @param data 
 * @param parentid 
 * @returns 
 */
function createNestedStructure(data: DataItem[], parentid: number) {
  const itemMap: { [id: number]: TreeNode } = {};
  const depthMap: { [id: number]: string } = {};
  const childCountMap: { [id: number]: number } = {};

  // Initialize depth counters
  const depthCounters: { [remarks: number]: number } = {};
  depthCounters[parentid] = 1;

  // Create initial mapping and child count map
  data.forEach((item) => {
    itemMap[item.id] = {
      item,
      children: [],
    };
    childCountMap[item.id] = 0;
  });

  // Populate the child count map and depth counters
  data.forEach((item) => {
    if (item.remarks !== parentid) {
      childCountMap[item.remarks] = (childCountMap[item.remarks] || 0) + 1;
    }
  });

  // Calculate depth for each node
  data.forEach((item) => {
    if (item.remarks === parentid) {
      depthMap[item.id] = `Re-${depthCounters[parentid]}`;
      depthCounters[parentid]++;
    } else {
      const parentDepth = depthMap[item.remarks];
      const parentCounter = depthCounters[item.remarks] || 1;
      depthMap[item.id] = `${parentDepth}-${parentCounter}`;
      depthCounters[item.remarks] = parentCounter + 1;
    }
  });

  // Assign depth and child count to each item
  data.forEach((item) => {
    item.depth = `${depthMap[item.id]}-${childCountMap[item.id]}`;
  });

  // Build the tree structure
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
 * calculate the depth count
 * @param value 
 * @param parentid 
 * @returns 
 */
const DepthCount = (value: DataItem[], parentid: number) => { 

  /**
   * calculate the total children node
   * @param data 
   * @param parentid 
   * @returns 
   */
  function countParentNodes(data: DataItem[], parentid: number): number {
    let parentCount = 0;
    data.forEach((item) => {
      if (item.remarks === parentid) {
        parentCount++;
      }
    });
    return parentCount;
  }

  const tree = createNestedStructure(value, parentid);
  const parentcountvalue = countParentNodes(value, parentid);
 
  return { parentcountvalue, tree };
};

export default DepthCount;
