/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./public/js/alerts.js":
/*!*****************************!*\
  !*** ./public/js/alerts.js ***!
  \*****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"showAlert\": () => (/* binding */ showAlert)\n/* harmony export */ });\nconst hideAlert = () => {\r\n  const el = document.querySelector('.alert');\r\n  if (el) el.parentElement.removeChild(el);\r\n};\r\n\r\n//type is \"success\" or \"error\"\r\nconst showAlert = (type, msg) => {\r\n  hideAlert();\r\n  const markup = `<div class=\"alert alert--${type}\">${msg}</div> `;\r\n  document.querySelector('body').insertAdjacentHTML('afterbegin', markup);\r\n  window.setTimeout(hideAlert, 5000);\r\n};\r\n\n\n//# sourceURL=webpack://riverside-agc/./public/js/alerts.js?");

/***/ }),

/***/ "./public/js/event.js":
/*!****************************!*\
  !*** ./public/js/event.js ***!
  \****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"createEvent\": () => (/* binding */ createEvent)\n/* harmony export */ });\n/* harmony import */ var _alerts__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./alerts */ \"./public/js/alerts.js\");\n\r\nconst createEvent = async (data) => {\r\n  const url = '/api/v1/events';\r\n  try {\r\n    const resp = await fetch(url, {\r\n      method: 'POST',\r\n      headers: {\r\n        'Content-Type': 'application/json',\r\n      },\r\n      body: JSON.stringify(Object.fromEntries(data)),\r\n    });\r\n    if (resp.status === 201) {\r\n      const jsonResp = await resp.json();\r\n      console.log(jsonResp.status);\r\n      (0,_alerts__WEBPACK_IMPORTED_MODULE_0__.showAlert)('success', 'Event Added');\r\n      window.setTimeout(() => {\r\n        history.go();\r\n      }, 1500);\r\n      return;\r\n    }\r\n    const jsonResp = await resp.json();\r\n    (0,_alerts__WEBPACK_IMPORTED_MODULE_0__.showAlert)('error', jsonResp.message);\r\n  } catch (err) {\r\n    (0,_alerts__WEBPACK_IMPORTED_MODULE_0__.showAlert)('error', \"Can't add Event,try later!!\");\r\n  }\r\n};\r\n\n\n//# sourceURL=webpack://riverside-agc/./public/js/event.js?");

/***/ }),

/***/ "./public/js/galleryUpload.js":
/*!************************************!*\
  !*** ./public/js/galleryUpload.js ***!
  \************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"galleryUpload\": () => (/* binding */ galleryUpload)\n/* harmony export */ });\n/* harmony import */ var _alerts__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./alerts */ \"./public/js/alerts.js\");\n\r\nconst galleryUpload = async (data) => {\r\n  const url = '/api/v1/gallery';\r\n\r\n  try {\r\n    const resp = await fetch(url, {\r\n      method: 'POST',\r\n      body: data,\r\n    });\r\n    if (resp.status === 201) {\r\n      const jsonResp = await resp.json();\r\n      console.log(jsonResp.status);\r\n      (0,_alerts__WEBPACK_IMPORTED_MODULE_0__.showAlert)('success', 'Uploaded successfully');\r\n      window.setTimeout(() => {\r\n        history.go();\r\n      }, 1500);\r\n      return;\r\n    }\r\n\r\n    const jsonResp = await resp.json();\r\n    (0,_alerts__WEBPACK_IMPORTED_MODULE_0__.showAlert)('error', jsonResp.message);\r\n  } catch (err) {\r\n    (0,_alerts__WEBPACK_IMPORTED_MODULE_0__.showAlert)('error', \"Can't upload, try again later!!\");\r\n  }\r\n};\r\n\n\n//# sourceURL=webpack://riverside-agc/./public/js/galleryUpload.js?");

/***/ }),

