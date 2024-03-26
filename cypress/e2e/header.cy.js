describe('Prueba E2E para Header', () => {
    beforeEach(() => {
      // Visita la URL donde se encuentra el componente Header
      cy.visit('http://localhost:5173/');
    });
  
    it('Debería mostrar el nombre de usuario y permitir el logout', () => {
      // Simula el inicio de sesión almacenando un usuario en localStorage
      const user = { nombre: 'Usuario de Prueba' };
      localStorage.setItem('user', JSON.stringify(user));
  
      // Verifica que el nombre de usuario se muestre correctamente
      cy.contains('Usuario de Prueba').should('exist');
  
      // Haz clic en el botón de logout
      cy.get('button:contains("Logout")').click();
  
      // Espera a que se complete la redirección
      cy.url().should('eq', Cypress.config().baseUrl + '/');
    });
  
    it('Debería redirigir a la página de inicio al hacer clic en el botón Inicio', () => {
      // Haz clic en el botón de inicio
      cy.get('button:contains("Inicio")').click();
  
      // Espera a que se complete la redirección
      cy.url().should('eq', Cypress.config().baseUrl + '/');
    });
  
    it('Debería redirigir a la página de soporte al hacer clic en el botón Soporte Técnico', () => {
      // Haz clic en el botón de soporte técnico
      cy.get('button:contains("Soporte Técnico")').click();
  
      // Espera a que se complete la redirección
      cy.url().should('eq', Cypress.config().baseUrl + '/support');
    });
  });
  