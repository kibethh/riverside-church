const showcaseForm = document.forms.showcase;
showcaseForm.addEventListener('submit', (e) => {
  e.preventDefault();
  changeShowcase();
});
const changeShowcase = async () => {
  const url = '/api/v1/showcase';

  try {
    const resp = await fetch(url, {
      method: 'POST',
      body: new FormData(showcaseForm),
    });
    const mes = await resp.json();
    console.log(mes);
    // console.log(resp);
  } catch (err) {
    console.log(err);
  }
};
const galleryForm = document.forms.gallery;
galleryForm.addEventListener('submit', (e) => {
  e.preventDefault();
  galleryUpload();
});
const galleryUpload = async () => {
  const url = '/api/v1/gallery';

  try {
    const resp = await fetch(url, {
      method: 'POST',
      body: new FormData(galleryForm),
    });
    const mes = await resp.json();
    console.log(mes);
    // console.log(resp);
  } catch (err) {
    console.log(err);
  }
};

const sermonForm = document.forms.sermon;
sermonForm.addEventListener('submit', (e) => {
  e.preventDefault();
  createSermon();
});
const createSermon = async () => {
  const url = '/api/v1/sermons';
  const data = new FormData(sermonForm);

  // console.log(JSON.stringify(Object.fromEntries(data)));

  try {
    const resp = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(Object.fromEntries(data)),
    });
    const mes = await resp.json();
    console.log(mes);
    // console.log(resp);
  } catch (err) {
    console.log(err);
  }
};

const memberForm = document.forms.member;
memberForm.addEventListener('submit', (e) => {
  e.preventDefault();
  createMember();
});
const createMember = async () => {
  const url = '/api/v1/members';

  try {
    const resp = await fetch(url, {
      method: 'POST',
      body: new FormData(memberForm),
    });
    const mes = await resp.json();
    console.log(mes);
    // console.log(resp);
  } catch (err) {
    console.log(err);
  }
};

const newsForm = document.forms.news;
newsForm.addEventListener('submit', (e) => {
  e.preventDefault();
  createNews();
});
const createNews = async () => {
  const url = '/api/v1/news';
  const data = new FormData(newsForm);
  try {
    const resp = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(Object.fromEntries(data)),
    });
    const mes = await resp.json();
    console.log(mes);
    // console.log(resp);
  } catch (err) {
    console.log(err);
  }
};

const eventForm = document.forms.event;
eventForm.addEventListener('submit', (e) => {
  e.preventDefault();
  createEvent();
});
const createEvent = async () => {
  const url = '/api/v1/events';
  const data = new FormData(eventForm);
  try {
    const resp = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(Object.fromEntries(data)),
    });
    const mes = await resp.json();
    console.log(mes);
    // console.log(resp);
  } catch (err) {
    console.log(err);
  }
};
