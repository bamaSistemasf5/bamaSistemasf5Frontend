import React, { useState, useEffect } from 'react';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Button from 'react-bootstrap/Button';
import { Navigate } from 'react-router-dom'; // Importa Navigate para la redirección

export default function Header({ onLogout, setCurrentUser }) {
  const [logout, setLogout] = useState(false);

  useEffect(() => {
    // Verifica si hay un usuario almacenado en localStorage al inicio
    const user = JSON.parse(localStorage.getItem('user'));
    if (user) {
      setCurrentUser(user.nombre);
    }
  }, []); // Se ejecutará solo una vez al montar el componente

  const handleLogout = () => {
    // Limpia los datos de inicio de sesión si es necesario
    onLogout();
    // Limpia el nombre de usuario
    setCurrentUser(null);
    // Activa la bandera de logout para iniciar la redirección
    setLogout(true);
  };

  // Realiza la redirección después de que el logout sea activado
  useEffect(() => {
    if (logout) {
      // Redirige a la página de inicio
      setLogout(false); // Reinicia el estado para futuros logouts
    }
  }, [logout]);

  // Si la bandera de logout está activa, redirige a la página de inicio
  if (logout) {
    return <Navigate to="/" />;
  }

  return (
    <>
      <div style={{ background: '#243C8C', height: '33px', width: '100vw' }}></div>
      <div style={{ width: '100vw', display: 'flex', flexDirection: 'column', margin: '0' }}>
        <div className='header-row' style={{ height: '15%', width: '100vw', backgroundColor: "#142264", color: 'white' }}>
          {/* Aquí puedes agregar el contenido del encabezado */}
        </div>
        <Navbar expand="lg" className="border-bottom border-3" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '20px' }}>
          <Navbar.Brand href="/">
            <img
              src="https://bama.es/wp-content/uploads/2023/05/logo.png"
              width="140"
              height="80"
              className="d-inline-block align-top"
              alt="Logo"
            />
          </Navbar.Brand>

          <Navbar.Toggle aria-controls="responsive-navbar-nav" />

          <Navbar.Collapse id="responsive-navbar-nav">
            <Nav style={{ flex: 1, marginLeft: '20px' }}>
              <Nav.Link href="/" style={{ width: '50px', display: 'flex', justifyContent: 'flex-end' }}>Inicio</Nav.Link>
              {/* Agrega más enlaces según sea necesario */}
            </Nav>
            <div style={{ display: 'flex', alignItems: 'center' }}>
              <div style={{ marginRight: '10px', color: '#142264' }}>{currentUser}</div>
              <Button variant="outline-dark" onClick={handleLogout}>Logout</Button> {/* Cambia el color del botón a oscuro */}
            </div>
          </Navbar.Collapse>
        </Navbar>
      </div>
    </>
  );
}









