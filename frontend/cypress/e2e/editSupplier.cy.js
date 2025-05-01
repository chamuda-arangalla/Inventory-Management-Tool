describe("Update Supplier Page", () => {
  const supplierId = "6813008a841b99196c950d02";
  const apiBase = "http://localhost:6500/api/suppliers";

  beforeEach(() => {
    // Intercept the GET request to fetch supplier
    cy.intercept("GET", `${apiBase}/${supplierId}`, {
      statusCode: 200,
      body: {
        _id: supplierId,
        supplierId: "SUP001",
        name: "ABC Supplies",
        contact: "0771234567",
        address: "123 Main Street",
        email: "abc@supplies.com",
      },
    }).as("getSupplier");

    // Intercept the PUT request to update supplier
    cy.intercept("PUT", `${apiBase}/${supplierId}`, {
      statusCode: 200,
      body: {
        message: "Supplier updated successfully",
      },
    }).as("updateSupplier");

    cy.visit(`http://localhost:5173/suppliers/update/${supplierId}`);
    cy.wait("@getSupplier");
  });

  it("should load supplier data into the form", () => {
    cy.get("[data-cy=input-supplierId]").should("have.value", "SUP001");
    cy.get("[data-cy=input-name]").should("have.value", "ABC Supplies");
    cy.get("[data-cy=input-contact]").should("have.value", "0771234567");
    cy.get("[data-cy=input-address]").should("have.value", "123 Main Street");
    cy.get("[data-cy=input-email]").should("have.value", "abc@supplies.com");
  });

  it("should allow updating the supplier and show toast message", () => {
    // Update values
    cy.get("[data-cy=input-supplierId]").clear().type("SUP999");
    cy.get("[data-cy=input-name]").clear().type("Updated Supplier");
    cy.get("[data-cy=input-contact]").clear().type("0712345678");
    cy.get("[data-cy=input-address]").clear().type("456 New Road");
    cy.get("[data-cy=input-email]").clear().type("updated@supplier.com");

    // Submit the form
    cy.get("[data-cy=btn-update]").click();

    // Check request body sent to API

    cy.wait("@updateSupplier").its("request.body").should("include", {
      supplierId: "SUP999",
      name: "Updated Supplier",
      contact: "0712345678",
      address: "456 New Road",
      email: "updated@supplier.com",
    });

    // Confirm toast message appears
    cy.contains("Supplier updated successfully", { timeout: 8000 }).should(
      "be.visible"
    );
  });
});
