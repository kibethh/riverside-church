import sublinks from './data.js';

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
// Updating copyright year
// const copyrightYear = document.querySelector(".copyright-year");
// copyrightYear.innerHTML = new Date().getFullYear();

// hide/show sidebar
toggleBtn.addEventListener('click', () => {
  sidebarWrapper.classList.add('show');
});
closeBtn.addEventListener('click', () => {
  sidebarWrapper.classList.remove('show');
});

// set sidebar
sidebar.innerHTML = sublinks
  .map((item) => {
    const { links, page } = item;
    if (links.length === 0) {
      return `<a href="#">
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
// if (sidebarHeader)
// sidebarHeader[0].addEventListener("click", function (e) {
//   sidebarSublinks[0].classList.toggle("showsublinks");
// });

[...sidebarHeader].forEach((sublink, i) => {
  sublink.addEventListener('click', function () {
    sidebarSublinks[i].classList.toggle('showsublinks');
  });
});

// console.log(sidebarHeader[0]);

showcase.addEventListener('mouseover', function (e) {
  submenu.classList.remove('show');
});
nav.addEventListener('mouseover', function (e) {
  if (!e.target.classList.contains('header__nav--links__item')) {
    submenu.classList.remove('show');
  }
});
