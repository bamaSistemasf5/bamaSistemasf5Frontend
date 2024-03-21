import React, { useState, useEffect } from "react";
import { BrowserRouter, Route, Routes} from "react-router-dom";
import LoadingComponent from "./components/Loading/Loading"; // Importa tu componente de carga personalizado
import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";
import Login from "./pages/Login/Login.jsx";
import Dashboard from './pages/Dashboard/Dashboard.jsx';
import CreateClient from './components/CreateClient/CreateClient';
import ClientsView from './pages/ClientsView/ClientsView.jsx';
import Invoices from './pages/Invoices/invoices.jsx';
import CreateInvoice from './pages/CreateInvoice/CreateInvoice.jsx'


function App() {
  
  return (
    <BrowserRouter>
      <Header  />
      <Routes>
      <Route path="/" element={<Login onLogin={handleLogin} />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/clients-view" element={<ClientsView />} />
        <Route path="/create-client/" element={<CreateClient />} />
        <Route path="/update-client/:id?" element={<UpdateClient />} />
        <Route path="/delivery-notes" element={<DeliveryNotes />} />
        <Route path="/orders-view" element={<OrdersView />} />
        <Route path="/create-order" element={<CreateOrder />} />
        <Route path="/invoices-view" element={<Invoices />} />
        <Route path="/create-invoice" element={<CreateInvoice />} />
      </Routes>
      <Footer />
    </BrowserRouter>
    
  );
}

export default App;
