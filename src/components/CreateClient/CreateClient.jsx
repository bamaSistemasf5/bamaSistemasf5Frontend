import React, { useState } from "react";
import axios from "axios";
import "./CreateClient.css";
import { Container, Modal, Button } from "react-bootstrap";
import 'bootstrap/dist/css/bootstrap.min.css';


const CreateClientForm = () => {
  const [formData, setFormData] = useState({
    cif_cliente: "",
    nombre: "",
    direccion: "",
    poblacion: "",
    provincia: "",
    pais: "",
    codigo_postal: "",
    telefono: "",
    email: ""
  });

  const [errors, setErrors] = useState({});
  const [showSuccessModal, setShowSuccessModal] = useState(false);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };

  const validateForm = () => {
    const errors = {};

    if (!formData.cif_cliente) {
      errors.cif_cliente = "El CIF del cliente es requerido";
    }

    if (!formData.nombre) {
      errors.nombre = "El nombre del cliente es requerido";
    }

    if (!formData.direccion) {
      errors.direccion = "La dirección del cliente es requerida";
    }

    if (!formData.poblacion) {
      errors.poblacion = "La población del cliente es requerida";
    }

    if (!formData.provincia) {
      errors.provincia = "La provincia del cliente es requerida";
    }

    if (!formData.pais) {
      errors.pais = "El país del cliente es requerido";
    }

    if (!formData.codigo_postal) {
      errors.codigo_postal = "El código postal del cliente es requerido";
    }

    if (!formData.telefono) {
      errors.telefono = "El teléfono del cliente es requerido";
    }

    if (!formData.email) {
      errors.email = "El correo electrónico del cliente es requerido";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      errors.email = "El correo electrónico no es válido";
    }

    setErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (validateForm()) {
      try {
        const response = await axios.post("http://localhost:3000/client/create-client", formData);
        console.log("Cliente creado con éxito:", response.data);
        setShowSuccessModal(true); // Mostrar modal de éxito
        // Puedes realizar alguna acción adicional después de crear el cliente
      } catch (error) {
        console.error("Error al crear el cliente:", error);
        // Puedes manejar el error aquí, como mostrar un mensaje de error al usuario
      }
    }
  };

  return (
    <Container className="create-container">
      <h2 className="h2-client-create">Crear Cliente</h2>
      <form onSubmit={handleSubmit} className="formulario-create">
        <div className="form-group">
          <label className="form-label">CIF Cliente:</label>
          <input type="text" name="cif_cliente" value={formData.cif_cliente} onChange={handleInputChange} className="form-input" />
          {errors.cif_cliente && <span>{errors.cif_cliente}</span>}
        </div>
        <div className="form-group">
          <label className="form-label">Nombre:</label>
          <input type="text" name="nombre" value={formData.nombre} onChange={handleInputChange} className="form-input" />
          {errors.nombre && <span>{errors.nombre}</span>}
        </div>
        <div className="form-group">
          <label className="form-label">Dirección:</label>
          <input type="text" name="direccion" value={formData.direccion} onChange={handleInputChange} className="form-input" />
          {errors.direccion && <span>{errors.direccion}</span>}
        </div>
        <div className="form-group">
          <label className="form-label">Población:</label>
          <input type="text" name="poblacion" value={formData.poblacion} onChange={handleInputChange} className="form-input" />
          {errors.poblacion && <span>{errors.poblacion}</span>}
        </div>
        <div className="form-group">
          <label className="form-label">Provincia:</label>
          <input type="text" name="provincia" value={formData.provincia} onChange={handleInputChange} className="form-input" />
          {errors.provincia && <span>{errors.provincia}</span>}
        </div>
        <div className="form-group">
          <label className="form-label">País:</label>
          <input type="text" name="pais" value={formData.pais} onChange={handleInputChange} className="form-input" />
          {errors.pais && <span>{errors.pais}</span>}
        </div>
        <div className="form-group">
          <label className="form-label">Código Postal:</label>
          <input type="text" name="codigo_postal" value={formData.codigo_postal} onChange={handleInputChange} className="form-input" />
          {errors.codigo_postal && <span>{errors.codigo_postal}</span>}
        </div>
        <div className="form-group">
          <label className="form-label">Teléfono:</label>
          <input type="text" name="telefono" value={formData.telefono} onChange={handleInputChange} className="form-input" />
          {errors.telefono && <span>{errors.telefono}</span>}
        </div>
        <div className="form-group">
          <label className="form-label">Correo Electrónico:</label>
          <input type="email" name="email" value={formData.email} onChange={handleInputChange} className="form-input" />
          {errors.email && <span>{errors.email}</span>}
        </div>
        <button type="submit" className="button">Crear Cliente</button>
      </form>

      {/* Modal de éxito */}
      <Modal show={true} onHide={() => setShowSuccessModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Cliente Creado</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>¡El cliente se ha creado correctamente!</p>
          {/* Puedes agregar más contenido al cuerpo del modal si lo deseas */}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowSuccessModal(false)}>Cerrar</Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
};

export default CreateClientForm;

