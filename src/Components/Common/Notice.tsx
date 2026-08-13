import React from 'react';
import { Box } from '@mui/material';
import banner01 from '../../assets/banner01.jpg';
import banner02 from '../../assets/banner02.jpg';
import banner03 from '../../assets/banner03.jpg';
import banner04 from '../../assets/banner04.jpg';

const bannerImages = [
  {
    image: banner04,
    alt: "お問合せ",
    link: "/inquiry"
  },
  {
    image: banner01,
    alt: "ZOOMカウンセリング 予約受付中",
    link: "/online_consultation"
  },
  {
    image: banner02,
    alt: "自己チェックシート うつ、パニック、強迫、対人恐怖など",
    link: "/check1"
  },
  {
    image: banner03,
    alt: "参考図書",
    link: "/morita_therapy_reference_books"
  }
];

const Notice: React.FC<{ sx?: object }> = ({ sx }) => {
  return (
    <Box sx={{ width: '100%', mb: 4, mt: { xs: 2, md: 4.5 }, ...sx }}>
      {/* Notice Header Bar */}
      <Box
        sx={{
          backgroundColor: '#0066cc',
          color: '#ffffff',
          padding: '8px 14px',
          fontWeight: 'bold',
          fontSize: '0.95rem',
          textTransform: 'lowercase',
        }}
      >
        notice
      </Box>

      {/* Banners List */}
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          gap: '12px',
          mt: '12px',
        }}
      >
        {bannerImages.map((banner, index) => (
          <Box
            key={index}
            component="a"
            href={banner.link}
            sx={{
              display: 'block',
              width: '100%',
            }}
          >
            <img
              src={banner.image}
              alt={banner.alt}
              style={{
                width: '100%',
                display: 'block',
                height: 'auto',
              }}
            />
          </Box>
        ))}
      </Box>
    </Box>
  );
};

export default Notice;
