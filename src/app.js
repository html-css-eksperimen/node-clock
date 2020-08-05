import moment from 'moment';

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
