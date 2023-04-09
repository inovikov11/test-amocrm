//Находим нужные элементы на странице
const timer = document.querySelector('#timer');
const inputSeconds = document.querySelector('#seconds');
const inputMinutes = document.querySelector('#minutes');
const inputHours = document.querySelector('#hours');
const play = document.querySelector('#play');
const stop = document.querySelector('#stop');
const reset = document.querySelector('#reset');

//Задаем глобальные переменные
let seconds;
let minutes;
let hours;

let outputHours;
let outputMinutes;
let outputSeconds;

//Задаем общее время и счётчик 
let time = 0;
let countdown;

//Статус таймера
let isTimerPlaying = false;

//Создаем функцию расчёта времени в секундах, введенного пользователем
function calcTime() {
  seconds = parseInt(inputSeconds.value);
  minutes = parseInt(inputMinutes.value);
  hours = parseInt(inputHours.value);
  time = seconds + (minutes * 60) + (hours * 3600);
}

//Создаем функцию вывода времени в нужном формате
function outputTime() {
  outputSeconds = Math.trunc(time % 60);
  outputMinutes = Math.trunc(time / 60 % 60);
  outputHours = Math.trunc(time / 60 / 60 % 60);

  if (outputSeconds < 10) {
    outputSeconds = `0${outputSeconds}`;
  }
  if (outputMinutes < 10) {
    outputMinutes = `0${outputMinutes}`;
  }
  if (outputHours < 10) {
    outputHours = `0${outputHours}`;
  }

  timer.textContent = `${outputHours}:${outputMinutes}:${outputSeconds}`;
}

//Создаем функцию работы таймера
function live() {
  if(time > 0) {
    time -= 1;
    outputTime();
  } else {
    play.textContent = 'Запустить';
    clearInterval(countdown);
    isTimerPlaying = false;
    console.log('Время вышло!');
  }
}

//Создаем обработчик клика по кнопке запустить
play.addEventListener('click', () => {
  //Проверяем, не запущен ли таймер
  if (!isTimerPlaying) {

    //Если время равно нулю, рассчитываем и выводим время пользователя, нужно для возможности продолжить после паузы
    if (time === 0) {
      calcTime();
      outputTime();
    }

    //Запускаем таймер, если время больше нуля
    if (time > 0) {
      countdown = setInterval(() => {
        live();
      }, 1000);
      isTimerPlaying = true;
    } else {
      console.log('Время не задано!');
    }
  } else {
    console.log('Таймер уже запущен!');
  } 
});

//Создаем обработчик клика по кнопке остановить
stop.addEventListener('click', function () {
  if (isTimerPlaying) {
    clearInterval(countdown);
    isTimerPlaying = false;
    play.textContent = 'Продолжить';
  }
});

//Создаем обработчик клика по кнопке сбросить
reset.addEventListener('click', () => {
  time = 0;
  clearInterval(countdown);
  isTimerPlaying = false;
  play.textContent = 'Запустить';
  outputTime();
});