describe('Prueba E2E para Sidebar', () => {
    beforeEach(() => {
      // Visita la URL donde se encuentra el componente Sidebar
      cy.visit('http://localhost:5173/dashboard');
    });
  
    it('Debería renderizar correctamente el componente Sidebar', () => {
      // Verifica que el contenedor principal esté presente en el DOM
      cy.get('.container-fluid').should('exist');
  
      // Verifica que el nombre de usuario esté presente y tenga las propiedades adecuadas
      cy.get('.fs-5').should('exist');
      cy.get('.fs-5').should('have.attr', 'class', 'fs-5 ms-3 d-none d-sm-inline');
      
      // Verifica que los elementos del menú estén presentes y tengan las propiedades adecuadas
      cy.get('.nav-pills').should('exist');
      cy.get('.nav-link').each((navLink, index) => {
        cy.wrap(navLink).should('have.attr', 'href');
        cy.wrap(navLink).should('have.attr', 'aria-current');
      });
    });
  });
  