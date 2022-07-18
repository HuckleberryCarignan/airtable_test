// Initial URL homepage
const airtableURL = "https://www.airtable.com";
const freeSignUpButtonText = "Sign up for free";

// Free Sign UP module
const freeSignUpModuleTitleText = "Create your free account";
const freeSignUpEmailSetUpTextEntryId = "[id=emailSignup]";
const freeSignUpContinueButton = "Continue";

// Test Data
const user1 = {};
user1.emailaddress = `${randomGenerator(10)}@${randomGenerator(4)}.com`;
user1.firstname = `${randomGenerator(10)}`;
user1.lastname = `${randomGenerator(10)}`;
user1.password = `${randomGenerator(10)}`;
const user2 = {};
user2.emailaddress = `${randomGenerator(10)}@${randomGenerator(4)}.com`;
user2.firstname = `${randomGenerator(10)}`;
user2.lastname = `${randomGenerator(10)}`;
user2.password = `${randomGenerator(10)}`;

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
  before(() => {
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
    cy.get(freeSignUpEmailSetUpTextEntryId).type(user1.emailaddress);
    cy.contains(freeSignUpContinueButton).click();

    // Enter Username Password
    // Always present
    cy.contains(freeSignUpModuleTitleText);
    cy.contains("Full Name");
    cy.get("[id=fullName]").type(`${user1.firstname} ${user1.lastname}`);
    cy.get("[id=password]").type(`${user1.password}`);
    cy.contains(freeSignUpContinueButton).click();

    // Choose Teams
    cy.get('[class^="questionnaireHeader"]').then((elem) => {
      if (elem.text() === `Let's get you set up. Which team are you on?`) {
        cy.contains(`Let's get you set up. Which team are you on?`);
        cy.contains(`Marketing`).click();
        cy.contains(freeSignUpContinueButton).click();
      }
    });

    // Question: How did you first hear about Airtable?
    cy.questionExists(`@questionExistsValue`).then((questionExistAnswer) => {
      if (questionExistAnswer) {
        cy.questionGetText(`@questionText`).then((questionText) => {
          if (questionText === `How did you first hear about Airtable?`) {
            cy.contains(`How did you first hear about Airtable?`);
            cy.contains("Social media").click();
            cy.contains(freeSignUpContinueButton).click();
          }
        });
      }
    });

    // Question: Who do you collaborate with?
    cy.questionExists(`@questionExistsValue`).then((questionExistAnswer) => {
      if (questionExistAnswer) {
        cy.questionGetText(`@questionText`).then((questionText) => {
          if (questionText === `Who do you collaborate with?`) {
            cy.contains(`Who do you collaborate with?`);
            cy.contains(`Skip`).click();
          }
        });
      }
    });

    // Question:  Get up and running fast!
    cy.contains(`Get up and running fast!`);
    cy.contains(`Skip`).click();

    // Get up fast
    cy.contains(`Let’s start building!`);
    cy.contains(`Go to workspace`).click();

    // Verify User login in
    cy.get('[aria-label="Account"]').click();
    cy.contains(user1.emailaddress);

    // Log out
    cy.contains("Log out").click();
    cy.get("[class=Brand-module_srOnly__Wk_6R]").should(
      "have.text",
      "Airtable home or view your bases"
    );
  });

  it("Sign in as user", () => {
    // Sign in with the user that was just made
    cy.contains("Sign in").click();
    cy.get("[id=emailLogin]").type(user1.emailaddress);

    // Question: Deal with Google email issue and enter password
    cy.loginPasswordEntryExist(`@loginPasswordEntryExistAnswer`).then(
      (loginPasswordEntryExistAnswer) => {
        if (!loginPasswordEntryExistAnswer) {
          // If the Password entry does not exist, then we need to deal with the annoying google Continue button
          cy.contains(`Continue`).click();
        }
        // Enter Password and continue
        cy.get("[id=passwordLogin]").type(user1.password);
        cy.get("button").contains("Sign in").click();
      }
    );
    // cy.atHomeScreen(`@atHomeScreenAnswer`).then(
    //   (atHomeScreenAnswer) =>
    //   {
    //     if (!atHomeScreenAnswer) {
    //       cy.task("log", "***********************************");
    //       cy.task("log", `Now What?`);
    //       cy.task("log", "***********************************");
    //       cy.wait(300000);
    //     }
  
    //   })

    // Create a new base
    cy.contains("Start from scratch").click();
    cy.contains("Skip").click();

    // Share the base
    cy.get('button').contains('Share').click();
    cy.get('input').invoke('attr', 'placeholder').should('contain', `Invite by email...`).type(user2.emailaddress);

    // Set new invte to Editor role
    cy.get("[class*='selectMenuButton'][role='button']").click();
    cy.get("[class='small quiet']").contains(`Can edit records and views, but cannot configure tables or fields`).click();

    // Send invite
    cy.contains("Invite").click();

    // Close dialog box
    cy.get("[role='dialog'] [aria-label='Close dialog']").click();

    // Invite by email...
    cy.get("[role='listitem'] [class*='flex-inline pill pointer']").click();
    cy.contains(user2.emailaddress);
    cy.contains('Editor');
  });
});
