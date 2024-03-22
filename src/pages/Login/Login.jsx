import React, { useState } from 'react';
import { Navigate } from 'react-router-dom'; // Importa Navigate para la redirección
import './Login.css';
import rectangule from '/Img/Rectangle.svg';
import telefono from '/Img/phone-logo2.svg';
import sobre from '/Img/envelope-icono.svg'

const Login = ({ onLogin }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loggedIn, setLoggedIn] = useState(false); // Nuevo estado para controlar el inicio de sesión exitoso


const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('http://localhost:3000/', {
          method: 'POST',
          headers: {
              'Content-Type': 'application/json'
          },
          body: JSON.stringify({ nombre: username, password })
      });

      if (!response.ok) {
          throw new Error('Failed to log in');
      }

      const data = await response.json();
      console.log('Respuesta del servidor:', data);

      const token = data.token;
      const userId = data.userid; // Extrae el userId de la respuesta del servidor

      // Hacer una solicitud para obtener los detalles del usuario usando el userId
      const userResponse = await fetch(`http://localhost:3000/users/${userId}`, {
          method: 'GET',
          headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${token}` // Envía el token JWT en el encabezado de autorización
          }
      });

      if (!userResponse.ok) {
          throw new Error('Failed to fetch user details');
      }

      const userData = await userResponse.json();
      console.log('Detalles del usuario:', userData.user);
      
      // Guardar información del usuario en localStorage
      localStorage.setItem('user', JSON.stringify({ nombre: userData.user.nombre, id_rol: userData.user.id_rol }));
      console.log('Datos del usuario guardados en localStorage:', { nombre: userData.user.nombre, id_rol: userData.user.id_rol });
      

      // Marca el inicio de sesión como exitoso
      setLoggedIn(true);
  } catch (error) {
      console.error('Error:', error);
      setError('Error al iniciar sesión. Por favor, verifica tus credenciales.');
    }
};



  // Si el inicio de sesión fue exitoso, redirige a la página de dashboard
  if (loggedIn) {
    return <Navigate to="/dashboard" />;
  }

  return (
    <>
      <div className="img-container">
        <img src={rectangule} alt="" className='img'/>
      </div>
      <div className="login-container">
        <div className="contenido">
          <p className='acceso'>Acceso a la intranet</p>
          {error && <p className="error-message">{error}</p>}
          <form onSubmit={handleLogin} className='formulario'>
            <div className="form-group">
              <label>USUARIO:</label>
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="form-controls"
              />
            </div>
            <div className="form-group">
              <label>CONTRASEÑA:</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="form-controls"
              />
            </div>
            <button type="submit" className="btn btn-iniciar">Iniciar sesión</button>
          </form>
        </div>
        <div className="soporte">
          <p>Si necesitas ayuda para acceder,ponte en contacto:</p>
          <div className="icono-telf">
            <img src={telefono} alt="" className='telefono' />
            <p className='numero-telf'>TELÉFONO <br/>+34 917 978 924</p>  
          </div>
        <div className="icono-mesj">
        <img src={sobre} alt="" className='telefono' />
            <p className='numero-telf'>EMAIL <br/>infobama@bama.es</p> 
        </div>
        </div>
      </div>
    </>
  );
};

export default Login;