/***/ "./public/js/index.js":
/*!****************************!*\
  !*** ./public/js/index.js ***!
  \****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _alerts__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./alerts */ \"./public/js/alerts.js\");\n/* harmony import */ var _scroll__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./scroll */ \"./public/js/scroll.js\");\n/* harmony import */ var _login__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./login */ \"./public/js/login.js\");\n/* harmony import */ var _logout__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./logout */ \"./public/js/logout.js\");\n/* harmony import */ var _sermon__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./sermon */ \"./public/js/sermon.js\");\n/* harmony import */ var _galleryUpload__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./galleryUpload */ \"./public/js/galleryUpload.js\");\n/* harmony import */ var _member__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./member */ \"./public/js/member.js\");\n/* harmony import */ var _news__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./news */ \"./public/js/news.js\");\n/* harmony import */ var _event__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./event */ \"./public/js/event.js\");\n/* harmony import */ var _showCase__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./showCase */ \"./public/js/showCase.js\");\n// import \"@babel/polyfill\"\r\n\r\n\r\n\r\n\r\n\r\n\r\n\r\n\r\n\r\n\r\n\r\n// forms\r\nconst loginForm = document.forms.login;\r\nconst sermonForm = document.forms.sermon;\r\nconst galleryForm = document.forms.gallery;\r\nconst memberForm = document.forms.member;\r\nconst newsForm = document.forms.news;\r\nconst eventForm = document.forms.event;\r\nconst showcaseForm = document.forms.showcase;\r\n// admin logout\r\nconst logoutBtn = document.querySelector('.logout');\r\n\r\n// Nav bar Variables\r\nconst header = document.querySelector('.header');\r\nconst menu = document.querySelector('.header__menu');\r\nconst overlay = document.querySelector('.header__overlay');\r\n// scroll\r\nconst scroll = document.querySelector('.scroll');\r\n\r\n// filter variables\r\nconst search = document.querySelector('.sermons__search--btn');\r\nconst btns = document.querySelectorAll('.sermons__search--filter-box__btn');\r\n// paginate variables\r\nlet pageBtns = Array.from(\r\n  document.querySelectorAll('.page-btns-container__item')\r\n);\r\nlet prevBtn = document.querySelector('.page-btns-container__prev');\r\nlet nextBtn = document.querySelector('.page-btns-container__next');\r\n// Slider Variables\r\nconst slideContent = document.querySelectorAll(\r\n  '.slider__img-container--list__item'\r\n);\r\nconst next = document.querySelector('.slider__btn--right');\r\nconst prev = document.querySelector('.slider__btn--left');\r\nlet slideInterval;\r\nlet interval = 5000;\r\n\r\n// testimonials/member variables\r\nconst slides = document.querySelectorAll(\r\n  '.testimonials__content--slider__slide'\r\n);\r\nconst indicatorImgs = document.querySelectorAll(\r\n  '.testimonials__content--indicator__img'\r\n);\r\nif (menu)\r\n  menu.addEventListener('click', () => {\r\n    menu.classList.toggle('open');\r\n    header.classList.toggle('open');\r\n    overlay.classList.toggle('open');\r\n  });\r\n// scroll\r\nif (scroll)\r\n  scroll.addEventListener('click', () => {\r\n    (0,_scroll__WEBPACK_IMPORTED_MODULE_1__.scrollToTop)();\r\n  });\r\n\r\nwindow.addEventListener('scroll', () => {\r\n  if (scroll) scroll.classList.toggle('active', window.scrollY > 200);\r\n});\r\n\r\n// filter;\r\nfor (let i = 0; i < btns.length; i++) {\r\n  btns[i].addEventListener('click', function (e) {\r\n    e.preventDefault();\r\n    const filter = e.target.dataset.filter;\r\n    console.log(location.search);\r\n    let params = new URLSearchParams(location.search);\r\n    params.set('month', filter);\r\n\r\n    location.search = '?' + params.toString();\r\n  });\r\n}\r\nif (search)\r\n  search.addEventListener('click', async function (e) {\r\n    e.preventDefault();\r\n    const speaker = document.querySelector('#search_sermon').value;\r\n    if (!speaker) return;\r\n    let params = new URLSearchParams(location.search);\r\n    params.set('speaker', speaker);\r\n    location.search = '?' + params.toString();\r\n  });\r\n\r\n// Paginate\r\nfor (let i = 0; i < pageBtns.length; i++) {\r\n  if (pageBtns)\r\n    pageBtns[i].addEventListener('click', function (e) {\r\n      e.preventDefault();\r\n      let page = e.target.dataset.page;\r\n      console.log(location.search);\r\n      console.log(page);\r\n      let params = new URLSearchParams(location.search);\r\n      params.set('page', page);\r\n\r\n      location.search = '?' + params.toString();\r\n    });\r\n}\r\n\r\nif (pageBtns.length > 4) {\r\n  prevBtn.style.display = 'inline-block';\r\n  nextBtn.style.display = 'inline-block';\r\n\r\n  let delBtnsEnd = pageBtns.splice(5);\r\n  let delBtnsBeg = [];\r\n\r\n  for (let btn of delBtnsEnd) {\r\n    btn.style.display = 'none';\r\n  }\r\n\r\n  // Next Button\r\n  if (nextBtn)\r\n    nextBtn.addEventListener('click', (e) => {\r\n      e.preventDefault();\r\n\r\n      if (pageBtns.length > 3 && delBtnsEnd.length > 0) {\r\n        let firstBtns = pageBtns.shift();\r\n        firstBtns.style.display = 'none';\r\n        delBtnsBeg.push(firstBtns);\r\n        let AddedBtns = delBtnsEnd.shift();\r\n        AddedBtns.style.display = 'inline-block';\r\n        pageBtns.push(AddedBtns);\r\n      } else {\r\n        (0,_alerts__WEBPACK_IMPORTED_MODULE_0__.showAlert)('info', 'No more Pages!!');\r\n      }\r\n    });\r\n\r\n  //   Previous Button\r\n  if (prevBtn)\r\n    prevBtn.addEventListener('click', (e) => {\r\n      e.preventDefault();\r\n\r\n      if (delBtnsBeg.length > 0) {\r\n        let reAddBtns = delBtnsBeg.pop();\r\n        reAddBtns.style.display = 'inline-block';\r\n        pageBtns.unshift(reAddBtns);\r\n        let delBtn = pageBtns.pop();\r\n        delBtn.style.display = 'none';\r\n        delBtnsEnd.unshift(delBtn);\r\n      } else {\r\n        (0,_alerts__WEBPACK_IMPORTED_MODULE_0__.showAlert)('info', 'No more Pages!!');\r\n      }\r\n    });\r\n}\r\n\r\n// slider\r\n// Next Button\r\nconst nextSlide = () => {\r\n  const current = document.querySelector('.current--img');\r\n  if (!current) return;\r\n  current.classList.remove('current--img');\r\n  if (current.nextElementSibling) {\r\n    current.nextElementSibling.classList.add('current--img');\r\n  } else {\r\n    slideContent[0].classList.add('current--img');\r\n  }\r\n  current.classList.remove('current--img');\r\n};\r\n\r\n// Prev Button\r\nconst prevSlide = () => {\r\n  const current = document.querySelector('.current--img');\r\n  if (!current) return;\r\n  current.classList.remove('current--img');\r\n  if (current.previousElementSibling) {\r\n    current.previousElementSibling.classList.add('current--img');\r\n  } else {\r\n    slideContent[slideContent.length - 1].classList.add('current--img');\r\n  }\r\n  current.classList.remove('current--img');\r\n};\r\n\r\n// Add event listeners\r\nif (next)\r\n  next.addEventListener('click', () => {\r\n    nextSlide();\r\n    if (true) {\r\n      clearInterval(slideInterval);\r\n      auto();\r\n    }\r\n  });\r\nif (prev)\r\n  prev.addEventListener('click', () => {\r\n    prevSlide();\r\n    if (true) {\r\n      clearInterval(slideInterval);\r\n      auto();\r\n    }\r\n  });\r\n\r\n// Auto scroll\r\nfunction auto() {\r\n  slideInterval = setInterval(nextSlide, interval);\r\n}\r\nauto();\r\n// testimonials/member\r\nfor (let i = 0; i < indicatorImgs.length; i++) {\r\n  indicatorImgs[i].addEventListener('click', function () {\r\n    // console.log(this.getAttribute(\"data-id\"));\r\n\r\n    //   Getting the slide images\r\n    for (let j = 0; j < indicatorImgs.length; j++) {\r\n      indicatorImgs[j].classList.remove('active');\r\n    }\r\n    this.classList.add('active');\r\n\r\n    //   Getting the next slide\r\n    const id = this.getAttribute('data-id');\r\n    for (let k = 0; k < slides.length; k++) {\r\n      slides[k].classList.remove('active');\r\n    }\r\n    slides[id].classList.add('active');\r\n  });\r\n}\r\n// Login\r\nif (loginForm)\r\n  loginForm.addEventListener('submit', async function (e) {\r\n    e.preventDefault();\r\n    const data = new FormData(loginForm);\r\n    (0,_login__WEBPACK_IMPORTED_MODULE_2__.login)(data);\r\n  });\r\n// Create Sermon\r\nif (sermonForm)\r\n  sermonForm.addEventListener('submit', (e) => {\r\n    e.preventDefault();\r\n    const data = new FormData(sermonForm);\r\n    (0,_sermon__WEBPACK_IMPORTED_MODULE_4__.createSermon)(data);\r\n  });\r\nif (galleryForm)\r\n  galleryForm.addEventListener('submit', (e) => {\r\n    e.preventDefault();\r\n    const data = new FormData(galleryForm);\r\n    (0,_galleryUpload__WEBPACK_IMPORTED_MODULE_5__.galleryUpload)(data);\r\n  });\r\nif (memberForm)\r\n  memberForm.addEventListener('submit', (e) => {\r\n    e.preventDefault();\r\n    const data = new FormData(memberForm);\r\n    (0,_member__WEBPACK_IMPORTED_MODULE_6__.createMember)(data);\r\n  });\r\nif (newsForm)\r\n  newsForm.addEventListener('submit', (e) => {\r\n    e.preventDefault();\r\n    const data = new FormData(newsForm);\r\n    (0,_news__WEBPACK_IMPORTED_MODULE_7__.createNews)(data);\r\n  });\r\nif (eventForm)\r\n  eventForm.addEventListener('submit', (e) => {\r\n    e.preventDefault();\r\n    const data = new FormData(eventForm);\r\n    (0,_event__WEBPACK_IMPORTED_MODULE_8__.createEvent)(data);\r\n  });\r\nif (showcaseForm)\r\n  showcaseForm.addEventListener('submit', (e) => {\r\n    e.preventDefault();\r\n    const data = new FormData(showcaseForm);\r\n    (0,_showCase__WEBPACK_IMPORTED_MODULE_9__.changeShowcase)(data);\r\n  });\r\nif (logoutBtn)\r\n  logoutBtn.addEventListener('click', (e) => {\r\n    e.preventDefault();\r\n\r\n    (0,_logout__WEBPACK_IMPORTED_MODULE_3__.logout)();\r\n  });\r\n\n\n//# sourceURL=webpack://riverside-agc/./public/js/index.js?");

