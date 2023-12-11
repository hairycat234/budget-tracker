let budget = 0;
let additionalIncome = 0;
let expenses = [];

// Load data from localStorage on page load
document.addEventListener("DOMContentLoaded", () => {
  const savedBudget = localStorage.getItem("budget");
  if (savedBudget) {
    budget = parseFloat(savedBudget);
    document.getElementById("total-budget").textContent = `Total Budget: $${budget}`;
  }

  const savedAdditionalIncome = localStorage.getItem("additionalIncome");
  if (savedAdditionalIncome) {
    additionalIncome = parseFloat(savedAdditionalIncome);
    document.getElementById("total-income").textContent = `Total budget with additional income: $${budget}`;
  }

  const savedExpenses = localStorage.getItem("expenses");
  if (savedExpenses) {
    expenses = JSON.parse(savedExpenses);
    updateExpenseTable();
  }
});

// document.getElementById("set-budget").addEventListener("click", () => {
//   // Inside your "set-budget" event listener
//   // document.getElementById("set-budget").addEventListener("click", () => {
//   //   const budgetInput = document.getElementById("budget-amount");
//   //   budget = parseFloat(budgetInput.value);
//   //   document.getElementById("total-budget").textContent = `Total Budget: $${budget}`;
//   //   budgetInput.value = "";


//   // });

//   const budgetInput = document.getElementById("budget-amount");
//   budget = parseFloat(budgetInput.value);
//   document.getElementById(
//     "total-budget"
//   ).textContent = `Total Budget: $${budget}`;
//   budgetInput.value = "";
//   // Save the budget to localStorage
//   localStorage.setItem("budget", budget.toString());
// });
document.getElementById("set-budget").addEventListener("click", () => {
  const budgetInput = document.getElementById("budget-amount");
  const inputAmount = parseFloat(budgetInput.value);

  if (!isNaN(inputAmount) && inputAmount !== null) {
    // Update the budget and UI if the input value is valid
    budget = inputAmount;
    document.getElementById("total-budget").textContent = `Total Budget: $${budget}`;
    budgetInput.value = "";

    // Save the budget to localStorage
    localStorage.setItem("budget", budget.toString());
  } else {
    // Handle invalid input scenario (e.g., display an error message)
    console.log("Invalid budget amount entered.");
    // Optionally, display an error message to the user
  }
});
// document.getElementById("add-income").addEventListener("click", () => {
//   // Inside your "add-income" event listener
//   // document.getElementById("add-income").addEventListener("click", () => {
//   //   const incomeInput = document.getElementById("additional-income");
//   //   additionalIncome = parseFloat(incomeInput.value);
//   //   budget += additionalIncome;

//   // Save the additional income to localStorage
//   //   localStorage.setItem("additionalIncome", additionalIncome.toString());

//   //   document.getElementById("total-income").textContent = `Total budget with additional income: $${budget}`;
//   //   incomeInput.value = "";
//   //   createBudgetChart();// CHANGING NAME
//   // });

//   const incomeInput = document.getElementById("additional-income");
//   additionalIncome = parseFloat(incomeInput.value);
//   budget += additionalIncome;
//   // Save the additional income to localStorage
//   localStorage.setItem("additionalIncome", additionalIncome.toString());
//   document.getElementById(
//     "total-income"
//   ).textContent = `Total budget with additional income: $${budget}`;
//   incomeInput.value = "";
//   createBudgetChart();
// });
document.getElementById("add-income").addEventListener("click", () => {
  const incomeInput = document.getElementById("additional-income");
  const inputIncome = parseFloat(incomeInput.value);

  if (!isNaN(inputIncome) && inputIncome !== null) {
    // If the input value is valid, update additional income and budget
    additionalIncome = inputIncome;
    budget += additionalIncome;

    // Save the additional income to localStorage
    localStorage.setItem("additionalIncome", additionalIncome.toString());

    // Update the UI and create budget chart
    document.getElementById("total-income").textContent = `Total budget with additional income: $${budget}`;
    incomeInput.value = "";
    createBudgetChart();
  } else {
    // Handle invalid input scenario (e.g., display an error message)
    console.log("Invalid additional income entered.");
    // Optionally, display an error message to the user
  }
});

