import React, { useState } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Header from './components/Header/Header';
import Footer from './components/Footer/Footer';
import Login from "./pages/Login/Login.jsx";
import Dashboard from './pages/Dashboard/Dashboard.jsx';
import CreateClient from './components/CreateClient/CreateClient';
import ClientsView from './pages/ClientsView/ClientsView.jsx';
import OrdersView from './pages/OrdersView/OrdersView.jsx';
import CreateOrder from './pages/CreateOrder/CreateOrder.jsx';
// import Invoices from './pages/Invoices/Invoices.jsx';
// import CreateInvoice from './pages/CreateInvoice/CreateInvoice.jsx';

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
      <Route path='/login' element={<Login />}/>
      <Route path='/dashboard' element={<Dashboard />} />
      <Route path='/clients-view' element={<ClientsView />} />
      <Route path='/create-client' element={<CreateClient />}/>
      <Route path='/orders-view' element={<OrdersView />} />
      <Route path='/create-order' element={<CreateOrder />}/>
      {/* <Route path='/invoices-view' element={<Invoices />} /> */}
      {/* <Route path='/create-invoice' element={<CreateInvoice />}/> */}
      </Routes>
      <Footer />
    </BrowserRouter>
  );
}

export default App;

