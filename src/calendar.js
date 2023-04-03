import { getAmountOfTasksInMonth } from "./storage";
import { formateDate } from "./utils";

class Calendar {
    #pickerEl;
    #pickerYearEl;
    #pickerMonthEl;
    #pickerDateEls;
    #pickerYearArrow;
    #pickerMonthArrow;
    #picker__amount;

    /* prettier-ignore */
    MONTHS = ["January", "February","March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

    #today;
    #chosenDay;
    #chosenMonthAndYear;

    constructor(today) {
        this.#today = Object.freeze(today);
        this.#pickerEl = document.querySelector(".picker");
        this.#pickerYearEl = this.#pickerEl.querySelector(".picker__year .picker__value");
        this.#pickerMonthEl = this.#pickerEl.querySelector(".picker__month .picker__value");
        this.#pickerDateEls = this.#pickerEl.querySelectorAll(".picker__dates .picker__date");
        this.#pickerYearArrow = this.#pickerEl.querySelectorAll(".picker__year .picker__arrow");
        this.#pickerMonthArrow = this.#pickerEl.querySelectorAll(".picker__month .picker__arrow");

        document.addEventListener("click", (e) => {
            if (!this.#pickerEl.classList.contains("hidden") && !e.target.closest(".picker")) {
                this.#hidePicker();
            }
        });

        this.#pickerYearArrow.forEach((arrow) => {
            arrow.addEventListener("click", this.#onYearArrowClick);
        });

        this.#pickerMonthArrow.forEach((arrow) => {
            arrow.addEventListener("click", this.#onMonthArrowClick);
        });
    }

    showPicker = () => {
        this.#formCalendar(this.#chosenDay ?? this.#today);
        this.#pickerEl.classList.remove("hidden");
    };

    #hidePicker = () => {
        this.#pickerEl.classList.add("hidden");
    };

    #EARLIEST_POSSIBLE_YEAR = 1970;
    #LEFT_DIRECTION = -1;
    #RIGHT_DIRECTION = 1;
    #onYearArrowClick = (e) => {
        if (this.#chosenMonthAndYear.getFullYear() === this.#EARLIEST_POSSIBLE_YEAR) return;
        const directionOfMovement = e.target.matches(".picker__arrow-left")
            ? this.#LEFT_DIRECTION
            : this.#RIGHT_DIRECTION;
        this.#chosenMonthAndYear.setFullYear(this.#chosenMonthAndYear.getFullYear() + directionOfMovement);
        this.#formCalendar(this.#chosenMonthAndYear);
    };

    #onMonthArrowClick = (e) => {
        const directionOfMovement = e.target.matches(".picker__arrow-left")
            ? this.#LEFT_DIRECTION
            : this.#RIGHT_DIRECTION;
        this.#chosenMonthAndYear.setMonth(this.#chosenMonthAndYear.getMonth() + directionOfMovement);

        console.log(this.#chosenMonthAndYear.getFullYear(), this.#chosenMonthAndYear.getMonth());
        this.#formCalendar(this.#chosenMonthAndYear);
    };

    onDateChoose = (e) => {
        if (!e.target.closest(".picker__date")) return;
        if (e.target.closest(".picker__date")) {
            let year, month;
            const target = e.target.closest(".picker__date");
            const monthNumber = this.MONTHS.indexOf(this.#pickerMonthEl.textContent);
            const yearNumber = +this.#pickerYearEl.textContent;
            console.log(yearNumber, monthNumber);
            if (target.matches(".picker__date--prev")) {
                [year, month] = this.defineMonthAndYear(this.#LEFT_DIRECTION, monthNumber, yearNumber);
                //console.log(year, month);
            }
            if (target.matches(".picker__date--next")) {
                [year, month] = this.defineMonthAndYear(this.#RIGHT_DIRECTION, monthNumber, yearNumber);
                //console.log(year, month);
            }

            const date = +e.target.firstChild.data;
            this.#chosenDay = new Date(year ?? yearNumber, month ?? monthNumber, date);
            this.#chosenMonthAndYear = new Date(this.#chosenDay);
            this.#hidePicker();
            return this.#chosenDay;
        }
    };

    #formCalendar = (date) => {
        const amountOfTasks = getAmountOfTasksInMonth(formateDate(date));
        if (!this.#chosenMonthAndYear) {
            this.#chosenMonthAndYear = new Date(date);
        }
        this.#pickerYearEl.textContent = date.getFullYear();
        this.#pickerMonthEl.textContent = this.MONTHS[date.getMonth()];
        this.#formDates(date, amountOfTasks);
    };

    #resetDateClassesOnElements = () => {
        for (let i = 0; i < this.#pickerDateEls.length; i++) {
            this.#pickerDateEls[i].classList.remove(
                "picker__date--prev",
                "picker__date--next",
                "picker__date--today",
                "picker__date--chosen"
            );
        }
    };

    #formDates = (date, amountOfTasks) => {
        this.#resetDateClassesOnElements();
        const firstDayOfMonth = new Date(date.getFullYear(), date.getMonth(), 1).getDay();
        const amountOfDays = this.getAmountOfDays(date);
        const lastDayOfPrevMonth = this.getLastDayOfPrevMonth(date);
        const listOfDates = this.formDateList(firstDayOfMonth, amountOfDays, lastDayOfPrevMonth);
        for (let i = 0; i < this.#pickerDateEls.length; i++) {
            const currentDate = this.#pickerDateEls[i].closest(".picker__date");
            currentDate.textContent = listOfDates[i].data;
            if (!listOfDates[i].info && listOfDates[i].data.toString() in amountOfTasks) {
                this.#addAmountOfTasks(currentDate, amountOfTasks[listOfDates[i].data]);
            }
            this.#markIfItIsToday(
                this.#pickerDateEls[i],
                date.getFullYear(),
                date.getMonth(),
                listOfDates[i].data,
                !listOfDates[i].info
            );
            this.#markIfItIsChosen(
                this.#pickerDateEls[i],
                date.getFullYear(),
                date.getMonth(),
                listOfDates[i].data,
                !listOfDates[i].info
            );
            this.#markIfItIsNotThisMonth(this.#pickerDateEls[i], listOfDates[i].info);
        }
    };

    #addAmountOfTasks(el, amount) {
        const pickerAmount = document.createElement("span");
        pickerAmount.className = "picker__amount";
        pickerAmount.textContent = amount;
        el.append(pickerAmount);
    }

    #markIfItIsToday(el, year, month, day, isThisMonth) {
        if (
            year === this.#today.getFullYear() &&
            month === this.#today.getMonth() &&
            day === this.#today.getDate() &&
            isThisMonth
        ) {
            el.classList.add(`picker__date--today`);
        }
    }

    #markIfItIsChosen(el, year, month, day, isThisMonth) {
        if (
            year === this.#chosenDay?.getFullYear() &&
            month === this.#chosenDay?.getMonth() &&
            day === this.#chosenDay?.getDate() &&
            isThisMonth
        ) {
            el.classList.add(`picker__date--chosen`);
        }
    }

    #markIfItIsNotThisMonth(el, info) {
        el.classList.add(`picker__date--${info}`);
    }

    getAmountOfDays = (date) => {
        return new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
    };

    getLastDayOfPrevMonth = (date) => {
        return new Date(date.getFullYear(), date.getMonth(), 0).getDate();
    };

    defineMonthAndYear = (directionOfMovement, month, year) => {
        if (month === 0) {
            return directionOfMovement === this.#LEFT_DIRECTION
                ? [year - 1, this.MONTHS.length - 1]
                : [year, month + 1];
        }
        if (month === this.MONTHS.length - 1) {
            return directionOfMovement === this.#LEFT_DIRECTION ? [year, month - 1] : [year + 1, 0];
        }
        return [year, month + directionOfMovement];
    };

    formDateList = (firstDayOfMonth, amountOfDays, lastDayOfPrevMonth) => {
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
    };

    get date() {
        return this.#chosenDay ?? this.#today;
    }
}

const calendar = new Calendar(new Date());

export default calendar;
