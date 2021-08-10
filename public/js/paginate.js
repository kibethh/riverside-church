let pageBtns = Array.from(
  document.querySelectorAll('.page-btns-container__item')
);
let prevBtn = document.querySelector('.page-btns-container__prev');
let nextBtn = document.querySelector('.page-btns-container__next');

// console.log('sanity check');

for (let i = 0; i < pageBtns.length; i++) {
  pageBtns[i].addEventListener('click', function (e) {
    e.preventDefault();
    let page = e.target.dataset.page;
    console.log(location.search);
    console.log(page);
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
      console.log('No more Pages!!');
    }
  });

  //   Previous Button
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
      console.log('No more pages!!');
    }
  });
}
