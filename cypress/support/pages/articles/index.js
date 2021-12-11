const Chance = require('chance')
const chance = new Chance()

const el = require('./elements').ELEMENTS
const articleTitle = 'Artigo de teste' + chance.integer()

class Articles {
  // acesso ao form
  acessarOFormulario () {
    cy.get(el.linkNovoArtigo).click()
  }

  preencherFormulario () {
    cy.get(el.inputTitle).type(articleTitle)
    cy.get(el.inputDescription).type('Descrição do artigo de testes')
    cy.get(el.inputBody).type('Corpo do artigo que está sendo criado.')
    cy.get(el.inputTags).type('cypress, tests')
  }

  submeterFormulario () {
    cy.contains('button', 'Publish Article').click()
  }

  verificarSeOArtigoFoiCriado () {
    cy.contains(articleTitle).should('be.visible')

    cy.get('h1').should('have.text', articleTitle)
  }
}

export default new Articles()
