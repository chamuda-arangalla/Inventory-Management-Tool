describe("View Suppliers Page", () => {
  beforeEach(() => {
    cy.visit("http://localhost:5173/suppliers");
  });

  it("renders the page with Add Supplier button and table", () => {
    cy.get('[data-cy="add-supplier-btn"]').should("exist");
    cy.get('[data-cy="supplier-table"]').should("exist");
  });

  it("navigates to edit page when Edit button is clicked", () => {
    cy.get('[data-cy="edit-btn"]').first().click();
    cy.url().should("include", "/suppliers/update");
  });

  it("searches suppliers correctly", () => {
    cy.get('[data-cy="search-input"]').type("John");
  });

  it("opens and cancels delete modal", () => {
    cy.get('[data-cy="delete-btn"]').first().click();
    cy.get('[data-cy="delete-modal"]').should("be.visible");
    cy.get('[data-cy="cancel-delete"]').click();
    cy.get('[data-cy="delete-modal"]').should("not.exist");
  });

  it("confirms delete and shows toast", () => {
    cy.get('[data-cy="delete-btn"]').first().click();
    cy.get('[data-cy="delete-modal"]').should("be.visible");
    cy.get('[data-cy="confirm-delete"]').click();

    cy.contains("Supplier deleted successfully!", { timeout: 4000 }).should(
      "be.visible"
    );
  });

  it("shows no results when search input mismatches", () => {
    cy.get('[data-cy="search-input"]').type("nonexistentsupplier123");
    cy.contains("No suppliers found").should("be.visible");
  });
});
