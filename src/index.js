import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Tutorial from "./Tutorial";
import { theme } from "./theme";
import { ThemeProvider } from "@mui/material";

const root = ReactDOM.createRoot(document.getElementById("root"));

const router = createBrowserRouter([
    { path: "/", element: <App /> },
    { path: "/tutorial", element: <Tutorial /> },
]);

root.render(
    <React.StrictMode>
        <ThemeProvider theme={theme}>
            <RouterProvider router={router} />
        </ThemeProvider>
    </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