/***/ }),

/***/ "./public/js/login.js":
/*!****************************!*\
  !*** ./public/js/login.js ***!
  \****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"login\": () => (/* binding */ login)\n/* harmony export */ });\n/* harmony import */ var _alerts__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./alerts */ \"./public/js/alerts.js\");\n\nconst login = async (data) => {\n  try {\n    const response = await fetch('/api/v1/login', {\n      method: 'POST',\n      headers: {\n        'Content-Type': 'application/json',\n      },\n      body: JSON.stringify(Object.fromEntries(data)),\n    });\n\n    if (response.status === 200) {\n      const jsonResp = await response.json();\n      console.log(jsonResp.status);\n      (0,_alerts__WEBPACK_IMPORTED_MODULE_0__.showAlert)('success', 'Login success');\n      window.setTimeout(() => {\n        location.assign('/admin');\n      }, 1500);\n      return;\n    }\n\n    const jsonResp = await response.json();\n    (0,_alerts__WEBPACK_IMPORTED_MODULE_0__.showAlert)('error', jsonResp.message);\n  } catch (err) {\n    (0,_alerts__WEBPACK_IMPORTED_MODULE_0__.showAlert)('error', \"Can't Login\");\n  }\n};\n\n\n//# sourceURL=webpack://riverside-agc/./public/js/login.js?");

