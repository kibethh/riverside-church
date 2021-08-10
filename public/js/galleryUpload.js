import { showAlert } from './alerts';
export const galleryUpload = async (data) => {
  const url = '/api/v1/gallery';

  try {
    const resp = await fetch(url, {
      method: 'POST',
      body: data,
    });
    if (resp.status === 201) {
      const jsonResp = await resp.json();
      console.log(jsonResp.status);
      showAlert('success', 'Uploaded successfully');
      window.setTimeout(() => {
        history.go();
      }, 1500);
      return;
    }

    const jsonResp = await resp.json();
    showAlert('error', jsonResp.message);
  } catch (err) {
    showAlert('error', "Can't upload, try again later!!");
  }
};
