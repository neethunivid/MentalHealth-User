import React, { useState } from 'react';
import { NavLink, useLocation, useNavigate, useNavigation } from 'react-router-dom';
import {
  AppBar, Toolbar, BottomNavigation, BottomNavigationAction,
  Grid, List, ListItem, ListItemText, Collapse, Typography, Divider,
  Box
} from '@mui/material';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import MenuIcon from '@mui/icons-material/Menu';
import CloseIcon from '@mui/icons-material/Close';
import EmailIcon from '@mui/icons-material/Email';
import FacebookRoundedIcon from '@mui/icons-material/FacebookRounded';
import InstagramIcon from '@mui/icons-material/Instagram';
import YouTubeIcon from '@mui/icons-material/YouTube';
import SearchIcon from '@mui/icons-material/Search';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import logo from '../../assets/headerlogo3.gif';
import NavBar from './Navbar';
import LogoutComponent from '../Logout/LogOut';

const pages = ['HOME', '市民の皆さま', '研究者の皆さま', 'お問い合わせ', 'SiteMap', 'English'];

const citizenlink = [
  {
    title: 'HOME',
    link: 'home.html',
    subItems: [],
    rendermob: false
  },
  {
    title: 'Anxiety, worries, and symptoms',
    link: 'shoujou.html',
    rendermob: false,
    subItems: [
      { title: 'social anxiety disorder', link: 'shoujou.html#shakoufuan' },
      { title: 'Panic disorder', link: 'shoujou.html#panic' },
      { title: 'Generalized anxiety disorder', link: 'shoujou.html#zenpanfuan' },
      { title: 'Obsessive-compulsive disorder', link: 'shoujou.html#kyouhaku' },
      { title: 'somatic symptom disorder', link: 'shoujou.html#shintai' },
      { title: 'Illness anxiety disorder', link: 'shoujou.html#byokifuan' },
      { title: 'Dissociative disorder', link: 'shoujou.html#kairi' },
      { title: 'Depression and Bipolar Disorder', link: 'shoujou.html#utsu' },
      { title: 'others', link: 'shoujou.html#sonota' },
      { title: 'Q&A about neurosis (anxiety disorders)', link: 'fuan_qa.html' },
    ],
  },
  {
    title: 'Consultation service',
    link: 'soudan.html',
    rendermob: false,
    subItems: [
      { title: 'Telephone & Interview Consultation', link: 'consult.html#soudan-denwa' },
      { title: 'Free Counseling', link: 'consult.html#soudan-counseling' },
      { title: 'Morita Therapy Medical Institutions', link: 'medicalcousel.html' },
    ],
  },
  {
    title: 'Morita Therapy',
    link: 'morita.html',
    rendermob: false,
    subItems: [
      { title: 'About Morita Therapy', link: 'morita.html' },
      { title: 'Treatment Methods', link: 'chiryouhou.html' },
      { title: 'Symptom-specific Treatment Methods', link: 'shoujoubetsu.html' },
      { title: 'How to approach Medication', link: 'yakubutsu-r.html' },
    ],
  },
  {
    title: 'Support activities',
    link: 'support.html',
    rendermob: false,
    subItems: [
      { title: 'Mental Health Seminars', link: 'seminar.html' },
      { title: 'Library', link: 'library.html' },
      { title: 'Reference Books', link: 'book.html' },
      { title: 'Videos & Movies', link: 'video.html' },
      { title: 'Experience Forum', link: 'forum.html' },
      { title: 'Symptom Advice Collection', link: 'advice.html' },
      { title: 'Overcoming Experiences', link: 'taiken.html' },
      { title: 'Mental News', link: 'news.html' },
      { title: 'Morita Therapy DVD', link: 'dvd.html' },
      { title: 'Related Links', link: 'link.html' },
    ],
  },
  {
    title: 'Self-assessment check',
    link: 'check.html',
    rendermob: false,
    subItems: [
      { title: 'Neurotic Personality Check', link: 'check1.html' },
      { title: 'Social Anxiety Check', link: 'check2.html' },
      { title: 'Panic Disorder Check', link: 'check3.html' },
      { title: 'Obsessive-Compulsive Disorder Check', link: 'check4.html' },
      { title: 'Depression Check', link: 'check5.html' },
    ],
  },
  {
    title: '市民の皆さま',
    link: 'shoujou.html',
    subItems: [],
    rendermob: true
  },
  {
    title: '研究者の皆さま',
    link: 'kenkyu.html',
    subItems: [],
    rendermob: true
  },
  {
    title: ' 財団紹介',
    link: 'zaidan-top.html',
    subItems: [],
    rendermob: true
  },
];

