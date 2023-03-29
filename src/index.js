import "./assets/style.scss";
import { getDate } from "./calendar";
import { submitForm } from "./addForm";
import { saveToStorage, retrieveTodoListFromStorage } from "./storage";
import { addTodoToList } from "./todoList";

const addFormEl = document.querySelector(".add");

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

addFormEl.addEventListener("submit", (e) => {
  e.preventDefault();
  const todo = submitForm(e);
  console.log(1);
  addTodoToList(todo);
  const date = getDate();
  saveToStorage(
    todo,
    `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`
  );
});

registerServiceWorker();
