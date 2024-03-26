describe('Prueba E2E para ClientsView', () => {
    beforeEach(() => {
      // Visita la URL donde se encuentra el componente ClientsView
      cy.visit('http://localhost:3000/client/clients-view');
    });
  
    it('Debería renderizar correctamente el componente ClientsView', () => {
      // Verifica que el título esté presente
      cy.contains('h1', 'Clientes').should('exist');
  
      // Verifica que haya inputs para filtrar los clientes
      cy.get('input[name="cif_cliente"]').should('exist');
      cy.get('input[name="nombre"]').should('exist');
      cy.get('input[name="direccion"]').should('exist');
      cy.get('input[name="poblacion"]').should('exist');
      cy.get('input[name="provincia"]').should('exist');
      cy.get('input[name="pais"]').should('exist');
      cy.get('input[name="codigo_postal"]').should('exist');
      cy.get('input[name="telefono"]').should('exist');
      cy.get('input[name="email"]').should('exist');
  
      // Verifica que la tabla esté presente
      cy.get('table').should('exist');
  
      // Verifica que haya botones para editar y eliminar clientes
      cy.get('button[variant="warning"]').should('exist');
      cy.get('button[variant="danger"]').should('exist');
  
      // Verifica que haya un botón para crear un nuevo usuario
      cy.contains('button', 'Crear Nuevo Usuario').should('exist');
    });
  
    it('Debería filtrar correctamente los clientes', () => {
      // Ingresa texto en los inputs de filtrado
      cy.get('input[name="nombre"]').type('John Doe');
      cy.get('input[name="poblacion"]').type('New York');
      cy.get('input[name="pais"]').type('USA');
  
      // Verifica que los datos filtrados coincidan con los criterios de búsqueda
      cy.get('tbody').find('tr').should('have.length', 1);
      cy.get('tbody').contains('tr', 'John Doe').should('exist');
      cy.get('tbody').contains('tr', 'New York').should('exist');
      cy.get('tbody').contains('tr', 'USA').should('exist');
    });
  
    // Agrega más pruebas según sea necesario para cubrir todos los casos de uso del componente
  });
  