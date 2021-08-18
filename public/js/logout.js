import { showAlert } from './alerts';

export const logout = async () => {
  try {
    const response = await fetch('/api/v1/logout', {
      method: 'GET',
    });

    const jsonResp = await response.json();
    if (jsonResp.status === 'success') {
      showAlert('success', 'Logout  success');
      window.setTimeout(() => {
        // history.go();
        location.assign('/login');
      }, 1500);
      return;
    }
    // throw new Error();
  } catch (err) {
    showAlert('error', 'Error Logging out!! Try again');
  }
};
