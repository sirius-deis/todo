import fs from "fs";
import path from "path";
import { describe, it, expect } from "vitest";
const dom = fs.readFileSync(path.resolve(__dirname, "..", "index.html"), { encoding: "utf-8" });
global.document.write(dom);
import todoList from "../todoList";

describe("#formatToArrayLike", () => {
    it("should consume object and return an array", () => {
        const data = { "01:35": { text: "123", done: false }, "02:35": { text: "456", done: true } };
        const result = todoList.formatToArrayLike(data);
        const expectedResult = [
            { text: "123", time: "01:35", done: false },
            { text: "456", time: "02:35", done: true },
        ];
        expect(result).toEqual(expectedResult);
    });
});

describe("#filterCompleted", () => {
    it("should return filtered array only with completed entries", () => {
        const data = [
            { text: "123", time: "01:30", done: false },
            { text: "234", time: "02:30", done: true },
            { text: "345", time: "03:30", done: true },
            { text: "456", time: "04:30", done: false },
        ];
        const expectedResult = [
            { text: "234", time: "02:30", done: true },
            { text: "345", time: "03:30", done: true },
        ];
        const result = todoList.filterCompleted(data);
        expect(result).toEqual(expectedResult);
    });
});

describe("#filterActive", () => {
    it("should return filtered array only with active entries", () => {
        const data = [
            { text: "123", time: "01:30", done: false },
            { text: "234", time: "02:30", done: true },
            { text: "345", time: "03:30", done: true },
            { text: "456", time: "04:30", done: false },
        ];
        const expectedResult = [
            { text: "123", time: "01:30", done: false },
            { text: "456", time: "04:30", done: false },
        ];
        const result = todoList.filterActive(data);
        expect(result).toEqual(expectedResult);
    });
});

describe("#sortByTime", () => {
    //TODO:
    it("should return sorted array by time", () => {
        const data = [
            { text: "123", time: "07:30", done: false },
            { text: "234", time: "04:30", done: true },
            { text: "345", time: "03:30", done: true },
            { text: "456", time: "01:30", done: false },
        ];
        const expectedResult = [
            { text: "456", time: "01:30", done: false },
            { text: "345", time: "03:30", done: true },
            { text: "234", time: "04:30", done: true },
            { text: "123", time: "07:30", done: false },
        ];
        const result = todoList.sortByTime(data);
        expect(result).toEqual(expectedResult);
    });
});

describe("#sortByTitle", () => {
    //TODO:
    it("should return sorted array by title", () => {
        const data = [
            { text: "Do ...", time: "04:30", done: true },
            { text: "Go ...", time: "03:30", done: true },
            { text: "Buy ...", time: "07:30", done: false },
            { text: "Call ...", time: "01:30", done: false },
        ];
        const expectedResult = [
            { text: "Buy ...", time: "07:30", done: false },
            { text: "Call ...", time: "01:30", done: false },
            { text: "Do ...", time: "04:30", done: true },
            { text: "Go ...", time: "03:30", done: true },
        ];
        const result = todoList.sortByTitle(data);
        expect(result).toEqual(expectedResult);
    });
});
