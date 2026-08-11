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
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
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
    title: '市民の皆さま',
    link: 'shoujou.html',
    subItems: [],
    rendermob: true
  },
  {
    title: '不安・悩み・症状',
    link: 'shoujou.html',
    rendermob: false,
    subItems: [
      { title: '社交不安症（対人恐怖）', link: 'shoujou.html#shakoufuan' },
      { title: 'パニック症', link: 'shoujou.html#panic' },
      { title: '全般性不安症', link: 'shoujou.html#zenpanfuan' },
      { title: '強迫症', link: 'shoujou.html#kyouhaku' },
      { title: '身体表現症', link: 'shoujou.html#shintai' },
      { title: '病気不安症（心気障害）', link: 'shoujou.html#byokifuan' },
      { title: '解離性障害', link: 'shoujou.html#kairi' },
      { title: '離人症', link: 'shoujou.html#rijin' },
      { title: 'うつ病・躁うつ病', link: 'shoujou.html#utsu' },
      { title: '他の気分障害（気分変調症、非定型うつ病、その他）', link: 'shoujou.html#kibun' },
      { title: 'その他（発達障害、トラウマなど）', link: 'shoujou.html#sonota' },
      { title: '薬物療法と精神療法', link: 'ryouhou.html' },
      { title: '神経症（不安障害）のQ&A', link: 'fuan_qa.html' },
    ],
  },
  {
    title: '自己診断チェック',
    link: 'check.html',
    rendermob: false,
    subItems: [
      { title: '神経質性格度チェック', link: 'check1.html' },
      { title: '対人恐怖症チェック', link: 'check2.html' },
      { title: 'パニック症チェック', link: 'check3.html' },
      { title: '強迫症チェック', link: 'check4.html' },
      { title: 'うつ病チェック', link: 'check5.html' },
      { title: 'その他チェック', link: 'check6.html' },
    ],
  },
  {
    title: '相談窓口',
    link: 'soudan.html',
    rendermob: false,
    subItems: [
      { title: '電話・面接相談（対面・Online）', link: 'consult.html#soudan-denwa' },
      { title: '無料カウンセリング（対面・Online）', link: 'consult.html#soudan-counseling' },
      { title: '森田療法医療機関とカウンセリング', link: 'medicalcousel.html' },
    ],
  },
  {
    title: '森田療法と治療法',
    link: 'morita.html',
    rendermob: false,
    subItems: [
      { title: '森田療法とは', link: 'morita.html' },
      { title: '森田療法の治療法', link: 'chiryouhou.html' },
      { title: '森田療法の症状別治療法', link: 'shoujoubetsu.html' },
      { title: '薬物療法への接し方', link: 'yakubutsu-r.html' },

    ],
  },
  {
    title: 'サポート活動',
    link: 'support.html',
    rendermob: false,
    subItems: [
      { title: '心の健康セミナー（配信・イベント）', link: 'seminar.html' },
      { title: '図書室（閲覧・貸出・ビデオ視聴）', link: 'library.html' },
      { title: '参考図書', link: 'book.html' },
      { title: 'ビデオ・動画', link: 'video.html' },
      { title: '体験フォーラム（会員制掲示板）', link: 'forum.html' },
      { title: '症状別アドバイス集', link: 'advice.html' },
      { title: '克服体験談', link: 'taiken.html' },
      { title: 'メンタルニュース（小冊子）', link: 'news.html' },
      { title: '森田療法DVD', link: 'dvd.html' },
      { title: '森田療法関連リンク', link: 'link.html' },
    ],
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
  const [currentLinks, setCurrentLinks] = useState(inquirylink);
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
      <Grid className="appBar">
        <Grid container className="contentWrapper">
          <Typography className="header-top-description">
            神経症（不安障害）と森田療法
          </Typography>
          <ul className="navItems">
            {pages.map((page, index) => (
              <li
                key={index}
                onClick={() => handlePageClick(page)}
                className={selectedPage === page ? 'selectedItem' : ''}
              >
                <a>{page}</a>
              </li>
            ))}
            <li>
              <Grid>
                <a href="https://www.facebook.com/mental.zaidan/">
                  <FacebookRoundedIcon className="whiteColor" />
                </a>
              </Grid>
            </li>
            <li>
              <Grid>
                <a href="https://www.instagram.com/mental_zaidan/">
                <InstagramIcon className="whiteColor" />
                </a>
              </Grid>
            </li>
            <li>
              <Grid>
                <a href="https://www.youtube.com/@mentalnobu">
                <YouTubeIcon className="whiteColor" />
                </a>
              </Grid>
            </li>
            <li>
              <Grid>
                <a href='search.html'>
                <SearchIcon className="whiteColor" fontSize="large" style={{ fontWeight: 'bold' }} />
                </a>
              </Grid>
            </li>
            <li className="additionalContainer">
              <div className="innerContainer" onClick={() => navigate('/mailmagazine')}>
                <ArrowForwardIcon style={{ color: 'white', fontSize: 15, padding: 1 }} />
                <span>メルマガ購読</span>
              </div>
            </li>
          </ul>
          {isLogoutComponent && (
       <LogoutComponent className='logout'/>
      )}
        </Grid>
      </Grid>

      {mobileOpen && (
        <div
          className="overlay-menu"
          onClick={() => setMobileOpen(false)}
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            marginBottom: 60,
            backgroundColor: 'rgba(0, 0, 0, 0.5)',
            zIndex: 1200,
            overflow: 'hidden',
          }}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            style={{
              position: 'absolute',
              top: 0,
              right: 0,
              width: '100%',
              height: '100%',
              backgroundColor: 'white',
              overflowY: 'auto',
              marginBottom: 60,
            }}
          >
            <List>
              {currentLinks.map((menuItem, index) => (
                <React.Fragment key={index}>
                  <ListItem button onClick={() => handleMenuToggle(index)}>
                    <ListItemText primary={menuItem.subItems.length > 0 ? `>  ${menuItem.title}` : menuItem.title} onClick={()=>handleNavigationClick(menuItem.link)}/>
                    {menuItem.subItems.length > 0 && (
                      <Box
                        sx={{
                          width: 24,
                          height: 24,
                          border: '1px solid grey',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',

                          marginLeft: 'auto',
                          backgroundColor: 'white',
                        }}
                      >
                        {openMenuIndex === index ? (
                          <CloseIcon />
                        ) : (
                          <KeyboardArrowDownIcon />
                        )}
                      </Box>
                    )}
                  </ListItem>
                  <Collapse in={openMenuIndex === index} timeout="auto" unmountOnExit>
                    <List component="div" disablePadding>
                      {menuItem.subItems.map((subItem, subIndex) => (
                        <React.Fragment key={subIndex}>
                          <ListItem button sx={{ pl: 4 }}>
                            <ListItemText primary={subItem.title}  onClick={()=>handleNavigationClick(subItem.link)}/>
                          </ListItem>
                          {subIndex !== menuItem.subItems.length - 1 && (
                            <Grid className="submenu-divider-mob"></Grid>
                          )}
                        </React.Fragment>
                      ))}
                    </List>
                  </Collapse>

                  <Grid className="submenu-divider-mob"></Grid>

                </React.Fragment>
              ))}
            </List>
            <Grid className='mail-maincontainer '>
              <div className="magazinecontainer" onClick={() => navigate('/mailmagazine')}>
                <div className="arrow-circle">
                  <ArrowForwardIcon style={{ color: '#0061b7', fontSize: 15, padding: 1 }} />
                </div>
                <span>メルマガ購読</span>
              </div>
            </Grid>
            <Grid
              container 
              justifyContent="center" 
            >
              <Grid item>
              {isLogoutComponent && (
       <LogoutComponent />
      )}
              </Grid>
            </Grid>

          </div>
        </div>
      )}

      <Grid container justifyContent="center" className="site-header-logo">
        <img src={logo} alt="Logo" />
      </Grid>

      <NavBar menuItems={currentLinks} />
      <Grid container className="bottom-navigation" alignItems="center" justifyContent="center" sx={{
        position: 'fixed',
        bottom: 0,
        left: 0,
        right: 0,
        zIndex: 1200,
        backgroundColor: 'white',
        maxWidth: '100vw',
        overflowX: 'auto',
        borderTop: '1px solid #ccc', // Add a border at the top for separation
      }}>
        <BottomNavigation showLabels className='bottomnavigationstyle'>
          <BottomNavigationAction className="blueColor" label="Menu" icon={<MenuIcon />} onClick={() => setMobileOpen(!mobileOpen)} sx={{ minWidth: 'auto' }} />
          <BottomNavigationAction className="blueColor" label="お問合せ" icon={<EmailIcon />} component={NavLink} to="/message" sx={{ minWidth: 'auto' }} />
          <BottomNavigationAction className="blueColor" label="FB" icon={<FacebookRoundedIcon />} component={NavLink} to="/facebook" sx={{ minWidth: 'auto' }} />
          <BottomNavigationAction className="blueColor" label="Insta" icon={<InstagramIcon />} component={NavLink} to="/instagram" sx={{ minWidth: 'auto' }} />
          <BottomNavigationAction className="blueColor" label="動画" icon={<YouTubeIcon />} component={NavLink} to="/youtube" sx={{ minWidth: 'auto' }} />
          <BottomNavigationAction className="blueColor" label="検索" icon={<SearchIcon />} component={NavLink} to="/search" sx={{ minWidth: 'auto' }} />
        </BottomNavigation>
      </Grid>
    </>
  );
};

export default Navigation;
