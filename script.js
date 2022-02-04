// Grabbing necessary DOM elments:
const balance = document.getElementById('balance');
const moneyPlus = document.getElementById('moneyPlus');
const moneyMinus = document.getElementById('moneyMinus');
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

// Create a function to display transaction on the DOM under History:

// Add Transactions:
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
  )}</span> <button class='delete-btn'>x</button>
  `;
  // As transaction amount contains sign alongwith it, Math.abs() is used to convert - to + as sign in explicitely used.

  // Now, append item as a child to list:
  list.appendChild(item);
};

// Init app
const init = () => {
  // Init executes right away.

  // Clear out the list
  list.innerHTML = '';

  // Run addTransactionDOM function for all the transactions:
  transactions.forEach(addTransactionDOM);
};

init();
