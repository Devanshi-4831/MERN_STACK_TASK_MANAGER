import request from "supertest";
import app from "../app.js";  // Your Express app

describe("POST /api/v1/user/register", () => {
  it("should register a new user", async () => {
    const res = await request(app)
      .post("/api/v1/user/register")
      .field("name", "Test User")
      .field("email", "test@example.com")
      .field("phone", "1234567890")
      .field("password", "test12345");

    expect(res.statusCode).toBe(201);
    expect(res.body).toHaveProperty("message");
  });
});
