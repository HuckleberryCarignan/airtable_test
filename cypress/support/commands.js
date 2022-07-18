// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })

Cypress.Commands.add('questionExists', () => {
    cy.get("body").then(($body) => {
        return cy.wrap($body.find('[class^="questionnaireHeader"]').length > 0).as('questionExistAnswer')
  })
});

Cypress.Commands.add('questionGetText', () => {
    cy.get("body").then(($body) => {
        return cy.wrap($body.find('[class^="questionnaireHeader"]').text()).as('questionText')
  })
});

Cypress.Commands.add('loginPasswordEntryExist', () => {
    cy.get("body").then(($body) => {
        return cy.wrap($body.find('[name="password"]').length > 0).as('loginPasswordEntryExistAnswer')
  })
});

Cypress.Commands.add('atHomeScreen', () => {
    cy.get("body").then(($body) => {
        return cy.wrap($body.find('[class="homeScreenTopBar"]').length > 0).as('atHomeScreenAnswer')
  })
});



