import React from 'react';
import { useNavigate } from 'react-router-dom';
import './Navbar.css';

interface NavbarProps {
    title: string;
    onLogout?: () => void;
}

const Navbar: React.FC<NavbarProps> = ({ title, onLogout }) => {
    const navigate = useNavigate();

    const handleLogout = () => {
        if (onLogout) {
            onLogout();
        } else {
            // Clear all session data from localStorage
            localStorage.removeItem('token');
            localStorage.removeItem('roomType');
            localStorage.removeItem('memberId');
            localStorage.removeItem('memberNo');
            localStorage.removeItem('memberName');
            navigate('/forumlogin');
        }
    };

    return (
        <div style={{ backgroundColor: '#006bc9', color: 'white', display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '6px 15px', flexWrap: 'wrap' }}>
            <div style={{ fontWeight: 'bold', fontSize: '13px' }}>MH-BBS</div>
            <div className="navbar-title">{title}</div>
            <button
                type="button"
                onClick={handleLogout}
                className='logout-button'
            >
                ログアウト
            </button>
        </div>
    );
};

export default Navbar;
