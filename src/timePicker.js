class TimePicker {
    #timePicker;
    #hoursContainer;
    #minutesContainer;
    constructor() {
        this.#timePicker = document.querySelector(".time-picker");
        this.#hoursContainer = this.#timePicker.querySelector(".time-picker__hours");
        this.#minutesContainer = this.#timePicker.querySelector(".time-picker__minutes");
    }

    createTimePicker = () => {};
}
