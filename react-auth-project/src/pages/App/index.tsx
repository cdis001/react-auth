import React, { StrictMode } from "react";
import { createBrowserRouter, RouterProvider, Route } from "react-router-dom";
import { RecoilRoot } from "recoil";

import Main from "../Main";
import Join from "../Join";
import Login from "../Login";
import "../../index.css";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Main />,
  },
  {
    path: "join",
    element: <Join />,
  },
  {
    path: "login",
    element: <Login />,
  },
]);

const App = () => {
  return (
    <StrictMode>
      <RecoilRoot>
        <RouterProvider router={router} />
      </RecoilRoot>
    </StrictMode>
  );
};
export default App;
