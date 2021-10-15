import '@babel/polyfill';
import sublinks from './data.js';
import { showAlert } from './alerts';
import { scrollToTop } from './scroll';
import { login } from './login';
import { logout } from './logout';
import { createSermon, updateSermon, deleteSermon } from './sermon';
import { galleryUpload } from './galleryUpload';
import { createMember, updateMember, deleteMember } from './member';
import { createNews, updateNews, deleteNews } from './news';
import { createEvent, updateEvent, deleteEvent } from './event';
import { pay } from './payment';
import {
  createDepartment,
  updateDepartment,
  deleteDepartment,
} from './department';
import { changeShowcase } from './showCase';

// forms
const loginForm = document.forms.login;
const sermonForm = document.forms.sermon;
const updateForm = document.forms.update;
const galleryForm = document.forms.gallery;
const memberForm = document.forms.member;
const newsForm = document.forms.news;
const eventForm = document.forms.event;
const departmentForm = document.forms.department;
const showcaseForm = document.forms.showcase;
// payment form
const paymentForm = document.forms.payment;
// admin logout
const logoutBtn = document.querySelector('.logout');
// delete
const deleteBtns = document.querySelectorAll('.delete');
const deleteId = document.querySelectorAll('.Id');

// Nav bar Variables
const header = document.querySelector('.header');
const menu = document.querySelector('.header__menu');
const overlay = document.querySelector('.header__overlay');
// scroll
const scroll = document.querySelector('.scroll');

// filter variables
const search = document.querySelector('.sermons__search--btn');
const btns = document.querySelectorAll('.sermons__search--filter-box__btn');
// paginate variables
let pageBtns = Array.from(
  document.querySelectorAll('.page-btns-container__item')
);
let prevBtn = document.querySelector('.page-btns-container__prev');
let nextBtn = document.querySelector('.page-btns-container__next');
// Slider Variables
const slideContent = document.querySelectorAll(
  '.slider__img-container--list__item'
);
const next = document.querySelector('.slider__btn--right');
const prev = document.querySelector('.slider__btn--left');
let slideInterval;
let interval = 5000;

// testimonials/member variables
const slides = document.querySelectorAll(
  '.testimonials__content--slider__slide'
);
const indicatorImgs = document.querySelectorAll(
  '.testimonials__content--indicator__img'
);
if (menu)
  menu.addEventListener('click', () => {
    menu.classList.toggle('open');
    header.classList.toggle('open');
    overlay.classList.toggle('open');
  });
// scroll
if (scroll)
  scroll.addEventListener('click', () => {
    scrollToTop();
  });

window.addEventListener('scroll', () => {
  if (scroll) scroll.classList.toggle('active', window.scrollY > 200);
});

// filter;
for (let i = 0; i < btns.length; i++) {
  btns[i].addEventListener('click', function (e) {
    e.preventDefault();
    const filter = e.target.dataset.filter;
    let params = new URLSearchParams(location.search);
    params.set('month', filter);

    location.search = '?' + params.toString();
  });
}
if (search)
  search.addEventListener('click', async function (e) {
    e.preventDefault();
    const speaker = document.querySelector('#search_sermon').value;
    if (!speaker) return;
    let params = new URLSearchParams(location.search);
    params.set('speaker', speaker);
    location.search = '?' + params.toString();
  });

// Paginate
for (let i = 0; i < pageBtns.length; i++) {
  if (pageBtns)
    pageBtns[i].addEventListener('click', function (e) {
      e.preventDefault();
      let page = e.target.dataset.page;

      let params = new URLSearchParams(location.search);
      params.set('page', page);

      location.search = '?' + params.toString();
    });
}

