import { render, screen, fireEvent } from "@testing-library/react";
import Login from "../components/Login";
import { BrowserRouter } from "react-router-dom";

test("renders login form", () => {
  render(
    <BrowserRouter>
      <Login isAuthenticated={false} setIsAuthenticated={() => {}} />
    </BrowserRouter>
  );

  const emailField = screen.getByPlaceholderText(/Enter email/i);
  const passwordField = screen.getByPlaceholderText(/Password/i);
  const button = screen.getByRole("button", { name: /submit/i });

  expect(emailField).toBeInTheDocument();
  expect(passwordField).toBeInTheDocument();
  expect(button).toBeInTheDocument();
});
