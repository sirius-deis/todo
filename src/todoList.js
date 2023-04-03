import { updateTodo, deleteTodo } from "./storage";
import tooltip from "./tooltip";

class Todo {
    #id;
    #text;
    #time;
    #done;
    #date;
    constructor(uuid, text, time, done, date) {
        this.#id = uuid;
        this.#text = text;
        this.#time = time;
        this.#done = done;
        this.#date = date;
    }

    set text(data) {
        this.#text = data;
    }
    set done(data) {
        this.#done = data;
    }

    get id() {
        return this.#id;
    }

    get text() {
        return this.#text;
    }
    get time() {
        return this.#time;
    }
    get done() {
        return this.#done;
    }
    get date() {
        return this.#date;
    }
}

class TodoList {
    #todoListEl;
    #todoTemplate;
    #todoArr;
    #displayedTodoArr;
    #now = new Date();
    #display;
    constructor() {
        this.#todoArr = [];
        this.#todoListEl = document.querySelector(".todo__list");
        this.#todoTemplate = this.#todoListEl.querySelector(".todo__template");
        this.#display = { filter: "all", sort: "title", order: "asc" };

        this.#todoListEl.addEventListener("click", this.#onClick);
        this.#todoListEl.addEventListener("dblclick", this.#onDoubleClickAnEntry);
        this.#todoListEl.addEventListener("mouseover", this.#onMouseEnterInfoSign);
    }