if (pageBtns.length > 4) {
  prevBtn.style.display = 'inline-block';
  nextBtn.style.display = 'inline-block';

  let delBtnsEnd = pageBtns.splice(5);
  let delBtnsBeg = [];

  for (let btn of delBtnsEnd) {
    btn.style.display = 'none';
  }

  // Next Button
  if (nextBtn)
    nextBtn.addEventListener('click', (e) => {
      e.preventDefault();

      if (pageBtns.length > 3 && delBtnsEnd.length > 0) {
        let firstBtns = pageBtns.shift();
        firstBtns.style.display = 'none';
        delBtnsBeg.push(firstBtns);
        let AddedBtns = delBtnsEnd.shift();
        AddedBtns.style.display = 'inline-block';
        pageBtns.push(AddedBtns);
      } else {
        showAlert('info', 'No more Pages!!');
      }
    });

  //   Previous Button
  if (prevBtn)
    prevBtn.addEventListener('click', (e) => {
      e.preventDefault();

      if (delBtnsBeg.length > 0) {
        let reAddBtns = delBtnsBeg.pop();
        reAddBtns.style.display = 'inline-block';
        pageBtns.unshift(reAddBtns);
        let delBtn = pageBtns.pop();
        delBtn.style.display = 'none';
        delBtnsEnd.unshift(delBtn);
      } else {
        showAlert('info', 'No more Pages!!');
      }
    });
}

// slider
// Next Button
const nextSlide = () => {
  const current = document.querySelector('.current--img');
  if (!current) return;
  current.classList.remove('current--img');
  if (current.nextElementSibling) {
    current.nextElementSibling.classList.add('current--img');
  } else {
    slideContent[0].classList.add('current--img');
  }
  current.classList.remove('current--img');
};

// Prev Button
const prevSlide = () => {
  const current = document.querySelector('.current--img');
  if (!current) return;
  current.classList.remove('current--img');
  if (current.previousElementSibling) {
    current.previousElementSibling.classList.add('current--img');
  } else {
    slideContent[slideContent.length - 1].classList.add('current--img');
  }
  current.classList.remove('current--img');
};

// Add event listeners
if (next)
  next.addEventListener('click', () => {
    nextSlide();
    if (true) {
      clearInterval(slideInterval);
      auto();
    }
  });
if (prev)
  prev.addEventListener('click', () => {
    prevSlide();
    if (true) {
      clearInterval(slideInterval);
      auto();
    }
  });

// Auto scroll
function auto() {
  slideInterval = setInterval(nextSlide, interval);
}
auto();
// testimonials/member
for (let i = 0; i < indicatorImgs.length; i++) {
  indicatorImgs[i].addEventListener('click', function () {
    // console.log(this.getAttribute("data-id"));

    //   Getting the slide images
    for (let j = 0; j < indicatorImgs.length; j++) {
      indicatorImgs[j].classList.remove('active');
    }
    this.classList.add('active');

    //   Getting the next slide
    const id = this.getAttribute('data-id');
    for (let k = 0; k < slides.length; k++) {
      slides[k].classList.remove('active');
    }
    slides[id].classList.add('active');
  });
}
// Login
if (loginForm)
  loginForm.addEventListener('submit', async function (e) {
    e.preventDefault();
    const data = new FormData(loginForm);
    login(data);
  });
// Create Sermon
if (sermonForm)
  sermonForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const data = new FormData(sermonForm);
    createSermon(data);
  });
if (updateForm)
  updateForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const data = new FormData(updateForm);
    let id = document.querySelector('#id').value;

    if (location.href.indexOf('Sermon') != -1) updateSermon(data, id);
    if (location.href.indexOf('News') != -1) updateNews(data, id);
    if (location.href.indexOf('Member') != -1) updateMember(data, id);
    if (location.href.indexOf('Event') != -1) updateEvent(data, id);
    if (location.href.indexOf('Department') != -1) updateDepartment(data, id);
  });

if (galleryForm)
  galleryForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const data = new FormData(galleryForm);
    galleryUpload(data);
  });
if (memberForm)
  memberForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const data = new FormData(memberForm);
    createMember(data);
  });
if (newsForm)
  newsForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const data = new FormData(newsForm);
    createNews(data);
  });
if (eventForm)
  eventForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const data = new FormData(eventForm);
    createEvent(data);
  });
if (departmentForm)
  departmentForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const data = new FormData(departmentForm);
    createDepartment(data);
  });
if (showcaseForm)
  showcaseForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const data = new FormData(showcaseForm);
    changeShowcase(data);
  });
