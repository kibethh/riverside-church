/* global fetch */
const login = async (email, password) => {
  try {
    const response = await fetch('/api/v1/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, password }),
    });

    if (response.status === 200) {
      const jsonResp = await response.json();
      console.log(jsonResp.status);
      alert('Logged in successfully!!');
      window.setTimeout(() => {
        location.assign('/');
      }, 1500);
    }
    console.log(jsonResp.status);
    alert('Logged in successfully!!');

    // console.log(await response.json());

    // if (user.status === 'success') {
    //   // showAlert('Success', 'Logged in successfully!!');
    //   alert('Logged in successfully!!');
    //   window.setTimeout(() => {
    //     location.assign('/');
    //   }, 1500);
    // }
  } catch (err) {
    // showAlert('Error', err.response.data.message);
    console.log(err);
  }
};

const logout = async () => {
  try {
    const res = await fetch({
      method: 'GET',
      url: '/api/v1/logout',
    });
    if (res.data.status === 'success') history.go();
  } catch (err) {
    showAlert('Error', 'Error Logging out!! Try again');
  }
};

const hideAlert = () => {
  const el = document.querySelector('.alert');
  if (el) el.parentElement.removeChild(el);
};

//type is "success" or "error"
const showAlert = (type, msg) => {
  hideAlert();
  const markup = `<div class="alert alert--${type}">${msg}</div> `;
  document.querySelector('body').insertAdjacentHTML('afterbegin', markup);
  window.setTimeout(hideAlert, 5000);
};

const loginForm = document.querySelector('.login-form');
if (loginForm)
  loginForm.addEventListener('submit', async function (e) {
    e.preventDefault();
    const email = document.querySelector('.email').value;
    const password = document.querySelector('.password').value;
    login(email, password);
  });

const logoutBtn = document.querySelector('.logout');
if (logoutBtn) logoutBtn.addEventListener('click', logout);
