const balanceEl = document.getElementById("balance");
const moneyIncomeEl = document.getElementById("money-income");
const moneyExpenseEl = document.getElementById("money-expense");
const historyListEl = document.getElementById("list");
const inputTextEl = document.getElementById("text");
const inputAmountEl = document.getElementById("amount");
const buttonEl = document.getElementById("button");

let transactions = [];

// Get transaction as object
function getTransactionObject(index, text, total) {
  text = inputTextEl.value;
  total = inputAmountEl.value;
  index = transactions.length;
  const transaction = {
    id: index,
    title: text,
    amount: total,
  };
  transactions.push(transaction);
  console.log(transactions);
}

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
    span.innerText = inputAmountEl.value;
  } else {
    return alert("Please add a text and amount");
  }
  li.innerText = inputTextEl.value;
  button.classList.add("delete-btn");
  button.innerText = "X";
  li.appendChild(span);
  li.appendChild(button);
  historyListEl.appendChild(li);
}

// Show balance
function showBalance() {
  let balance = 0;
  transactions.forEach((item) => {
    balance += parseInt(item.amount);
  });
  balanceEl.innerText = `$${balance}.00`;
}

// Show Income
function showIncome() {
  let income = 0;
  transactions.forEach((item) => {
    if (item.amount > 0) {
      income += parseInt(item.amount);
    }
  });
  moneyIncomeEl.innerText = `$${income}.00`;
}

// Show Expense
function showExpense() {
  let expense = 0;
  transactions.forEach((item) => {
    if (item.amount < 0) {
      expense += parseInt(item.amount);
    }
  });
  moneyExpenseEl.innerText = `$${expense}.00`;
}

// Update UI
function updateUI() {
  createListElement();
  getTransactionObject();
  showBalance();
  showIncome();
  showExpense();
}

// Add transaction button
buttonEl.addEventListener("click", () => {
  updateUI();
  inputAmountEl.value = "";
  inputTextEl.value = "";
});
