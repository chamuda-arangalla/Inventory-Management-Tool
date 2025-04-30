describe("User Registration Form", () => {
    beforeEach(() => {
      cy.visit("http://localhost:5173/"); // Updated URL as per your component setup
    });
  
    it("renders the form correctly", () => {
      cy.contains("User Registration").should("be.visible");
      cy.get("input[type='text']").should("have.length", 5);
      cy.get("input[type='date']").should("exist");
      cy.get("input[type='number']").should("exist");
      cy.get("select[name='marriedStatus']").should("exist");
      cy.get("input[type='file']").should("exist");
      cy.contains("Submit").should("be.visible");
    });
  
    it("shows validation messages on empty submission", () => {
      cy.get("form").submit();
  
      cy.contains("Required").should("have.length.at.least", 1);
      cy.contains("Required").should("be.visible");
    });
  
    it("fills the form and submits it successfully", () => {
      cy.get("input[name='firstName']").type("John");
      cy.get("input[name='lastName']").type("Doe");
      cy.get("input[name='employeeId']").type("EMP123");
      cy.get("input[name='nic']").type("123456789V");
      cy.get("input[name='designation']").type("Software Engineer");
      cy.get("input[name='birthDate']").type("1990-05-20");
      cy.get("select[name='marriedStatus']").select("married");
      cy.get("input[name='age']").type("33");
  
      const imagePath = "images/sample-user.jpg"; 
      cy.get("input[type='file']").selectFile(`cypress/fixtures/${imagePath}`, { force: true });
  
      cy.intercept("POST", "/api/users").as("addUser");
  
      cy.get("button[type='submit']").click();
  
      cy.wait("@addUser").its("response.statusCode").should("eq", 200);
  
      cy.contains("User added successfully!").should("exist");
    });
  
    it("resets the form after successful submission", () => {
      cy.get("input[name='firstName']").type("John");
      cy.get("input[name='lastName']").type("Doe");
      cy.get("input[name='employeeId']").type("EMP123");
      cy.get("input[name='nic']").type("123456789V");
      cy.get("input[name='designation']").type("Software Engineer");
      cy.get("input[name='birthDate']").type("1990-05-20");
      cy.get("select[name='marriedStatus']").select("married");
      cy.get("input[name='age']").type("33");
  
      const imagePath = "images/dp-sample-image.jpg";
      cy.get("input[type='file']").selectFile(`cypress/fixtures/${imagePath}`, { force: true });
  
      cy.intercept("POST", "/api/users").as("addUser");
  
      cy.get("button[type='submit']").click();
  
      cy.wait("@addUser").its("response.statusCode").should("eq", 200);
  
      cy.contains("User added successfully!").should("exist");
  
      cy.get("input[name='firstName']").should("have.value", "");
      cy.get("input[name='lastName']").should("have.value", "");
      cy.get("input[name='employeeId']").should("have.value", "");
    });
  });