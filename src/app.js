import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import './app.css';
import moment from 'moment';
import { createPopper } from '@popperjs/core';

const timeElement = document.querySelector('.time');
const dateElement = document.querySelector('.date');

const displayTime = () => {
    moment.locale('id');
    const stringTime = moment().format('LTS');
    const stringDate = moment().format('LL');

    timeElement.innerText = stringTime;
    dateElement.innerText = stringDate;
};

const updateTime = () => {
    displayTime();
    setTimeout(updateTime, 1000);
};

updateTime();

const popcorn = document.querySelector('#popcorn');
const tooltip = document.querySelector('#tooltip');
createPopper(popcorn, tooltip);
