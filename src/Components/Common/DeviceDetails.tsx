import React from 'react'
import { isMobile, isTablet, browserName, browserVersion ,osName ,osVersion} from 'react-device-detect';

const getDeviceDetails = () => {
    const deviceType = isMobile ? 'Mobile' : isTablet ? 'Tablet' : 'PC';
    const browserInfo = browserName;
    const browserSeries = browserVersion;
    const osInfo = osName;
    const osSeries = osVersion;

    return `Device: ${deviceType} <br/>` +
           `Client info: ${browserInfo} <br/>` +
           `Version: ${browserSeries} <br/>` +
           `OS info: ${osInfo} <br/>` +
           `Version: ${osSeries}`;
}

export default getDeviceDetails;
