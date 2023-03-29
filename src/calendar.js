const calendarBtnEl = document.querySelector(".calendar__button"),
  pickerEl = document.querySelector(".picker"),
  pickerYearEl = pickerEl.querySelector(".picker__year .picker__value"),
  pickerMonthEl = pickerEl.querySelector(".picker__month .picker__value"),
  pickerDateContainer = pickerEl.querySelector(".picker__dates"),
  pickerDateEls = pickerDateContainer.querySelectorAll(".picker__date"),
  pickerYearArrow = pickerEl.querySelectorAll(".picker__year .picker__arrow"),
  pickerMonthArrow = pickerEl.querySelectorAll(".picker__month .picker__arrow");

const today = new Date(),
  /* prettier-ignore */
  months = ["January", "February","March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
let chosenDay,
  chosenMonthAndYear = new Date();

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
    if (chosenMonthAndYear.getFullYear() === 1970) return;
    const dir = e.target.matches(".picker__arrow-left") ? -1 : 1;
    chosenMonthAndYear.setFullYear(chosenMonthAndYear.getFullYear() + dir);
    formCalendar(chosenMonthAndYear);
  });
});

pickerMonthArrow.forEach((arrow) => {
  arrow.addEventListener("click", (e) => {
    const dir = e.target.matches(".picker__arrow-left") ? -1 : 1;
    chosenMonthAndYear.setMonth(chosenMonthAndYear.getMonth() + dir);
    formCalendar(chosenMonthAndYear);
  });
});

document.addEventListener("click", (e) => {
  if (!pickerEl.classList.contains("hidden") && !e.target.closest(".picker")) {
    hidePicker();
  }
});

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
  const dateClone = new Date(date.getFullYear(), date.getMonth(), 1);
  const firstDayOfMonth = dateClone.getDay();
  const amountOfDays = getAmountOfDays(
    new Date(date.getFullYear(), date.getMonth(), 1)
  );
  const lastDayOfPrevMonth = getLastDayOfPrevMonth(dateClone);
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
      date.getFullYear() === chosenDay?.getFullYear() &&
      date.getMonth() === chosenDay?.getMonth() &&
      listOfDates[i].data === chosenDay?.getDate() &&
      !listOfDates[i].info
    ) {
      pickerDateEls[i].classList.add(`picker__date--chosen`);
    }
    if (listOfDates[i].info) {
      pickerDateEls[i].classList.add(`picker__date--${listOfDates[i].info}`);
    }
  }
}

function changeBtnName(date) {
  calendarBtnEl.textContent = `${date.getDate()} ${
    months[date.getMonth()]
  } ${date.getFullYear()}`;
}

function showPicker() {
  pickerEl.classList.remove("hidden");
}

function hidePicker() {
  pickerEl.classList.add("hidden");
}

export function getAmountOfDays(date) {
  const amountOfDays = new Date(date.setDate(date.getDate() - 1)).getDate();
  return amountOfDays;
}

export function getLastDayOfPrevMonth(date) {
  const lastDayOfPrevMonth = new Date(
    date.setDate(date.getDate() - 1)
  ).getDate();
  return lastDayOfPrevMonth;
}

export function defineMonthAndYear(dir, month, year, months) {
  if (month === 0) {
    return dir === -1 ? [year - 1, months.length - 1] : [year, month + 1];
  }
  if (month === months.length - 1) {
    return dir === -1 ? [year, month - 1] : [year + 1, 0];
  }
  return [year, month + dir];
}

export function formDateList(
  firstDayOfMonth,
  amountOfDays,
  lastDayOfPrevMonth
) {
  const listOfDates = [];
  for (let i = 0; i < 42; i++) {
    if (i < firstDayOfMonth) {
      listOfDates.push({
        data: lastDayOfPrevMonth - firstDayOfMonth + i + 1,
        info: "prev",
      });
    } else if (i < amountOfDays + firstDayOfMonth) {
      listOfDates.push({ data: i - firstDayOfMonth + 1 });
    } else {
      listOfDates.push({
        data: i - amountOfDays - firstDayOfMonth + 1,
        info: "next",
      });
    }
  }
  return listOfDates;
}

export function getDate() {
  return chosenDay ?? today;
}

changeBtnName(today);
