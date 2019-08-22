import { mockDB } from "./testUtils";

describe("initial test", function() {
  it("should pass", function() {
    expect(1).toEqual(1);
  });

  it("should be able to mockDB", async function() {
    await mockDB();
  });
});
