describe('Login Component E2E Tests', () => {

  beforeEach(() => {
    // Visit the root of your application (make sure the server is running)
    cy.visit('http://localhost:3000/');
  });

  it('should fetch and display 10 users when "Ambil User" button is clicked', () => {
    // Intercept the GET request for fetching users and mock a response with 10 users
    cy.intercept('GET', 'https://jsonplaceholder.typicode.com/users', {
      statusCode: 200,
      body: new Array(10).fill(null).map((_, index) => ({
        id: index + 1,
        name: `User ${index + 1}`,
        email: `user${index + 1}@mail.com`,
        phone: `123-456-7890`,
      })),
    }).as('getUsers');

    // Click the "Ambil User" button to fetch the users
    cy.get('.fetch-user-button').click();

    // Wait for the API response and check that the 10 users are displayed
    cy.wait('@getUsers');
    cy.get('.login-form').find('.user-name').should('have.length', 10);
    cy.get('.login-form').find('.user-name').each((el, index) => {
      cy.wrap(el).should('contain', `User ${index + 1}`);
    });
  });

  it('should show an error message if user form is empty and "Buat User" is clicked', () => {
    cy.get('.post-user-button').click();
    cy.get('.fail-response').should('be.visible').and('contain', 'Masukan data user!');
  });

  it('should successfully create a user when the form is filled correctly and "Buat User" is clicked', () => {
    cy.get('.name-input').type('John Doe');
    cy.get('.email-input').type('john.doe@mail.com');
    cy.get('.phone-input').type('555-1234');
    cy.get('.post-user-button').click();
    cy.get('.success-response').should('be.visible').and('contain', 'Berhasil membuat user!');
  });

  it('should show an error message when the form is incomplete and "Buat User" is clicked', () => {
    cy.get('.name-input').type('Jane Doe');
    cy.get('.post-user-button').click();
    cy.get('.fail-response').should('be.visible').and('contain', 'Masukan data user!');
  });

});
