describe("Product Management Page", () => {
  beforeEach(() => {
    cy.visit("http://localhost:5173/products");
  });

  it("renders the product management page", () => {
    cy.contains("Product Management").should("be.visible");
    cy.contains("Products List").should("be.visible");
    cy.get('input[placeholder*="Search by name"]').should("exist");
  });

  it("navigates to add product page", () => {
    cy.contains("Add Product").click();
    cy.url().should("include", "/products/add");
  });

  it("displays product table with data or fallback message", () => {
    cy.get("table").should("exist");

    cy.get("tbody tr").then((rows) => {
      if (rows.length === 1 && rows.text().includes("No products found")) {
        cy.contains("No products found").should("exist");
      } else {
        cy.get("tbody tr").first().find("td").each(($td) => {
          cy.wrap($td).invoke("text").should("not.be.empty");
        });
      }
    });
  });

  it("filters products by search term", () => {
    cy.get('input[placeholder*="Search by name"]').type("Test", { delay: 100 });
    cy.get("tbody tr").each(($row) => {
      cy.wrap($row).should("contain.text", "Test");
    });
  });

  it("clicks the edit button if products are available", () => {
    cy.get("tbody tr").then((rows) => {
      if (!rows.text().includes("No products found")) {
        cy.get('button[title="Edit Product"]').first().click();
        cy.url().should("include", "/products/update");
      } else {
        cy.log("No products to test Edit button");
      }
    });
  });

  it("clicks delete button, cancels via modal", () => {
    cy.get("tbody tr").then((rows) => {
      if (!rows.text().includes("No products found")) {
        cy.get('button[title="Delete Product"]').first().click();
        cy.contains("Confirm Deletion").should("be.visible");
        cy.contains("Cancel").click();
        cy.contains("Product Deleted Successfully").should("not.exist");
      } else {
        cy.log("No products to test Delete button");
      }
    });
  });

  it("clicks delete button, confirms via modal", () => {
    cy.get("tbody tr").then((rowsBefore) => {
      if (!rowsBefore.text().includes("No products found")) {
        const initialCount = rowsBefore.length;

        cy.get('button[title="Delete Product"]').first().click();
        cy.contains("Confirm Deletion").should("be.visible");
        cy.contains("Delete").click();

        cy.contains("Product Deleted Successfully").should("be.visible");
        cy.get("tbody tr", { timeout: 5000 }).should("have.length.lessThan", initialCount);
      } else {
        cy.log("No products to test delete confirmation");
      }
    });
  });
});
