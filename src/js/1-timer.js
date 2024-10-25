import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

const refs = {
  input: document.querySelector('#datetime-picker'),
  startBtn: document.querySelector('[data-start]'),
  days: document.querySelector('[data-days]'),
  hours: document.querySelector('[data-hours]'),
  minutes: document.querySelector('[data-minutes]'),
  seconds: document.querySelector('[data-seconds]'),
};

refs.startBtn.disabled = true;

let userSelectedDate = null;

flatpickr('#datetime-picker', {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    if (selectedDates[0] <= Date.now()) {
      iziToast.error({
        title: 'Error',
        message: 'Please choose a date in the future',
        position: 'topRight',
      });
      return;
    }
    userSelectedDate = selectedDates[0];
    refs.startBtn.disabled = false;
  },
});

refs.startBtn.addEventListener('click', handlerTimer);

function handlerTimer() {
  refs.startBtn.disabled = true;
  refs.input.disabled = true;
  if (userSelectedDate <= Date.now()) {
    return;
  }

  const id = setInterval(() => {
    const timeDifference = userSelectedDate - Date.now();
    const ObjectTime = convertMs(timeDifference);

    if (timeDifference <= 0) {
      stopTimer(id);
      return;
    }

    repaintTimerField(ObjectTime);
  }, 1000);
}

function stopTimer(id) {
  clearInterval(id);
  repaintTimerField({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  refs.input.disabled = false;
}

function convertMs(ms) {
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  const days = Math.floor(ms / day);
  const hours = Math.floor((ms % day) / hour);
  const minutes = Math.floor(((ms % day) % hour) / minute);
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return { days, hours, minutes, seconds };
}

function repaintTimerField({ days, hours, minutes, seconds }) {
  refs.days.textContent = addLeadingZero(days);
  refs.hours.textContent = addLeadingZero(hours);
  refs.minutes.textContent = addLeadingZero(minutes);
  refs.seconds.textContent = addLeadingZero(seconds);
}

function addLeadingZero(value) {
  return String(value).padStart(2, 0);
}
