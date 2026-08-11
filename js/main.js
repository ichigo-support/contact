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

function getTomorrowDate() {
  const one_days_after = document.getElementById('one_days_after');
  if (!one_days_after) return;

  //今日の日付
  let today = new Date();
  //１日後
  today.setDate(today.getDate() + 1);

  const month = today.getMonth();
  const date = today.getDate();
  const day = today.getDay();
  const days = {
    0: '日',
    1: '月',
    2: '火',
    3: '水',
    4: '木',
    5: '金',
    6: '土',
  };
  one_days_after.textContent = `${month + 1}/${date}(${days[day]})`;
}

getTomorrowDate();

function getTodayDate() {
  const Today = document.getElementById('Today');
  if (!Today) return;

  //今日の日付
  let today = new Date();

  const month = today.getMonth();
  const date = today.getDate();
  const day = today.getDay();
  const days = {
    0: '日',
    1: '月',
    2: '火',
    3: '水',
    4: '木',
    5: '金',
    6: '土',
  };
  Today.textContent = `${month + 1}/${date}(${days[day]})`;
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

function wrapPlaceholders(p) {
  const walker = document.createTreeWalker(p, NodeFilter.SHOW_TEXT);
  const targets = [];
  let node;
  while ((node = walker.nextNode())) {
    if (node.nodeValue.includes('●●')) {
      targets.push(node);
    }
  }
  targets.forEach((textNode) => {
    const parts = textNode.nodeValue.split('●●');
    const frag = document.createDocumentFragment();
    parts.forEach((part, i) => {
      if (part) frag.appendChild(document.createTextNode(part));
      if (i < parts.length - 1) {
        const mark = document.createElement('span');
        mark.className = 'placeholder';
        mark.textContent = '●●';
        frag.appendChild(mark);
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
        showCopyToast('コピーしました（●●の書き換えを忘れずに）');
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