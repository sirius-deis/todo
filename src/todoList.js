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
    #today = new Date();
    constructor() {
        this.#todoArr = [];
        this.#todoListEl = document.querySelector(".todo__list");
        this.#todoTemplate = this.#todoListEl.querySelector(".todo__template");

        this.#todoListEl.addEventListener("click", this.#onClick);
    }

    #onClick = (e) => {
        const target = e.target;
        if (target.matches(".todo__checkmark")) {
            this.#onCheckMarkClick(target);
        }
        if (target.matches(".todo__pencil")) {
            const el = target.closest(".todo__item").querySelector(".todo__text");
            this.#onPencilCLicked(el);
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

    #onPencilCLicked(e) {
        e.setAttribute("contenteditable", "true");
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

    #removeEditionFromInput = ({ target: e }) => {
        e.setAttribute("contenteditable", "false");
        const todo = this.#getData(e);
        todo.text = e.textContent;
        updateTodo(todo.date, { text: todo.text, time: todo.time, done: todo.done });
    };

    #getData = (el) => {
        const id = el.closest(".todo__item").dataset.id;
        const todo = this.#todoArr.find((entity) => entity.id === id);
        return todo;
    };

    addTodoToList(date, { text, time, done }) {
        const todoClone = this.#todoTemplate.content.cloneNode(true);
        const uuid = crypto.randomUUID();
        this.#todoArr.push(new Todo(uuid, text, time, done, date));
        todoClone.firstElementChild.dataset.id = uuid;
        todoClone.querySelector(".todo__text").textContent = text;
        todoClone.querySelector(".todo__check").checked = done;
        todoClone.querySelector(".todo__time-expiration").textContent = time;
        todoClone.querySelector(".todo__time").textContent = time;

        this.#todoListEl.append(todoClone);
    }

    addAllTodoToList = (date, list) => {
        todoListEl.innerHTML = "";
        this.sortByTime(list).forEach((todo) => {
            this.addTodoToList(date, { ...todo[1], time: todo[0] });
        });
    };

    sortByTime = (list) => {
        return Object.entries(list).sort((t1, t2) => {
            const t1splitted = t1[0].split(":");
            const t2splitted = t2[0].split(":");
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
}

const todoList = new TodoList();
export default todoList;
/////////////////////////
import { updateTodo, deleteTodo } from "./storage";

const todoListEl = document.querySelector(".todo__list");
const todoTemplate = document.querySelector(".todo__template");
let todoListArr = {};

export function addTodoToList(date, { text, time, done }) {
    const todoClone = todoTemplate.content.cloneNode(true);
    todoClone.firstElementChild.dataset.time = time;
    todoClone.querySelector(".todo__text").textContent = text;
    todoClone.querySelector(".todo__check").checked = done;
    todoClone.querySelector(".todo__time-expiration").textContent = time;
    todoClone.querySelector(".todo__time").textContent = time;
    todoListEl.append(todoClone);
    if (!todoListArr[date]) {
        todoListArr[date] = {};
    }
    todoListArr[date][time] = { text, time, done };
}

function sortByTime(list) {
    return Object.entries(list).sort((t1, t2) => {
        const t1splitted = t1[0].split(":");
        const t2splitted = t2[0].split(":");
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
}

function reverse(list) {}

export function addAllTodoList(date, list) {
    todoListEl.innerHTML = "";
    todoListArr = [];
    reverse(list);
    sortByTime(list).forEach((todo) => {
        addTodoToList(date, { ...todo[1], time: todo[0] });
    });
}

function removeEditionFromInput({ target }) {
    target.setAttribute("contenteditable", "false");
    const [date, todo] = getData(target);
    todo.text = target.textContent;
    updateTodo(date, todo);
}

function getData(el) {
    const date = Object.keys(todoListArr)[0];
    const time = el.closest(".todo__item").dataset.time;
    const todo = todoListArr[date][time];
    return [date, todo];
}

/*todoListEl.addEventListener("click", (e) => {
    if (e.target.matches(".todo__checkmark")) {
        const checkMark = e.target.previousElementSibling;
        e.target.parentElement.nextElementSibling.classList.toggle("todo__text--done");
        const [date, todo] = getData(e.target);

        todo.done = !checkMark.checked;
        updateTodo(date, todo);
    }
    if (e.target.matches(".todo__pencil")) {
        const el = e.target.closest(".todo__item").querySelector(".todo__text");
        el.setAttribute("contenteditable", "true");
        el.removeEventListener("blur", removeEditionFromInput);
        el.addEventListener("blur", removeEditionFromInput);
    }
    if (e.target.matches(".todo__trash")) {
        const [date, todo] = getData(e.target);
        deleteTodo(date, todo.time);
        delete todoListArr[date][todo.time];
        e.target.closest(".todo__item").remove();
    }
});*/

todoListEl.addEventListener("mouseover", (e) => {
    if (e.target.matches(".todo__sign")) {
    }
});
