const balanceEl = document.getElementById("balance");
const moneyIncomeEl = document.getElementById("money-income");
const moneyExpenseEl = document.getElementById("money-expense");
const historyListEl = document.getElementById("list");
const inputTextEl = document.getElementById("text");
const inputAmountEl = document.getElementById("amount");
const buttonEl = document.getElementById("button");

let transactions = [];

// Initialise transactions from Local Storage
function initialiseTransactions() {
  let oldTransactions = JSON.parse(localStorage.getItem("transactions"));
  if (oldTransactions !== null) {
    transactions = oldTransactions;
  }
}

initialiseTransactions();
updateUI();

// Get transaction as object
function insertNewTransactionObject(index, text, total) {
  text = inputTextEl.value;
  total = +inputAmountEl.value;
  // index = transactions.length;
  let newTransactionId;
  if (transactions.length === 0) {
    newTransactionId = 0;
  } else {
    newTransactionId = transactions[transactions.length - 1].id + 1;
  }
  const transaction = {
    id: newTransactionId,
    title: text,
    amount: total,
  };
  transactions.push(transaction);

  localStorage.setItem("transactions", JSON.stringify(transactions));
  // console.log(transactions);
}

// Delete Element Function
function deleteElement(e) {
  const deleteBtnElement = e.target;
  const transactionElement = deleteBtnElement.parentElement;
  const idElement =
    transactionElement.children[transactionElement.children.length - 1];
  const id = idElement.value;
  transactions = transactions.filter((transaction) => transaction.id != id);
  localStorage.setItem("transactions", JSON.stringify(transactions));
  updateUI();
}

// Create list element
function addTransactionElement(transaction) {
  const li = document.createElement("li");
  const span = document.createElement("span");
  const button = document.createElement("button");
  const input = document.createElement("input");
  input.type = "hidden";
  input.value = transaction.id;
  if (transaction.amount > 0) {
    li.classList.add("income");
    span.innerText = `+${transaction.amount}`;
  } else {
    li.classList.add("expense");
    span.innerText = transaction.amount;
  }
  li.innerText = transaction.title;
  button.classList.add("delete-btn");
  button.addEventListener("click", deleteElement);
  button.innerText = "X";
  li.appendChild(span);
  li.appendChild(button);
  li.appendChild(input);
  historyListEl.appendChild(li);
}

// Show balance
function showBalance() {
  let balance = 0;
  transactions.forEach((item) => {
    balance += item.amount;
  });
  balanceEl.innerText = `$${balance}.00`;
}

// Show Income
function showIncome() {
  let income = 0;
  transactions.forEach((item) => {
    if (item.amount > 0) {
      income += item.amount;
    }
  });
  moneyIncomeEl.innerText = `$${income}.00`;
}

// Show Expense
function showExpense() {
  let expense = 0;
  transactions.forEach((item) => {
    if (item.amount < 0) {
      expense += item.amount;
    }
  });
  moneyExpenseEl.innerText = `$${expense}.00`;
}

// Show All Transactions
function showAllTransactions() {
  historyListEl.innerHTML = ``;
  transactions.forEach((transaction) => {
    addTransactionElement(transaction);
  });
}

// Delete Button
function deleteBtn() {
  const arr = historyListEl.children;
  console.log(arr);
}

// Update UI
function updateUI() {
  showAllTransactions();
  showBalance();
  showIncome();
  showExpense();
}

// Add transaction button
buttonEl.addEventListener("click", () => {
  insertNewTransactionObject();
  updateUI();
  inputAmountEl.value = "";
  inputTextEl.value = "";
});
