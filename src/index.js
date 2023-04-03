import "./assets/style.scss";
import calendar from "./calendar";
import addForm from "./addForm";
import { saveToStorage, retrieveTodoListFromStorage } from "./storage";
import todoList from "./todoList";
import "./display";
import { formateDate } from "./utils";

const calendarBtnEl = document.querySelector(".calendar__button");
const pickerDateContainer = document.querySelector(".picker__dates");

window.addEventListener("DOMContentLoaded", () => {});

const registerServiceWorker = async () => {
    if ("serviceWorker" in navigator) {
        try {
            const registration = await navigator.serviceWorker.register("/sw.js", {
                scope: "/",
            });
            if (registration.installing) {
                console.log("Service worker installing");
            } else if (registration.waiting) {
                console.log("Service worker installed");
            } else if (registration.active) {
                console.log("Service worker active");
            }
        } catch (error) {
            console.error(`Registration failed with ${error}`);
        }
    }
};

function createTodo(date, todo) {
    const uuid = crypto.randomUUID();
    const newTodo = { id: uuid, ...todo };
    saveToStorage(date, newTodo);
    return newTodo;
}

addForm.addFormEl.addEventListener("submit", (e) => {
    e.preventDefault();
    const todo = addForm.submitForm(e);
    const formattedDate = formateDate(calendar.date);
    const createdTodo = createTodo(formattedDate, todo);
    todoList.addAllTodoToList(formattedDate, { [todo.time]: [createdTodo] });
});

addForm.addFormEl.addEventListener("drop", (e) => {
    addForm.onDropFile(e, todoList.addAllTodoToList.bind(null, formateDate(calendar.date)));
});

const options = {
    day: "numeric",
    month: "long",
    year: "numeric",
};
const dateTimeFormatter = new Intl.DateTimeFormat(navigator.language, options);
function changeBtnName(date) {
    calendarBtnEl.textContent = dateTimeFormatter.format(date);
}

changeBtnName(calendar.date);
calendarBtnEl.addEventListener("click", (e) => {
    e.stopPropagation();
    calendar.showPicker();
});

function getTodoFromStorageAndPushItToTodoList(date) {
    const todoListRetrieved = retrieveTodoListFromStorage(date);
    //console.log(todoListRetrieved);
    todoList.addAllTodoToList(date, todoListRetrieved);
}

pickerDateContainer.addEventListener("click", (e) => {
    const chosenDate = formateDate(calendar.onDateChoose(e));
    changeBtnName(calendar.date);
    getTodoFromStorageAndPushItToTodoList(chosenDate);
});

getTodoFromStorageAndPushItToTodoList(formateDate(calendar.date));

//registerServiceWorker();

/**
 *
 * TODO:
 *
 * {
 *  date: {
 *      time: [
 *          {id, text, time, done},
 *          {id, text, time, done},
 *          {id, text, time, done}
 *      ],
 *      time: [
 *          {id, text, time, done},
 *          {id, text, time, done},
 *          {id, text, time, done}
 *      ],
 *      time: [
 *          {id, text, time, done},
 *          {id, text, time, done},
 *          {id, text, time, done}
 *      ]
 *  }
 * }
 *
 *
 * current
 *
 * {
 * date: {
 *      time: {
 *          id,
 *          text,
 *          time,
 *          done
 *      }
 *  }
 * }
 */
