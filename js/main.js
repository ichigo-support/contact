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

}