export function defineMonthAndYear(dir, month, year, months) {
  if (month === 0) {
    return dir === -1 ? [year - 1, months.length - 1] : [year, month + 1];
  }
  if (month === months.length - 1) {
    return dir === -1 ? [year, month - 1] : [year + 1, 0];
  }
  return [year, month + dir];
}

export function formDateList(
  firstDayOfMonth,
  amountOfDays,
  lastDayOfPrevMonth
) {
  const listOfDates = [];
  for (let i = 0; i < 42; i++) {
    if (i < firstDayOfMonth) {
      listOfDates.push({
        data: lastDayOfPrevMonth - firstDayOfMonth + i + 1,
        info: "prev",
      });
    } else if (i < amountOfDays + firstDayOfMonth) {
      listOfDates.push({ data: i - firstDayOfMonth + 1 });
    } else {
      listOfDates.push({
        data: i - amountOfDays - firstDayOfMonth + 1,
        info: "next",
      });
    }
  }
  return listOfDates;
}
