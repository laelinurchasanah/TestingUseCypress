import React from 'react';
import Login from '../../src/components/Login'

describe('<LoginForm Component Tests/>', () => {
  it('renders', ()=>{
    cy.mount(<Login/>)
  });
  beforeEach(() =>{
    cy.mount(<Login/>)
  })
  
  it('should fetch and display 10 users when "Ambil User" is clicked', () => {
    // Intercept the API call to mock the response and ensure we get 10 users
    cy.intercept('GET', 'https://jsonplaceholder.typicode.com/users', {
      statusCode: 200,
      body: Array(10).fill({
        id: 1,
        name: 'Laeli',
        email: 'laeli@example.com',
        phone: '123-456-7890'
      })
    }).as('getUsers');

    // Click on the "Ambil User" button
    cy.get('.fetch-user-button').click();

    // Wait for the request to finish
    cy.wait('@getUsers');

    // Check that 10 user items are displayed
    cy.get('.user-name').should('have.length', 10);
    cy.get('.user-email').should('have.length', 10);
    cy.get('.user-phone').should('have.length', 10);
  });

  it('should show an error message when the form is empty and "Buat User" is clicked', () => {
    // Click on the "Buat User" button without filling the form
    cy.get('.post-user-button').click();

    // Check if the error message is displayed
    cy.get('.fail-response').should('contain.text', 'Masukan data user!');
  });

  it('should submit the form successfully when all fields are filled correctly', () => {
    // Fill in the form fields
    cy.get('.name-input').type('Jane Doe');
    cy.get('.email-input').type('janedoe@example.com');
    cy.get('.phone-input').type('987-654-3210');

    // Click the "Buat User" button
    cy.get('.post-user-button').click();

    // Ensure no error message is shown
    cy.get('.fail-response').should('not.exist');

    // Check if the success message is displayed
    cy.get('.success-response').should('contain.text', 'Berhasil membuat user!');
  });

  it('should not submit the form when any of the fields are empty', () => {
    // Fill in only some of the fields
    cy.get('.name-input').type('Jane Doe');
    cy.get('.email-input').type('janedoe@example.com');

    // Click the "Buat User" button
    cy.get('.post-user-button').click();

    // Check that the error message is displayed
    cy.get('.fail-response').should('contain.text', 'Masukan data user!');
  });
});

