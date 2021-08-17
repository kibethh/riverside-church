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

export const updateNews = async (data, id) => {
  const url = '/api/v1/news/' + id;

  try {
    const resp = await fetch(url, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(Object.fromEntries(data)),
    });

    if (resp.status === 200) {
      const jsonResp = await resp.json();
      console.log(jsonResp.status);
      showAlert('success', 'News Updated');
      window.setTimeout(() => {
        history.go();
      }, 1500);
      return;
    }
    const jsonResp = await resp.json();
    console.log(jsonResp);
    showAlert('error', jsonResp.message);
  } catch (err) {
    showAlert('error', "Can't update news,try later!!");
  }
};

export const deleteNews = async (id) => {
  const url = '/api/v1/news/' + id;
  try {
    const resp = await fetch(url, {
      method: 'DELETE',
    });

    if (resp.status === 200) {
      const jsonResp = await resp.json();
      console.log(jsonResp.status);
      showAlert('success', 'News Deleted');
      window.setTimeout(() => {
        history.go();
      }, 1500);
      return;
    }
    const jsonResp = await resp.json();
    console.log(jsonResp);
    showAlert('error', jsonResp.message);
  } catch (err) {
    showAlert('error', "Can't Delete News,try later!!");
  }
};
