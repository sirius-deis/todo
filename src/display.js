import todoList from "./todoList";

const filterSelectEl = document.querySelector("#select-filter");
const sortSelectEl = document.querySelector("#select-sort");
const orderEl = document.querySelector(".display__asc");
let order = "down";

filterSelectEl.addEventListener("click", (e) => {
    todoList.setDisplay({ filter: e.target.value });
});

sortSelectEl.addEventListener("click", (e) => {
    todoList.setDisplay({ sort: e.target.value });
});

orderEl.addEventListener("click", (e) => {
    order = order === "down" ? "up" : "down";
    todoList.setDisplay({ order: order === "down" ? "asc" : "desc" });
    orderEl.firstElementChild.src = `/public/icons/arrow-${order}-short-wide-solid.svg`;
});
