import { Button, Grid, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react';
import Heading from '../../Components/Common/Heading';
import Breadcrumb from '../../Components/Common/BreadCrumb';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import FormInputTextField from '../../Components/Common/FormInputTextField';
import { useForm } from 'react-hook-form';
import BookBuyCard from './BookBuyCard';
import LibraryApiClient from '../../API/Library-API-client';
import Pagination from '../../Components/Common/PaginationComponent';
import { OtherMoritaBooks } from '../../Components/Common/OtherMoritaBook';
import { useLocation } from 'react-router-dom';
/**
 * Component used to display list books in  other Morita Therapy
 */
const BooksortType = [
    { value: 0, label: '-select-' },
    { value: 1, label: "新しいものから(発売日)" },
    { value: 2, label: "古いものから(発売日)" },
    { value: 3, label: "タイトル名の順" },
];

const OtherBooks = () => {
    const breadcrumbItems = [
        { title: 'HOME', href: '/home.html' },
        { title: 'サポート活動', href: '/support.html' },
        { title: '参考図書', href: '/sankoutosho.html' },
        { title: '森田療法以外の参考図書' }
    ];

    const initialType = OtherMoritaBooks[0].value;
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const bookType: string = queryParams.get('type') ?? "新刊書";

    const [booksData, setBooksData] = useState<any>([]);
    const [totalPages, setTotalPages] = useState(1);
    const [currentPage, setCurrentPage] = useState(1);
    const [currentPageFilter, setCurrentPageFilter] = useState<any>();
    const [typeSelectId, setTypeSelectId] = useState<any>(1);
    const resultsPerPage = 12;
    const [selectedBookType, setSelectedBookType] = useState<string>(bookType);
    const [total, setTotal] = useState<number>()
    const [count, setCount] = useState<number>()


    const { register, handleSubmit, control, setValue, watch } = useForm({
        defaultValues: {
            bookType: typeSelectId,
            sortType: 0,
            keyword: ''
        }
    });

    /**
     * to get the list of other morita books
     * @param dataRequest 
     */
    const booklist = async (dataRequest: any) => {
        const apiData = await LibraryApiClient.post("library/book/morita/other", dataRequest, {});
        if (apiData) {
            setBooksData(apiData.data.data);
            setTotalPages(Math.ceil(apiData.data.count / resultsPerPage));
            setTotal(apiData.data.count)
            setCount(apiData.data.data.length)
        }
    };

    const onSubmit = async (data: any) => {
        const DataRequest = {
            type: typeSelectId,
            page: currentPageFilter ? currentPageFilter : currentPage - 1,
            size: resultsPerPage,
            ...(data.sortType && { orderBy: data.sortType }),
            ...(data.keyword && { keyword: data.keyword }),

        };
        await booklist(DataRequest);
    };

    useEffect(() => {
        const newUrl = window.location.origin + window.location.pathname;
        window.history.replaceState({}, '', newUrl);
        handleSubmit(onSubmit)();
    }, [currentPage, typeSelectId]);


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
        handleSubmit(onSubmit)();
    };


    /**
     * filter the list based on the book type
     * @param value 
     */
    const OnSelectBookType = (value: any) => {
        setSelectedBookType(value)
        const selectedItem = OtherMoritaBooks.find(item => item.label === value);

        if (selectedItem)
            setTypeSelectId(selectedItem.value);
    }
    return (
        <Grid>
            <Heading title='森田療法以外の参考図書' />
            <Breadcrumb items={breadcrumbItems} />
            <Grid container className='container' xs={12}>
                <Grid item xs={12} className="list">
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <Grid container item xs={12} spacing={2} className='inputcontainer'>
                            <Grid item xs={4}>
                                <Select

                                    defaultValue={selectedBookType}
                                    id="filter-selecter"
                                    className="dropdown-select"
                                    size='small'
                                    fullWidth
                                    onChange={(event) => OnSelectBookType(event.target.value)}
                                >
                                    {OtherMoritaBooks.map((item) => (
                                        <MenuItem key={item.value} value={item.label}>
                                            {item.label}
                                        </MenuItem>
                                    ))}
                                </Select>
                            </Grid>
                            <Grid item xs={5}>
                                <FormInputTextField
                                    control={control}
                                    size="small"
                                    fullwidth={true}
                                    id="keyword"
                                    {...register("keyword")}
                                />
                            </Grid>
                            <Grid item xs={3}>
                                <Button
                                    variant="contained"
                                    id="search-button"
                                    className="button"
                                    type="button"
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
                        <Grid container item xs={12} spacing={2} className='inputcontainer'>
                            <Grid item xs={0} sm={2} lg={4}></Grid>
                            <Grid item xs={7} md={5}>
                                <Select
                                    {...register("sortType")}
                                    defaultValue="0"
                                    id="rearrange-selecter"
                                    size='small'
                                    fullWidth
                                >

                                    {BooksortType.map((item) => (
                                        <MenuItem key={item.value} value={item.value}>
                                            {item.label}
                                        </MenuItem>
                                    ))}
                                </Select>
                            </Grid>
                            <Grid item xs={4} sm={3}>
                                <Button
                                    variant="contained"
                                    id="rearrange-button"
                                    className="rearrange-button"
                                    type="button"
                                    onClick={handleFilterSubmit}
                                >
                                    並びかえ
                                </Button>
                            </Grid>
                        </Grid>
                    </form>
                </Grid>
                <Grid item container xs={12} pt={3}>
                    {booksData.map((data: any, index: any) => (
                        <Grid item key={index} xs={12} sm={6} md={4} lg={3} className='book-list-container'>
                            <BookBuyCard
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
                        </Grid>
                    ))}
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
    );
};

export default OtherBooks;
