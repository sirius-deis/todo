export default class Tooltip {
    #text;
    #tooltipEl;

    constructor() {
        this.#tooltipEl = document.querySelector(".tooltip");
    }

    show = (e) => {
        const rect = e.getBoundingClientRect();
        this.#tooltipEl.textContent = this.#text;
        this.#tooltipEl.classList.remove("tooltip--hidden");
        const computedStyles = getComputedStyle(this.#tooltipEl);
        this.#position("top", rect.top + document.documentElement.scrollTop - computedStyles.height.slice(0, -2) / 2);
        this.#position("left", rect.left - computedStyles.width.slice(0, -2) / 2);
    };

    #position(attr, value) {
        this.#tooltipEl.style[attr] = `${value}px`;
    }

    hide = () => {
        this.#tooltipEl.classList.add("tooltip--hidden");
    };
    set text(data) {
        this.#text = data;
    }
}
