import React from "react";
import ReactDOM from "react-dom/client";
import {App} from "./App.tsx";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./index.css";


import {ErrorPage} from "./error-page";
import { Root } from "./routes/root.tsx";
import { SignIn, SignUp } from "./routes/auth.tsx";
import { NoteView } from "./routes/NoteView.tsx";
import { CreateNote } from "./routes/CreateNote.tsx";
import { UpdateNote } from "./routes/updateNote.tsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    errorElement: <ErrorPage />,
    children:[
      {
        path: "/",
        element: <App />,
        errorElement: <ErrorPage />,
      },
      {
        path: "/note/:id",
        element: <NoteView />,
        errorElement: <ErrorPage />
      },
      {
        path: "/update/",
        element: <UpdateNote />,
        errorElement: <ErrorPage />
      },
      {
        path: "/new",
        element: <CreateNote />,
        errorElement: <ErrorPage />
      }
    ]
  },
  {
    path: "/signin",
    element: <SignIn />,
    errorElement: <ErrorPage />
  },
  {
    path: "/signup",
    element: <SignUp />,
    errorElement: <ErrorPage />
  },
])

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