/***/ }),

/***/ "./public/js/logout.js":
/*!*****************************!*\
  !*** ./public/js/logout.js ***!
  \*****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"logout\": () => (/* binding */ logout)\n/* harmony export */ });\n/* harmony import */ var _alerts__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./alerts */ \"./public/js/alerts.js\");\n\r\n\r\nconst logout = async (data) => {\r\n  try {\r\n    const response = await fetch('/api/v1/logout', {\r\n      method: 'GET',\r\n    });\r\n\r\n    const jsonResp = await response.json();\r\n    if (jsonResp.status === 'success') {\r\n      (0,_alerts__WEBPACK_IMPORTED_MODULE_0__.showAlert)('success', 'Logout  success');\r\n      window.setTimeout(() => {\r\n        history.go();\r\n      }, 1500);\r\n      return;\r\n    }\r\n    // throw new Error();\r\n  } catch (err) {\r\n    (0,_alerts__WEBPACK_IMPORTED_MODULE_0__.showAlert)('error', 'Error Logging out!! Try again');\r\n  }\r\n};\r\n\n\n//# sourceURL=webpack://riverside-agc/./public/js/logout.js?");

/***/ }),

/***/ "./public/js/member.js":
/*!*****************************!*\
  !*** ./public/js/member.js ***!
  \*****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"createMember\": () => (/* binding */ createMember)\n/* harmony export */ });\n/* harmony import */ var _alerts__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./alerts */ \"./public/js/alerts.js\");\n\r\nconst createMember = async (data) => {\r\n  const url = '/api/v1/members';\r\n\r\n  try {\r\n    const resp = await fetch(url, {\r\n      method: 'POST',\r\n      body: data,\r\n    });\r\n\r\n    if (resp.status === 201) {\r\n      const jsonResp = await resp.json();\r\n      console.log(jsonResp.status);\r\n      (0,_alerts__WEBPACK_IMPORTED_MODULE_0__.showAlert)('success', 'Member successfully added');\r\n      window.setTimeout(() => {\r\n        history.go();\r\n      }, 1500);\r\n      return;\r\n    }\r\n    const jsonResp = await resp.json();\r\n    (0,_alerts__WEBPACK_IMPORTED_MODULE_0__.showAlert)('error', jsonResp.message);\r\n  } catch (err) {\r\n    (0,_alerts__WEBPACK_IMPORTED_MODULE_0__.showAlert)('error', \"Can't Add Member, try again later!!\");\r\n  }\r\n};\r\n\n\n//# sourceURL=webpack://riverside-agc/./public/js/member.js?");

