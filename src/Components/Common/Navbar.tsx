import React, { useState } from 'react';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';

/**
 * Clean Single-Row Navbar
 */
const NavBar = ({ menuItems }: any) => {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  const handleMouseEnter = (index: any) => {
    setActiveIndex(index);
  };

  const handleMouseLeave = () => {
    setActiveIndex(null);
  };

  const filteredMenuItems = menuItems.filter((item: any) => !item.rendermob);

  return (
    <nav className="custom-navbar">
      <ul className="custom-nav-list">
        {filteredMenuItems.map((menuItem: any, index: any) => (
          <li
            key={index}
            className={`custom-nav-item ${menuItem.subItems && menuItem.subItems.length > 0 ? 'has-children' : ''}`}
            onMouseEnter={() => handleMouseEnter(index)}
            onMouseLeave={handleMouseLeave}
          >
            <a href={menuItem.link} className="custom-nav-link">
              <span className="custom-nav-title">{menuItem.title}</span>
              <KeyboardArrowDownIcon className="custom-nav-caret" />
            </a>
            {menuItem.subItems && menuItem.subItems.length > 0 && (
              <ul className={`custom-sub-menu ${activeIndex === index ? 'active' : ''}`}>
                {menuItem.subItems.map((subItem: any, subIndex: any) => (
                  <React.Fragment key={subIndex}>
                    <li className="custom-sub-item">
                      <a href={subItem.link}>{subItem.title}</a>
                    </li>
                    {subIndex < menuItem.subItems.length - 1 && (
                      <div className="custom-sub-divider"></div>
                    )}
                  </React.Fragment>
                ))}
              </ul>
            )}
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default NavBar;