if (logoutBtn)
  logoutBtn.addEventListener('click', (e) => {
    e.preventDefault();

    logout();
  });

if (deleteBtns)
  for (let i = 0; i < deleteBtns.length; i++) {
    deleteBtns[i].addEventListener('click', function (e) {
      e.preventDefault();
      let id;
      // alert(location.href);
      // alert(location.href.indexOf('Sermon'));
      for (let j = 0; j < deleteId.length; j++) {
        id = deleteId[i].value;
      }
      if (location.href.indexOf('Sermon') != -1) deleteSermon(id);
      if (location.href.indexOf('News') != -1) deleteNews(id);
      if (location.href.indexOf('Member') != -1) deleteMember(id);
      if (location.href.indexOf('Event') != -1) deleteEvent(id);
      if (location.href.indexOf('Department') != -1) deleteDepartment(id);
    });
  }

if (paymentForm)
  paymentForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const data = new FormData(paymentForm);
    pay(data);
  });

// header
const toggleBtn = document.querySelector('.toggle-btn');
const closeBtn = document.querySelector('.close-btn');
const sidebarWrapper = document.querySelector('.header__sidebar-wrapper');
const sidebar = document.querySelector(
  '.header__sidebar-wrapper--sidebar__links'
);
const sidebarHeader = document.getElementsByClassName('sidebar-header');
const sidebarSublinks = document.getElementsByClassName('sidebar-sublinks');
const linkBtns = [...document.querySelectorAll('.header__nav--links__item')];
const submenu = document.querySelector('.header__submenu');
const showcase = document.querySelector('.showcase');
const nav = document.querySelector('.header__nav');

// hide/show sidebar
if (toggleBtn)
  toggleBtn.addEventListener('click', () => {
    sidebarWrapper.classList.add('show');
  });
if (closeBtn)
  closeBtn.addEventListener('click', () => {
    sidebarWrapper.classList.remove('show');
  });

// set sidebar
if (sidebar)
  sidebar.innerHTML = sublinks
    .map((item) => {
      const { links, page } = item;
      if (links.length === 0) {
        let linkUrl = page === 'home' ? '/' : `/${page}`;

        return `<a href="${linkUrl}">
      ${page}</a>`;
      }

      // trying something new
      return `<details>
      <summary class="sidebar-header">${page}</summary>
      <div class="sidebar-sublinks">
  ${links
    .map((link) => {
      return `<a href="${link.url}">
      ${link.label}</a>`;
    })
    .join('')}

  </div>
    </details>`;
    })
    .join('');
if (linkBtns)
  linkBtns.forEach((btn) => {
    btn.addEventListener('mouseover', function (e) {
      const text = e.currentTarget.textContent;
      const tempBtn = e.currentTarget.getBoundingClientRect();
      const center = tempBtn.left + tempBtn.width / 2;
      const bottom = tempBtn.bottom - 3;

      const tempPage = sublinks.find(({ page }) => page === text);
      if (tempPage) {
        const { page, links } = tempPage;
        if (links.length === 0) {
          return;
        }
        submenu.classList.add('show');
        submenu.style.left = `${center}px`;
        submenu.style.top = ` ${bottom}px`;

        // OPTIONAL
        let columns = 'col-2';
        if (links.length === 3) {
          columns = 'col-3';
        }
        if (links.length > 3) {
          columns = 'col-4';
        }
        submenu.innerHTML = `
      <section>
<h4>${page}</h4>
<div class="submenu-center ${columns}">
${links
  .map((link) => {
    return `
    <a href="${link.url}">
    ${link.label}</a>
    `;
  })
  .join('')}
</div>

      </section>`;
      }
    });
  });

if (sidebarHeader)
  [...sidebarHeader].forEach((sublink, i) => {
    sublink.addEventListener('click', function () {
      sidebarSublinks[i].classList.toggle('showsublinks');
    });
  });

if (showcase)
  showcase.addEventListener('mouseover', function (e) {
    submenu.classList.remove('show');
  });
if (nav)
  nav.addEventListener('mouseover', function (e) {
    if (!e.target.classList.contains('header__nav--links__item')) {
      submenu.classList.remove('show');
    }
  });