    #onClick = (e) => {
        const target = e.target;
        if (target.matches(".todo__check")) {
            this.#onCheckMarkClick(target);
        }
        if (target.matches(".todo__pencil")) {
            const el = target.closest(".todo__item").querySelector(".todo__text");
            this.#onEntryEdit(el);
        }
        if (target.matches(".todo__trash")) {
            this.#onTrashClicked(target);
        }
    };

    #onCheckMarkClick = (e) => {
        const checkMark = e;
        const textEl = e.parentElement.nextElementSibling;
        if (checkMark.checked) {
            textEl.classList.add("todo__text--done");
        } else {
            textEl.classList.remove("todo__text--done");
        }
        const todo = this.#getData(e);
        todo.done = checkMark.checked;
        updateTodo(todo.date, { id: todo.id, text: todo.text, time: todo.time, done: todo.done });
        this.#changeTodoListDisplay();
    };

    #onDoubleClickAnEntry = (e) => {
        this.#onEntryEdit(e.target);
    };

    #onEntryEdit(e) {
        e.readOnly = false;
        e.removeEventListener("blur", this.#removeEditionFromInput);
        e.addEventListener("blur", this.#removeEditionFromInput);
        e.removeEventListener("keypress", this.#removeEditionFromInputOnKeyPress);
        e.addEventListener("keypress", this.#removeEditionFromInputOnKeyPress);
    }

    #onTrashClicked(e) {
        const todo = this.#getData(e);
        deleteTodo(todo.date, todo.time, todo.id);
        const indexOfElementToDelete = this.#todoArr.indexOf(todo);
        this.#todoArr.splice(indexOfElementToDelete, 1);
        e.closest(".todo__item").remove();
    }
    #onMouseEnterInfoSign = (e) => {
        if (e.target.matches(".todo__sign")) {
            tooltip.text = "Expiration time";
        } else if (e.target.matches(".todo__pencil")) {
            tooltip.text = "Edit entry";
        } else if (e.target.matches(".todo__trash")) {
            tooltip.text = "Delete entry";
        } else {
            return;
        }
        tooltip.show(e.target);
        e.target.addEventListener("mouseleave", this.#onMouseLeaveInfoSign);
    };
    #onMouseLeaveInfoSign = (e) => {
        tooltip.hide();
    };

    #removeEditionFromInput = ({ target }) => {
        if (target.readOnly) return;
        target.readOnly = true;
        this.#updateInputTextField(target);
    };

    #removeEditionFromInputOnKeyPress = (e) => {
        e.stopPropagation();
        if (e.code === "Enter") {
            e.target.readOnly = true;
            this.#updateInputTextField(e.target);
        }
    };

    #updateInputTextField(target) {
        const todo = this.#getData(target);
        todo.text = target.value;
        updateTodo(todo.date, { id: todo.id, text: todo.text, time: todo.time, done: todo.done });
    }

    #getData = (el) => {
        const id = el.closest(".todo__item").dataset.id;
        const todo = this.#todoArr.find((entity) => entity.id === id);
        return todo;
    };

    #createTodo(date, { id, text, time, done }) {
        const todo = new Todo(id, text, time, done, date);
        this.#todoArr.push(todo);
    }

    #cleanTodoListElement() {
        this.#todoListEl.innerHTML = "";
    }

    #formTodoEl(id, done, text, time, date) {
        const todoClone = this.#todoTemplate.content.cloneNode(true);
        todoClone.firstElementChild.dataset.id = id;
        const textEl = todoClone.querySelector(".todo__text");
        textEl.value = text;
        if (done) {
            textEl.classList.add("todo__text--done");
        }
        todoClone.querySelector(".todo__check").checked = done;
        todoClone.querySelector(".todo__time-expiration").textContent = time;
        todoClone.querySelector(".todo__time").textContent = time;
        const dateSplitted = date.split("-");
        dateSplitted[1] = dateSplitted[1] - 1;
        const timeSplitted = time.split(":");
        if (new Date(...dateSplitted, ...timeSplitted) <= Date.parse(this.#now) + 1000 * 60 * 60 * 4) {
            todoClone.querySelector(".todo__expiration").classList.remove("hidden");
        }
        this.#todoListEl.append(todoClone);
    }

    //#TODO: adding to storage with id
    addAllTodoToList = (date, list = {}) => {
        if (this.#todoArr[0]?.date !== date) {
            this.#todoArr = [];
        }

        const formattedArray = this.formatToArrayLike(list);
        formattedArray.forEach((todo) => {
            this.#createTodo(date, todo);
        });

        this.#changeTodoListDisplay();
    };

    #changeTodoListDisplay() {
        this.#cleanTodoListElement();
        if (this.#display.filter === "completed") {
            this.#displayedTodoArr = this.filterCompleted(this.#todoArr);
        } else if (this.#display.filter === "active") {
            this.#displayedTodoArr = this.filterActive(this.#todoArr);
        } else {
            this.#displayedTodoArr = [...this.#todoArr];
        }

        if (this.#display.sort === "title") {
            this.#displayedTodoArr = this.sortByTitle(this.#displayedTodoArr);
        } else {
            this.#displayedTodoArr = this.sortByTime(this.#displayedTodoArr);
        }
        if (this.#display.order === "desc") {
            this.#displayedTodoArr = this.reverse(this.#displayedTodoArr);
        }
        for (let i = 0; i < this.#displayedTodoArr.length; i++) {
            const { id, done, text, time, date } = this.#displayedTodoArr[i];

            this.#formTodoEl(id, done, text, time, date);
        }
    }

    setDisplay(option) {
        this.#display = { ...this.#display, ...option };
        this.#changeTodoListDisplay();
    }

    formatToArrayLike = (list) => {
        const arr = [];
        for (let [key, values] of Object.entries(list)) {
            for (let value of values) {
                arr.push({ id: value.id, text: value.text, time: key, done: value.done });
            }
        }
        return arr;
    };

    filterCompleted = (list) => {
        return list.filter((todo) => todo.done);
    };

    filterActive = (list) => {
        return list.filter((todo) => !todo.done);
    };

    sortByTime = (list) => {
        return list.sort((todo1, todo2) => {
            const t1splitted = todo1.time.split(":");
            const t2splitted = todo2.time.split(":");
            if (+t1splitted[0] > +t2splitted[0]) {
                return 1;
            } else if (+t2splitted[0] > +t1splitted[0]) {
                return -1;
            } else if (+t1splitted[1] > +t2splitted[1]) {
                return 1;
            } else {
                return -1;
            }
        });
    };

    sortByTitle = (list) => {
        return list.sort((todo1, todo2) => {
            if (todo1.text < todo2.text) {
                return -1;
            }
            if (todo1.text > todo2.text) {
                return 1;
            }
            return 0;
        });
    };

    reverse = (list) => {
        return list.reverse();
    };
}

const todoList = new TodoList();
export default todoList;
