import { Button, Grid, TextField, Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'
import BookPurchaseCard from './BookPurchaseCard'
import Heading from '../../Components/Common/Heading'
import Breadcrumb from '../../Components/Common/BreadCrumb'
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import { bookTypeData } from '../../../src/Components/Common/book'
import LibraryApiClient from '../../API/Library-API-client'
import Pagination from '../../Components/Common/PaginationComponent'
import { useLocation } from 'react-router-dom';

/**
 * Component used to display list books in Morita Therapy
 */

const MoritaTherapyBooks = () => {

    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const bookType: string = queryParams.get('type') ?? "";

    const [selectedBookType, SetSelectedBookType] = useState<string>(bookType);
    const [filterType, SetFilterType] = useState<number>(0);
    const [keyword, SetKeyword] = useState<string>();
    const [booksData, setBooksData] = useState<any>([])
    const [total, setTotal] = useState<number>()
    const [count, setCount] = useState<number>()
    const [typeSelectId, setTypeSelectId] = useState<any>(1);
    const [currentPageFilter, setCurrentPageFilter] = useState<any>();
    const [totalPages, setTotalPages] = useState(1);
    const [currentPage, setCurrentPage] = useState(1);
    const resultsPerPage = 10;

    const breadcrumbItems = [
        { title: 'HOME', href: '/home.html' },
        { title: 'サポート活動', href: '/support.html' },
        { title: '参考図書', href: '/sankoutosho.html' },
        { title: '森田療法参考図書' }
    ];

    const bookList = async () => {

        const selectedItem = bookTypeData.find(item => item.label === selectedBookType);
        if (selectedItem)
            setTypeSelectId(selectedItem.value);
        const typeValue = selectedItem ? selectedItem.value : null; 

        try {
            const DataRequest = {
                ...(typeValue && { type: typeValue }), 
                ...(keyword && { keyword: keyword }),
                ...(filterType && { orderBy: filterType }),
                page: currentPageFilter ? currentPageFilter : currentPage - 1,
                size: resultsPerPage
            };

            const apiData = await LibraryApiClient.post("library/book/morita", DataRequest);
            if (apiData) {
                setBooksData(apiData.data.data)
                setTotalPages(Math.ceil(apiData.data.count / resultsPerPage));
                setTotal(apiData.data.count)
                setCount(apiData.data.data.length)
            }

        } catch (error) {
            //console.error("Error sending Data:", error)
        }
    }

    /**
     * handle pagination based on page size
     * @param pageNumber 
     */
    const handlePageChange = (pageNumber: any) => {
        setCurrentPage(pageNumber);
    };

    /**
     * filter the book list
     */
    const handleFilterSubmit = () => {
        setCurrentPageFilter(0); // Reset to the first page when filtering
        bookList();
    };

    useEffect(() => {
        const newUrl = `${window.location.origin}${window.location.pathname}?type=${selectedBookType}`;
        window.history.replaceState({}, '', newUrl);
    }, [selectedBookType]);
    
    useEffect(() => {
        bookList();
    }, [selectedBookType, currentPage]);

    return (
        <Grid>
            <Heading title='森田療法参考図書' />
            <Breadcrumb items={breadcrumbItems} />
            <Grid container className='container' xs={12}>
                <Grid item xs={12} className="list">
                    <Grid container item xs={12} spacing={4} className='inputcontainer'>
                        <Grid item xs={4}>
                            <Select
                                defaultValue={selectedBookType}
                                onChange={(event) => SetSelectedBookType(event.target.value)}
                                id="filter-selecter"
                                size='small'
                                fullWidth
                            >
                                {bookTypeData.map((item) => (
                                    <MenuItem key={item.value} value={item.label}>
                                        {item.label}
                                    </MenuItem>
                                ))}
                            </Select>
                        </Grid>
                        <Grid item xs={5}>
                            <TextField
                                variant="outlined"
                                size="small"
                                onChange={(event) => SetKeyword(event.target.value)}
                                fullWidth
                                id="keyword"
                            />
                        </Grid>
                        <Grid item xs={3}>
                            <Button
                                variant="contained"
                                id="search-button"
                                onClick={handleFilterSubmit}
                            >
                                検索
                            </Button>
                        </Grid>
                    </Grid>
                    <Grid item xs={12}>
                        <Typography variant='h6' className='pinkBackground-blueContent'>
                            {selectedBookType}　{count}件({total}件中)
                        </Typography>
                    </Grid>
                    <Grid container item xs={12} spacing={4} className='inputcontainer'>
                        <Grid item xs={0} md={4}></Grid>
                        <Grid item xs={6} md={5}>
                            <Select
                                name="sort"
                                defaultValue={filterType}
                                id="rearrange-selecter"
                                size='small'
                                fullWidth
                                onChange={(event) => SetFilterType(Number(event.target.value))}
                            >
                                <MenuItem value={0} >
                                    -Select-
                                </MenuItem>
                                <MenuItem value={1} >
                                    新しいものから(発売日)
                                </MenuItem>
                                <MenuItem value={2} >
                                    古いものから(発売日)
                                </MenuItem>
                                <MenuItem value={3} >
                                    タイトル名の順
                                </MenuItem>
                            </Select>
                        </Grid>
                        <Grid item xs={4} sm={3}>
                            <Button
                                variant="contained"
                                id="rearrange-button"
                                onClick={bookList}
                            >
                                並びかえ
                            </Button>
                        </Grid>
                    </Grid>
                </Grid>
                <Grid item container xs={12} pt={3} px={1}>
                    <Grid item xs={12}>
                        {booksData && booksData?.map((data: any) =>
                            <BookPurchaseCard
                                image={data.image}
                                title={data.title}
                                author={data.author}
                                price={data.price}
                                summary={data.summary}
                                bookNo={data.bookNo}
                                isbn={data.isbnCode}
                                document={data.documents}
                                link={data.link}
                            />
                        )}
                    </Grid>
                </Grid>
                <Grid item xs={12}>
                    <Pagination
                        page="books"
                        currentPage={currentPage}
                        totalPages={totalPages}
                        onPageChange={handlePageChange}
                    />
                </Grid>
            </Grid>
        </Grid>
    )
}

export default MoritaTherapyBooks;
