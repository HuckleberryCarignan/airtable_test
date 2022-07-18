// ***********************************************************
// This example support/e2e.js is processed and
// loaded automatically before your test files.
//
// This is a great place to put global configuration and
// behavior that modifies Cypress.
//
// You can change the location of this file or turn off
// automatically serving support files with the
// 'supportFile' configuration option.
//
// You can read more here:
// https://on.cypress.io/configuration
// ***********************************************************

// Import commands.js using ES2015 syntax:
import "./commands";

Cypress.on("uncaught:exception", (err, runnable) => {
  // returning false here prevents Cypress from failing the test
  return false;
});


function getQuestionnaireText() {
  let foo = "aWalker";
  cy.get("body").then(($body) => {
    if ($body.find('[class="questionnaireHeader"]').length > 0) {
      foo = JSON.stringify($body.find('[class="questionnaireHeader"]').text());
      return foo;
    }
  });
}

Cypress.Commands.add("getQuestionnaireText", getQuestionnaireText);

function checkForOnBoadringQuestion(textToFind) {
  cy.get("body").then(($body) => {
    if ($body.find('[class="questionnaireHeader"]').length > 0) {
      if ($body.find('[class="questionnaireHeader"]').text() === textToFind) {
        console.log("foo");
        return true;
      } else return false;
    }
  });
}

Cypress.Commands.add("checkForOnBoadringQuestion", checkForOnBoadringQuestion);
