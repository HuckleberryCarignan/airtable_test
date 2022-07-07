const airtableURL = 'https://www.airtable.com';


describe('todolist app', () => {
    beforeEach(() => {
      cy.visit(airtableURL);
      cy.get('[class=Brand-module_srOnly__Wk_6R]').should('have.text',"Airtable home or view your bases");
    })

    it('creates a new user',() => {
      cy.contains('Sign up for free').click();
      // When running headless on my conputer, we get this blocking issues
      if (cy.contains(`Verify it's you`)) {
        if(cy.contains('Press and hold button')) {
          cy.task('log', '***********************************');
          cy.task('log', 'The Website seems to be caught in security stop');
          cy.task('log', '***********************************');
        }
        cy.contains('Press and hold button').trigger('mousedown');
        cy.wait(10000);
        cy.contains('Press and hold button').trigger('mouseleave');
        cy.wait(10000);
      }
    // If headed (not headless) goes fine
    cy.contains('Create your free account');
    });

  })

  