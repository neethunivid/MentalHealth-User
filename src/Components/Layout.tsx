import React, { useEffect, useState } from 'react';
import { AppBar, Toolbar, Typography, Grid, Drawer, List, ListItemButton, ListItemText, IconButton, Badge, Avatar, Link } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import "../Components/Common/commonstyle.scss";
import Navigation from './Common/Header';
import Footer from './Common/Footer';

interface LayoutProps {
    children: React.ReactNode;
}


const Layout: React.FC<LayoutProps> = ({ children }) => {


    return (

        <Grid maxHeight="100%">
            <Grid container item xs={12} className='home-layout' id="home-layout" maxWidth="100%" >
                <Grid item xs={12} maxWidth="100%"  >
                    <Navigation />
                </Grid>
                {/* Content */}
                <Grid item className="details-container" xs={12} maxWidth="100%">
                    {children}
                </Grid>

            </Grid>
            {/* footer */}
            <Grid container item xs={12} maxWidth="100%"  >
                <Footer />
            </Grid>

            <Grid item container alignContent="flex-end" xs={12} maxWidth="100%" >

            </Grid>
        </Grid>
    );
};

export default Layout;