const inquirylink = [
  {
    title: 'HOME',
    link: 'home.html',
    subItems: [],
    rendermob: true
  },
  {
    title: '市民の皆さま',
    link: 'shoujou.html',
    rendermob: true,
    subItems: [
      { title: '不安・悩み・症状', link: 'shoujou.html' },
      { title: '自己診断チェック', link: 'check.html' },
      { title: '相談窓口', link: 'soudan.html' },
      { title: '森田療法と治療法', link: 'morita.html' },
      { title: 'サポート活動', link: 'support.html' },
    ]
  },
  {
    title: '研究者の皆さま',
    link: 'kenkyu.html',
    rendermob: true,
    subItems: [
      { title: '研究活動助成', link: 'kenkyu.html' },
      { title: '森田療法セミナー', link: 'moritaseminar.html' },
      { title: '関連情報・セミナー', link: 'kanren.html' },
      { title: '日本森田療法学会', link: 'society.html' },
    ]
  },
  {
    title: '財団紹介',
    link: 'zaidan-top.html',
    rendermob: true,
    subItems: [
      { title: 'はじめに', link: 'zaidan-top.html' },
      { title: '事業目的と内容', link: 'zaidan-naiyou.html' },
      { title: '組織・役員等', link: 'zaidan-soshiki.html' },
      { title: '事業報告', link: 'zaidan-houkoku.html' },
      { title: '財務状況', link: 'zaidan-zaimu-t.html' },
      { title: '今年度の事業計画', link: 'zaidan-keikaku.html' },
      { title: '定款', link: 'zaidan-teikan.html' },
      { title: '個人情報保護方針', link: 'zaidan-kojin.html' },
    ]
  },
  {
    title: 'アクセス',
    link: 'access.html',
    subItems: [],
    rendermob: true
  },
  {
    title: 'English',
    link: 'https://www.mental-health.org/e2/index.html',
    subItems: [],
    rendermob: true
  }
];

const researcherslink = [
  {
    "title": "HOME",
    "link": "home.html",
    "subItems": [],
    "rendermob": true
  },
  {
    "title": "市民の皆さま",
    "link": "shoujou.html",
    "subItems": [],
    "rendermob": true,

  },
  {
    "title": "研究者の皆さま",
    "link": "kenkyu.html",
    "subItems": [],
    "rendermob": true,

  },
  {
    "title": "研究活動助成",
    "link": "kenkyu.html",
    "rendermob": false,
    "subItems": []
  },
  {
    "title": "森田療法セミナー",
    "link": "moritaseminar.html",
    "rendermob": false,
    "subItems": [
      {
        "title": "関西森田療法セミナー",
        "link": "kansai.html"
      },
      {
        "title": "東京森田療法セミナー",
        "link": "tokyo.html"
      },
      {
        "title": "九州森田療法セミナー",
        "link": "kyushu.html"
      },
      {
        "title": "北海道森田療法セミナー",
        "link": "hokkaido.html"
      }
    ]
  },
  {
    "title": "関連情報・セミナー",
    "link": "kanren.html",
    "rendermob": false,
    "subItems": [
      {
        "title": "国内関連セミナー",
        "link": "kanren.html#kokunai"
      },
      {
        "title": "注目情報",
        "link": "kanren.html#chuumoku"
      }
    ]
  },
  {
    "title": "日本森田療法学会",
    "link": "society.html",
    "rendermob": false,
    "subItems": [
      {
        "title": "国内学会活動",
        "link": "kokunai-gakkai.html"
      },
      {
        "title": "海外学会活動",
        "link": "kaigai-gakkai.html"
      },
      {
        "title": "海外活動",
        "link": "kaigai-katsudou.html"
      },
      {
        "title": "専門家向けセミナー",
        "link": "moritaseminar.html"
      },
      {
        "title": "リンク(日本森田療法学会HP）",
        "link": "gakkailink.html"
      }
    ]
  },
  {
    "title": "財団紹介",
    "link": "zaidan-top.html",
    "subItems": [],
    "rendermob": true,

  }
]



