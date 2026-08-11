import React, { useEffect, useState } from 'react'
import testImage from './../../assets/bookCover.jpg'
import { Button, Grid, Link, List, ListItem, Typography } from '@mui/material'
import ArrowLeftIcon from '@mui/icons-material/ArrowLeft';
import amazon from '../../assets/amazon.jpg'
import noimage from '../../assets/noimage.jpg'
import LibraryApiClient from '../../API/Library-API-client';

interface bookProps {
  image?: string,
  title: string,
  author?: string,
  price: string,
  summary?: string,
  bookNo: number,
  isbn: string,
  document?: string,
  link: string,
}

/**
 * Component used to display card for Morita Therapy books list in rowwise manner
 */

const BookPurchaseCard = ({
  image,
  title,
  author,
  price,
  summary,
  bookNo,
  isbn,
  document,
  link,
}: bookProps) => {

  const [paragraph, setParagraph] = useState<string>("");
  const [showMore, setShowMore] = useState(false);
  const slicedParagraph = showMore ? paragraph : paragraph.slice(0, 50);

  /**
   * Method used for displaying description contents in a readmore and hide manner
   */
  const handleReadMoreClick = () => {
    setShowMore(true);
  };

  const showDocument = async () => {

    try {
      const response = await LibraryApiClient.get(`library/upload/download/${document}`, { responseType: 'blob' });

      if (response && response.data) {
        const blob = new Blob([response.data], { type: 'application/pdf' });
        const url = window.URL.createObjectURL(blob);
        window.open(url, '_blank');
      } else {
        // console.error(`Empty or invalid response for ${document}`);
      }
    } catch (error) {
      // console.error(`Error fetching document ${document}:`, error);
    }
  }

  useEffect(() => {
    if (summary)
      setParagraph(summary);
  }, [])

  return (
    <Grid container className='card'>
      {image == "" ? (
        <Grid item xs={12} sm={5} md={3} lg={2} id='book-noimage'>
          <img src={noimage} className='book-image' style={{ width: '100%', maxHeight: '200px', objectFit: 'cover' }}/>
        </Grid>
      ) : (
        <Grid item xs={12} sm={5} md={3} lg={2} id='book-image'>
          <Link target="_blank" href={image}><img src={image} className='book-image' style={{ width: '100%', maxHeight: '200px', objectFit: 'cover' }}/></Link>
        </Grid>
      )}
      <Grid item xs={12} md={9} className='book-content' id='book-purchase-content'>
        <Typography variant='h5' fontWeight="bold" py={1}>{title}</Typography>
        {author && (
          <Typography variant='h5' fontWeight="bold" py={1}>{author}</Typography>
        )}
        <Typography variant='h5' color='#cf2e2e' py={1}>{price}</Typography>
        {summary && (
          <>
            <Typography variant="subtitle1" display="inline" fontWeight="500" fontSize={16} lineHeight={0}>
              {slicedParagraph}
              {!showMore && paragraph.length > 50 && "..."}
            </Typography>
            {!showMore && paragraph.length > 50 && (
              <Typography variant='subtitle1' display='inline' onClick={handleReadMoreClick} sx={{ cursor: "pointer" }}>
                [ 続きを読む ]
              </Typography>
            )}
            {showMore && (
              <Typography variant="subtitle1" display="inline" color="primary" sx={{ cursor: "pointer" }}>
                <ArrowLeftIcon onClick={() => setShowMore(false)} fontSize='large' style={{ verticalAlign: 'middle' }} />
              </Typography>
            )}
          </>
        )}
        <List className='details' id='book-purchase-details-list'>
          <ListItem className='point'>No. {bookNo}</ListItem>
          <ListItem className='point'>ISBN: {isbn}</ListItem>
        </List>
        {document && (
          <Button
            variant='contained'
            size='small'
            color="secondary"
            onClick={showDocument}
            className='preview'
            id='book-preview-button'>目次と目次</Button>
        )}
        <Grid className='buynow'>
          <Button
            size="large"
            href={link}
            id='book-purchase-button'
          >
            <img src={amazon} alt="link to Amazon" />
          </Button>
        </Grid>
      </Grid>
    </Grid>
  )
}

export default BookPurchaseCard
