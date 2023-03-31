export function saveToStorage(date, { text, time, done }) {
    const todoList = JSON.parse(localStorage.getItem("todo-list")) ?? {};
    console.log(date);
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
    if (Object.keys(todoList[date]).length <= 0) {
        delete todoList[date];
    }
    delete todoList[date][time];
    localStorage.setItem("todo-list", JSON.stringify(todoList));
}

export function getAmountOfTasksInMonth(date) {
    const todoList = JSON.parse(localStorage.getItem("todo-list"));
    const formattedDate = `${date.slice(0, -3)}`;
    const dateRegExp = new RegExp(`^${formattedDate}-\\d{2}$`);
    const dateArr = {};
    Object.entries(todoList)
        .filter((el) => {
            return dateRegExp.test(el[0]);
        })
        .forEach((el) => {
            dateArr[Object.values(el)[0].slice(-2)] = Object.values(el[1]).length;
        });

    return dateArr;
}
