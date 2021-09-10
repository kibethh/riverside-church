export const pay = async (data) => {
  try {
    const resp = await fetch('/api/v1/payment/userdata', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(Object.fromEntries(data)),
    });
    if (resp.status === 200) {
      const status = await resp.json();
      const msg = status.data.CustomerMessage.split('.')[1];
      register.style.display = 'none';
      showAlert('success', msg);
      setTimeout(() => {
        location.assign('/');
      }, 10000);
    }
  } catch (err) {
    showAlert('error', 'Please try again later!!');
  }
};
