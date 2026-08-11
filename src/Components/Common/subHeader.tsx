import React, { useState } from 'react';
import './subHeader.scss';

const SubHeader = () => {
    const [activeIndex, setActiveIndex] = useState<number | null>(null);

    const handleMouseEnter = (index: number) => {
        setActiveIndex(index);
    };

    const handleMouseLeave = () => {
        setActiveIndex(null);
    };

    return (
            <nav id="global-nav" className="global-nav global-nav--layout--center global-nav--scrolled--nav-center">
                <ul id="menu-shimin-pc" className="menu vk-menu-acc global-nav-list nav">
                    {/* HOME */}
                    <li className="menu-item">
                        <a href="home.html">
                            <strong className="global-nav-name">HOME</strong>
                        </a>
                    </li>

                    {/* 不安・悩み・症状 */}
                    <li className="menu-item menu-item-has-children"
                        onMouseEnter={() => handleMouseEnter(0)}
                        onMouseLeave={handleMouseLeave}>
                        <a href="shoujou.html">
                            <strong className="global-nav-name">不安・悩み・症状</strong>
                        </a>
                        <ul className={`sub-menu ${activeIndex === 0 ? 'active' : ''}`}>
                            <li className="menu-items"><a href="shoujoubetsu.html#section1">社交不安症（対人恐怖）</a></li>
                            <li className="menu-items"><a href="shoujou.html#panic">パニック症</a></li>
                            <li className="menu-items"><a href="shoujou.html#zenpanfuan">全般性不安症</a></li>
                            <li className="menu-items"><a href="shoujou.html#kyouhaku">強迫症</a></li>
                            <li className="menu-items"><a href="shoujou.html#shintai">身体表現症</a></li>
                            <li className="menu-items"><a href="shoujou.html#byokifuan">病気不安症（心気障害）</a></li>
                            <li className="menu-items"><a href="shoujou.html#kairi">解離性障害</a></li>
                            <li className="menu-items"><a href="shoujou.html#rijin">離人症</a></li>
                            <li className="menu-items"><a href="shoujou.html#utsu">うつ病・躁うつ病</a></li>
                            <li className="menu-items"><a href="shoujou.html#kibun">他の気分障害（気分変調症、非定型うつ病、その他）</a></li>
                            <li className="menu-items "><a href="shoujou.html#sonota">その他（発達障害、トラウマなど）</a></li>
                            <li className="menu-items "><a href="ryouhou.html">薬物療法と精神療法</a></li>
                        </ul>
                    </li>

                    {/* 自己診断チェック */}
                    <li className="menu-item menu-item-has-children"
                        onMouseEnter={() => handleMouseEnter(1)}
                        onMouseLeave={handleMouseLeave}>
                        <a href="check.html">
                            <strong className="global-nav-name">自己診断チェック</strong>
                        </a>
                        <ul className={`sub-menu ${activeIndex === 1 ? 'active' : ''}`}>
                            <li className="menu-items"><a href="/check1">神経質性格度チェック</a></li>
                            <li className="menu-items"><a href="/check2">対人恐怖症チェック</a></li>
                            <li className="menu-items"><a href="/check3">パニック症チェック</a></li>
                            <li className="menu-items"><a href="/check4">強迫症チェック</a></li>
                            <li className="menu-items"><a href="/check5">うつ病チェック</a></li>
                            <li className="menu-items"><a href="/check6">全般性不安症（不安神経症）チェック</a></li>
                        </ul>
                    </li>

                    {/* 相談窓口 */}
                    <li className="menu-item menu-item-has-children"
                        onMouseEnter={() => handleMouseEnter(2)}
                        onMouseLeave={handleMouseLeave}>
                        <a href="soudan.html">
                            <strong className="global-nav-name">相談窓口</strong>
                        </a>
                        <ul className={`sub-menu ${activeIndex === 2 ? 'active' : ''}`}>
                            <li className="menu-items"><a href="soudan.html#soudan-denwa">電話・面接相談（対面・Online）</a></li>
                            <li className="menu-items"><a href="soudan.html#soudan-counseling">無料カウンセリング（対面・Online）</a></li>
                            <li className="menu-items"><a href="medicalcouseling.html">森田療法医療機関とカウンセリング</a></li>
                        </ul>
                    </li>

                    <li className="menu-item menu-item-has-children"
                        onMouseEnter={() => handleMouseEnter(4)}
                        onMouseLeave={handleMouseLeave}>
                        <a href="morita.html"><strong className="global-nav-name">森田療法と治療法</strong></a>
                        <ul className={`sub-menu ${activeIndex === 4 ? 'active' : ''}`}>
                            <li className="menu-items"><a href="morita.html">森田療法とは</a></li>
                            <li className="menu-items"><a href="chiryouhou.html">森田療法の治療法</a></li>
                            <li className="menu-items"><a href="shoujoubetsu.html">森田療法の症状別治療法</a></li>
                            <li className="menu-items"><a href="yakubutsu-r.html">薬物療法への接し方</a></li>

                        </ul>

                    </li>

                    {/* サポート活動 */}
                    <li className="menu-item menu-item-has-children"
                        onMouseEnter={() => handleMouseEnter(3)}
                        onMouseLeave={handleMouseLeave}>
                        <a href="support.html">
                            <strong className="global-nav-name">サポート活動</strong>
                        </a>
                        <ul className={`sub-menu ${activeIndex === 3 ? 'active' : ''}`}>
                            <li className="menu-items"><a href="kokoroseminar.html">心の健康セミナー（配信・イベント）</a></li>
                            <li className="menu-items"><a href="book.html">図書室（閲覧・貸出・ビデオ視聴）</a></li>
                            <li className="menu-items"><a href="sankoutosho.html">参考図書</a></li>
                            <li className="menu-items"><a href="video.html">ビデオ・動画</a></li>
                            <li className="menu-items"><a href="forum.html">体験フォーラム（会員制掲示板）</a></li>
                            <li className="menu-items"><a href="advice.html">症状別アドバイス集</a></li>
                            <li className="menu-items"><a href="taiken.html">克服体験談</a></li>
                            <li className="menu-items"><a href="mentalnews.html">メンタルニュース（小冊子）</a></li>
                            <li className="menu-items"><a href="dvd.html">森田療法DVD</a></li>
                            <li className="menu-items"><a href="link.html">森田療法関連リンク</a></li>
                        </ul>
                    </li>

                </ul>
            </nav>
    );
};

export default SubHeader;
