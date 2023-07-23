import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { HomePage } from "./pages/Home/Home.page.tsx";
import { CrosscheckPage } from "./pages/Crosscheck/Crosscheck.page.tsx";
import { store } from './store'
import { Provider } from 'react-redux'
const router = createBrowserRouter([
  {
    path: "/",
    element: <CrosscheckPage />,
  },
  {
    path: "/home",
    element: <HomePage />,
  },
  {
    path: "/crosscheck",
    element: <CrosscheckPage />,
  },
]);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </React.StrictMode>
);
