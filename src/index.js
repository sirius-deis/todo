import "./assets/style.scss";
import { getDate, onDateChoose } from "./calendar";
import { submitForm } from "./addForm";
import { saveToStorage, retrieveTodoListFromStorage } from "./storage";
import { addTodoToList, addAllTodoList } from "./todoList";

const addFormEl = document.querySelector(".add");
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

function formateDate(date) {
  return `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`;
}

addFormEl.addEventListener("submit", (e) => {
  e.preventDefault();
  const todo = submitForm(e);
  const formattedDate = formateDate(getDate());
  addTodoToList(formattedDate, todo);
  saveToStorage(formattedDate, todo);
});

pickerDateContainer.addEventListener("click", (e) => {
  const chosenDate = formateDate(onDateChoose(e));
  const todoList = retrieveTodoListFromStorage(chosenDate);
  addAllTodoList(chosenDate, todoList);
});

registerServiceWorker();
