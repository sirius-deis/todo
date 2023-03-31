export function formateDate(date) {
    const monthNumber = date.getMonth() + 1;
    return `${date.getFullYear()}-${monthNumber < 10 ? `0${monthNumber}` : monthNumber}-${date.getDate()}`;
}
