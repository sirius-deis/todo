class Calendar {
    #pickerEl;
    #pickerYearEl;
    #pickerMonthEl;
    #pickerDateEls;
    #pickerYearArrow;
    #pickerMonthArrow;

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

    #onYearArrowClick = (e) => {
        if (this.#chosenMonthAndYear.getFullYear() === 1970) return;
        const dir = e.target.matches(".picker__arrow-left") ? -1 : 1;
        this.#chosenMonthAndYear.setFullYear(this.#chosenMonthAndYear.getFullYear() + dir);
        this.#formCalendar(this.#chosenMonthAndYear);
    };

    #onMonthArrowClick = (e) => {
        const dir = e.target.matches(".picker__arrow-left") ? -1 : 1;
        this.#chosenMonthAndYear.setMonth(this.#chosenMonthAndYear.getMonth() + dir);
        this.#formCalendar(this.#chosenMonthAndYear);
    };

    onDateChoose = (e) => {
        if (!e.target.closest(".picker__date")) return;
        if (e.target.closest(".picker__date")) {
            let year, month;
            const target = e.target.closest(".picker__date");
            const monthNumber = this.MONTHS.indexOf(this.#pickerMonthEl.textContent);
            const yearNumber = +this.#pickerYearEl.textContent;
            if (target.matches(".picker__date--prev")) {
                [year, month] = this.defineMonthAndYear(-1, monthNumber, yearNumber);
            }
            if (target.matches(".picker__date--next")) {
                [year, month] = this.defineMonthAndYear(1, monthNumber, yearNumber);
            }
            const date = +e.target.textContent;
            this.#chosenDay = new Date(year ?? yearNumber, month ?? monthNumber, date);
            this.#hidePicker();
            return this.#chosenDay;
        }
    };

    #formCalendar = (date) => {
        if (!this.#chosenMonthAndYear) {
            this.#chosenMonthAndYear = new Date(date);
        }
        this.#pickerYearEl.textContent = date.getFullYear();
        this.#pickerMonthEl.textContent = this.MONTHS[date.getMonth()];
        this.#formDates(date);
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

    #formDates = (date) => {
        this.#resetDateClassesOnElements();
        const firstDayOfMonth = new Date(date.getFullYear(), date.getMonth(), 1).getDay();
        const amountOfDays = this.getAmountOfDays(date);
        const lastDayOfPrevMonth = this.getLastDayOfPrevMonth(date);
        const listOfDates = this.formDateList(firstDayOfMonth, amountOfDays, lastDayOfPrevMonth);
        for (let i = 0; i < this.#pickerDateEls.length; i++) {
            this.#pickerDateEls[i].closest(".picker__date").textContent = listOfDates[i].data;
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

    defineMonthAndYear = (dir, month, year) => {
        if (month === 0) {
            return dir === -1 ? [year - 1, this.MONTHS.length - 1] : [year, month + 1];
        }
        if (month === this.MONTHS.length - 1) {
            return dir === -1 ? [year, month - 1] : [year + 1, 0];
        }
        return [year, month + dir];
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

export { calendar };
