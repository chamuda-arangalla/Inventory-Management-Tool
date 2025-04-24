describe("Add Product Form", () => {
    beforeEach(() => {
      cy.visit("http://localhost:5173/products/add");
    });
  
    it("renders the form correctly", () => {
      cy.contains("Add New Product").should("be.visible");
      cy.get("input[type='text']").should("have.length", 4);
      cy.get("input[type='file']").should("exist");
      cy.contains("Create Product").should("be.visible");
    });
  
    it("shows validation messages on empty submission", () => {
      cy.get("form").submit();
  
      cy.contains("Please enter product name").should("be.visible");
      cy.contains("Please enter product code").should("be.visible");
      cy.contains("Please enter unit price").should("be.visible");
      cy.contains("Please enter quantity").should("be.visible");
      cy.contains("Please select a product image").should("be.visible");
    });
  
    it("fills the form and submits it successfully", () => {
      cy.get("input[placeholder='Enter product name']").type("Test Product");
      cy.get("input[placeholder='Enter product code']").type("TP123");
      cy.get("input[placeholder='Enter unit price']").type("150.50");
      cy.get("input[placeholder='Enter quantity']").type("10");
  
      const imagePath = "images/sample-product.jpeg";
      cy.get("input[type='file']").selectFile(`cypress/fixtures/${imagePath}`, { force: true });
  
      cy.intercept("POST", "/api/products/createProduct").as("createProduct");
  
      cy.contains("Create Product").click();
  
      cy.wait("@createProduct").its("response.statusCode").should("eq", 200);
  
      cy.contains("Product added successfully").should("exist");
    });
  
    it("resets the form when clicking reset button", () => {
      cy.get("input[placeholder='Enter product name']").type("To be reset");
      cy.get("button").contains("Reset").click();
      cy.get("input[placeholder='Enter product name']").should("have.value", "");
    });
  });
  