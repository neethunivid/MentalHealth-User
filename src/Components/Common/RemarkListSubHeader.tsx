import React, { useEffect, useState } from 'react';
import './RemarkListSubHeader.scss';
import { useNavigate } from 'react-router-dom';

const RemarkListSubHeader = () => {
    const [activeIndex, setActiveIndex] = useState<number | null>(null);
    const navigate = useNavigate();

    type RoomType = 'normal' | 'anxiety' | 'blackmail' | 'other';

    const indexMap: Record<RoomType, number> = {
        normal: 0,
        anxiety: 1,
        blackmail: 2,
        other: 3,
    };

    useEffect(() => {
        const roomType = localStorage.getItem('roomType') as RoomType | null; // Get room type from local storage
        if (roomType) {
            setActiveIndex(indexMap[roomType]); // Set active index based on room type
        }
    }, []);

    const handleRoomTypeClick = (roomType: RoomType) => {
        const index = indexMap[roomType]; // Get index based on room type
        localStorage.setItem('roomType', roomType); // Store room type in local storage
        setActiveIndex(index); 
        navigate('/remarklist'); // Navigate to the remark list
    };

    return (
        <nav id="global-nav" className="remark_nav">
            <ul id="menu-shimin-pc" className="menu">
                <li className="subheader menu_items">
                    <a href="/search.html">
                        <strong className="subheader_items">検索</strong>
                    </a>
                </li>
                <li className="subheader menu_items">
                    <a href="#">
                        <strong className="subheader_items">新規発言</strong>
                    </a>
                </li>
                <li className="subheader menu_items">
                    <a href="#">
                        <strong className="subheader_items">MENU</strong>
                    </a>
                </li>
            </ul>
            <ul id="menu-shimin-pc" className="menu">
                <li className={`room menu_items ${activeIndex === 0 ? "active" : ""}`} onClick={(e) => handleRoomTypeClick("normal")}>
                    <a href='/remarklist'>
                        <strong className="room_items">普通</strong>
                    </a>
                </li>
                <li className={`room menu_items ${activeIndex === 1 ? "active" : ""}`} onClick={(e) => handleRoomTypeClick("anxiety")}> 
                    <a href='/remarklist'>
                        <strong className="room_items">不安</strong>
                    </a>
                </li>
                <li className={`room menu_items ${activeIndex === 2 ? "active" : ""}`} onClick={(e) => handleRoomTypeClick("blackmail")}> 
                    <a href='/remarklist'>
                        <strong className="room_items">強迫</strong> 
                    </a>
                </li>
                <li className={`room menu_items ${activeIndex === 3 ? "active" : ""}`} onClick={(e) => handleRoomTypeClick("other")}>
                    <a href='/remarklist'>
                        <strong className="room_items">うつ他</strong>
                    </a>
                </li>
            </ul>
        </nav>
    );
};

export default RemarkListSubHeader;
