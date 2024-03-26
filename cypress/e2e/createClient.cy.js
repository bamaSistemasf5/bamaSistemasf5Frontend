describe('Prueba E2E para CreateClientForm', () => {
    beforeEach(() => {
      cy.visit('http://localhost:5173/create-client');
  
      // Stub para interceptar la llamada a la API y devolver datos simulados
      cy.intercept('POST', 'http://localhost:3000/client/create-client', {
        statusCode: 200,
        body: {
          message: 'Cliente creado con éxito',
          // Puedes agregar más datos simulados aquí si es necesario
        },
      }).as('createClient');
    });
  
    it('Debería enviar el formulario de creación de cliente correctamente', () => {
      // Ingresa valores en los campos del formulario
      cy.get('input[name="cif_cliente"]').type('1234578A');
      cy.get('input[name="nombre"]').type('Nombre Cliente');
      cy.get('input[name="direccion"]').type('Dirección Cliente');
      cy.get('input[name="poblacion"]').type('Población Cliente');
      cy.get('input[name="provincia"]').type('Provincia Cliente');
      cy.get('input[name="pais"]').type('País Cliente');
      cy.get('input[name="codigo_postal"]').type('Provincia Cliente');
      cy.get('input[name="telefono"]').type('123456789');
      cy.get('input[name="email"]').type('testeando_ando@gmail.com');
      // Completa el resto de los campos según sea necesario
  
      // Envía el formulario
      cy.get('button[type="submit"]').click();
  
      // Espera a que se complete la solicitud
      cy.wait('@createClient');
  
      // Verifica que se muestre el mensaje de éxito
      cy.contains('Cliente creado con éxito').should('exist');
    });
  
    it('Debería mostrar errores de validación si se envía el formulario con campos vacíos', () => {
      // Envía el formulario sin completar ningún campo
      cy.get('button[type="submit"]').click();
  
      // Verifica que se muestren los mensajes de error de validación
      cy.contains('El CIF del cliente es requerido').should('exist');
      cy.contains('El nombre del cliente es requerido').should('exist');
      cy.contains('La dirección del cliente es requerida').should('exist');
      cy.contains('La población del cliente es requerida').should('exist');
      cy.contains('La provincia del cliente es requerida').should('exist');
      cy.contains('El país del cliente es requerido').should('exist');
      cy.contains('El código postal del cliente es requerido').should('exist');
      cy.contains('El teléfono del cliente es requerido').should('exist');
      cy.contains('El correo electrónico del cliente es requerido').should('exist');
    });
  });
  