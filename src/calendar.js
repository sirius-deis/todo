const calendarBtnEl = document.querySelector(".calendar__button");
const pickerEl = document.querySelector(".picker");
const pickerYearEl = pickerEl.querySelector(".picker__year .picker__value");
const pickerMonthEl = pickerEl.querySelector(".picker__month .picker__value");
const pickerDateContainer = pickerEl.querySelector(".picker__dates");
const pickerDateEls = pickerDateContainer.querySelectorAll(
  ".picker__date .picker__date-container"
);
const today = new Date();
let chosenDay;
/* prettier-ignore */
const months = ["January", "February","March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

function showPicker() {
  pickerEl.classList.remove("hidden");
}

function hidePicker() {
  pickerEl.classList.add("hidden");
}

function formCalendar(date) {
  pickerYearEl.textContent = date.getFullYear();
  pickerMonthEl.textContent = months[date.getMonth()];
  formDates(date);
}

function resetDateEls() {
  for (let i = 0; i < pickerDateEls.length; i++) {
    pickerDateEls[i].classList.remove(
      "picker__date--prev",
      "picker__date--next"
    );
  }
}

function formDates(date) {
  const dateCloneForPrev = new Date(date.getFullYear(), date.getMonth(), 1);
  const dateCloneForCurr = new Date(date.getFullYear(), date.getMonth() + 1, 1);
  const firstDayOfMonth = dateCloneForPrev.getDay();
  const amountOfDays = new Date(
    dateCloneForCurr.setDate(dateCloneForCurr.getDate() - 1)
  ).getDate();
  const lastDayOfPrevMonth = new Date(
    dateCloneForPrev.setDate(dateCloneForPrev.getDate() - 1)
  ).getDate();
  for (let i = 0; i < firstDayOfMonth; i++) {
    pickerDateEls[i].textContent = lastDayOfPrevMonth - firstDayOfMonth + i + 1;
    pickerDateEls[i].classList.add("picker__date--prev");
  }
  for (let i = firstDayOfMonth; i < amountOfDays + firstDayOfMonth; i++) {
    pickerDateEls[i].textContent = i - firstDayOfMonth + 1;
  }
  for (let i = amountOfDays + firstDayOfMonth; i < 42; i++) {
    pickerDateEls[i].textContent = i - amountOfDays - firstDayOfMonth + 1;
    pickerDateEls[i].classList.add("picker__date--next");
  }
}

calendarBtnEl.addEventListener("click", (e) => {
  e.stopPropagation();
  showPicker();
  formCalendar(chosenDay ?? today);
});

pickerDateContainer.addEventListener("click", (e) => {
  if (e.target.closest(".picker__date")) {
    let year;
    let month;
    let date;
    if (e.target.matches(".picker__date--prev")) {
      [year, month] = defineMonthAndYear(
        -1,
        months.indexOf(pickerMonthEl.textContent),
        +pickerYearEl.textContent
      );
    } else if (e.target.matches(".picker__date--next")) {
      [year, month] = defineMonthAndYear(
        1,
        months.indexOf(pickerMonthEl.textContent),
        +pickerYearEl.textContent
      );
    } else {
      month = months.indexOf(pickerMonthEl.textContent);
      year = +pickerYearEl.textContent;
    }
    date = +e.target.textContent;
    chosenDay = new Date(year, month, date);
    changeBtnName(chosenDay);
    hidePicker();
  }
});

function defineMonthAndYear(dir, month, year) {
  if (month === 0) {
    return dir === -1 ? [year - 1, months.length - 1] : [year, month + 1];
  }
  if (month === months.length - 1) {
    return dir === -1 ? [year, month - 1] : [year + 1, 0];
  }
  return [year, month + dir];
}

document.addEventListener("click", (e) => {
  if (!pickerEl.classList.contains("hidden") && !e.target.closest(".picker")) {
    hidePicker();
  }
});

function changeBtnName(date) {
  calendarBtnEl.textContent = `${date.getDate()} ${
    months[date.getMonth()]
  } ${date.getFullYear()}`;
}

changeBtnName(today);
