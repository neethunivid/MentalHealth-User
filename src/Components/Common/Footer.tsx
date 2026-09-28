import React from "react";
import { Box, Typography } from "@mui/material";

const Footer = () => {
    const footerLinks = [
        {
            label: "サイトマップ",
            href: "sitemap.html",
        },
        {
            label: "財団紹介",
            href: "z-top.html",
        },
        {
            label: "アクセス",
            href: "access.html",
        },
        {
            label: "メルマガ購読",
            href: "mailmagazine.html",
        },
        {
            label: "個人情報保護方針",
            href: "z-kojin.html",
        },
    ];

    return (
        <Box
            component="footer"
            id="footer"
            className="wrapper"
            sx={{
                width: "100%",
                maxWidth: "1900px",
                margin: "0 auto",
                backgroundColor: "#f8f8ff",
                color: "#666666",
                textAlign: "center",
                boxSizing: "border-box",
                overflow: "hidden",
            }}
        >
            {/* Footer Links */}
            <Box
                className="zaidan"
                sx={{
                    width: "100%",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    flexWrap: "wrap",
                    textAlign: "center",
                    boxSizing: "border-box",

                    px: {
                        xs: 1,
                        sm: 2,
                        md: 3,
                    },

                    py: {
                        xs: 2,
                        sm: 2.5,
                        md: 2,
                    },

                    gap: {
                        xs: "5px 8px",
                        sm: "5px 10px",
                        md: "5px 12px",
                    },
                }}
            >
                {footerLinks.map((link, index) => (
                    <React.Fragment key={link.href}>
                        <Box
                            component="a"
                            href={link.href}
                            sx={{
                                display: "inline-block",
                                color: "#666666",
                                textDecoration: "none",
                                whiteSpace: "nowrap",
                                textAlign: "center",
                                lineHeight: 1.5,

                                fontSize: {
                                    xs: "12px",
                                    sm: "13px",
                                    md: "14px",
                                    lg: "15px",
                                },

                                "&:hover": {
                                    textDecoration: "underline",
                                },
                            }}
                        >
                            {link.label}
                        </Box>

                        {index < footerLinks.length - 1 && (
                            <Box
                                component="span"
                                sx={{
                                    display: "inline-block",
                                    color: "#666666",
                                    lineHeight: 1,
                                    userSelect: "none",
                                }}
                            >
                                |
                            </Box>
                        )}
                    </React.Fragment>
                ))}
            </Box>

            {/* Copyright */}
            <Box
                className="copyright"
                sx={{
                    width: "100%",
                    borderTop: "1px solid #ddd",
                    boxSizing: "border-box",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    textAlign: "center",

                    px: {
                        xs: 2,
                        sm: 3,
                        md: 4,
                    },

                    py: {
                        xs: 1.5,
                        sm: 2,
                        md: 2,
                    },
                }}
            >
                <Typography
                    component="p"
                    sx={{
                        margin: 0,
                        padding: 0,
                        width: "100%",
                        textAlign: "center",
                        color: "#666666",
                        lineHeight: 1.6,
                        overflowWrap: "anywhere",

                        fontSize: {
                            xs: "10px",
                            sm: "11px",
                            md: "12px",
                            lg: "13px",
                        },
                    }}
                >
                    Copyright(c)2009 The Mental Health Okamoto Foundation
                </Typography>
            </Box>
        </Box>
    );
};

export default Footer;