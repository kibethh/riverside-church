const btns = document.querySelectorAll('.sermons__search--filter-box__btn');
for (let i = 0; i < btns.length; i++) {
  btns[i].addEventListener('click', function (e) {
    e.preventDefault();
    const filter = e.target.dataset.filter;
    console.log(location.search);
    let params = new URLSearchParams(location.search);
    params.set('month', filter);

    location.search = '?' + params.toString();
  });
}

const search = document.querySelector('.sermons__search--btn');
search.addEventListener('click', async function (e) {
  e.preventDefault();
  const speaker = document.querySelector('#search_sermon').value;
  if (!speaker) return;
  let params = new URLSearchParams(location.search);
  params.set('speaker', speaker);
  location.search = '?' + params.toString();
});
