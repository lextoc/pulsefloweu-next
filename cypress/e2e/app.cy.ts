const email = "cypress@example.com";
const password = "cypress";

describe("App", () => {
  beforeEach(() => {
    cy.viewport(1920, 1080);
    cy.visit("http://localhost:3001/");
    cy.contains("Hey there!").should("be.visible");
    cy.get('input[name="email"]').type(email);
    cy.get('input[name="password"]').type(password);
    cy.get('button[type="submit"]').click();
    cy.contains("cypresshill").should("be.visible");
  });

  it("should sign in and out", () => {
    cy.get('[data-testid="profile-popover"]').click();
    cy.get('[data-testid="signout-button"]').click();
    cy.contains("Hey there!").should("be.visible");
  });

  it("should start/stop a timer", () => {
    cy.get("a").contains("Dashboard").click();
    cy.get("a").contains("Cypress").click();
    cy.get("a").contains("Tests").click();
    cy.get('[data-testid="task-base-timer"').click();
    cy.get("div").contains("Time entry has been created");
    cy.wait(1000);
    cy.get('[data-testid="task-base-timer"').click();
    cy.get("div").contains("Time entry has been updated");
  });
});
