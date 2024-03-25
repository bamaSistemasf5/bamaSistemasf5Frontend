import React, { useState, useEffect } from "react";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import Button from "react-bootstrap/Button";
import { Navigate } from "react-router-dom";


export default function Header({ onLogout }) {
  const [logout, setLogout] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);

  useEffect(() => {
    // Verifica si hay un usuario almacenado en localStorage al inicio
    const user = JSON.parse(localStorage.getItem("user"));
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

  const handleHome = () => {
    // Si el usuario está conectado, redirige al dashboard, de lo contrario, redirige a la página de inicio
    if (currentUser) {
      window.location.href = "/dashboard";
    } else {
      window.location.href = "/";
    }
  };

  const handleSupport = () => {
    // Redirige a la página de soporte técnico
    window.location.href = "/support";
  };

  // Realiza la redirección después de que el logout sea activado
  useEffect(() => {
    if (logout) {
      // Redirige a la página de inicio
      window.location.href = "/";
      setLogout(false); // Reinicia el estado para futuros logouts
    }
  }, [logout]);

  return (
    <>
      <div 
        style={{ background: "#243C8C", height: "33px", width: "100vw" }}
      ></div>
      <div
        style={{
          width: "100vw",
          display: "flex",
          flexDirection: "column",
          margin: "0",
        }}
      >
        <div
          className="header-row"
          style={{
            height: "15%",
            width: "100vw",
            backgroundColor: "#142264",
            color: "white",
          }}
        >
        </div>
        <Navbar
          expand="lg"
          className="border-bottom border-3"
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            padding: "20px",
          }}
        >
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
            <Nav style={{ flex: 1 }} className="nav-header">
              <div
                style={{
                  marginRight: "20px",
                  paddingRight: "10px",
              
                }}
              >
                <Button
  variant="outline-dark"
  onClick={handleHome}
  style={{
    position: 'relative',
    borderColor: '#000',
    marginLeft: '20px',
    paddingLeft: '10px'
  }}
>
  Inicio
  <div className="button-hover"></div>
  <style>
    {`
    .btn-outline-dark:hover,
    .btn-outline-dark:focus,
    .btn-outline-dark:active {
      background-color: #ec660d;
      border-color: #ec660d;
    }
    `}
  </style>
</Button>

              </div>
              <div
                style={{
                  marginLeft: "20px",
                  paddingLeft: "10px",
                  
               
                }}
              >
                <Button
                  variant="outline-dark"
                  onClick={handleSupport}
                  style={{ position: "relative" }}
                >
                  Soporte Técnico
                  <div className="btn-header"></div>
                </Button>
              </div>
            </Nav>
            <div style={{ display: "flex", alignItems: "center" }}>
              <div style={{ marginRight: "20px", color: "#142264", fontWeight:'bold' }}>
                {currentUser}
              </div>
              <Button variant="outline-dark" onClick={handleLogout}>
                Logout
              </Button>{" "}
            </div>
          </Navbar.Collapse>
        </Navbar>
      </div>
    </>
  );
}
