describe('Prueba E2E para Footer', () => {
    beforeEach(() => {
      // Visita la URL donde se encuentra el componente Footer
      cy.visit('http://localhost:5173/');
    });
  
    it('Debería renderizar correctamente el componente Footer', () => {
      // Verifica que el pie de página esté presente en el DOM
      cy.get('footer').should('exist');
  
      // Verifica que el contenedor de filas esté presente y tenga las propiedades adecuadas
      cy.get('footer').find('.row').should('exist');
      cy.get('footer').find('.row').should('have.css', 'display', 'flex');
      cy.get('footer').find('.row').should('have.css', 'justify-content', 'space-around');
      cy.get('footer').find('.row').should('have.css', 'align-items', 'center');
  
      // Verifica que los elementos de la primera columna estén presentes y tengan las propiedades adecuadas
      cy.get('footer').find('.col').eq(0).should('exist');
      cy.get('footer').find('.col').eq(0).should('have.css', 'width', '492px');
      cy.get('footer').find('.col').eq(0).should('have.css', 'text-align', 'start');
  
      // Verifica que los elementos de la segunda columna estén presentes y tengan las propiedades adecuadas
      cy.get('footer').find('.col').eq(1).should('exist');
      cy.get('footer').find('.col').eq(1).should('have.css', 'width', '492px');
      cy.get('footer').find('.col').eq(1).should('have.css', 'text-align', 'right');
  
      // Verifica que el logo esté presente y tenga las propiedades adecuadas
      cy.get('.logo-container').should('exist');
      cy.get('.logo-container').find('img').should('exist');
      cy.get('.logo-container').find('img').should('have.css', 'max-height', '60px');
      cy.get('.logo-container').find('span').should('exist');
      cy.get('.logo-container').find('span').should('have.css', 'font-size', '18px');
  
      // Verifica que el texto de aviso legal esté presente
      cy.contains('Aviso Legal | Política de Privacidad').should('exist');
    });
  });
  