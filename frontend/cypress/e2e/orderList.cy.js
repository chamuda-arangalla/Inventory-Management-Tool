describe("OrdersList Component - Data Fetching", () => {
  beforeEach(() => {
    cy.visit("http://localhost:5173/orders");
  });

  //test case 01 - 
  it("should fetch and display order data in the table", () => {
    // Intercept API call to monitor it
    cy.intercept("GET", "http://localhost:6500/api/orders").as("getOrders");

    // Wait for the GET request to finish
    cy.wait("@getOrders");

    // Check if the table is visible
    cy.get('[data-cy="orders-table"]').should("be.visible");

    // Check that the table has at least one row (excluding header)
    cy.get('[data-cy="orders-table"] tbody tr').should(
      "have.length.greaterThan",
      0
    );

    // Optional: check content of the first row
    cy.get('[data-cy="orders-table"] tbody tr')
      .first()
      .within(() => {
        cy.get("td").eq(0).should("not.be.empty");
        cy.get("td").eq(1).should("not.be.empty");
        cy.get("td").eq(2).should("not.be.empty");
        cy.get("td").eq(3).should("not.be.empty");
        cy.get("td").eq(4).should("not.be.empty");
        cy.get("td").eq(5).should("exist");
      });
  });
});
