const filterSelectEl = document.querySelector("#select-filter");
const sortSelectEl = document.querySelector("#select-sort");
const orderEl = document.querySelector(".display__asc");

filterSelectEl.addEventListener("click", (e) => {
    console.log(e.target.value);
});

sortSelectEl.addEventListener("click", (e) => {
    console.log(e.target.value);
});

orderEl.addEventListener("click", (e) => {});
