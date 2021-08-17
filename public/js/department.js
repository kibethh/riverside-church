import { showAlert } from './alerts';
export const createDepartment = async (data) => {
  const url = '/api/v1/departments';

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
      showAlert('success', 'Department Created');
      window.setTimeout(() => {
        history.go();
      }, 1500);
      return;
    }
    const jsonResp = await resp.json();
    showAlert('error', jsonResp.message);
  } catch (err) {
    showAlert('error', "Can't create a department,try later!!");
  }
};
//
export const updateDepartment = async (data, id) => {
  const url = '/api/v1/departments/' + id;

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
      showAlert('success', 'Department Updated');
      window.setTimeout(() => {
        history.go();
      }, 1500);
      return;
    }
    const jsonResp = await resp.json();
    console.log(jsonResp);
    showAlert('error', jsonResp.message);
  } catch (err) {
    showAlert('error', "Can't update department,try later!!");
  }
};

export const deleteDepartment = async (id) => {
  const url = '/api/v1/departments/' + id;
  try {
    const resp = await fetch(url, {
      method: 'DELETE',
    });

    if (resp.status === 200) {
      const jsonResp = await resp.json();
      console.log(jsonResp.status);
      showAlert('success', 'Department Deleted');
      window.setTimeout(() => {
        history.go();
      }, 1500);
      return;
    }
    const jsonResp = await resp.json();
    console.log(jsonResp);
    showAlert('error', jsonResp.message);
  } catch (err) {
    showAlert('error', "Can't Delete department,try later!!");
  }
};
