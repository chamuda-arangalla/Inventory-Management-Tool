describe("User Registration Form", () => {
  const baseUrl = "http://localhost:5173/";
  const apiUrl = "/api/users/add";

  beforeEach(() => {
    cy.visit(baseUrl);
  });

  //TestCase 1:render the form correctly
  it("renders the form correctly", () => {
    cy.contains("User Registration").should("be.visible");
    cy.get("input[type='text']").should("have.length", 5);
    cy.get("input[type='date']").should("exist");
    cy.get("input[type='number']").should("exist");
    cy.get("select[name='marriedStatus']").should("exist");
    cy.get("input[type='file']").should("exist");
    cy.contains("Submit").should("be.visible");
  });

  //TestCase 2:check empty inputs  
  it("shows validation errors on empty form submission", () => {
    cy.get("button[type='submit']").click();
    cy.contains("Required").should("exist");
  });

  //TestCase 3:fill the form with unique data
  it("submits the form with valid unique data", () => {
    const unique = Date.now();
    const firstName = `John${unique}`;
    const lastName = `Doe${unique}`;

    cy.intercept("POST", apiUrl).as("addUser");

    cy.get("input[name='firstName']").type(firstName);
    cy.get("input[name='lastName']").type(lastName);
    cy.get("input[name='employeeId']").type(`EMP${unique}`);
    cy.get("input[name='nic']").type(`NIC${unique}`);
    cy.get("input[name='designation']").type("Engineer");
    cy.get("input[name='birthDate']").type("1995-06-15");
    cy.get("select[name='marriedStatus']").select("married");
    cy.get("input[name='age']").type("29");

    const imagePath = "images/sample-image.png";
    cy.get("input[type='file']").selectFile(`cypress/fixtures/${imagePath}`, { force: true });

    // stub toast notification (if required)
    cy.window().then((win) => {
      cy.stub(win.console, "log").as("consoleLog");
    });

    cy.get("button[type='submit']").click();

    cy.wait("@addUser").then((interception) => {
      expect(interception?.response?.statusCode).to.be.oneOf([200, 201]);
    });

    // Check if form was reset
    cy.get("input[name='firstName']").should("have.value", "");
    cy.get("input[name='lastName']").should("have.value", "");
    cy.get("input[name='employeeId']").should("have.value", "");
    cy.get("input[name='nic']").should("have.value", "");
    cy.get("input[name='designation']").should("have.value", "");
    cy.get("input[name='birthDate']").should("have.value", "");
    cy.get("input[name='age']").should("have.value", "");
  });


  //TestCase 4:displays loading indicator during submission
  it("displays loading message while submitting", () => {
    const unique = Date.now();
    cy.intercept("POST", apiUrl, (req) => {
      req.reply((res) => {
        res.delay = 1000;
        res.send({ statusCode: 201 });
      });
    }).as("addUser");

    cy.get("input[name='firstName']").type(`John${unique}`);
    cy.get("input[name='lastName']").type(`Doe${unique}`);
    cy.get("input[name='employeeId']").type(`EMP${unique}`);
    cy.get("input[name='nic']").type(`NIC${unique}`);
    cy.get("input[name='designation']").type("Engineer");
    cy.get("input[name='birthDate']").type("1995-06-15");
    cy.get("select[name='marriedStatus']").select("single");
    cy.get("input[name='age']").type("25");

    cy.get("input[type='file']").selectFile("cypress/fixtures/images/sample-image.png", { force: true });

    cy.get("button[type='submit']").click();
    cy.contains("Loading...").should("be.visible");
    cy.wait("@addUser");
  });
});
