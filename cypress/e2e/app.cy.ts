const email = "cypress@example.com";
const password = "cypress";

describe("App", () => {
  beforeEach(() => {
    cy.viewport(1920, 1080);

    cy.visit("http://localhost:3001/");
  });

  it("should land on the home page", () => {
    cy.contains("Hey there!").should("be.visible");
  });

  it("should sign in", () => {
    cy.get('input[name="email"]').type(email);
    cy.get('input[name="password"]').type(password);
    cy.get('button[type="submit"]').click();

    cy.contains("cypresshill").should("be.visible");
  });
});
