describe('Home Page', () => {
  beforeEach(() => {
    cy.visit('/')
  })

  it('show a loding text for the first time', () => {
    cy.contains('Loading...')
  })

  it('display series after fetch finished', () => {
    cy.intercept('GET', '**/series**', { fixture: 'series.json' }).as('getSeries')
    cy.reload()
    cy.wait('@getSeries')

    cy.get('ul li').should('have.length.greaterThan', 0)
    cy.get('ul li').first().find('a').should('have.attr', 'href').and('include', '/pack/')
  })

  it('navigasi ke halaman pack dari daftar series', () => {
    cy.intercept('GET', '**/series**', { fixture: 'series.json' }).as('getSeries')
    cy.reload()
    cy.wait('@getSeries')

    cy.get('ul li a').first().click()
    cy.url().should('include', '/pack/')
  })
})
