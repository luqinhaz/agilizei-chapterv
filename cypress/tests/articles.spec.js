/// <reference types="cypress" />

import articles from '../support/pages/articles'

describe('Articles', () => {
  // HOOK -> trechos que devem ser executados antes ou depois dos testes
  beforeEach(() => {
    cy.login()

    cy.visit('/')
  })
  it('Cadastro de novo artigo com sucesso', () => {
    articles.acessarOFormulario()

    articles.preencherFormulario()

    articles.submeterFormulario()

    articles.verificarSeOArtigoFoiCriado()
  })
})