const Navigation = () => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [openMenuIndex, setOpenMenuIndex] = useState(null);
  const [currentLinks, setCurrentLinks] = useState(citizenlink);
  const [selectedPage, setSelectedPage] = useState("");
  const navigate = useNavigate()
  const location = useLocation();

  const isLogoutComponent = 
  location.pathname === '/remarklist' || 
  location.pathname === '/remarktree_reply' || 
  location.pathname === '/remarksuccess';

  const handleMenuToggle = (index: any) => {
    setOpenMenuIndex(openMenuIndex === index ? null : index);
  };

  const handlePageClick = (page: string) => {
    setSelectedPage(page);
    switch (page) {
      case 'HOME':
        setCurrentLinks(inquirylink);
        window.location.href = 'home.html';
        break;
      case '市民の皆さま':
        setCurrentLinks(citizenlink);
        window.location.href = 'shoujou.html';
        break;
      case '研究者の皆さま':
        setCurrentLinks(researcherslink);
        window.location.href = 'kenkyu.html';
        break;
      case 'お問い合わせ':
        setCurrentLinks(inquirylink);
        navigate("/inquiry")
        break;
      case 'SiteMap':
        setCurrentLinks(inquirylink);
        window.location.href = 'sitemap.html'
        break;
      case 'English':
        setCurrentLinks(inquirylink);
        window.location.href = 'https://www.mental-health.org/e2/index.html'
        break;
      default:
        setCurrentLinks(inquirylink);
    }
  };

  function handleNavigationClick(pagelink: any): void {
    window.location.href=pagelink
  }

  return (
    <>
      {mobileOpen && (
        <div className="custom-mobile-overlay" onClick={() => setMobileOpen(false)}>
          <div className="custom-mobile-drawer" onClick={(e) => e.stopPropagation()}>
            <ul className="mobile-menu-list">
              {citizenlink.filter(item => !item.rendermob).map((menuItem, index) => (
                <React.Fragment key={index}>
                  <li className="mobile-menu-item" onClick={() => handleMenuToggle(index)}>
                    <span className="mobile-menu-title">{menuItem.title}</span>
                    <span className="mobile-menu-icon">
                      {openMenuIndex === index ? (
                        <RemoveIcon sx={{ fontSize: 18, color: '#777' }} />
                      ) : (
                        <AddIcon sx={{ fontSize: 18, color: '#777' }} />
                      )}
                    </span>
                  </li>
                  {menuItem.subItems && menuItem.subItems.length > 0 && openMenuIndex === index && (
                    <ul className="mobile-submenu-list">
                      {menuItem.subItems.map((subItem, subIndex) => (
                        <li key={subIndex} className="mobile-submenu-item">
                          <a href={subItem.link} onClick={() => setMobileOpen(false)}>
                            {subItem.title}
                          </a>
                        </li>
                      ))}
                    </ul>
                  )}
                </React.Fragment>
              ))}
            </ul>
          </div>
          <div className="custom-mobile-backdrop" onClick={() => setMobileOpen(false)}>
            <button className="mobile-drawer-close-btn" onClick={() => setMobileOpen(false)} aria-label="Close menu">
              <CloseIcon sx={{ fontSize: 30, color: '#ffffff' }} />
            </button>
          </div>
        </div>
      )}

      <header className="site-header-wrapper">
        <div className="site-header-inner">
          <div className="header-logo-container">
            <a href="/"><img src={logo} alt="Mental Health & Morita Therapy" className="header-logo-img" /></a>
          </div>
          <NavBar menuItems={currentLinks} />
          <button className="mobile-hamburger-btn" onClick={() => setMobileOpen(!mobileOpen)} aria-label="Toggle Navigation">
            <MenuIcon style={{ fontSize: 26, color: '#333' }} />
          </button>
        </div>
      </header>
    </>
  );
};

export default Navigation;
