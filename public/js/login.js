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
    const jsonResp = await response.json();

    if (jsonResp.status === 'success') {
      showAlert('success', 'Login success');
      setTimeout(() => {
        location.href = '/admin';
      }, 1500);
      return;
    }

    showAlert('error', jsonResp.message);
  } catch (err) {
    showAlert('error', "Can't Login");
  }
};
