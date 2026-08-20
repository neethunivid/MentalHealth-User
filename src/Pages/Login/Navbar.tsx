import React from 'react';

const Navbar = () => {
    return (
        <div style={{ backgroundColor: '#0066cc', color: 'white', display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '10px 20px' }}>
            <div style={{ fontWeight: 'bold' }}>MH-BBS</div>
            <div style={{ fontWeight: 'bold', fontSize: '18px' }}>Experience Forum</div>
            <button 
                type="button" 
                onClick={() => { /* Handle logout or ignore as per design */ }}
                style={{ backgroundColor: 'white', color: '#0066cc', border: 'none', borderRadius: '15px', padding: '5px 15px', fontWeight: 'bold', cursor: 'pointer' }}
            >
                Log out
            </button>
        </div>
    );
};

export default Navbar;