/***/ }),

/***/ "./public/js/news.js":
/*!***************************!*\
  !*** ./public/js/news.js ***!
  \***************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"createNews\": () => (/* binding */ createNews)\n/* harmony export */ });\n/* harmony import */ var _alerts__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./alerts */ \"./public/js/alerts.js\");\n\r\n\r\nconst createNews = async (data) => {\r\n  const url = '/api/v1/news';\r\n  try {\r\n    const resp = await fetch(url, {\r\n      method: 'POST',\r\n      headers: {\r\n        'Content-Type': 'application/json',\r\n      },\r\n      body: JSON.stringify(Object.fromEntries(data)),\r\n    });\r\n    if (resp.status === 201) {\r\n      const jsonResp = await resp.json();\r\n      console.log(jsonResp.status);\r\n      (0,_alerts__WEBPACK_IMPORTED_MODULE_0__.showAlert)('success', 'News Added');\r\n      window.setTimeout(() => {\r\n        history.go();\r\n      }, 1500);\r\n      return;\r\n    }\r\n    const jsonResp = await resp.json();\r\n    (0,_alerts__WEBPACK_IMPORTED_MODULE_0__.showAlert)('error', jsonResp.message);\r\n  } catch (err) {\r\n    (0,_alerts__WEBPACK_IMPORTED_MODULE_0__.showAlert)('error', \"Can't add news,try later!!\");\r\n  }\r\n};\r\n\n\n//# sourceURL=webpack://riverside-agc/./public/js/news.js?");

