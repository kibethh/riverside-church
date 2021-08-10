import { showAlert } from './alerts';
export const createMember = async (data) => {
  const url = '/api/v1/members';

  try {
    const resp = await fetch(url, {
      method: 'POST',
      body: data,
    });

    if (resp.status === 201) {
      const jsonResp = await resp.json();
      console.log(jsonResp.status);
      showAlert('success', 'Member successfully added');
      window.setTimeout(() => {
        history.go();
      }, 1500);
      return;
    }
    const jsonResp = await resp.json();
    showAlert('error', jsonResp.message);
  } catch (err) {
    showAlert('error', "Can't Add Member, try again later!!");
  }
};
