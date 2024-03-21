import React, { useState } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Header from './components/Header/Header';
import Footer from './components/Footer/Footer';
import Login from "./pages/Login/Login.jsx";
import Dashboard from './pages/Dashboard/Dashboard.jsx';
import CreateClient from './components/CreateClient/CreateClient';
import ClientsView from './pages/ClientsView/ClientsView.jsx';
import Invoices from './pages/Invoices/invoices.jsx';

function App() {
  
  return (
    <BrowserRouter>
      <Header  />
      <Routes>
        <Route path='/' element={<Login/>} />
          <>
            <Route path='/dashboard' element={<Dashboard />} />
          
            <Route path='/clients-view' element={<ClientsView />} />
            <Route path='/create-client' element={<CreateClient />} />

            <Route path='/invoices-view' element={<Invoices/>} />
            
          </>

      </Routes>
      <Footer />
    </BrowserRouter>
  );
}

export default App;

