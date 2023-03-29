export function saveToStorage(todo, date) {
  const todoList = JSON.parse(localStorage.getItem("todo-list")) ?? {};
  if (!todoList[date]) {
    todoList[date] = {};
  }
  todoList[date][todo.time] = todo;
  localStorage.setItem("todo-list", JSON.stringify(todoList));
}

export function retrieveTodoListFromStorage(time) {
  const todoList = JSON.parse(localStorage.getItem("todo-list"));
  return todoList[time];
}

export function updateTodoListStatus({ time, status }) {
  const todoList = JSON.parse(localStorage.getItem("todo-list"));
  todoList[time].done = status;
}
