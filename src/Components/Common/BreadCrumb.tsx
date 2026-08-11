import React from 'react';
import HomeRoundedIcon from '@mui/icons-material/HomeRounded';
import { Divider, Grid, Link, Typography } from '@material-ui/core';
interface BreadcrumbItem {
    title: string;
    href?: string;
}

interface BreadcrumbProps {
    items: BreadcrumbItem[];
}

const Breadcrumb: React.FC<BreadcrumbProps> = ({ items }) => {
    const breadcrumbItems = items.map((item, index) => (
        <React.Fragment key={index}>
            {index > 0 && <span className="blackText"> / </span>}
            {item.href ? (
                <Link href={item.href} itemProp="item" className="greyLink">
                    <span itemProp="name">{item.title}</span>
                </Link>
            ) : (
                <span itemProp="name" className="blackText">{item.title}</span>
            )}
        </React.Fragment>
    ));

    return (
        <Grid className="breadcrumb" id="breadcrumb">
            <Grid container className="container">
                <Grid container item xs={12} alignItems="center" className="breadcrumb-list">
                    <Grid item>
                        <span className="centerIcon">
                            <HomeRoundedIcon className="greyHomeIcon" fontSize="small"/>
                        </span>
                    </Grid>
                    <Grid item>
                        <span>{breadcrumbItems}</span>
                    </Grid>
                </Grid>
            </Grid>
            <Divider orientation="horizontal" />
        </Grid>
    );
};

export default Breadcrumb;
