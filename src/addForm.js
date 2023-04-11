import tooltip from "./tooltip";

class AddForm {
    #addFormEl;
    #addTxtEl;
    #addTimeEl;
    #addBtnEl;
    #addDrop;
    constructor() {
        this.#addFormEl = document.querySelector(".add");
        this.#addTxtEl = this.#addFormEl.querySelector(".add__input");
        this.#addTimeEl = this.#addFormEl.querySelector(".add__time");
        this.#addBtnEl = this.#addFormEl.querySelector(".add__btn");
        this.#addDrop = this.#addFormEl.querySelector(".add__drop");

        this.#addFormEl.querySelector(".add__label").addEventListener("click", (e) => {
            e.preventDefault();

            if ("showPicker" in HTMLInputElement.prototype) {
                e.target.firstElementChild.showPicker();
            }
        });

        [this.#addTxtEl, this.#addTimeEl].forEach((input) => {
            input.addEventListener("input", () => {
                this.#addBtnEl.disabled = this.checkInputValidity(this.#addTxtEl.value, this.#addTimeEl.value);
            });
        });

        ["drop", "dragleave"].forEach((event) => {
            this.#addFormEl.addEventListener(event, this.#unhighlight);
            this.#addFormEl.addEventListener(event, this.#preventDefault);
        });

        ["dragover", "dragenter"].forEach((event) => {
            this.#addFormEl.addEventListener(event, this.#highlight);
            this.#addFormEl.addEventListener(event, this.#preventDefault);
        });
    }

    onDropFile = (e, callback) => {
        const file = e.dataTransfer.files[0];
        if (file.type !== "text/plain") {
            tooltip.text = "Only text files allowed";
            tooltip.show(e.target);
            setTimeout(tooltip.hide, 3000);
        }
        const fileReader = new FileReader();
        fileReader.addEventListener(
            "load",
            () => {
                const result = fileReader.result;
                if (result.trim().length < 1) {
                    tooltip.text = "File can't be blank";
                    tooltip.show(e.target);
                    setTimeout(tooltip.hide, 3000);
                }
                const splittedArr = result.split("\n");
                callback(splittedArr.slice(0, splittedArr.length - 1));
            },
            false
        );
        fileReader.readAsText(file, "utf-8");
    };

    #highlight = () => {
        this.#addFormEl.classList.add("add--highlight");
        this.#addDrop.classList.remove("hidden");
    };

    #unhighlight = () => {
        this.#addFormEl.classList.remove("add--highlight");
        this.#addDrop.classList.add("hidden");
    };

    #preventDefault = (e) => {
        e.preventDefault();
    };

    submitForm = (e) => {
        const todoEntity = {
            text: this.#addTxtEl.value,
            time: this.#addTimeEl.value,
            done: false,
        };
        this.#addFormEl.reset();
        return todoEntity;
    };

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
