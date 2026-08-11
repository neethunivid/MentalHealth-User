import { NavigateBefore, NavigateNext } from "@mui/icons-material";
import { Button, Grid, IconButton } from "@mui/material";
import React from "react";
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
import KeyboardArrowLeftIcon from '@mui/icons-material/KeyboardArrowLeft';
import ArrowRightIcon from '@mui/icons-material/ArrowRight';
import ArrowLeftIcon from '@mui/icons-material/ArrowLeft';


/**
 * pagination component
 */
interface PaginationProps {
  page?: string;
  currentPage: number;
  totalPages: number;
  onPageChange: (pageNumber: number) => void;
}

const Pagination: React.FC<PaginationProps> = ({ page, totalPages, currentPage, onPageChange }) => {

  /**
   * handle the previous button clcik
   */
  const handlePrev = () => {
    if (currentPage > 1) {
      onPageChange(currentPage - 1);
    }
  };

  /**
   * handle the next button clcik
   */
  const handleNext = () => {
    if (currentPage < totalPages) {
      onPageChange(currentPage + 1);
    }
  };

  if (totalPages <= 1) {
    return null;
  }


  // Determine the range of pages to display
  let startPage = Math.max(1, currentPage - 2);
  let endPage = Math.min(startPage + 4, totalPages);

  // Adjust startPage and endPage when clicking Next
  if (currentPage > 3) {
    startPage = currentPage - 2;
    endPage = Math.min(currentPage + 2, totalPages);
  }

  /**
   * render the pages
   * @returns 
   */
  const renderPageButtons = () => {
    const pageNumbers = [];
    const pageCount = 5; // Number of page numbers to display at a time
    const totalPageCount = totalPages;

    // Calculate the start and end page numbers based on the current page
    let startPage = currentPage - Math.floor(pageCount / 2);
    let endPage = startPage + pageCount - 1;

    // Adjust start and end page numbers to ensure they are within valid bounds
    if (startPage < 1) {
      startPage = 1;
      endPage = Math.min(totalPageCount, pageCount);
    } else if (endPage > totalPageCount) {
      endPage = totalPageCount;
      startPage = Math.max(1, endPage - pageCount + 1);
    }

    // Add the page numbers to the array
    for (let i = startPage; i <= endPage; i++) {
      if (page !== "books") {
        pageNumbers.push(
          <button key={i} className="pagination-button" style={{
            color: currentPage === i ? "#003399" : "black",
          }} >
            {i}
          </button>
        );
      } else {
        pageNumbers.push(
          <button
            key={i}
            style={{
              color: currentPage === i ? "black" : "#003399",
              border: 0, backgroundColor: "white", fontSize: 16,
              paddingLeft: 4, paddingRight: 4,
            }}
          >
            <b> [ {i} ] </b>
          </button>
        );
      }
    }


    return pageNumbers;
  };

  return (
    <>
      {
        page !== "books" ? (
          <Grid>
            {currentPage !== 1 ?
              <IconButton className="page-action" onClick={handlePrev}>
                <KeyboardArrowLeftIcon className="page-action-icon" />
              </IconButton>
              : null}
            {renderPageButtons()}
            {currentPage != totalPages &&
              <IconButton className="page-action" onClick={handleNext}>
                <KeyboardArrowRightIcon className="page-action-icon" />
              </IconButton>
            }
          </Grid>
        ) : (
          <Grid container pt={2} justifyContent="flex-end" alignItems="center">
            {currentPage !== 1 ?
              <ArrowLeftIcon onClick={handlePrev} fontSize="large" />
              : null}
            {renderPageButtons()}
            {currentPage != totalPages &&
              <ArrowRightIcon onClick={handleNext} fontSize="large" />
            }
          </Grid>
        )
      }
    </>
  );
};

export default Pagination;
