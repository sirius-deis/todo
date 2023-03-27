import { describe, it, expect } from "vitest";

import { defineMonthAndYear, formDateList } from "./utils";

describe("#defineMonthAndYear", () => {
  /* prettier-ignore */
  const months = ["January", "February","March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
  it("return previous month", () => {
    const dir = -1;
    const month = 3;
    const year = 2023;
    const result = defineMonthAndYear(dir, month, year, months);
    expect(result).toEqual([2023, 2]);
  });
  it("return previous month and year if it's january", () => {
    const dir = -1;
    const month = 0;
    const year = 2023;
    const result = defineMonthAndYear(dir, month, year, months);
    expect(result).toEqual([2022, months.length - 1]);
  });
  it("return previous month if it's december", () => {
    const dir = -1;
    const month = 11;
    const year = 2023;
    const result = defineMonthAndYear(dir, month, year, months);
    expect(result).toEqual([2023, 10]);
  });
  it("return next month", () => {
    const dir = 1;
    const month = 6;
    const year = 2023;
    const result = defineMonthAndYear(dir, month, year, months);
    expect(result).toEqual([2023, 7]);
  });
  it("return next month and year if it's december", () => {
    const dir = 1;
    const month = 11;
    const year = 2023;
    const result = defineMonthAndYear(dir, month, year, months);
    expect(result).toEqual([2024, 0]);
  });
  it("return next month and year if it's january", () => {
    const dir = 1;
    const month = 0;
    const year = 2023;
    const result = defineMonthAndYear(dir, month, year, months);
    expect(result).toEqual([2023, 1]);
  });
});

describe("#formDateList", () => {
  it("form march", () => {
    /* prettier-ignore */
    const listOfDate = Array.from(new Array(42), (x, i) => {
      if(i < 2) {
        return {data: 28-1+i, info: 'prev'}
      } else if(i > 32) {
        return {data: i - 32, info: 'next'}
      } else {
        return {data: i - 1}
      }
    });
    const firstDayOfMonth = 2;
    const amountOfDays = 31;
    const lastDayOfPrevMonth = 28;

    const result = formDateList(
      firstDayOfMonth,
      amountOfDays,
      lastDayOfPrevMonth
    );
    expect(result).toEqual(listOfDate);
  });
});
