// Grabbing necessary DOM elments:
const balance = document.getElementById('balance');
const moneyPlus = document.getElementById('money-plus');
const moneyMinus = document.getElementById('money-minus');
const list = document.getElementById('list');
const form = document.getElementById('form');
const text = document.getElementById('text');
const amount = document.getElementById('amount');

// Transactions will be stored to LS later. For now, it is stored in 'dummyTransactions' array:
const dummyTransactions = [
  { id: 1, text: 'Flower', amount: -20 },
  { id: 2, text: 'Salary', amount: 300 },
  { id: 3, text: 'Book', amount: -10 },
  { id: 4, text: 'Camera', amount: 150 },
];

// Let's create 'transactions' which is a global state for transactions, set to dummyTransactions now, later linked to LS:
let transactions = dummyTransactions;

// FUNCTIONS

// Add Transaction:
const addTransaction = (e) => {
  e.preventDefault();

  // Checking for empty values:
  if (text.value.trim() === '' || amount.value.trim() === '') {
    alert('Please add a text and amount');
  } else {
    // Create a transaction object to add:
    const transaction = {
      id: generateID(), // created below
      text: text.value,
      amount: +amount.value, // to convert string to a number
    };

    // Push newly created transaction to transactions array:
    transactions.push(transaction);

    // Add the newly created transaction to DOM:
    addTransactionDOM(transaction);

    // Update values:
    updateValues();

    // Clear Inputs:
    text.value = '';
    amount.value = '';
  }
};

// Generate random ID for transcation added:
const generateID = () => {
  return Math.floor(Math.random() * 100000000);
};

// Create a function to display transaction on the DOM under History:

// Add Transactions DOM:
const addTransactionDOM = (transaction) => {
  // First, to distinguish b/n income and expense, sign is needed.

  // Get Sign:
  const sign = transaction.amount < 0 ? '-' : '+';

  // Create a list item:
  const item = document.createElement('li');

  // Add class to it based on value:
  item.classList.add(transaction.amount < 0 ? 'minus' : 'plus');

  // Set inner HTML:
  item.innerHTML = `
    ${transaction.text} <span>${sign}${Math.abs(
    transaction.amount
  )}</span> <button class='delete-btn' onClick="removeTransaction(${
    transaction.id
  })">x</button>
  `;
  // As transaction amount contains sign alongwith it, Math.abs() is used to convert - to + as sign in explicitely used.

  // Now, append item as a child to list:
  list.appendChild(item);
};

// Update the balance, income and expense
const updateValues = () => {
  // Create an array of 'amounts' using map:
  const amounts = transactions.map((transaction) => transaction.amount);
  // console.log(amounts); // logs the array containing all the transaction values

  // Now, total up the amounts using reduce:
  const total = amounts.reduce((acc, item) => (acc += item), 0).toFixed(2);
  // console.log(total); // logs the sum of amounts

  // Get the income using filter and sum of it using reduce:
  const income = amounts
    .filter((item) => item > 0) // get only positive values
    .reduce((acc, item) => (acc += item), 0) // sum them up
    .toFixed(2);
  // console.log(income); // logs the income value

  // Get the expense using filter and sum of it using reduce:
  const expense =
    amounts.filter((item) => item < 0).reduce((acc, item) => (acc += item), 0) *
    -1;

  // console.log(expense); // logs the expense value

  // Now, all the values are to be inserted to the DOM relevantly:
  balance.innerText = `Rs ${total}`;
  moneyPlus.innerText = `Rs ${income}`;
  moneyMinus.innerText = `Rs ${expense}`;
};

// Remove transaction by ID:
const removeTransaction = (id) => {
  // For every transaction, its id is checked with the id passed in. If not matching, will be retained in transactions:
  transactions = transactions.filter((transaction) => transaction.id !== id);

  //  Re-initialize to update data on the page:
  init();
};

// Init app
const init = () => {
  // Init executes right away.

  // Clear out the list
  list.innerHTML = '';

  // Run addTransactionDOM function for all the transactions:
  transactions.forEach(addTransactionDOM);

  // Update Values:
  updateValues();
};

init();

// EVENT LISTENERS:

// Add transaction
form.addEventListener('submit', addTransaction);
