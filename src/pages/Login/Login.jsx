import React, { useState } from 'react';
// import 'bootstrap/dist/css/bootstrap.min.css'; // Importa los estilos de Bootstrap
import './Login.css';

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
    <p className='acceso'>Acceso a la intranet</p>
    <form onSubmit={handleLogin}>
      <div className="form-group">
        <label>Nombre de usuario:</label>
        <input
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className="form-control"
        />
      </div>
      <div className="form-group">
        <label>Contraseña:</label>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="form-control"
        />
      </div>
      <button type="submit" className="btn btn-iniciar">Iniciar sesión</button>
    </form>
    </>
  );
};

export default Login;


