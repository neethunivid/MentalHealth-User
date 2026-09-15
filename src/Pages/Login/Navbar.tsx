import React from 'react';

const Navbar = () => {
    return (
        <div style={{ backgroundColor: '#0066cc', color: 'white', display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '10px 15px', flexWrap: 'wrap', gap: '10px' }}>
            <div style={{ fontWeight: 'bold', fontSize: '16px' }}>MH-BBS</div>
            <div style={{ fontWeight: 'bold', fontSize: '18px' }}>体験フォーラム</div>
            <button 
                type="button" 
                onClick={() => { /* Handle logout or ignore as per design */ }}
                style={{ backgroundColor: 'white', color: '#0066cc', border: 'none', borderRadius: '15px', padding: '5px 15px', fontWeight: 'bold', cursor: 'pointer' }}
            >
                ログアウト
            </button>
        </div>
    );
};

export default Navbar;
