$(function(){

  /*-------------------------------
  ハンバーガーメニュー
  ---------------------------------*/
  $(".hamburger").click(function () {
    $(this).toggleClass("active");
    $("header .navi").toggleClass("active");
    $("header .mask").toggleClass("active");
    $("body").toggleClass("menu-open");
  });
  
  $(".navi a").click(function () {
    $(".hamburger").removeClass("active");
    $("header .navi").removeClass("active");
    $("header .mask").removeClass("active");
  });
  
  $(".mask").click(function () {
    $(".hamburger").removeClass("active");
    $("header .navi").removeClass("active");
    $("header .mask").removeClass("active");
  });
  
  /*-------------------------------
  ドロップダウンメニュー
  ---------------------------------*/

  $(".navi .menu .menu-first span").click(function () {

    if (window.innerWidth <= 1200) {
    const $this = $(this);
    const $submenu = $this.next();

    $this.toggleClass("active");

    if ($submenu.is(":visible")) {
      $submenu.stop().slideUp(200);
    } else {
      $(".menu-second").slideUp(200); // 他を閉じたい場合
      $submenu.stop().slideDown(200);
    }
  } else {
      // 1200px以上（PC用）
      // 他のメニューを閉じる指示
      $(".navi .menu .menu-second").not($submenu).slideUp();
      $(".navi .menu .menu-first span").not($this).removeClass("active");

      // クリックしたメニューだけトグル  
      $this.toggleClass("active");
      $submenu.slideToggle();
    }
  });
  

  /*-------------------------------
  Inview
  ---------------------------------*/
  $(".fadein").on("inview", function () {
    $(this).addClass("inview");
  });

  /*-------------------------------
  タブ切り替え
  ---------------------------------*/
  $(".tab-list .tab-all").addClass("active");
  $(".products-list.all").addClass("active");

  $(".tab-all").click(function () {
    $(".tab-list li").removeClass("active");
    $(".products-list").removeClass("active");
    $(this).addClass("active");
    $(".products-list.all").addClass("active");
  });
  
  $(".tab-sofa").click(function () {
    $(".tab-list li").removeClass("active");
    $(".products-list").removeClass("active");
    $(this).addClass("active");
    $(".products-list.sofa").addClass("active");
  });
  
  $(".tab-desk").click(function () {
    $(".tab-list li").removeClass("active");
    $(".products-list").removeClass("active");
    $(this).addClass("active");
    $(".products-list.desk").addClass("active");
  });
  
  $(".tab-chair").click(function () {
    $(".tab-list li").removeClass("active");
    $(".products-list").removeClass("active");
    $(this).addClass("active");
    $(".products-list.chair").addClass("active");
  });
  
  $(".tab-dining").click(function () {
    $(".tab-list li").removeClass("active");
    $(".products-list").removeClass("active");
    $(this).addClass("active");
    $(".products-list.dining").addClass("active");
  });

  /*-------------------------------
  モーダルウィンドウ
  ---------------------------------*/
  // オープン
  $(".work1 .modal-open").click(function () {
    $("body").css("overflow-y", "hidden");
    $(".work1 .modal-container").addClass("active");
  });
  
  $(".work2 .modal-open").click(function () {
    $("body").css("overflow-y", "hidden");
    $(".work2 .modal-container").addClass("active");
  });
  
  $(".work3 .modal-open").click(function () {
    $("body").css("overflow-y", "hidden");
    $(".work3 .modal-container").addClass("active");
  });

  // クローズ
  $(".modal-close").click(function () {
    $("body").css("overflow-y", "auto");
    $(".modal-container").removeClass("active");
  });

  /*-------------------------------
  アコーディオン
  ---------------------------------*/
  $(".faq-list dd").hide();
  $(".faq-list dt").click(function () {
    $(this).next().slideToggle();
    $(this).toggleClass("active");
  });
  

  /*-------------------------------
  アコーディオン　講師略歴
  ---------------------------------*/
  $(".career-content").hide(); // 最初は非表示
  $(".career-title").click(function () {
    $(this).next(".career-content").slideToggle();
    $(this).toggleClass("active");
  });
  

  /*-------------------------------
  アコーディオン　kenkyu
  ---------------------------------*/
  $(".tebiki-content").hide(); // 最初は非表示
  $(".tebiki-title").click(function () {
    $(this).next(".tebiki-content").slideToggle();
    $(this).toggleClass("active");
  });
});


  /*-------------------------------
  体験フォーラム入会申し込み
  ---------------------------------*/
  document.addEventListener('DOMContentLoaded', () => {
  const yearSelect = document.getElementById('year');
  const monthSelect = document.getElementById('month');
  const daySelect = document.getElementById('day');

  const thisYear = new Date().getFullYear();
  yearSelect.add(new Option('-', ''));
  for (let y = thisYear; y >= 1920; y--) {
    yearSelect.add(new Option(y , y));
  }

  monthSelect.add(new Option('-', ''));
  for (let m = 1; m <= 12; m++) {
    monthSelect.add(new Option(m , m));
  }

  daySelect.add(new Option('-', ''));
  for (let d = 1; d <= 31; d++) {
    daySelect.add(new Option(d , d));
  }
 });

 document.addEventListener('DOMContentLoaded', () => {
  const prefectureSelect = document.getElementById('prefecture');

  const prefectures = [
    "北海道","青森県","岩手県","宮城県","秋田県","山形県","福島県",
    "茨城県","栃木県","群馬県","埼玉県","千葉県","東京都","神奈川県",
    "新潟県","富山県","石川県","福井県","山梨県","長野県",
    "岐阜県","静岡県","愛知県","三重県",
    "滋賀県","京都府","大阪府","兵庫県","奈良県","和歌山県",
    "鳥取県","島根県","岡山県","広島県","山口県",
    "徳島県","香川県","愛媛県","高知県",
    "福岡県","佐賀県","長崎県","熊本県","大分県","宮崎県","鹿児島県","沖縄県"
  ];

  prefectures.forEach(pref => {
    prefectureSelect.add(new Option(pref, pref));
  });
 });
  /*-------------------------------
  book ［続きを読む］
  ---------------------------------*/
  document.addEventListener('DOMContentLoaded', () => {
  const buttons = document.querySelectorAll('.read-more');

  buttons.forEach(btn => {
    btn.addEventListener('click', () => {
      const wrapper = btn.closest('.inbox-book-r');
      const text = wrapper.querySelector('.book-text');

      const isOpen = text.classList.toggle('is-open');

      btn.textContent = isOpen ? '［▲閉じる］' : '［続きを読む］';
      btn.setAttribute('aria-expanded', isOpen);
    });
  });
});
