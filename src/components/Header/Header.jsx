import React from 'react';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';

export default function Header() {
  return (
    <>
    <div style={{ background: '#243C8C', height: '33px', width: '100vw' }}></div>
    <div  style={{ width: '100vw', display: 'flex', flexDirection: 'column', margin:'0' }}>
        <div className='header-row' style={{ height: '15%', width: '100vw', backgroundColor: "#142264", color: 'white' }}>
          {/* Aquí puedes agregar el contenido del encabezado */}
        </div>
        <Navbar expand="lg" className="border-bottom border-3" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '20px' }}>
          <Navbar.Brand href="/login">
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
    <Nav.Link href="/login" style={{ width: '50px', display: 'flex', justifyContent: 'flex-end' }}>Inicio</Nav.Link>
    {/* Agrega más enlaces según sea necesario */}
  </Nav>
</Navbar.Collapse>
</Navbar>
      </div>
    </>
  );
}
