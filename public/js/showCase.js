import { showAlert } from './alerts';
export const changeShowcase = async (data) => {
  const url = '/api/v1/showcase';

  try {
    const resp = await fetch(url, {
      method: 'POST',
      body: data,
    });
    if (resp.status === 201) {
      showAlert('success', 'Changed Successfully');
      window.setTimeout(() => {
        history.go();
      }, 1500);
      return;
    }
    const jsonResp = await resp.json();
    showAlert('error', jsonResp.message);
  } catch (err) {
    showAlert('error', "Can't change showcase,try later!!");
  }
};
