import React, { useState, useEffect } from "react";
import axios from "axios";
import "./ClientsView.css";
import { Table, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

const ClientsView = () => {
  const navigate = useNavigate();

  const [clients, setClients] = useState([]);
  const [filteredClients, setFilteredClients] = useState([]);
  const [searchInputs, setSearchInputs] = useState({
    cif_cliente: "",
    nombre: "",
    direccion: "",
    poblacion: "",
    provincia: "",
    pais: "",
    codigo_postal: "",
    telefono: "",
    email: "",
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("http://localhost:3000/client/clients");
        setClients(response.data);
        setFilteredClients(response.data);
      } catch (error) {
        console.error("Error fetching clients data:", error);
      }
    };

    fetchData();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setSearchInputs((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  useEffect(() => {
    const filterClients = () => {
      const filteredData = clients.filter((client) =>
        Object.keys(searchInputs).every((key) =>
          client[key].toLowerCase().includes(searchInputs[key].toLowerCase())
        )
      );
      setFilteredClients(filteredData);
    };

    filterClients();
  }, [searchInputs, clients]);

  const handleEditClick = (client) => {
    console.log("Cliente seleccionado para editar:", client);
    navigate(`/update-client/${client.cif_cliente}`, {
      state: { noteData: client },
    });
  };

  const handleDeleteClick = (client) => {
    if (window.confirm(`¿Seguro que quieres eliminar al cliente ${client.cif_cliente} ${client.nombre}?`)) {
      axios
        .delete(
          `http://localhost:3000/client/clients/${client.cif_cliente}`
        )
        .then((response) => {
          const updatedClients = clients.filter(
            (client) => client.cif_cliente !== client.cif_cliente
          );
          setClients(updatedClients);
          setFilteredClients(updatedClients);
        })
        .catch((error) => {
          console.error("Error deleting client:", error);
        });
    }
  };

  const handleCreateUserClick = () => {
    navigate("/create-client");
  };

  const toggleActiveStatus = (client) => {
    // Cambiar el estado activo/inactivo del cliente
    const updatedClients = clients.map((c) =>
      c.cif_cliente === client.cif_cliente ? { ...c, activo: !c.activo } : c
    );
    setClients(updatedClients);
    setFilteredClients(updatedClients);
  };

  return (
    <div>
      <h1 className="text-center mb-4 header-client">Clientes</h1>
      <div>
        <Table striped bordered responsive hover>
          <thead>
            <tr>
              <th>
                <input
                  type="text"
                  name="cif_cliente"
                  value={searchInputs.cif_cliente}
                  onChange={handleInputChange}
                  placeholder="CIF Cliente"
                  className="large-font"
                />
              </th>
              <th>
                <input
                  type="text"
                  name="nombre"
                  value={searchInputs.nombre}
                  onChange={handleInputChange}
                  placeholder="Nombre"
                  className="large-font"
                />
              </th>
              <th>
                <input
                  type="text"
                  name="direccion"
                  value={searchInputs.direccion}
                  onChange={handleInputChange}
                  placeholder="Dirección"
                  className="large-font"
                />
              </th>
              <th>
                <input
                  type="text"
                  name="poblacion"
                  value={searchInputs.poblacion}
                  onChange={handleInputChange}
                  placeholder="Población"
                  className="large-font"
                />
              </th>
              <th>
                <input
                  type="text"
                  name="provincia"
                  value={searchInputs.provincia}
                  onChange={handleInputChange}
                  placeholder="Provincia"
                  className="large-font"
                />
              </th>
              <th>
                <input
                  type="text"
                  name="pais"
                  value={searchInputs.pais}
                  onChange={handleInputChange}
                  placeholder="País"
                  className="large-font"
                />
              </th>
              <th>
                <input
                  type="text"
                  name="codigo_postal"
                  value={searchInputs.codigo_postal}
                  onChange={handleInputChange}
                  placeholder="Código Postal"
                  className="large-font"
                />
              </th>
              <th>
                <input
                  type="text"
                  name="telefono"
                  value={searchInputs.telefono}
                  onChange={handleInputChange}
                  placeholder="Teléfono"
                  className="large-font"
                />
              </th>
              <th>
                <input
                  type="text"
                  name="email"
                  value={searchInputs.email}
                  onChange={handleInputChange}
                  placeholder="Email"
                  className="large-font"
                />
              </th>
              <th>Estado</th> {/* Nueva columna para mostrar el estado activo/inactivo */}
              <th>Editar</th>
              <th>Eliminar</th>
            </tr>
          </thead>
          <tbody>
            {filteredClients.map((client) => (
              <tr key={client.cif_cliente} className="client">
                <td className="table-data client-cif">{client.cif_cliente}</td>
                <td className="table-data client-nombre">{client.nombre}</td>
                <td className="table-data client-direccion">{client.direccion}</td>
                <td className="table-data client-poblacion">{client.poblacion}</td>
                <td className="table-data client-provincia">{client.provincia}</td>
                <td className="table-data cient-pais">{client.pais}</td>
                <td className="table-data client-postal">{client.codigo_postal}</td>
                <td className="table-data client-tlf">{client.telefono}</td>
                <td className="table-data client-mail">{client.email}</td>
                <td className="table-data">
                  <Button
                    variant={client.activo ? "success" : "danger"} // Cambiar color del botón según el estado activo/inactivo
                    onClick={() => toggleActiveStatus(client)} // Cambiar estado activo/inactivo
                  >
                    {client.activo ? "Activo" : "Inactivo"}
                  </Button>
                </td>
                <td className="table-data">
                  <Button
                    variant="warning"
                    onClick={() => handleEditClick(client)}
                  >
                    🖋️
                  </Button>
                </td>
                <td className="table-data">
                  <Button
                    variant="danger"
                    onClick={() => handleDeleteClick(client)}
                  >
                    🗑️
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </div>
      <div className="text-center">
        <Button onClick={handleCreateUserClick} className="crear-cliente">
          Crear Nuevo Cliente
        </Button>
      </div>
    </div>
  );
};

export default ClientsView;

