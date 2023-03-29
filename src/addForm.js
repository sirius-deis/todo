const addFormEl = document.querySelector(".add"),
  addTxtEl = addFormEl.querySelector(".add__input"),
  addTimeEl = addFormEl.querySelector(".add__time"),
  addBtnEl = addFormEl.querySelector(".add__btn");

const reg = /^[0-9]{2}:[0-9]{2}$/;
document.querySelector(".add__label").addEventListener("click", (e) => {
  e.preventDefault();
  e.target.firstElementChild.showPicker();
});

function checkInputValidity(text, time) {
  if (!text.trim().length < 1 && reg.test(time)) {
    return false;
  }
  return true;
}

// [addTxtEl, addTimeEl].forEach((input) => {
//   input.addEventListener("input", () => {
//     addBtnEl.disabled = checkInputValidity(addTxtEl.value, addTimeEl.value);
//   });
// });

export function submitForm(e) {
  const todoEntity = {
    text: addTxtEl.value,
    time: addTimeEl.value,
    done: false,
  };
  addFormEl.reset();
  return todoEntity;
}
