// Initial URL homepage
const airtableURL = "https://www.airtable.com";
const freeSignUpButtonText = "Sign up for free";

// Free Sign UP module
const freeSignUpModuleTitleText = "Create your free account";
const freeSignUpEmailSetUpTextEntryId = "[id=emailSignup]";
const freeSignUpContinueButton = "Continue";

const ff = `type="submit"`;
// General

// Test Data
let user = {};
user.emailaddress = `${randomGenerator(10)}@${randomGenerator(4)}.com`;
user.firstname = `${randomGenerator(10)}`;
user.lastname = `${randomGenerator(10)}`;
user.password = `${randomGenerator(10)}`;

// supporting function
function randomGenerator(length) {
  var result = "";
  var characters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  var charactersLength = characters.length;
  for (var i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return result;
}

export function clickIfExist(element) {
  cy.get("body").then((body) => {
    if (body.find(element).length > 0) {
      cy.get(element).click();
    }
  });
}

describe("Airtable test", () => {
  beforeEach(() => {
    cy.visit(airtableURL);
    cy.get("[class=Brand-module_srOnly__Wk_6R]").should(
      "have.text",
      "Airtable home or view your bases"
    );
  });

  it("creates a new user", () => {
    cy.contains(freeSignUpButtonText).click();
    // When running headless on my conputer, we get this blocking issues
    // if (cy.contains(`Verify it's you`)) {
    //   if(cy.contains('Press and hold button')) {
    //     cy.task('log', '***********************************');
    //     cy.task('log', 'The Website seems to be caught in security stop');
    //     cy.task('log', '***********************************');
    //   }
    //   cy.contains('Press and hold button').trigger('mousedown');
    //   cy.wait(10000);
    //   cy.contains('Press and hold button').trigger('mouseleave');
    //   cy.wait(10000);
    // }
    
    // If headed (not headless) goes fine

    // Enter email
    cy.contains(freeSignUpModuleTitleText);
    cy.get(freeSignUpEmailSetUpTextEntryId).type(user.emailaddress);
    cy.contains(freeSignUpContinueButton).click();

    // Enter Username Password
    // Always present
    cy.contains(freeSignUpModuleTitleText);
    cy.contains("Full Name");
    cy.get("[id=fullName]").type(`${user.firstname} ${user.lastname}`);
    cy.get("[id=password]").type(`${user.password}`);
    cy.contains(freeSignUpContinueButton).click();

    // Choose Teams
    // Always present
    cy.contains(`Let's get you set up. Which team are you on?`);
    cy.contains(`Marketing`).click();
    cy.contains(freeSignUpContinueButton).click();
    cy.wait(5000);

    // Questions: How did you first hear about Airtable?
    // This section of the Questions sometimes is there and is sometimes not
    //    Check if is there before proceeding with verifcation
    if (Cypress.$('[class*=".questionnaireHeader"]').length > 0) {
      cy.get('[class*=".questionnaireHeader"]').then(($headerText) => {
        // assert on the text
        if (
          $headerText
            .text()
            .includes("How did you first hear about Airtable?")
        ) {
          cy.task("log", "***********************************");
          cy.task("log", "Text exists");
          cy.task("log", "***********************************");
          cy.contains(`How did you first hear about Airtable?`);
          cy.contains("Social media").click();
          cy.contains(freeSignUpContinueButton).click();
        } else {
          cy.task("log", "***********************************");
          cy.task("log", `The Question 'How did you first hear about Airtable?' does not exist`
          );
          cy.task("log", "***********************************");
        }
      });
    } else {
      cy.task("log", "***********************************");
      cy.task("log", `Element not there`);
      cy.task("log", "***********************************");
    }
    cy.wait(5000);

    // Questions: Who do you collaborate with?
    // This section of the Questions sometimes is there and is sometimes not
    //    Check if is there before proceeding with verifcation
    if (Cypress.$('[class*=".questionnaireHeader"]').length > 0) {
      cy.get('[class*=".questionnaireHeader"]').then(($headerText) => {

        if (
          $headerText
            .text()
            .includes("Who do you collaborate with?")
        ) {
          cy.task("log", "***********************************");
          cy.task("log", "Text exists");
          cy.task("log", "***********************************");
          cy.contains(`Who do you collaborate with?`);
          cy.contains(`Skip`).click();
          cy.wait(10000);
      
        } else {
          cy.task("log", "***********************************");
          cy.task("log", `The Question 'Who do you collaborate with?' does not exist`
          );
          cy.task("log", "***********************************");
        }
      });
    } else {
      cy.task("log", "***********************************");
      cy.task("log", `Element not there`);
      cy.task("log", "***********************************");
    }

    cy.wait(10000);
    // Questions: Get up and running fast!
    cy.contains(`Get up and running fast!`);
    cy.contains(`Skip`).click();

    // Get up fast
    cy.contains(`Let’s start building!`);
    cy.contains(`Go to workspace`).click();

    // Verify User login in
    cy.get('[aria-label="Account"]').click();
    cy.contains(user.emailaddress);

    // Log out
    cy.contains('Log out').click();
    cy.get("[class=Brand-module_srOnly__Wk_6R]").should(
      "have.text",
      "Airtable home or view your bases"
    );
  });


  it("Sign in as user", () => {

    // Sign in with the user that was just made
    // NOTE:  Sometimes the password entry does not show
    cy.contains('Sign in').click();
    cy.get("[id=emailLogin]").type('foo1@bar1.com');
    cy.get("[id=passwordLogin]").type(`MoxieSince1884`);
    cy.get('button').contains('Sign in').click();

    // Create a new base
    cy.contains('Start from scratch').click();
    cy.contains('Skip').click();


    // Share the base
    cy.contains('Share').click();
    // I've put too much time into this at this point.  There are some serious flaws in this exercise.  Please se read me.
    cy.wait(20000);


  });




});
