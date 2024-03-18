import React, { useState } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Header from './components/Header/Header';
import Footer from './components/Footer/Footer';
import Login from './pages/Login/Login';
import Dashboard from './pages/Dashboard/Dashboard';
import CreateClient from './components/CreateClient/CreateClient';
<<<<<<< Updated upstream
import ClientsView from './pages/ClientsView/ClientsView.jsx';
import PrivateRoute from './components/PrivateRoute/PrivateRoute';
=======
import ClientsView from './pages/ClientsView/ClientsView';
import UpdateClient from './pages/UpdateClient/UpdateClient';
import DeliveryNotes from './pages/DeliveryNotes/DeliveryNotes';
import CreateDelNotes from './pages/CreateDelNotes/CreateDelNotes';
>>>>>>> Stashed changes

function App() {
  const handleLogin = (role) => {
    // Handle login logic, e.g., setting user role in state
    console.log('Logged in with role:', role);
  };

  return (
<<<<<<< Updated upstream
    <BrowserRouter>
      <Header authenticated={authenticated} onLogout={handleLogout} />
      <Routes>
        <Route path='/' element={<Login />} />
          <>
            <Route path='/dashboard' element={<Dashboard />} />
            <Route path='/clients-view' element={<ClientsView />} />
            <Route path='/create-client' element={<CreateClient />} />
          </>
      </Routes>
      <Footer />
    </BrowserRouter>
=======
    <>
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path="/" element={<Login onLogin={handleLogin} />} />
          {/* Other routes */}
          <Route path='/dashboard' element={<Dashboard />} />
          <Route path='/clients-view' element={<ClientsView />} />
          <Route path='/create-client' element={<CreateClient />}/>
          <Route path='/update-client' element={<UpdateClient />}/>
          <Route path='/update-client' element={<UpdateClient />}/>

        </Routes>
        <Footer />
      </BrowserRouter>
    </>
>>>>>>> Stashed changes
  );
}

export default App;




