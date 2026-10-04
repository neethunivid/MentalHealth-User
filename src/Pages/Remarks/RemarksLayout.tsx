import React from 'react';
import { Grid } from '@mui/material';
import Navbar from '../Login/Navbar';
import RemarkListSubHeader from '../../Components/Common/RemarkListSubHeader';
import './RemarksLayout.scss';

interface RemarksLayoutProps {
  children: React.ReactNode;
}

/**
 * Shared layout for all Remarks pages.
 * Renders: Navbar → RemarkListSubHeader → 3-column grid (2 | 8 | 2).
 * On mobile (≤ 600 px) the side columns collapse and content takes full width.
 */
const RemarksLayout: React.FC<RemarksLayoutProps> = ({ children }) => {
  return (
    <div className="remarks-page">

      {/* ── 3-column layout: 2 | 8 | 2 ── */}
      <Grid container className="remarks-layout-grid">
        {/* Left spacer */}
        <Grid item xs={0} md={1} className="remarks-side-col" />

        {/* Main content */}
        <Grid item xs={12} md={10} className="remarks-content-col">
          {/* ── Top nav ── */}
          <Navbar title="体験フォーラム" />

          {/* ── Sub-header (search / new post / menu tabs) ── */}
          <div className="remarks-subheader-wrapper">
            <RemarkListSubHeader />
          </div>

          {children}
        </Grid>

        {/* Right spacer */}
        <Grid item xs={0} md={1} className="remarks-side-col" />
      </Grid>
    </div>
  );
};

export default RemarksLayout;
