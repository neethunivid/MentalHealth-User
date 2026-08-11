import React, { useEffect, useState } from 'react';
import { Button, Grid, Link, List, ListItem, Typography } from '@mui/material';
import ArrowLeftIcon from '@mui/icons-material/ArrowLeft';
import noimage from '../../assets/noimage.jpg';
import './bookstyles.scss';
import amazon from '../../assets/amazon.jpg'
import LibraryApiClient from '../../API/Library-API-client';

interface BookProps {
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

const BookBuyCard = ({
    image,
    title,
    author,
    price,
    summary,
    bookNo,
    isbn,
    document,
    link,
}: BookProps) => {
    const [showMore, setShowMore] = useState(false);
    const [paragraph, setParagraph] = useState<string>("");
    const slicedParagraph = showMore ? paragraph : paragraph.slice(0, 25);

    useEffect(() => {
        if (summary)
            setParagraph(summary);
    }, [summary]);

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

    return (
        <Grid
            container
            direction="column"
            spacing={2}
            className='columnCard'
        >
            <Grid item container justifyContent="center" className="image-container">
                <Grid item className='image-wrapper'>
                    {image ? (
                        <Link target="_blank" href={image}>
                            <img src={image} className='image' alt={title} />
                        </Link>
                    ) : (
                        <img src={noimage} className='image' alt="No image available" />
                    )}
                </Grid>
            </Grid>
            <Grid
                item
                container
                direction="column"
                alignItems="flex-start"
                className='other-book-content'
                id='book-buy-content'
            >
                <Typography variant='h6' fontWeight="bold" className="title">{title}</Typography>
                <Typography variant='subtitle1' className="author">{author}</Typography>
                <Typography variant='h6' className="price">{price}</Typography>
                {summary && (
                    <>
                        <Typography variant="subtitle1" display="inline" className="summary">
                            {slicedParagraph}
                            {!showMore && paragraph.length > 25 && "..."}
                        </Typography>
                        {!showMore && paragraph.length > 25 && (
                            <Typography
                                variant='subtitle1'
                                display='inline'
                                className='description-toggle'
                                onClick={handleReadMoreClick}
                            >
                                [ 続きを読む ]
                            </Typography>
                        )}
                        {showMore && (
                            <Typography variant="subtitle1" display="inline" className="read-less">
                                <ArrowLeftIcon onClick={() => setShowMore(false)} fontSize='large' />
                            </Typography>
                        )}
                    </>
                )}
                <List className='details' id='book-buy-details-list'>
                    <ListItem className='point'>No.{bookNo}</ListItem>
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
                <Grid item className='button-container'>
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
    );
};

export default BookBuyCard;
