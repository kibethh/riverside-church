import { showAlert } from './alerts';
export const createSermon = async (data) => {
  const url = '/api/v1/sermons';

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
      showAlert('success', 'Sermon Created');
      window.setTimeout(() => {
        history.go();
      }, 1500);
      return;
    }
    const jsonResp = await resp.json();
    showAlert('error', jsonResp.message);
  } catch (err) {
    showAlert('error', "Can't create a sermon,try later!!");
  }
};
//
export const updateSermon = async (data, id) => {
  const url = '/api/v1/sermons/' + id;

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
      showAlert('success', 'Sermon Updated');
      window.setTimeout(() => {
        history.go();
      }, 1500);
      return;
    }
    const jsonResp = await resp.json();
    console.log(jsonResp);
    showAlert('error', jsonResp.message);
  } catch (err) {
    showAlert('error', "Can't update a sermon,try later!!");
  }
};

export const deleteSermon = async (id) => {
  const url = '/api/v1/sermons/' + id;
  try {
    const resp = await fetch(url, {
      method: 'DELETE',
    });

    if (resp.status === 200) {
      const jsonResp = await resp.json();
      console.log(jsonResp.status);
      showAlert('success', 'Sermon Deleted');
      window.setTimeout(() => {
        history.go();
      }, 1500);
      return;
    }
    const jsonResp = await resp.json();
    console.log(jsonResp);
    showAlert('error', jsonResp.message);
  } catch (err) {
    showAlert('error', "Can't Delete a sermon,try later!!");
  }
};
