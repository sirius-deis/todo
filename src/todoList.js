const todoListEl = document.querySelector(".todo__list");
const todoTemplate = document.querySelector(".todo__template");

export function addTodoToList({ text, time, done }) {
  const todoClone = todoTemplate.content.cloneNode(true);
  todoClone.querySelector(".todo__text").textContent = text;
  todoClone.querySelector(".todo__check").checked = done;
  todoClone.querySelector(".todo__time-expiration").textContent = time;
  todoClone.querySelector(".todo__time").textContent = time;
  todoListEl.append(todoClone);
}

todoListEl.addEventListener("click", (e) => {
  if (e.target.matches(".todo__checkmark")) {
    e.target.parentElement.nextElementSibling.classList.toggle(
      "todo__text--done"
    );
  }
  if (e.target.matches(".todo__pencil")) {
    const el = e.target.closest(".todo__item").querySelector(".todo__text");
    el.setAttribute("contenteditable", "true");
    el.addEventListener(
      "blur",
      () => {
        el.setAttribute("contenteditable", "false");
      },
      { once: true }
    );
  }
  if (e.target.matches(".todo__trash")) {
  }
});

todoListEl.addEventListener("mouseover", (e) => {
  if (e.target.matches(".todo__sign")) {
  }
});
