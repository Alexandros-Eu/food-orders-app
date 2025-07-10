# React Food Orders App

A sleek and functional single-page food ordering application built with modern React. This project allows users to browse a menu, add meals to a shopping cart, and submit their order through a clean, modal-based interface. It serves as a practical example of building a real-world application using React Hooks, Context API for state management, and asynchronous communication with a backend server.

## Features

-   **Dynamic Meal Catalog:** Fetches and displays a list of available meals from a backend.
-   **Interactive Shopping Cart:** Add items to the cart, adjust quantities, and see the total price update in real-time.
-   **Seamless User Experience:** Utilizes modals for the cart and checkout process, allowing users to complete their order without navigating away from the main page.
-   **Form Handling & Submission:** A straightforward checkout form captures user details and submits the complete order to the backend.
-   **Robust State Management:** Centralized state management using React's Context API and `useReducer` hook for predictable state transitions.
-   **Asynchronous Operations Handling:** Gracefully manages loading and error states for all API interactions, providing clear feedback to the user.
-   **Custom Hooks:** Encapsulates complex logic, like HTTP requests, into reusable custom hooks (`useHttp`).

## Core Technologies & Concepts

This project is built with a focus on modern React practices:

-   **React.js:** The core library for building the user interface.
-   **React Hooks:** Extensive use of `useState`, `useEffect`, `useContext`, `useReducer`, `useRef`, and `useCallback` for managing component state and side effects.
-   **React Context API:** Provides global state management to avoid prop-drilling, with dedicated contexts for:
    -   `CartContext`: Manages all shopping cart logic (items, adding/removing, clearing).
    -   `UserProgressContext`: Manages the UI flow, such as which modal (cart or checkout) is currently active.
-   **Custom Hooks:** A custom `useHttp` hook encapsulates the logic for sending HTTP requests, handling loading/error states, and managing response data.
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
    -   Start the server: `node app.js`

    The backend will run on `http://localhost:3000`.

3.  **Install Frontend Dependencies:**
    In the root project directory (`food-orders-app`), install the necessary packages for the React app.
    ```sh
    npm install
    ```

4.  **Run the React Application:**
    ```sh
    npm start
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
│   │   └── Meals.jsx     # Component to display all available meals
│   ├── hooks/            # Custom hooks (e.g., useHttp)
│   ├── store/            # React Context files for state management
│   ├── App.jsx           # Main application component where contexts and components are wired together
│   ├── index.css         # Global styles
│   └── index.jsx         # The entry point of the React application
├── .gitignore
├── package.json
└── README.md
```

## How It Works

### State Management

The application's state is managed primarily through React's Context API, which provides a clean way to pass data through the component tree without prop-drilling.

-   **`CartContextProvider`**: This provider uses a `useReducer` hook to manage the complex state of the shopping cart. It exposes functions to add, remove, and clear items, which can be accessed by any component wrapped within it.

-   **`UserProgressContextProvider`**: A simpler context that manages the user's current step in the ordering process (e.g., `''`, `'cart'`, or `'checkout'`). This allows any component to trigger a change in the UI flow, such as opening the cart modal from the header.

### Data Fetching & Submission

The custom `useHttp(url, config, initialData)` hook is the cornerstone of communication with the backend. It abstracts away the `fetch` API logic and provides a clean, reusable interface for handling asynchronous operations.

-   It manages `isLoading`, `error`, and `data` states internally.
-   The `Meals` component uses it to fetch the list of available meals when it mounts.
-   The `Checkout` component uses it to send a POST request containing the order details and cart items to the backend. It also uses the hook's state to provide feedback to the user (e.g., "Sending order data...", "Order created!", or an error message).

### Component Architecture

-   **`Modal.jsx`**: A reusable modal component built with the `<dialog>` element. It's controlled imperatively via `useRef` and `useImperativeHandle` from parent components, making it robust and easy to integrate for different use cases (cart, checkout, success message).

-   **`App.jsx`**: The root component that brings everything together. It wraps the application in the context providers and renders the main components like `Header`, `Meals`, and the modals based on the user's progress state.



