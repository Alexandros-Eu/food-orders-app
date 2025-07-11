# React Food Orders App

A sleek and functional single-page food ordering application built with modern React. This project allows users to browse a menu, add meals to a shopping cart, and submit their order through a clean, modal-based interface. It serves as a practical example of building a real-world application using React Hooks, Context API for state management, and asynchronous communication with a backend server.

## Features

-   **Dynamic Meal Catalog:** Fetches and displays a list of available meals from a backend.
-   **Interactive Shopping Cart:** Add items to the cart, adjust quantities, and see the total price update in real-time.
-   **Seamless User Experience:** Utilizes modals for the cart and checkout process, allowing users to complete their order without navigating away from the main page.
-   **Form Handling & Submission:** A straightforward checkout form captures user details and submits the complete order to the backend.
-   **Asynchronous Operations Handling:** Gracefully manages loading and error states for all API interactions, providing clear feedback to the user.

## Core Technologies & Concepts

This project is built with a focus on modern React practices:

-   **React.js:** The core library for building the user interface.
-   **React Hooks:** Extensive use of `useState`, `useEffect`, `useContext`, `useRef` for managing component state and side effects.
-   **React Context API:** Provides global state management to avoid prop-drilling, with dedicated contexts for:
    -   `AppContext`: Manages all shopping cart logic (items, adding/removing, clearing).
-   **Styling:** Clean and maintainable styling using standard CSS, scoped where necessary.

## Getting Started

To get a local copy up and running, follow these simple steps.

### Prerequisites

-   You must have Node.js (which includes npm) installed on your machine.

### Setup & Installation

1.  **Clone the repository:**
    ```sh
    git clone https://github.com/Alexandros-Eu/food-orders-app.git
    cd food-orders-app
    ```

2.  **Run the Backend Server:**
    This project requires a backend to serve meal data and receive orders. A simple Node.js backend is typically provided alongside the course materials for this project.

    -   Navigate into the `backend` directory.
    -   Install its dependencies: `npm install`
    -   Start the server: `npm start`

    The backend will run on `http://localhost:3000`.

3.  **Install Frontend Dependencies:**
    In the root project directory (`food-orders-app`), install the necessary packages for the React app.
    ```sh
    npm install
    ```

4.  **Run the React Application:**
    ```sh
    npm run dev
    ```
    This will start the development server and open the application in your default browser, usually at `http://localhost:3001`.

## Project Structure

The project is organized into a logical and scalable structure.

```
food-orders-app/
├── public/
│   └── ...
├── src/
│   ├── assets/           # Images and other static assets
│   ├── components/       # All React components
│   │   ├── UI/           # General-purpose UI components (Button, Input, Modal)
│   │   ├── Cart/         # Components related to the shopping cart
│   │   ├── Checkout.jsx  # The checkout form component
│   │   ├── Header.jsx    # The main application header
│   │   ├── Meals.jsx     # Component to display the container for all available meals
│   │   ├── Meal.jsx      # Component to display the meal and relevant information
│   │   └── Success.jsx   # The Success component for when an order is completed
│   ├── state/            # React Context files for state management
│   ├── App.jsx           # Main application component where contexts and components are wired together
│   ├── index.css         # Global styles
│   └── index.jsx         # The entry point of the React application
├── .gitignore
├── package.json
└── README.md
```
## How It Works

### State Management (AppContext.jsx)

The application's state is managed using React's Context API (`AppContext.jsx`), which provides a way to pass data through the component tree without having to pass props down manually at every level. This approach simplifies state management for the shopping cart and related data.

Key aspects of state management include:

-   **Cart Items (`cartItems`):** Manages the list of items added to the cart, including details like name, price, and quantity.
-   **Cart Counter (`cartCounter`):** Keeps track of the total number of items in the cart.
-   **Functions for Cart Manipulation:**
    -   `handleAddMeal`: Adds a new meal to the cart or increases the quantity if it already exists.
    -   `handleItemRemoval`: Removes an item from the cart or decreases the quantity.
    -   `handleItemAddition`: Increases the quantity of an item in the cart.
    -   `clearCart`: Empties the cart and resets the counter.

### Data Fetching & Submission

Data fetching and submission are handled within specific components using the `fetch` API. For instance, the `Meals` component fetches the list of available meals, and the `Checkout` component submits the order details to the backend.

### Component Architecture

-   **Modals (Cart.jsx, Checkout.jsx, Success.jsx):** Reusable modal components built using the `<dialog>` element. They are controlled imperatively via `useRef` and `useImperativeHandle` within their parent components (`App.jsx`), allowing for flexible integration and control over modal visibility for different use cases (cart management, checkout process, success confirmation).

-   **App.jsx:** The root component that orchestrates the entire application. It wraps the app with the `AppProvider` to enable global state management and renders key components such as `Header`, `Meals`, and the various modals (`Cart`, `Checkout`, `Success`) based on user interactions and state.







