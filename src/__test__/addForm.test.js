import fs from "fs";
import path from "path";
import { describe, it, expect } from "vitest";
const dom = fs.readFileSync(path.resolve(__dirname, "..", "index.html"), { encoding: "utf-8" });
global.document.write(dom);
import addForm from "../addForm";

describe("#checkInputValidity", () => {
    it("should return true", () => {
        const text = "123";
        const time = "20:00";
        const result = addForm.checkInputValidity(text, time);
        expect(result).toBeTruthy;
    });
    it("should return false because of text", () => {
        const text = "";
        const time = "20:00";
        const result = addForm.checkInputValidity(text, time);
        expect(result).toBeFalsy;
    });
    it("should return false because of time", () => {
        const text = "123";
        const time = "";
        const result = addForm.checkInputValidity(text, time);
        expect(result).toBeFalsy;
    });
});
