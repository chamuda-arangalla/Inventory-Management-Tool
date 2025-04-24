describe("Product Management Page", () => {
    beforeEach(() => {
      cy.visit("http://localhost:5173/products");
    });
  
    it("renders the product management page", () => {
      cy.contains("Product Management").should("be.visible");
      cy.contains("Products List").should("be.visible");
      cy.get('input[placeholder*="Search"]').should("exist");
    });
  
    it("navigates to add product page", () => {
      cy.contains("Add Product").click();
      cy.url().should("include", "/products/add");
    });
  
    it("displays product table with data (if available)", () => {
      cy.get("table").should("exist");
  
      cy.get("tbody tr").then((rows) => {
        if (rows.length > 0) {
          cy.get("tbody tr").first().find("td").each(($td) => {
            cy.wrap($td).invoke("text").should("not.be.empty");
          });
        } else {
          cy.contains("No products found").should("exist");
        }
      });
    });
  
    it("filters products by search term", () => {
      cy.get('input[placeholder*="Search"]').type("Test", { delay: 100 });
      cy.get("tbody tr").each(($row) => {
        cy.wrap($row).should("contain.text", "Test");
      });
    });
  
    it("clicks the edit button if products are available", () => {
      cy.get("tbody tr").then((rows) => {
        if (rows.length > 0) {
          cy.get("tbody tr").first().find("button[title='Edit Product']").click();
          cy.url().should("include", "/products/update");
        } else {
          cy.log("No products to test Edit button");
        }
      });
    });
  
    it("clicks the delete button and cancels it", () => {
      cy.get("tbody tr").then((rows) => {
        if (rows.length > 0) {
          cy.window().then((win) => cy.stub(win, "confirm").returns(false));
          cy.get("tbody tr").first().find("button[title='Delete Product']").click();
          cy.contains("Product Deleted Successfully").should("not.exist");
        } else {
          cy.log("No products to test Delete button");
        }
      });
    });
  
    it("clicks the delete button and confirms it", () => {
        cy.get("tbody tr").then((rowsBefore) => {
          const initialCount = rowsBefore.length;
      
          if (initialCount > 0) {
            // Stub both confirm and alert
            cy.window().then((win) => {
              cy.stub(win, "confirm").returns(true);
              cy.stub(win, "alert").as("alertStub");
            });
      
            // Perform deletion
            cy.get("tbody tr").first().find("button[title='Delete Product']").click();
      
            // Assert that alert was shown
            cy.get("@alertStub").should("have.been.calledWith", "Product Deleted Successfully");
      
            // Check if redirected back to /products
            cy.url().should("include", "/products");
      
            // Check if row count reduced
            cy.get("tbody tr", { timeout: 5000 }).should("have.length.lessThan", initialCount);
          } else {
            cy.log("No products to test Delete confirmation");
          }
        });
      });
      
  });
  