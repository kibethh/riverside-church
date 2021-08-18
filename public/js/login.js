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
      showAlert('success', 'Login success');
      location.assign('/admin');
      return;
    }

    const jsonResp = await response.json();
    showAlert('error', jsonResp.message);
  } catch (err) {
    showAlert('error', "Can't Login");
  }
};
