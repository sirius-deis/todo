/**
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
 */

export function saveToStorage(date, { id, text, time, done }) {
    const todoList = JSON.parse(localStorage.getItem("todo-list")) ?? {};
    if (!todoList[date]) {
        todoList[date] = {};
    }
    if (!todoList[date][time]) {
        todoList[date][time] = [];
    }
    todoList[date][time].push({ id, text, done });
    localStorage.setItem("todo-list", JSON.stringify(todoList));
}

export function retrieveTodoListFromStorage(date) {
    const todoList = JSON.parse(localStorage.getItem("todo-list")) ?? {};
    return todoList[date];
}

export function updateTodo(date, { id, text, time, done }) {
    const todoList = JSON.parse(localStorage.getItem("todo-list"));
    const index = todoList[date][time].findIndex((el) => el.id === id);
    const updatedTodoArr = [
        ...todoList[date][time].slice(0, index),
        { id, text, done },
        ...todoList[date][time].slice(index + 1, todoList[date][time].length),
    ];
    todoList[date][time] = updatedTodoArr;
    localStorage.setItem("todo-list", JSON.stringify(todoList));
}

export function deleteTodo(date, time, id) {
    const todoList = JSON.parse(localStorage.getItem("todo-list"));
    const index = todoList[date][time].findIndex((el) => el.id === id);

    const updatedTodoArr = [
        ...todoList[date][time].slice(0, index),
        ...todoList[date][time].slice(index + 1, todoList[date][time].length),
    ];
    todoList[date][time] = updatedTodoArr;
    if (todoList[date][time].length <= 0) {
        delete todoList[date][time];
    }
    if (Object.keys(todoList[date]).length <= 0) {
        delete todoList[date];
    }
    localStorage.setItem("todo-list", JSON.stringify(todoList));
}

export function getAmountOfTasksInMonth(date) {
    const todoList = JSON.parse(localStorage.getItem("todo-list")) ?? {};
    const formattedDate = `${date.slice(0, -3)}`;
    const dateRegExp = new RegExp(`^${formattedDate}-\\d{2}$`);
    const dateArr = {};
    Object.entries(todoList)
        .filter((el) => dateRegExp.test(el[0]))
        .forEach((el) => {
            let sum = 0;
            for (const time of Object.values(el[1])) {
                sum += time.length;
            }
            dateArr[
                Object.values(el)[0]
                    .slice(-2)
                    .replace(/0(?=\d)/, "")
            ] = sum;
        });
    return dateArr;
}
