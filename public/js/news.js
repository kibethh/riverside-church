import { showAlert } from './alerts';

export const createNews = async (data) => {
  const url = '/api/v1/news';
  try {
    const resp = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(Object.fromEntries(data)),
    });
    if (resp.status === 201) {
      const jsonResp = await resp.json();
      console.log(jsonResp.status);
      showAlert('success', 'News Added');
      window.setTimeout(() => {
        history.go();
      }, 1500);
      return;
    }
    const jsonResp = await resp.json();
    showAlert('error', jsonResp.message);
  } catch (err) {
    showAlert('error', "Can't add news,try later!!");
  }
};
