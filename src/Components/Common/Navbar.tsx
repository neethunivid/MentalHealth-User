import React, { useState } from 'react';
import ArrowDropUpIcon from '@mui/icons-material/ArrowDropUp';
/**
 * display the main nav bar items 
 * @param param0 
 * @returns 
 */
const NavBar = ({ menuItems }:any) => {
  const [activeIndex, setActiveIndex] = useState(null);

  const handleMouseEnter = (index:any) => {
    setActiveIndex(index);
  };

  const handleMouseLeave = () => {
    setActiveIndex(null);
  };

  const filteredMenuItems = menuItems.filter((item :any)=> !item.rendermob);

  return (
    <nav id="global-nav" className="global-nav">
      <ul id="menu-shimin-pc" className="menu vk-menu-acc global-nav-list nav">
        {filteredMenuItems.map((menuItem:any, index:any) => (
          <li
            key={index}
            className={`menu-item ${menuItem.subItems.length > 0 ? 'menu-item-has-children' : ''}`}
            onMouseEnter={() => handleMouseEnter(index)}
            onMouseLeave={handleMouseLeave}
          >
            <a href={menuItem.link}>
              <strong className="global-nav-name">{menuItem.title}</strong>
            </a>
            {menuItem.subItems.length > 0 && (
              <>
                <div className="arrow-icon-container">
                  <ArrowDropUpIcon className="arrow-icon" />
                </div>
                <ul className={`sub-menu ${activeIndex === index ? 'active' : ''}`}>
                  {menuItem.subItems.map((subItem:any, subIndex:any) => (
                    <React.Fragment key={subIndex}>
                      <li className="menu-item">
                        <a href={subItem.link}>{subItem.title}</a>
                      </li>
                      {subIndex < menuItem.subItems.length - 1 && (
                        <div className="submenu-divider"></div>
                      )}
                    </React.Fragment>
                  ))}
                </ul>
              </>
            )}
          </li>
        ))}
      </ul>
      <div className="menu-line">
        {filteredMenuItems.map((menuItem:any, index:any) => (
          <div key={index} className={`menu-line-segment ${activeIndex === index ? 'active' : ''}`} />
        ))}
      </div>
    </nav>
  );
};

export default NavBar;
