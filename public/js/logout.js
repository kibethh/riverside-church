import { showAlert } from './alerts';

export const logout = async (data) => {
  try {
    const response = await fetch('/api/v1/logout', {
      method: 'GET',
    });

    const jsonResp = await response.json();
    if (jsonResp.status === 'success') {
      showAlert('success', 'Logout  success');
      window.setTimeout(() => {
        history.go();
      }, 1500);
      return;
    }
    // throw new Error();
  } catch (err) {
    showAlert('error', 'Error Logging out!! Try again');
  }
};
