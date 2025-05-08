const {
  isEmail,
  isValidCardholderName,
  isValidCardNumber,
} = require("./validators");

describe("Email validation", () => {
  test("Valid email", () => {
    expect(isEmail("test@example.com")).toBe(true);
  });
  test("Invalid email", () => {
    expect(isEmail("invalid-email")).toBe(false);
  });
});

describe("Cardholder name validation", () => {
  test("Valid name", () => {
    expect(isValidCardholderName("أحمد محمد")).toBe(true);
  });
  test("Too short", () => {
    expect(isValidCardholderName("A")).toBe(false);
  });
});

describe("Card number validation", () => {
  test("Valid number", () => {
    expect(isValidCardNumber("4242 4242 4242 4242")).toBe(true);
  });
  test("Invalid number", () => {
    expect(isValidCardNumber("abcd")).toBe(false);
  });
});
