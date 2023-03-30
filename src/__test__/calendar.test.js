import fs from "fs";
import path from "path";
import { describe, it, expect, beforeEach } from "vitest";

const dom = fs.readFileSync(path.resolve(__dirname, "..", "index.html"), {
    encoding: "utf-8",
});

global.document.write(dom);

import calendar from "../calendar";

describe("#defineMonthAndYear", () => {
    /* prettier-ignore */
    it("returns previous month", () => {
        const dir = -1;
        const month = 3;
        const year = 2023;
        const result = calendar.defineMonthAndYear(dir, month, year);
        expect(result).toEqual([2023, 2]);
    });
    it("returns previous month and year if it's january", () => {
        const dir = -1;
        const month = 0;
        const year = 2023;
        const result = calendar.defineMonthAndYear(dir, month, year);
        expect(result).toEqual([2022, calendar.MONTHS.length - 1]);
    });
    it("returns previous month if it's december", () => {
        const dir = -1;
        const month = 11;
        const year = 2023;
        const result = calendar.defineMonthAndYear(dir, month, year);
        expect(result).toEqual([2023, 10]);
    });
    it("returns next month", () => {
        const dir = 1;
        const month = 6;
        const year = 2023;
        const result = calendar.defineMonthAndYear(dir, month, year);
        expect(result).toEqual([2023, 7]);
    });
    it("returns next month and year if it's december", () => {
        const dir = 1;
        const month = 11;
        const year = 2023;
        const result = calendar.defineMonthAndYear(dir, month, year);
        expect(result).toEqual([2024, 0]);
    });
    it("returns next month and year if it's january", () => {
        const dir = 1;
        const month = 0;
        const year = 2023;
        const result = calendar.defineMonthAndYear(dir, month, year);
        expect(result).toEqual([2023, 1]);
    });
});

describe("#formDateList", () => {
    it("return list of march", () => {
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

        const result = calendar.formDateList(firstDayOfMonth, amountOfDays, lastDayOfPrevMonth);
        expect(result).toEqual(listOfDate);
    });
});

describe("#getAmountOfDays", () => {
    it("returns amount of days in February", () => {
        const date = new Date(2023, 1, 1);
        const result = calendar.getAmountOfDays(date);
        expect(result).toBe(28);
    });
});

describe("#getLastDayOfPrevMonth", () => {
    it("returns last day in June", () => {
        const date = new Date(2023, 6, 1);
        const result = calendar.getLastDayOfPrevMonth(date);
        expect(result).toBe(30);
    });
});
