# Financial Tracker App

This project is a financial tracker application built with **React**, **Firebase**, and **Ant Design**. The app allows users to track their income and expenses, visualize financial statistics, and manage transactions. It also provides features like exporting and importing CSV files and allows users to sign in securely using Firebase authentication.

## Features

- **User Authentication**: 
  - Users can sign up using email and password or Google authentication.
  - User login state is preserved across page refreshes.
  
- **Transaction Management**: 
  - Add, update, and delete income and expense transactions.
  - View transactions in a table with filtering options based on name, income, or expenses.
  - Sort transactions by date and amount.
  - Modals for adding and editing transactions.

- **Financial Visualization**: 
  - Visualize financial statistics through charts and graphs, including:
    - Total income
    - Total expenses
    - Current balance
    - Total spending
  - Use of **Ant Design** for graphs, tables, and UI components.

- **CSV Support**: 
  - Export transactions to a CSV file.
  - Import transactions from a CSV file.

- **Responsive Design**: 
  - The app is designed to be responsive and works well on both desktop and mobile devices.
  - Ensures a consistent user experience across various screen sizes.

## Technologies Used

- **React**: For building the user interface.
- **Firebase**: For authentication and Firestore database management.
- **Ant Design**: For UI components like tables, forms, and charts.
- **Chart.js**: For rendering financial graphs.
- **CSV File Handling**: For importing and exporting transaction data.

## Setup Instructions

### Prerequisites

- Node.js and npm should be installed on your machine.

### Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/your-username/financial-tracker.git


### Set up Firebase:
- Create a project in Firebase Console.
- Enable Firebase Authentication (Email/Password and Google).
- Set up Firestore database.
- Obtain Firebase config details and add them to your project.

Features in Detail

### Authentication
- Sign Up: Users can sign up using email and password or Google authentication.
- Login: Users can log in with the credentials they created during sign-up.
- Persistent Session: Firebase authentication ensures that the user’s session persists across page refreshes.
### Transaction Management
- Add Transactions: Users can add income or expense transactions via modals.
- Edit/Delete Transactions: Users can update or remove existing transactions.
- Transaction Filtering: Filter transactions by name, income, or expense using a select dropdown and a search box.
- Sorting: Transactions can be sorted by date and amount.
### Financial Statistics
- Income and Expenses: Visualize the total income, expenses, and balance.
- Spending Graph: Display a graph showing total spending over time.
- Charts: Use Ant Design and Chart.js to display visual insights of the financial data.
### CSV Support
- Export CSV: Users can export their transaction data as a CSV file.
- Import CSV: Users can import transactions from a CSV file.
### Responsive Design
- The app is designed to be fully responsive, providing a consistent experience across both desktop and mobile devices.