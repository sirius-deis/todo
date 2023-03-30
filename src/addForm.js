class AddForm {
    #addFormEl;
    #addTxtEl;
    #addTimeEl;
    #addBtnEl;
    constructor() {
        this.#addFormEl = document.querySelector(".add");
        this.#addTxtEl = this.#addFormEl.querySelector(".add__input");
        this.#addTimeEl = this.#addFormEl.querySelector(".add__time");
        this.#addBtnEl = this.#addFormEl.querySelector(".add__btn");

        this.#addFormEl.querySelector(".add__label").addEventListener("click", (e) => {
            e.preventDefault();
            e.target.firstElementChild.showPicker();
        });

        // [this.#addTxtEl, this.#addTimeEl].forEach((input) => {
        //     input.addEventListener("input", () => {
        //         this.#addBtnEl.disabled = this.#checkInputValidity(addTxtEl.value, addTimeEl.value);
        //     });
        // });
    }

    submitForm = (e) => {
        const todoEntity = {
            text: this.#addTxtEl.value,
            time: this.#addTimeEl.value,
            done: false,
        };
        this.#addFormEl.reset();
        return todoEntity;
    };

    //20:00
    #REG = /^[0-9]{2}:[0-9]{2}$/;
    checkInputValidity = (text, time) => {
        if (!text.trim().length < 1 && this.#REG.test(time)) {
            return false;
        }
        return true;
    };

    get addFormEl() {
        return this.#addFormEl;
    }
}

const addForm = new AddForm();

export default addForm;
