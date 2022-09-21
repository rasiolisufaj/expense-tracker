const balanceEl = document.getElementById("balance");
const moneyIncomeEl = document.getElementById("money-income");
const moneyExpenseEl = document.getElementById("money-expense");
const historyListEl = document.getElementById("list");
const inputTextEl = document.getElementById("text");
const inputAmountEl = document.getElementById("amount");
const buttonEl = document.getElementById("button");

// Create list element
function createListElement() {
  const li = document.createElement("li");
  const span = document.createElement("span");
  const button = document.createElement("button");
  if (inputAmountEl.value > 0 && inputTextEl.value !== null) {
    li.classList.add("income");
    span.innerText = `+${inputAmountEl.value}`;
  } else if (inputAmountEl.value < 0 && inputTextEl.value !== null) {
    li.classList.add("expense");
  } else {
    return alert("Please add a text and amount");
  }
  li.innerText = inputTextEl.value;
  span.innerText = inputAmountEl.value;
  button.classList.add("delete-btn");
  button.innerText = "X";
  li.appendChild(span);
  li.appendChild(button);
  historyListEl.appendChild(li);
}

// Update UI
function updateUI() {
  createListElement();
}

// Add new transaction
buttonEl.addEventListener("click", () => {
  updateUI();
});
