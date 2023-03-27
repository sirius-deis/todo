const calendarBtnEl = document.querySelector(".calendar__button");
const chosenDate = new Date();
/* prettier-ignore */
const months = ["January", "February","March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

function changeBtnName(date) {
  calendarBtnEl.textContent = `${date.getDate()} ${
    months[date.getMonth()]
  } ${date.getFullYear()}`;
}

changeBtnName(chosenDate);
