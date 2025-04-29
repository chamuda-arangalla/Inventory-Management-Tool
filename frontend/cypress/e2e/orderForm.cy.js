describe("Order Form", () => {
  beforeEach(() => {
    cy.visit("http://localhost:5173/orders/createorder");
  });

  //test case 01 - reset button
  it("should reset form on clicking Reset button", () => {
    cy.get("#customerName").type("John Doe");
    cy.get("#phoneNumber").type("0771234567");
    cy.get("#address").type("Colombo");

    // Select a different date
    cy.get('input[name="orderDate"]')
      .click()
      .then(() => {
        cy.get(".react-datepicker__day--015").first().click();
      });

    // Open product dropdown and select a product
    cy.get('[data-cy="toggle-product-dropdown"]').click();

    // Select first product
    cy.get('[data-cy^="product-checkbox-"]').first().check({ force: true });

    // Set quantity
    cy.get('[data-cy^="product-quantity-"]').first().clear().type("2");

    cy.contains("Reset Form").click();

    cy.get("#customerName").should("have.value", "");
    cy.get("#phoneNumber").should("have.value", "");
    cy.get("#address").should("have.value", "");

    // Assert that date is reset to today (optional check, based on today's date)
    const today = new Date();
    const formattedToday = today.toLocaleDateString("en-US", {
      month: "long",
      day: "numeric",
      year: "numeric",
    });
    cy.get('input[name="orderDate"]').should("have.value", formattedToday);

    // Assert that no products are selected
    // cy.get('[data-cy^="product-checkbox-"]').each(($el) => {
    //   cy.wrap($el).should("not.be.checked");
    // });

    // Assert total price is zero
    cy.get('[data-cy="order-total-amount"]').should("contain", "Rs. 0.00");
  });

  //test case 02 - form filling
  it("should allow filling order information", () => {
    cy.get("#customerName").type("John Doe");
    cy.get("#phoneNumber").type("0771234567");
    cy.get("#address").type("Colombo");

    // Select a different date
    cy.get('input[name="orderDate"]')
      .click()
      .then(() => {
        cy.get(".react-datepicker__day--025").first().click();
      });

    // Open product dropdown and select a product
    cy.get('[data-cy="toggle-product-dropdown"]').click();

    // Select first product (assuming at least one product is loaded)
    cy.get('[data-cy^="product-checkbox-"]').first().check({ force: true });

    // Set quantity
    cy.get('[data-cy^="product-quantity-"]').first().clear().type("2");
  });

  // test case 03 - empty form submition
  it("should show error if trying to submit empty form", () => {
    cy.contains("Place Order").click();
    cy.contains("Please fill out all required fields!").should("exist");
  });

  //test case 04 - phone number validation
  it("should show error for invalid phone number", () => {
    cy.get("#customerName").type("John Doe");
    cy.get("#phoneNumber").type("abc123");
    cy.get("#address").type("Colombo");

    // Select a different date
    cy.get('input[name="orderDate"]')
      .click()
      .then(() => {
        cy.get(".react-datepicker__day--025").first().click();
      });

    // Open product dropdown and select a product
    cy.get('[data-cy="toggle-product-dropdown"]').click();

    // Select first product (assuming at least one product is loaded)
    cy.get('[data-cy^="product-checkbox-"]').first().check({ force: true });

    // Set quantity
    cy.get('[data-cy^="product-quantity-"]').first().clear().type("2");

    cy.contains("Place Order").click();
    cy.contains("Phone number must be exactly 10 digits").should("exist");
  });

  //test case 05 - place order button ckecking
  it("should submit form successfully with valid data", () => {
    cy.get("#customerName").type("John Doe");
    cy.get("#phoneNumber").type("0771234567");
    cy.get("#address").type("Colombo");

    // Select a different date
    cy.get('input[name="orderDate"]')
      .click()
      .then(() => {
        cy.get(".react-datepicker__day--025").first().click();
      });

    // Open product dropdown and select a product
    cy.get('[data-cy="toggle-product-dropdown"]').click();

    // Select first product (assuming at least one product is loaded)
    cy.get('[data-cy^="product-checkbox-"]').first().check({ force: true });

    // Set quantity
    cy.get('[data-cy^="product-quantity-"]').first().clear().type("2");

    cy.contains("Place Order").click();
    cy.contains("Order placed successfully!").should("exist");

    //reset form after submitting
    cy.get("#customerName").should("have.value", "");
    cy.get("#phoneNumber").should("have.value", "");
    cy.get("#address").should("have.value", "");

    // Assert that date is reset to today (optional check, based on today's date)
    const today = new Date();
    const formattedToday = today.toLocaleDateString("en-US", {
      month: "long",
      day: "numeric",
      year: "numeric",
    });
    cy.get('input[name="orderDate"]').should("have.value", formattedToday);

    // Assert that no products are selected
    // cy.get('[data-cy^="product-checkbox-"]').each(($el) => {
    //   cy.wrap($el).should("not.be.checked");
    // });

    // Assert total price is zero
    cy.get('[data-cy="order-total-amount"]').should("contain", "Rs. 0.00");
  });
});