/***/ }),

/***/ "./public/js/scroll.js":
/*!*****************************!*\
  !*** ./public/js/scroll.js ***!
  \*****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"scrollToTop\": () => (/* binding */ scrollToTop)\n/* harmony export */ });\nfunction scrollToTop() {\r\n  window.scrollTo({\r\n    top: 0,\r\n    behavior: 'smooth',\r\n  });\r\n}\r\n\n\n//# sourceURL=webpack://riverside-agc/./public/js/scroll.js?");

/***/ }),

/***/ "./public/js/sermon.js":
/*!*****************************!*\
  !*** ./public/js/sermon.js ***!
  \*****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"createSermon\": () => (/* binding */ createSermon)\n/* harmony export */ });\n/* harmony import */ var _alerts__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./alerts */ \"./public/js/alerts.js\");\n\r\nconst createSermon = async (data) => {\r\n  const url = '/api/v1/sermons';\r\n\r\n  try {\r\n    const resp = await fetch(url, {\r\n      method: 'POST',\r\n      headers: {\r\n        'Content-Type': 'application/json',\r\n      },\r\n      body: JSON.stringify(Object.fromEntries(data)),\r\n    });\r\n\r\n    if (resp.status === 201) {\r\n      const jsonResp = await resp.json();\r\n      console.log(jsonResp.status);\r\n      (0,_alerts__WEBPACK_IMPORTED_MODULE_0__.showAlert)('success', 'Sermon Created');\r\n      window.setTimeout(() => {\r\n        history.go();\r\n      }, 1500);\r\n      return;\r\n    }\r\n    const jsonResp = await resp.json();\r\n    (0,_alerts__WEBPACK_IMPORTED_MODULE_0__.showAlert)('error', jsonResp.message);\r\n  } catch (err) {\r\n    (0,_alerts__WEBPACK_IMPORTED_MODULE_0__.showAlert)('error', \"Can't create a sermon,try later!!\");\r\n  }\r\n};\r\n\n\n//# sourceURL=webpack://riverside-agc/./public/js/sermon.js?");

/***/ }),

/***/ "./public/js/showCase.js":
/*!*******************************!*\
  !*** ./public/js/showCase.js ***!
  \*******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"changeShowcase\": () => (/* binding */ changeShowcase)\n/* harmony export */ });\n/* harmony import */ var _alerts__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./alerts */ \"./public/js/alerts.js\");\n\r\nconst changeShowcase = async (data) => {\r\n  const url = '/api/v1/showcase';\r\n\r\n  try {\r\n    const resp = await fetch(url, {\r\n      method: 'POST',\r\n      body: data,\r\n    });\r\n    if (resp.status === 201) {\r\n      (0,_alerts__WEBPACK_IMPORTED_MODULE_0__.showAlert)('success', 'Changed Successfully');\r\n      window.setTimeout(() => {\r\n        history.go();\r\n      }, 1500);\r\n      return;\r\n    }\r\n    const jsonResp = await resp.json();\r\n    (0,_alerts__WEBPACK_IMPORTED_MODULE_0__.showAlert)('error', jsonResp.message);\r\n  } catch (err) {\r\n    (0,_alerts__WEBPACK_IMPORTED_MODULE_0__.showAlert)('error', \"Can't change showcase,try later!!\");\r\n  }\r\n};\r\n\n\n//# sourceURL=webpack://riverside-agc/./public/js/showCase.js?");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module can't be inlined because the eval devtool is used.
/******/ 	var __webpack_exports__ = __webpack_require__("./public/js/index.js");
/******/ 	
/******/ })()
;