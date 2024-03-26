describe('Dashboard', () => {
    beforeEach(() => {
      cy.visit('http://localhost:5173/dashboard'); // Asegúrate de que la ruta sea correcta
    });
  
    it('renders the sidebar', () => {
      cy.get('.sidebar').should('exist');
    });
  
    it('renders the dashboard content', () => {
      cy.get('.dashboard-content').should('exist');
    });
  
    it('renders the top bar', () => {
      cy.get('.dashboard-content').find('.top-bar').should('exist');
    });
  
    it('shows DashboardPieChart for role 1', () => {
      // Simulate setting the role ID in localStorage
      localStorage.setItem('user', JSON.stringify({ id_rol: 1 }));
  
      // Reload the page to trigger useEffect
      cy.reload();
  
      // Assert that DashboardPieChart is visible
      cy.get('.dashboard-content').find('.dashboard-pie-chart').should('exist');
    });
  
    it('shows DashboardOrdersTable for role 2', () => {
      // Simulate setting the role ID in localStorage
      localStorage.setItem('user', JSON.stringify({ id_rol: 2 }));
  
      // Reload the page to trigger useEffect
      cy.reload();
  
      // Assert that DashboardOrdersTable is visible
      cy.get('.dashboard-content').find('.dashboard-orders-table').should('exist');
    });
  });
  