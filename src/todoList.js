import { updateTodo, deleteTodo } from "./storage";

const todoListEl = document.querySelector(".todo__list");
const todoTemplate = document.querySelector(".todo__template");
let todoList = {};

export function addTodoToList(date, { text, time, done }) {
  const todoClone = todoTemplate.content.cloneNode(true);
  todoClone.firstElementChild.dataset.time = time;
  todoClone.querySelector(".todo__text").textContent = text;
  todoClone.querySelector(".todo__check").checked = done;
  todoClone.querySelector(".todo__time-expiration").textContent = time;
  todoClone.querySelector(".todo__time").textContent = time;
  todoListEl.append(todoClone);
  if (!todoList[date]) {
    todoList[date] = {};
  }
  todoList[date][time] = { text, time, done };
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
  todoList = [];
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
  const date = Object.keys(todoList)[0];
  const time = el.closest(".todo__item").dataset.time;
  const todo = todoList[date][time];
  return [date, todo];
}

todoListEl.addEventListener("click", (e) => {
  if (e.target.matches(".todo__checkmark")) {
    const checkMark = e.target.previousElementSibling;
    e.target.parentElement.nextElementSibling.classList.toggle(
      "todo__text--done"
    );
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
    delete todoList[date][todo.time];
    e.target.closest(".todo__item").remove();
  }
});

todoListEl.addEventListener("mouseover", (e) => {
  if (e.target.matches(".todo__sign")) {
  }
});
