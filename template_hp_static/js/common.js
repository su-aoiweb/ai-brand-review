/*=======================================================
ハンバーガーメニュー
=======================================================*/
// JavaScript Document
document.addEventListener("DOMContentLoaded", function () {
  const burger = document.querySelector(".p-head__burger");
  const all__wrapper = document.querySelector(".l-all__wrapper");

  if (burger) {
    burger.addEventListener("click", function () {
      burger.classList.toggle("--active");
      all__wrapper.classList.toggle("--active");
    });
  }
});

/*=======================================================
altが空のimgタグにrole="presentation"を付与
=======================================================*/
document.addEventListener("DOMContentLoaded", function () {
  document.querySelectorAll('img[alt=""]').forEach((img) => {
    img.setAttribute("role", "presentation");
  });
});
/*=======================================================
ページ内リンクについて、ヘッダーの高さを引く処理
=======================================================*/
// ① ページ内リンクのクリック時（ヘッダーの高さを考慮）
document.querySelectorAll('a[href^="#"]').forEach((link) => {
  link.addEventListener("click", function (e) {
    const targetId = this.getAttribute("href").substring(1);
    const targetElement = document.getElementById(targetId);

    if (targetElement) {
      e.preventDefault();

      // クリック時に毎回取得するようにする
      const header = document.querySelector("header");
      const fullHeight = header ? header.offsetHeight : 0;
      const isPC = window.matchMedia("(min-width: 751px)").matches;
      const rem = parseFloat(getComputedStyle(document.documentElement).fontSize); // 1remのpx値を取得
      const headerHeight = isPC ? fullHeight + 1.5625 * rem : fullHeight;

      console.log(headerHeight);

      const targetPosition = targetElement.getBoundingClientRect().top + window.scrollY - headerHeight;

      window.scrollTo({
        top: targetPosition,
        behavior: "smooth",
      });
    }
  });
});

// ② 他のページから #id 付きURL でアクセスした場合（DOMContentLoadedで実行）
document.addEventListener("DOMContentLoaded", function () {
  function getHeaderHeight() {
    const header = document.querySelector("header");
    if (!header) return 0;

    const fullHeight = header.offsetHeight;
    const isPC = window.matchMedia("(min-width: 751px)").matches;
    return isPC ? fullHeight - 25 : fullHeight;
  }

  if (window.location.hash) {
    const targetId = window.location.hash.substring(1);
    const targetElement = document.getElementById(targetId);

    if (targetElement) {
      setTimeout(() => {
        const headerHeight = getHeaderHeight();
        const targetPosition = targetElement.getBoundingClientRect().top + window.scrollY - headerHeight;

        window.scrollTo({
          top: targetPosition,
          behavior: "auto",
        });
      }, 100); // 少し遅らせて正確にスクロール
    }
  }
});

/*=======================================================
mainタグのmin-heightに、100vhからfooterタグの高さを引いた値を付与
=======================================================*/
document.addEventListener("DOMContentLoaded", function () {
  function adjustMainHeight() {
    const main = document.querySelector("main");
    const footer = document.querySelector("footer");

    if (!main || !footer) return;

    // フッターの高さを取得
    const footerHeight = footer.offsetHeight;

    // `min-height` を `100vh - フッターの高さ` に設定
    main.style.minHeight = `calc(100vh - ${footerHeight}px)`;
  }

  // 初回適用
  adjustMainHeight();

  // ウィンドウリサイズ時にも適用
  window.addEventListener("resize", adjustMainHeight);
});