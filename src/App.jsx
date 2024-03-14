import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";
import Login from "./pages/Login/Login.jsx";
import Dashboard from "./pages/Dashboard/Dashboard.jsx";
import CreateClient from "./components/CreateClient/CreateClient";
import ClientsView from "./pages/ClientsView/ClientsView.jsx";
import UpdateClient from "./pages/UpdateClient/UpdateClient";


function App() {
  return (
    <>
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/clients-view" element={<ClientsView />} />
          <Route path="/create-client" element={<CreateClient />} />
          <Route path="/update-client/:id?" element={<UpdateClient />} />
        </Routes>
        <Footer />
      </BrowserRouter>
    </>
  );
}

export default App;
