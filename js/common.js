'use strict';
{

const pages = [
  { href: 'interview_before.html', label: '面接まで' },
  { href: 'interview.html', label: '面接 (前日＋当日)' },
  { href: 'index.html', label: '出勤確認' },
  { href: 'others.html', label: 'その他の対応' },
  { href: 'line.html', label: 'ラインノート' },
  { href: 'campaign.html', label: 'キャンペーン' },
  { href: 'cash.html', label: '月次会計報告' },
];

const currentPage = location.pathname.split('/').pop() || 'index.html';

const headerEl = document.getElementById('site-header');
if (headerEl) {
  headerEl.outerHTML = `<header>
  <h1><a href="index.html">いちごチャット</a></h1>
</header>`;
}

const navEl = document.getElementById('site-nav');
if (navEl) {
  const items = pages.map(({ href, label }) => {
    const current = href === currentPage;
    return `<li><a href="${href}"${current ? ' aria-current="page"' : ''}>${label}</a></li>`;
  }).join('\n    ');
  navEl.outerHTML = `<nav>
  <ul>
    ${items}
  </ul>
</nav>`;
}

const footerEl = document.getElementById('site-footer');
if (footerEl) {
  footerEl.outerHTML = `<footer>
  <p><a href="index.html">&copy;いちごチャット</a></p>
</footer>`;
}

}
