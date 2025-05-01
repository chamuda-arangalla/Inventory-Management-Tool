describe("Add Supplier Form", () => {
  beforeEach(() => {
    cy.visit("http://localhost:5173/suppliers/add");
  });

  it("navigates back when Back button is clicked", () => {
    cy.get("[data-cy='btn-back']").click();
    cy.url().should("include", "/suppliers");
  });

  it("shows required validation on empty form submission", () => {
    cy.get("[data-cy='btn-submit']").click();
    cy.contains("All fields are required").should("be.visible");
  });

  it("submits the form with valid inputs", () => {
    const uniqueId = `SUP-${Date.now()}`;
    cy.get("[data-cy='input-supplierId']").type(uniqueId);
    cy.get("[data-cy='input-name']").type("Cypress Supplier");
    cy.get("[data-cy='input-contact']").type("0771234567");
    cy.get("[data-cy='input-address']").type("123, Cypress Street");
    cy.get("[data-cy='input-email']").type("supplier@example.com");

    cy.intercept("POST", "/api/suppliers/createSupplier").as("createSupplier");

    cy.get("[data-cy='btn-submit']").click();

    cy.contains("Supplier added successfully").should("exist");
  });
});
