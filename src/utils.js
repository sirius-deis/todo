export function formateDate(date) {
    const dayNumber = date.getDate();
    const monthNumber = date.getMonth() + 1;
    return `${date.getFullYear()}-${monthNumber < 10 ? `0${monthNumber}` : monthNumber}-${
        dayNumber < 10 ? `0${dayNumber}` : dayNumber
    }`;
}
