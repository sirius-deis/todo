class TimePicker {
    #timePicker;
    #hoursContainer;
    #minutesContainer;
    #hourArr;
    #minuteArr;
    #chosenHours;
    #chosenMinutes;
    #currentHourContainerScroll;
    #currentMinuteContainerScroll;
    constructor() {
        this.#timePicker = document.querySelector(".time-picker");
        this.#hoursContainer = this.#timePicker.querySelector(".time-picker__hours");
        this.#minutesContainer = this.#timePicker.querySelector(".time-picker__minutes");
        this.#hourArr = [];
        this.#minuteArr = [];

        this.#hoursContainer.addEventListener("click", this.#onHourClickHandler);
        this.#hoursContainer.addEventListener("wheel", this.#onHourWheelHandler);
        this.#minutesContainer.addEventListener("click", this.#onMinuteClickHandler);
        this.#minutesContainer.addEventListener("wheel", this.#onMinuteWheelHandler);
        this.#createTimePicker();
    }
    #createTimePicker = () => {
        const date = new Date();
        this.#formHours(date.getHours());
        this.#formMinutes(date.getMinutes());
    };

    #formHours = (currentHour) => {
        for (let i = 1; i <= 24; i++) {
            const hourEl = document.createElement("div");
            hourEl.className = "time-picker__hour";
            hourEl.textContent = this.formTime(i);
            if (currentHour === i) {
                this.#makeActive(hourEl);
                this.#currentHourContainerScroll = i;
            }
            this.#hourArr.push(hourEl);
        }
        this.#hoursContainer.append(...this.#hourArr);
        this.#moveContainer(this.#hoursContainer, currentHour - 1, this.#hourArr[0].getBoundingClientRect().height);
    };

    #formMinutes = (currentMinute) => {
        for (let i = 1; i <= 60; i++) {
            const minuteEl = document.createElement("div");
            minuteEl.className = "time-picker__minute";
            minuteEl.textContent = this.formTime(i);
            if (currentMinute === i) {
                this.#makeActive(minuteEl);
                this.#currentMinuteContainerScroll = i;
            }
            this.#minuteArr.push(minuteEl);
        }
        this.#minutesContainer.append(...this.#minuteArr);
        this.#moveContainer(
            this.#minutesContainer,
            currentMinute - 1,
            this.#minuteArr[0].getBoundingClientRect().height
        );
    };

    #resetElements = (elArr) => {
        elArr.forEach((el) => {
            el.classList.remove("active");
        });
    };

    #onHourClickHandler = (e) => {
        this.#resetElements(this.#hourArr);
        const el = e.target;
        this.#chosenHours = el.textContent;
        this.#makeActive(el);
    };

    #onMinuteClickHandler = (e) => {
        this.#resetElements(this.#minuteArr);
        const el = e.target;
        this.#chosenMinutes = el.textContent;
        this.#makeActive(el);
    };

    #makeActive = (el) => {
        el.classList.add("active");
    };

    #onHourWheelHandler = (e) => {
        e.preventDefault();
        if (e.deltaY > 0) {
            if (this.#currentHourContainerScroll >= 24 - 7) {
                return;
            }
            this.#currentHourContainerScroll += 1;
        } else {
            if (this.#currentHourContainerScroll <= 0) {
                return;
            }
            this.#currentHourContainerScroll -= 1;
        }
        this.#moveContainer(
            this.#hoursContainer,
            this.#currentHourContainerScroll,
            this.#hourArr[0].getBoundingClientRect().height
        );
    };

    #onMinuteWheelHandler = (e) => {
        e.preventDefault();

        if (e.deltaY > 0) {
            if (this.#currentMinuteContainerScroll >= 60 - 7) {
                return;
            }
            this.#currentMinuteContainerScroll += 1;
        } else {
            if (this.#currentMinuteContainerScroll <= 0) {
                return;
            }
            this.#currentMinuteContainerScroll -= 1;
        }
        this.#moveContainer(
            this.#minutesContainer,
            this.#currentMinuteContainerScroll,
            this.#minuteArr[0].getBoundingClientRect().height
        );
    };

    #moveContainer = (container, currentScroll, step) => {
        container.style.transform = `translateY(${step * currentScroll * -1}px)`;
    };

    formTime = (number) => {
        return number < 10 ? `0${number}` : number;
    };

    get time() {
        return `${this.#chosenHours}:${this.#chosenMinutes}`;
    }

    get picker() {
        return this.#timePicker;
    }

    show = () => {
        this.#timePicker.classList.remove("hidden");
    };

    hide = () => {
        this.#timePicker.classList.add("hidden");
    };
}

const timePicker = new TimePicker();

export default timePicker;
