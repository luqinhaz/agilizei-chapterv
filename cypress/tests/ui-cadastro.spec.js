/// <reference types="cypress" />

const Chance = require('chance')
const chance = new Chance()

describe('Cadastro de UI', () => {
  it('Cadastro com sucesso', () => {
    cy.intercept({
      // https://api.realworld.io/api/users
      // path = /api/users
      // method = POST

      method: 'POST',
      // Formas de encontrar/mapear a rota
      // url completa = hostname + path
      // hostname = https://api.realworld.io
      // path com query params = /api/users
      // path sem query params = pathname
      path: '/api/users'
    }, {
      statusCode: 200,
      fixture: 'cadastro-com-sucesso'
    }).as('postUsers')

    cy.visit('register')
    cy.title().should('contain', 'Sign up')
    // Preenchendo os campos
    cy.get('input[placeholder="Username"]').type('Teste LQZ')
    cy.get('input[placeholder="Email"]').type('testelqz@mail.com.br')
    cy.get('input[placeholder="Password"]').type('Teste@123')
    // Click no botão de Submit
    cy.get('button.btn-primary').click()

    cy.contains('No articles are here... yet.').should('be.visible')
  })

  it('Cadastro com usuário já existente', () => {
    cy.intercept({
      method: 'POST',
      path: '/api/users'
    }, {
      statusCode: 422,
      fixture: 'cadastro-usuario-existente'
    }).as('postUsers')

    cy.visit('register')
    cy.title().should('contain', 'Sign up')
    // Preenchendo os campos
    cy.get('input[placeholder="Username"]').type('Teste LQZ')
    cy.get('input[placeholder="Email"]').type(chance.email())
    cy.get('input[placeholder="Password"]').type('Teste@123')
    // Click no botão de Submit
    cy.get('button.btn-primary').click()

    cy.contains('username has already been taken').should('be.visible')
  })

  it('Cadastro com e-mail já existente', () => {
    cy.intercept({
      method: 'POST',
      path: '/api/users'
    }, {
      statusCode: 422,
      fixture: 'cadastro-email-existente'
    }).as('postUsers')

    cy.visit('register')
    cy.title().should('contain', 'Sign up')
    // Preenchendo os campos
    cy.get('input[placeholder="Username"]').type(chance.name())
    cy.get('input[placeholder="Email"]').type('testelqz@mail.com.br')
    cy.get('input[placeholder="Password"]').type('Teste@123')
    // Click no botão de Submit
    cy.get('button.btn-primary').click()

    cy.contains('email has already been taken').should('be.visible')
  })
})