document.getElementById("add-expense").addEventListener("click", () => {
  // Inside your "add-expense" event listener
  // document.getElementById("add-expense").addEventListener("click", () => {
  //   const description = document.getElementById("expense-description").value;
  //   const amount = parseFloat(document.getElementById("expense-amount").value);

  //   if (description && !isNaN(amount)) {
  //     expenses.push({ description, amount });

  //     // Save expenses to localStorage
  //     localStorage.setItem("expenses", JSON.stringify(expenses));

  //     updateExpenseTable();
  //     document.getElementById("expense-description").value = "";
  //     document.getElementById("expense-amount").value = "";
  //   }
  // });

  const description = document.getElementById("expense-description").value;
  const amount = parseFloat(document.getElementById("expense-amount").value);

  if (description && !isNaN(amount)) {
    expenses.push({ description, amount });
          // Save expenses to localStorage
    localStorage.setItem("expenses", JSON.stringify(expenses));
    updateExpenseTable();
    document.getElementById("expense-description").value = "";
    document.getElementById("expense-amount").value = "";
  }
});

function updateExpenseTable() {
  const tableBody = document.querySelector("#expense-table tbody");
  tableBody.innerHTML = "";
  let totalExpense = 0;
  for (const expense of expenses) {
    totalExpense += expense.amount;
    const row = document.createElement("tr");
    row.innerHTML = `
                <td>${expense.description}</td>
                <td>$${expense.amount}</td>
                <td>${budget - totalExpense}</td>
            `;
    tableBody.appendChild(row);
  }
  document.getElementById("total-budget").textContent = `Remaining Budget: $${budget - totalExpense
    }`;
  document.getElementById(
    "total-budget"
  ).textContent += ` | Total Expenses: $${totalExpense}`;
}

document.getElementById("import-excel").addEventListener("click", () => {
  const input = document.createElement("input");
  input.type = "file";
  input.accept = ".xlsx";

  input.addEventListener("change", (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();

      reader.onload = (e) => {
        const data = new Uint8Array(e.target.result);
        const workbook = XLSX.read(data, { type: "array" });
        const worksheet = workbook.Sheets[workbook.SheetNames[0]];
        const excelData = XLSX.utils.sheet_to_json(worksheet);

        // Assuming the Excel data has columns "Description" and "Amount"
        expenses = expenses.concat(excelData);
        updateExpenseTable();
      };

      reader.readAsArrayBuffer(file);
    }
  });

  input.click();
});
const todoTasks =JSON.parse(localStorage.getItem("todoTasks")) || [];

document.getElementById("add-task").addEventListener("click", () => {
  const taskDescription = document.getElementById("todo-task").value;
  const deadline = document.getElementById("todo-deadline").value;

  if (taskDescription && deadline) {
    const task = { description: taskDescription, deadline };
    todoTasks.push(task);
    localStorage.setItem("todoTasks", JSON.stringify(todoTasks));
    updateTaskList();
    document.getElementById("todo-task").value = "";
    document.getElementById("todo-deadline").value = "";
  }
});

function updateTaskList() {
  const taskList = document.getElementById("task-list");
  taskList.innerHTML = "";

  for (const task of todoTasks) {
    const listItem = document.createElement("li");
    listItem.innerHTML = `
        <strong>${task.description}</strong> (Deadline: ${task.deadline})
    `;
    taskList.appendChild(listItem);
  }
}

// Add code for notifications (browser notifications or other notification services).
// You'll need to use additional libraries or APIs for this functionality.
const budgetCtx = document.getElementById("budget-chart").getContext("2d");
let budgetChart = null;

function createBudgetChart() {
  if (budgetChart) {
    budgetChart.destroy();
  }

  budgetChart = new Chart(budgetCtx, {
    type: "pie",
    data: {
      labels: ["Spent", "Remaining", "income"],
      datasets: [
        {
          data: [
            calculateTotalExpenses(),
            budget - calculateTotalExpenses(),
            additionalIncome,
          ],
          backgroundColor: ["#FF5733", "#36A2EB", "#FF69B4"],
        },
      ],
    },
  });
}

function calculateTotalExpenses() {
  let totalExpense = 0;
  for (const expense of expenses) {
    totalExpense += expense.amount;
  }
  return totalExpense;
}

// Update the chart whenever a new expense is added or budget is set.
document.getElementById("set-budget").addEventListener("click", () => {
  createBudgetChart();
});

document.getElementById("add-expense").addEventListener("click", () => {
  createBudgetChart();
});

document.getElementById("add-income").addEventListener("click", () => {
  createBudgetChart();
});
// Initialize the chart when the page loads.

document.addEventListener("DOMContentLoaded",() => {createBudgetChart();
  updateTaskList();} );

