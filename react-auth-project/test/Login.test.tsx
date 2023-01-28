import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { RecoilRoot } from "recoil";

import App from "../src/pages/App";
import Login from "../src/pages/Login";

test("rendering a component that uses useLocation", () => {
  const route = "/login";

  render(
    <RecoilRoot>
      <MemoryRouter initialEntries={[route]}>
        <Login />
      </MemoryRouter>
    </RecoilRoot>
  );
  const userIdInput = screen.getByTestId("userIdInput");
  const passwordInput = screen.getByTestId("passwordInput");
  const loginBtn = screen.getByTestId("loginBtn");
  const signInBtn = screen.getByTestId("signInBtn");

  expect(userIdInput).toBeInTheDocument();
  expect(passwordInput).toBeInTheDocument();
  expect(loginBtn).toBeInTheDocument();
  expect(signInBtn).toBeInTheDocument();
});
