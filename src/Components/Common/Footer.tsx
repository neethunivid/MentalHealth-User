import { Divider, Grid, Typography, useMediaQuery } from "@mui/material";
import React from "react";

const Footer = () => {
    return (
        <Grid className="site-footer">
            <Grid container>
                <Grid item xs={12} alignItems="center">
                    <Grid
                        container
                        direction={{ xs: 'column', lg: 'row' }}
                    >
                        <Grid item xs={0} lg={0.5} className="site-footer-item"></Grid>
                        <Grid item xs={0.75} className="site-footer-item" onClick={() => window.location.href = 'zaidan-top.html'}>
                            財団紹介
                        </Grid>
                        <hr className="site-footer-divider" />
                        <Grid item xs={0.75} className="site-footer-item" onClick={() => window.location.href = 'access.html'}>
                            アクセス
                        </Grid>
                        <hr className="site-footer-divider" />
                        <Grid item xs={1.5} className="site-footer-item" onClick={() => window.location.href = 'zaidan-kojin.html'}>
                            個人情報保護方針
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>
            <hr className="site-footer-divider" />
            <Grid container item justifyContent="center">
                <Typography variant="h6" align="center" fontWeight={500} p={2}>
                    Copyright (C) 2009 The Mental Health Okamoto Memorial Foundation
                </Typography>
            </Grid>
        </Grid>
    );
}

export default Footer;