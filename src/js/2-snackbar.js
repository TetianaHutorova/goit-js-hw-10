import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

const form = document.querySelector('.form');

form.addEventListener('submit', handlerCreatePromises);

function handlerCreatePromises(evt) {
  evt.preventDefault();
  const { delay, state } = evt.target.elements;
  const isFulfilled = state.value === 'fulfilled';

  const result = createPromises(Number(delay.value), isFulfilled);
    handlerPromise(result);
    
    evt.currentTarget.reset();
}

function createPromises(delay, value) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (value) {
        resolve(`✅ Fulfilled promise in ${delay}ms`);
      } else {
        reject(`❌ Rejected promise in ${delay}ms`);
      }
    }, delay);
  });
}

function handlerPromise(promise) {
  promise
    .then(message =>
      iziToast.success({
        message,
        position: 'topRight',
      })
    )
    .catch(message =>
      iziToast.error({
        message,
        position: 'topRight',
      })
    );
}
