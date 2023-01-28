import { login } from "../src/__users/api";

test("login api", () => {
  const { status } = login({ userId: "user01", password: "123" });

  expect(status).toBe("success");
});
