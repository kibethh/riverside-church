import { showAlert } from './alerts';
export const login = async (data) => {
  try {
    const response = await fetch('/api/v1/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(Object.fromEntries(data)),
    });

    if (response.status === 200) {
      const jsonResp = await response.json();
      console.log(jsonResp.status);
      showAlert('success', 'Login success');
      window.setTimeout(() => {
        location.assign('/admin');
      }, 1500);
      return;
    }

    const jsonResp = await response.json();
    showAlert('error', jsonResp.message);
  } catch (err) {
    showAlert('error', "Can't Login");
  }
};
