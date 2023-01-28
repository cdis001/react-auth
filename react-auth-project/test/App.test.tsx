import { render, screen } from "@testing-library/react";

import App from "../src/pages/App";

test("full app rendering", () => {
  render(<App />);
});
