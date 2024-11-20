import React, { useState, useEffect } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import LoadingComponent from "./components/Loading/Loading"; // Importa tu componente de carga personalizado
import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";
import Login from "./pages/Login/Login.jsx";
import Dashboard from "./pages/Dashboard/Dashboard.jsx";
import CreateClient from "./components/CreateClient/CreateClient";
import ClientsView from "./pages/ClientsView/ClientsView.jsx";
import OrdersView from "./pages/OrdersView/OrdersView.jsx";
import CreateOrder from "./pages/CreateOrder/CreateOrder.jsx";
import Invoices from "./pages/Invoices/invoices.jsx";
import UpdateClient from "./pages/UpdateClient/UpdateClient.jsx";
import DeliveryNotes from "./pages/DeliveryNotes/DeliveryNotes.jsx";
import UpdateOrder from "./pages/UpdateOrder/UpdateOrder";
import PanelControl from "./pages/PanelControl/PanelControl";
import Support from "./pages/Support/Support.jsx";
<<<<<<< HEAD
import CreateInvoiceForm from "./pages/CreateInvoice/CreateInvoice.jsx";
=======
import CreateDelNotes from "./pages/CreateDelNotes/CreateDelNotes";
import PrivateRoute from "./components/PrivateRoute/PrivateRoute.jsx";
>>>>>>> 2a522790baefa6dac08840adc3d7de47e251e107

function App() {
  const [authenticated, setAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);
  // -_- -------- COMPONENTE LOADING (RENDERIZAR COMO CATCH DE ERRORES O ESPERA) --------- -_- //
  useEffect(() => {
    // Simulación de carga de datos
    const loadData = async () => {
      try {
        // Simula la carga de datos (aquí puedes realizar tu lógica de carga)
        await new Promise((resolve) => setTimeout(resolve, 1000));
        setIsLoading(false);
      } catch (error) {
        console.error("Error al cargar datos:", error);
        setIsLoading(false);
        setHasError(true);
      }
    };

    loadData();
  }, []);

  const handleLogin = () => {
    setAuthenticated(true);
  };

  const handleLogout = () => {
    // Limpiar el estado de autenticación
    setAuthenticated(false);
    // Limpiar el almacenamiento local
    localStorage.removeItem('userData'); // Asegúrate de cambiar 'userData' por el nombre de la clave donde se guarda la información del usuario
  };
  
  if (isLoading) {
    return <LoadingComponent text="Cargando..." />;
  }
  if (hasError) {
    return <div>Error al cargar la página.</div>;
  }

  return (
    <BrowserRouter>
    <Header authenticated={authenticated} onLogout={handleLogout} />
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/client/clients-view" element={<ClientsView />} />
        <Route path="/create-client/" element={<CreateClient />} />
        <Route path="/update-client/:id?" element={<UpdateClient />} />
        <Route path="/delivery-note/notes" element={<DeliveryNotes />} />
        <Route path="/create-note" element={<CreateDelNotes />} />
        <Route path="/order/orders" element={<OrdersView />} />
        <Route path="/order/update-order/:id" element={<UpdateOrder />} />
        <Route path="/create-order" element={<CreateOrder />} />
        <Route path="/invoices-view" element={<Invoices />} />
<<<<<<< HEAD
        <Route path="/create-invoice/" element={<CreateInvoiceForm/>} />
        <Route path="/control-panel" element={<PanelControl />} />
=======
        <Route path="/panel-control" element={<PanelControl />} />
>>>>>>> 2a522790baefa6dac08840adc3d7de47e251e107
        <Route path="/support" element={<Support />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  );
}

export default App;
