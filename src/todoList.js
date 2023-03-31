import { updateTodo, deleteTodo } from "./storage";
import Tooltip from "./tooltip";

class Todo {
    #id;
    #text;
    #time;
    #done;
    #date;
    constructor(id, text, time, done, date) {
        this.#id = id;
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
    #tooltip;
    #display;
    constructor() {
        this.#todoArr = [];
        this.#todoListEl = document.querySelector(".todo__list");
        this.#todoTemplate = this.#todoListEl.querySelector(".todo__template");
        this.#tooltip = new Tooltip();
        this.#display = { filter: "all", sort: "title", order: "asc" };

        this.#todoListEl.addEventListener("click", this.#onClick);
        this.#todoListEl.addEventListener("dblclick", this.#onDoubleClickAnEntry);
        this.#todoListEl.addEventListener("mouseover", this.#onMouseEnterInfoSign);
    }

    #onClick = (e) => {
        const target = e.target;
        if (target.matches(".todo__checkmark")) {
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
        const checkMark = e.previousElementSibling;
        e.parentElement.nextElementSibling.classList.toggle("todo__text--done");
        const todo = this.#getData(e);
        todo.done = !checkMark.checked;
        updateTodo(todo.date, { text: todo.text, time: todo.time, done: todo.done });
    };

    #onDoubleClickAnEntry = (e) => {
        this.#onEntryEdit(e.target);
    };

    #onEntryEdit(e) {
        e.readOnly = false;
        e.removeEventListener("blur", this.#removeEditionFromInput);
        e.addEventListener("blur", this.#removeEditionFromInput);
    }

    #onTrashClicked(e) {
        const todo = this.#getData(e);
        deleteTodo(todo.date, todo.time);
        const indexOfElementToDelete = this.#todoArr.indexOf(todo);
        this.#todoArr.splice(indexOfElementToDelete, 1);
        e.closest(".todo__item").remove();
    }
    #onMouseEnterInfoSign = (e) => {
        if (e.target.matches(".todo__sign")) {
            this.#tooltip.text = "Expiration time";
        } else if (e.target.matches(".todo__pencil")) {
            this.#tooltip.text = "Edit entry";
        } else if (e.target.matches(".todo__trash")) {
            this.#tooltip.text = "Delete entry";
        } else {
            return;
        }
        this.#tooltip.show(e.target);
        e.target.addEventListener("mouseleave", this.#onMouseLeaveInfoSign);
    };
    #onMouseLeaveInfoSign = (e) => {
        this.#tooltip.hide();
    };

    #removeEditionFromInput = ({ target: e }) => {
        e.readOnly = true;
        const todo = this.#getData(e);
        todo.text = e.value;
        updateTodo(todo.date, { text: todo.text, time: todo.time, done: todo.done });
    };

    #getData = (el) => {
        const id = el.closest(".todo__item").dataset.id;
        const todo = this.#todoArr.find((entity) => entity.id === id);
        return todo;
    };

    addTodoToList(date, { text, time, done }) {
        const uuid = crypto.randomUUID();
        const todo = new Todo(uuid, text, time, done, date);
        this.#todoArr.push(todo);
        this.#formTodoEl(uuid, done, text, time, date);
    }

    #cleanTodoListElement() {
        this.#todoListEl.innerHTML = "";
    }

    #formTodoEl(id, done, text, time, date) {
        const todoClone = this.#todoTemplate.content.cloneNode(true);
        todoClone.firstElementChild.dataset.id = id;
        todoClone.querySelector(".todo__text").value = text;
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

    addAllTodoToList = (date, list) => {
        this.#cleanTodoListElement();
        const formattedArray = this.formatToArrayLike(list);
        this.sortByTime(formattedArray).forEach((todo) => {
            this.addTodoToList(date, todo);
        });
    };

    #changeTodoListDisplay() {}

    setDisplay(option) {
        this.#display = { ...this.#display, option };
    }

    formatToArrayLike = (list) => {
        const arr = [];
        for (let key of Object.keys(list)) {
            list[key];
            arr.push({ text: list[key].text, time: key, done: list[key].done });
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
