import React, { useState } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Header from './components/Header/Header';
import Footer from './components/Footer/Footer';
import Login from "./pages/Login/Login.jsx";
import Dashboard from './pages/Dashboard/Dashboard.jsx';
import CreateClient from './components/CreateClient/CreateClient';
import ClientsView from './pages/ClientsView/ClientsView.jsx';
import PrivateRoute from './components/PrivateRoute/PrivateRoute';

function App() {
  const [authenticated, setAuthenticated] = useState(false);

  const handleLogin = () => {
    setAuthenticated(true);
  };

  const handleLogout = () => {
    setAuthenticated(false);
  };

  return (
    <BrowserRouter>
      <Header authenticated={authenticated} onLogout={handleLogout} />
      <Routes>
        <Route path='/' element={<Login onLogin={handleLogin} />} />
        {authenticated ? (
          <>
            <Route path='/dashboard' element={<Dashboard />} />
            <Route element={<PrivateRoute />} />

            <Route path='/clients-view' element={<ClientsView />} />
            <Route path='/create-client' element={<CreateClient />} />
          </>
        ) : (
          null
        )}
      </Routes>
      <Footer />
    </BrowserRouter>
  );
}

export default App;

