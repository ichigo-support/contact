'use strict';
{

const backToTop = document.createElement('button');
backToTop.id = 'back-to-top';
backToTop.type = 'button';
backToTop.setAttribute('aria-label', 'ページの先頭に戻る');
backToTop.textContent = '↑';
document.body.appendChild(backToTop);

window.addEventListener('scroll', () => {
  backToTop.classList.toggle('show', window.scrollY > 400);
});

backToTop.addEventListener('click', () => {
  window.scrollTo({ top: 0, behavior: 'smooth' });
});

const WEEKDAY_LABELS = ['日', '月', '火', '水', '木', '金', '土'];

function formatDateWithDay(date) {
  return `${date.getMonth() + 1}/${date.getDate()}(${WEEKDAY_LABELS[date.getDay()]})`;
}

function getTomorrowDate() {
  const one_days_after = document.getElementById('one_days_after');
  if (!one_days_after) return;

  //１日後
  const tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);

  one_days_after.textContent = formatDateWithDay(tomorrow);
}

getTomorrowDate();

function getTodayDate() {
  const Today = document.getElementById('Today');
  if (!Today) return;

  Today.textContent = formatDateWithDay(new Date());
}

getTodayDate();

function copyTextToClipboard(text) {
  if (navigator.clipboard && window.isSecureContext) {
    return navigator.clipboard.writeText(text);
  }
  const textarea = document.createElement('textarea');
  textarea.value = text;
  textarea.style.position = 'fixed';
  textarea.style.opacity = '0';
  document.body.appendChild(textarea);
  textarea.select();
  document.execCommand('copy');
  document.body.removeChild(textarea);
  return Promise.resolve();
}

const copyToast = document.createElement('div');
copyToast.id = 'copy-toast';
copyToast.setAttribute('role', 'status');
document.body.appendChild(copyToast);

let copyToastTimer;
function showCopyToast(message) {
  copyToast.textContent = message;
  copyToast.classList.add('show');
  clearTimeout(copyToastTimer);
  copyToastTimer = setTimeout(() => {
    copyToast.classList.remove('show');
  }, 1600);
}

const PLACEHOLDER_MARKERS = ['●●', '▲▲'];

function wrapPlaceholders(p) {
  const markerPattern = /(●●|▲▲)/g;
  const walker = document.createTreeWalker(p, NodeFilter.SHOW_TEXT);
  const targets = [];
  let node;
  while ((node = walker.nextNode())) {
    if (PLACEHOLDER_MARKERS.some((marker) => node.nodeValue.includes(marker))) {
      targets.push(node);
    }
  }
  targets.forEach((textNode) => {
    const parts = textNode.nodeValue.split(markerPattern);
    const frag = document.createDocumentFragment();
    parts.forEach((part) => {
      if (!part) return;
      if (PLACEHOLDER_MARKERS.includes(part)) {
        const mark = document.createElement('span');
        mark.className = 'placeholder';
        mark.textContent = part;
        frag.appendChild(mark);
      } else {
        frag.appendChild(document.createTextNode(part));
      }
    });
    textNode.parentNode.replaceChild(frag, textNode);
  });
}

document.querySelectorAll('main p').forEach((p) => {
  wrapPlaceholders(p);
  p.classList.add('copyable');
  p.title = 'クリックでコピー';

  p.addEventListener('click', () => {
    copyTextToClipboard(p.innerText).then(() => {
      p.classList.add('copied');

      const placeholders = p.querySelectorAll('.placeholder');
      if (placeholders.length > 0) {
        placeholders.forEach((mark) => {
          mark.classList.remove('flash');
          void mark.offsetWidth;
          mark.classList.add('flash');
        });
        showCopyToast('コピーしました（●●・▲▲の書き換えを忘れずに）');
      } else {
        showCopyToast('コピーしました');
      }

      setTimeout(() => {
        p.classList.remove('copied');
      }, 800);
    });
  });
});

}