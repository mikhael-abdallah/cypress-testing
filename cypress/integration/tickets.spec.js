
describe("Tickets", () => {
    beforeEach(() => cy.visit("https://ticket-box.s3.eu-central-1.amazonaws.com/index.html"));

    it("fills all the text imput fields", ()  => {
        const firstName = "Michael";
        const lastName = "Bay";

        cy.get("#first-name").type(firstName);
        cy.get("#last-name").type(lastName);
        cy.get("#email").type("testingemail.com");
        cy.get("#requests").type("Vegetarian");
        cy.get("#signature").type(`${firstName} ${lastName}`);
    
    })

    it("select 2 tickets", () => {
        cy.get("#ticket-quantity").select("2");
    })

    it("check vip in ticket type", () => {
        cy.get("#vip").check();
    })

    it("Select checkbox", () => {
        cy.get("#social-media").check();
    })

    it("Select friend and publication, but uncheck friend", () => {
        cy.get("#friend").check();
        cy.get("#publication").check();
        cy.get("#friend").uncheck();
    });

    it("has 'TICKETBOX' headr's heading", () => {
        cy.get("header h1").should("contain", "TICKETBOX")
    });

    it("alerts on invalid email", () => {
        cy.get("#email")
        .as("email")
        .type("testando-gmail.com");

        cy.get("#email.invalid").should("exist");

        cy.get("@email")
        .clear()
        .type("testando@gmail.com");

        cy.get("#email.invalid").should("not.exist");

    })

    it("fill and reset the form", () => {
        const firstName = "Michael";
        const lastName = "Bay";
        const fullName = `${firstName} ${lastName}`

        cy.get("#first-name").type(firstName);
        cy.get("#last-name").type(lastName);
        cy.get("#email").type("testing@email.com");
        cy.get("#ticket-quantity").select("2");
        cy.get("#vip").check();
        cy.get("#friend").check();
        cy.get("#requests").type("Todynho");

        cy.get(".agreement p").should(
            "contain",
            `I, ${fullName}, wish to buy 2 VIP tickets.`
        );

        cy.get("#agree").click();
        cy.get("#signature").type(`${fullName}`);

        cy.get("button[type='submit']")
            .as("submitButton")
            .should("not.be.disabled");

        cy.get("button[type='reset']").click();

        cy.get("@submitButton").should("be.disabled");
    });

    it.only("fills mandatory fields using support command", () => {
        const customer = {
            firstName: "Michael",
            lastName: "Bay",
            email: "michaelbay@gmail.com"
        };

        cy.fillMandatoryFields(customer);

        cy.get("button[type='submit']")
            .as("submitButton")
            .should("not.be.disabled");

        cy.get("#agree").uncheck();

        cy.get("@submitButton").should("be.disabled");

    })
});