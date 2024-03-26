describe('Prueba E2E para Loading', () => {
    beforeEach(() => {
      // Visita la URL donde se encuentra el componente Loading
      cy.visit('http://localhost:5173/');
    });
  
    it('Debería renderizar correctamente el componente Loading', () => {
      // Verifica que el componente Loading esté presente en el DOM
      cy.get('div[style*="position: absolute"]').should('exist');
  
      // Verifica que el video esté presente y tenga las propiedades adecuadas
      cy.get('video').should('exist');
      cy.get('video').should('have.attr', 'autoPlay');
      cy.get('video').should('have.attr', 'loop');
      cy.get('video').should('have.attr', 'style').and('include', 'width: 80%');
      cy.get('video').should('have.attr', 'style').and('include', 'height: 100%');
      // Verifica que el navegador no soporte el elemento de video
      cy.contains('Tu navegador no soporta el elemento de video.').should('exist');
    });
  });
  