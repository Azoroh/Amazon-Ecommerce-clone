import { formatCurrency } from "../../scripts/utils/money.js";

//How to create a test suite in jasmine
describe("test suite: formatCurrency", () => {
  //create a test in jasmine
  it("converts cents into dollars", () => {
    //instead of writing an if statement to run our tests, jasmine uses expect() to achieve the same goal
    expect(formatCurrency(2095)).toEqual("20.95");
  });

  it("works with zero", () => {
    expect(formatCurrency(0)).toEqual("0.00");
  });

  it("rounds up to the nearest cent", () => {
    expect(formatCurrency(2000.5)).toEqual("20.01");
  });

  it("rounds down to the nearest cent", () => {
    expect(formatCurrency(2000.4)).toEqual("20.00");
  });
});
