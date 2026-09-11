import React from 'react';
import { Box, Button, Grid, TextField, Typography } from '@mui/material';
import Breadcrumb from '../../Components/Common/BreadCrumb';
import Heading from '../../Components/Common/Heading';
import Notice from '../../Components/Common/Notice';

const Search: React.FC = () => {
    return (
        <>
            <Heading title="検索" />
            <Box component="main" id="main" sx={{ maxWidth: '1200px', mx: 'auto', px: { xs: 2, sm: 3 }, py: 2 }}>
                <Grid container spacing={3}>
                    <Grid item xs={12} md={8}>
                        <Breadcrumb items={[{ title: 'HOME', href: '/' }, { title: '検索' }]} />
                      
                        <Box
                            component="form"
                            action="https://www.google.com/cse"
                            method="get"
                            display="flex"
                            gap={2}
                            alignItems="flex-start"
                            sx={{ flexDirection: 'column', marginTop: 2 }}
                        >
                            <TextField
                                id="site-search"
                                name="q"
                                type="search"
                                placeholder="検索語句を入力してください"
                                required
                                fullWidth
                                size="small"
                                sx={{ borderRadius: 1, backgroundColor: '#fff', border: '1px solid #ccc' }}
                            />
                            <input type="hidden" name="cx" value="014389080614039104141:4pezvsvcwr8" />
                            <Button type="submit" variant="contained" sx={{ minWidth: 96, borderRadius: 4, alignSelf: 'center' }}>
                                検索
                            </Button>
                        </Box>
                    </Grid>

                    <Grid item xs={12} md={4}>
                        <Notice />
                    </Grid>
                </Grid>
            </Box>
        </>
    );
};

export default Search;