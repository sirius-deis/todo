import { defineMonthAndYear, formDateList } from "./utils";

const calendarBtnEl = document.querySelector(".calendar__button");
const pickerEl = document.querySelector(".picker");
const pickerYearEl = pickerEl.querySelector(".picker__year .picker__value");
const pickerMonthEl = pickerEl.querySelector(".picker__month .picker__value");
const pickerDateContainer = pickerEl.querySelector(".picker__dates");
const pickerDateEls = pickerDateContainer.querySelectorAll(".picker__date");
const pickerYearArrow = pickerEl.querySelectorAll(
  ".picker__year .picker__arrow"
);
const pickerMonthArrow = pickerEl.querySelectorAll(
  ".picker__month .picker__arrow"
);
const today = new Date();
let chosenDay = today;
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
      "picker__date--next",
      "picker__date--today",
      "picker__date--chosen"
    );
  }
}

function formDates(date) {
  resetDateEls();
  const dateCloneForPrev = new Date(date.getFullYear(), date.getMonth(), 1);
  const dateCloneForCurr = new Date(date.getFullYear(), date.getMonth() + 1, 1);
  const firstDayOfMonth = dateCloneForPrev.getDay();
  const amountOfDays = new Date(
    dateCloneForCurr.setDate(dateCloneForCurr.getDate() - 1)
  ).getDate();
  const lastDayOfPrevMonth = new Date(
    dateCloneForPrev.setDate(dateCloneForPrev.getDate() - 1)
  ).getDate();

  const listOfDates = formDateList(
    firstDayOfMonth,
    amountOfDays,
    lastDayOfPrevMonth
  );
  for (let i = 0; i < pickerDateEls.length; i++) {
    pickerDateEls[i].closest(".picker__date").textContent = listOfDates[i].data;
    if (
      date.getFullYear() === today.getFullYear() &&
      date.getMonth() === today.getMonth() &&
      listOfDates[i].data === today.getDate() &&
      !listOfDates[i].info
    ) {
      pickerDateEls[i].classList.add(`picker__date--today`);
    }
    if (
      date.getFullYear() === chosenDay.getFullYear() &&
      date.getMonth() === chosenDay.getMonth() &&
      listOfDates[i].data === chosenDay.getDate() &&
      !listOfDates[i].info
    ) {
      pickerDateEls[i].classList.add(`picker__date--chosen`);
    }
    if (listOfDates[i].info) {
      pickerDateEls[i].classList.add(`picker__date--${listOfDates[i].info}`);
    }
  }
}

calendarBtnEl.addEventListener("click", (e) => {
  e.stopPropagation();
  showPicker();
  formCalendar(chosenDay);
});

pickerDateContainer.addEventListener("click", (e) => {
  if (e.target.closest(".picker__date")) {
    let year;
    let month;
    let date;
    const target = e.target.closest(".picker__date");
    if (target.matches(".picker__date--prev")) {
      [year, month] = defineMonthAndYear(
        -1,
        months.indexOf(pickerMonthEl.textContent),
        +pickerYearEl.textContent,
        months
      );
    } else if (target.matches(".picker__date--next")) {
      [year, month] = defineMonthAndYear(
        1,
        months.indexOf(pickerMonthEl.textContent),
        +pickerYearEl.textContent,
        months
      );
    } else {
      console.log("something wrong");
      month = months.indexOf(pickerMonthEl.textContent);
      year = +pickerYearEl.textContent;
    }
    date = +e.target.textContent;
    chosenDay = new Date(year, month, date);
    changeBtnName(chosenDay);
    hidePicker();
  }
});

pickerYearArrow.forEach((arrow) => {
  arrow.addEventListener("click", (e) => {
    if (chosenDay.getFullYear() === 1970) return;
    const dir = e.target.matches(".picker__arrow-left") ? -1 : 1;
    chosenDay.setFullYear(chosenDay.getFullYear() + dir);
    formCalendar(chosenDay);
  });
});

pickerMonthArrow.forEach((arrow) => {
  arrow.addEventListener("click", (e) => {
    if (e.target.matches("picker__arrow-left") && chosenDay.getMonth() <= 0) {
      return;
    }
    if (e.target.matches("picker__arrow-right") && chosenDay.getMonth() >= 11) {
      return;
    }
    const dir = e.target.matches(".picker__arrow-left") ? -1 : 1;
    chosenDay.setMonth(chosenDay.getMonth() + dir);
    formCalendar(chosenDay);
  });
});

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
