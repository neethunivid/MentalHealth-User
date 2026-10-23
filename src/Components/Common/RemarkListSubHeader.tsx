import React, { useEffect, useState } from 'react';
import './RemarkListSubHeader.scss';
import { useNavigate } from 'react-router-dom';

type MenuLinkType = 'tree' | 'recent' | 'newarticle' | 'diary' | 'advice';
type RoomType = 'normal' | 'anxiety' | 'blackmail' | 'other' | 'growingup';

const menuLinks: { key: MenuLinkType; label: string; href: string }[] = [
    { key: 'tree', label: 'ツリー', href: '/forum.html' },
    { key: 'recent', label: '新着順', href: '/forum.html' },
    { key: 'newarticle', label: '新記事', href: '/forum.html' },
    { key: 'diary', label: '日記', href: '/forum.html' },
    { key: 'advice', label: 'Advice', href: '/advice.html' },
];

const RemarkListSubHeader = () => {
    const [activeIndex, setActiveIndex] = useState<number | null>(null);
    const [activeMenuIndex, setActiveMenuIndex] = useState<number | null>(4);
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const navigate = useNavigate();

    const indexMap: Record<RoomType, number> = {
        normal: 0,
        anxiety: 1,
        blackmail: 2,
        other: 3,
        growingup: 4
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
        setIsMenuOpen(false); // Hide the menu sub-row after selection
        navigate('/remarklist'); // Navigate to the remark list
    };

    const handleMenuLinkClick = (e: React.MouseEvent<HTMLAnchorElement>, index: number, href: string) => {
        e.preventDefault();
        setActiveMenuIndex(index);
        setIsMenuOpen(false);
        if (href !== '#') {
            // Use window.location for external/static .html pages (not React routes)
            window.location.href = href;
        }
    };

    const handleMenuToggle = (e: React.MouseEvent<HTMLAnchorElement>) => {
        e.preventDefault();
        setIsMenuOpen((prev) => !prev);
    };

    return (

        <nav id="global-nav" className="remark_nav">
            <ul id="menu-shimin-pc" className="menu">
                <li className="subheader menu_items">
                    <a href="/search">
                        <strong className="subheader_items">検索</strong>
                    </a>
                </li>
                <li className="subheader menu_items">
                    <a href="#">
                        <strong className="subheader_items">新規発言</strong>
                    </a>
                </li>
                <li className="subheader menu_items">
                    <a href="#" onClick={handleMenuToggle}>
                        <strong className="subheader_items">MENU</strong>
                    </a>
                </li>
            </ul>

            {/* Shown only when MENU is clicked */}
            {isMenuOpen && (
                <ul id="menu-sub-pc" className="menu menu-sub-pc-list">
                    {menuLinks.map((link, idx) => (
                        <li
                            key={link.key}
                            className={`menu-sub-item menu_items ${activeMenuIndex === idx ? 'active-menu' : ''}`}
                        >
                            <a href={link.href} onClick={(e) => handleMenuLinkClick(e, idx, link.href)}>
                                <strong className="room_items">{link.label}</strong>
                            </a>
                        </li>
                    ))}
                </ul>
            )}

            <ul id="menu-shimin-pc" className="menu">
                <li className={`room menu_items ${activeIndex === 0 ? "active" : ""}`} onClick={() => handleRoomTypeClick("normal")}>
                    <a href='/remarklist'>
                        <strong className="room_items">普通</strong>
                    </a>
                </li>
                <li className={`room menu_items ${activeIndex === 1 ? "active-room2" : ""}`} onClick={() => handleRoomTypeClick("anxiety")}>
                    <a href='/remarklist'>
                        <strong className="room_items">不安</strong>
                    </a>
                </li>
                <li className={`room menu_items ${activeIndex === 2 ? "active-room3" : ""}`} onClick={() => handleRoomTypeClick("blackmail")}>
                    <a href='/remarklist'>
                        <strong className="room_items">強迫</strong>
                    </a>
                </li>
                <li className={`room menu_items ${activeIndex === 3 ? "active-room4" : ""}`} onClick={() => handleRoomTypeClick("other")}>
                    <a href='/remarklist'>
                        <strong className="room_items">うつ他</strong>
                    </a>
                </li>
                <li className={`room menu_items ${activeIndex === 4 ? "active-room5" : ""}`} onClick={() => handleRoomTypeClick("growingup")}>
                    <a href='/remarklist'>
                        <strong className="room_items">成長</strong>
                    </a>
                </li>
            </ul>
        </nav>
    );
};

export default RemarkListSubHeader;
