import React, { useState } from 'react';
// import 'bootstrap/dist/css/bootstrap.min.css'; // Importa los estilos de Bootstrap
import './Login.css';
import rectangule from '../../../public/Img/Rectangle.svg'
import telefono from '../../../public/Img/phone-logo.png'

const Login = ({ onLogin }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = (e) => {
    e.preventDefault();
    onLogin({ username, password });
    setUsername('');
    setPassword('');
  };

  return (
    <>
        <div className="img-container">
        <img src={rectangule} alt="" className='img'/>
      </div>  
    <div className="login-container">

      <div className="contenido">
        <p className='acceso'>Acceso a la intranet</p>
        <form onSubmit={handleLogin} className='formulario'>
          <div className="form-group">
            <label>USUARIO:</label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="form-control"
            />
          </div>
          <div className="form-group">
            <label>CONTRASEÑA:</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="form-control"
            />
          </div>
          <button type="submit" className="btn btn-iniciar">Iniciar sesión</button>
        </form>
      </div>
      <div className="soporte">
        <p>Si necesitas ayuda para acceder, ponte en contacto</p>
        <img src={telefono} alt="" />
      </div>
    </div>
    
    </>
  );
};

export default Login;


