describe("OrdersList Component - Data Fetching", () => {
  beforeEach(() => {
    cy.visit("http://localhost:5173/orders");
  });

  //test case 01 - check and display order data in the table
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

  //test case 02 - check update status
  it("should update order status and show a success toast message", () => {
    cy.intercept("GET", "http://localhost:6500/api/orders").as("getOrders");
    cy.intercept("PUT", /http:\/\/localhost:6500\/api\/orders\/.*/).as(
      "updateOrder"
    );

    // Wait for orders to load
    cy.wait("@getOrders");

    // Make sure there's at least one order row
    cy.get('[data-cy="orders-table"] tbody tr')
      .its("length")
      .should("be.gt", 0);

    // Find the first order's status select and change it to 'Delivered'
    cy.get('[data-cy^="status-select-"]').first().as("statusSelect");

    cy.get("@statusSelect").then(($select) => {
      const currentValue = $select.val();
      const newValue = currentValue === "Delivered" ? "Cancelled" : "Delivered";

      cy.get("@statusSelect").select(newValue);

      // Wait for the PUT request
      cy.wait("@updateOrder");

      // Verify the toast appears
      cy.contains(`Order status updated to ${newValue}`).should("be.visible");

      // Optionally confirm the new value is selected
      cy.get("@statusSelect").should("have.value", newValue);
    });
  });

  //test case 03 - check delete button
  it("should delete an order after confirmation", () => {
    cy.intercept("GET", "http://localhost:6500/api/orders").as("getOrders");
    cy.intercept("DELETE", /http:\/\/localhost:6500\/api\/orders\/.*/).as(
      "deleteOrder"
    );

    // Wait for the orders to load
    cy.wait("@getOrders");

    // Ensure at least one row exists
    cy.get('[data-cy="orders-table"] tbody tr')
      .its("length")
      .should("be.gt", 0);

    // Get the first delete button and click it
    cy.get('[data-cy^="delete-button-"]').first().click();

    // The modal should appear
    cy.get('[data-cy="confirm-delete-button"]').should("be.visible");

    // Confirm deletion
    cy.get('[data-cy="confirm-delete-button"]').click();

    // Wait for DELETE request
    cy.wait("@deleteOrder");

    //Verify the toast appears
    cy.contains("Order deleted successfully!").should("be.visible");

    // (Optional) Ensure row count decreases or UI updates
    cy.get('[data-cy="orders-table"] tbody tr').should("exist");
  });
});
