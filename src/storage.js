export function saveToStorage(date, { text, time, done }) {
  const todoList = JSON.parse(localStorage.getItem("todo-list")) ?? {};
  if (!todoList[date]) {
    todoList[date] = {};
  }
  todoList[date][time] = { text, done };
  localStorage.setItem("todo-list", JSON.stringify(todoList));
}

export function retrieveTodoListFromStorage(date) {
  const todoList = JSON.parse(localStorage.getItem("todo-list"));
  return todoList[date] ?? {};
}

export function updateTodo(date, { text, time, done }) {
  const todoList = JSON.parse(localStorage.getItem("todo-list"));
  todoList[date][time] = { text, done };
  localStorage.setItem("todo-list", JSON.stringify(todoList));
}

export function deleteTodo(date, time) {
  const todoList = JSON.parse(localStorage.getItem("todo-list"));
  delete todoList[date][time];
  localStorage.setItem("todo-list", JSON.stringify(todoList));
}
