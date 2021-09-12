import { showAlert } from './alerts';

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
      const button = document.querySelector('button');
      const detailsInput = document.querySelector('.register');
      button.textContent = 'Processing...';
      setTimeout(() => {
        button.remove();
      }, 500);
      const markup = `<section class="tithes">
      <div class="tithes__content">
        <h2 class="tithes__content--title">Thank You!! May God Bless, You will be prompted to enter your M-PESA PIN,If Not prompted,refresh and try again!!</h2>
        <div class="tithes__content--para">
          <ul class="tithes__content--para__list">
            <li class="tithes__content--para__list--item">Giving obeys God’s command</li>
            <li class="tithes__content--para__list--item">
              Giving submits to God’s Lordship
            </li>
            <li class="tithes__content--para__list--item">Giving exhibits God’s heart</li>
            <li class="tithes__content--para__list--item">Giving illustrates God’s salvation</li>
            <li class="tithes__content--para__list--item">Giving trusts God’s provision</li>
          </ul>
          <ul class="tithes__content--para__list">
            <li class="tithes__content--para__list--item">Giving widens God’s smile</li>
            <li class="tithes__content--para__list--item">Giving advances God’s kingdom</li>
            <li class="tithes__content--para__list--item">Giving promotes God’s sanctification</li>
            <li class="tithes__content--para__list--item">Giving testifies to God’s power</li>
            <li class="tithes__content--para__list--item">Giving praises God’s character</li>
          </ul>
        </div>
      </div>
    </section>`;
    setTimeout(() => {
      detailsInput.remove();
      document.querySelector('header').insertAdjacentHTML("afterend",markup) ;
    }, 5000);
      
      const status = await resp.json();
      const msg = status.data.CustomerMessage.split('.')[1];
      showAlert('success', msg);
      setTimeout(() => {
        location.assign('/');
      }, 10000);
      return;
    }
    const stat= await resp.json();
    showAlert('error', stat.message);
  } catch (err) {
    showAlert('error', 'Please try again later!!');
  }
};
