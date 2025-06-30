describe('Pack Page', () => {
  beforeEach(() => {
    cy.intercept('GET', '**/packs/*', { fixture: 'pack.json' }).as('getPack')
    cy.visit('/pack/123')
    cy.wait('@getPack')
  })

  it('display cards inside the pack', () => {
    cy.get('ul li').should('exist').and('have.length.greaterThan', 0)
  })

  it('open modal after click a gcard', () => {
    cy.get('ul li').first().click()
    cy.get('[data-testid="card-modal"]').should('be.visible')
  })

  it('close modal after click the close button', () => {
    cy.get('ul li').first().click()
    cy.get('[data-testid="card-modal"]').should('be.visible')
    cy.get('[data-testid="modal-close"]').click()
    cy.get('[data-testid="card-modal"]').should('not.exist')
  })
})
