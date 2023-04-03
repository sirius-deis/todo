export default class Todo {
    #id;
    #text;
    #time;
    #done;
    #date;
    constructor(uuid, text, time, done, date) {
        this.#id = uuid;
        this.#text = text;
        this.#time = time;
        this.#done = done;
        this.#date = date;
    }

    set text(data) {
        this.#text = data;
    }
    set done(data) {
        this.#done = data;
    }

    get id() {
        return this.#id;
    }

    get text() {
        return this.#text;
    }
    get time() {
        return this.#time;
    }
    get done() {
        return this.#done;
    }
    get date() {
        return this.#date;
    }
}
