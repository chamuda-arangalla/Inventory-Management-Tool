describe("Update Product Page", () => {
    const productId = "680a3670b6a0922b77c7aa14";
    const apiBase = "/api/products";
  
    beforeEach(() => {
      cy.intercept("GET", `${apiBase}/getOneProduct/${productId}`, {
        statusCode: 200,
        body: {
          singleProduct: {
            productName: "Test Product",
            productCode: "TP100",
            productUnitPrice: "49.99",
            productQuantity: "5",
          },
        },
      }).as("getProduct");
  
      cy.intercept("PATCH", `${apiBase}/updateProduct/${productId}`, {
        statusCode: 200,
        body: {
          message: "Product updated successfully",
        },
      }).as("updateProduct");
  
      cy.visit(`http://localhost:5173/products/update/${productId}`);
      cy.wait("@getProduct");
    });
  
    it("should load product data into the form", () => {
      cy.get("input[name='productName']").should("have.value", "Test Product");
      cy.get("input[name='productCode']").should("have.value", "TP100");
      cy.get("input[name='productUnitPrice']").should("have.value", "49.99");
      cy.get("input[name='productQuantity']").should("have.value", "5");
    });
  
    it("should allow updating the product", () => {
      cy.get("input[name='productName']").clear().type("Updated Product");
      cy.get("input[name='productCode']").clear().type("UPD999");
      cy.get("input[name='productUnitPrice']").clear().type("99.99");
      cy.get("input[name='productQuantity']").clear().type("20");
  
      cy.window().then((win) => {
        cy.stub(win, "confirm").returns(true);
      });
  
      cy.get("form").submit();
      cy.wait("@updateProduct").its("request.body").should("deep.equal", {
        productName: "Updated Product",
        productCode: "UPD999",
        productUnitPrice: "99.99",
        productQuantity: "20",
      });
  
      cy.contains("Product is updated 🤩");
    });
  });
  