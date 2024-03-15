import React, { useState } from "react";
import axios from "axios";
import "./CreateDelNotes.css";

const CreateDelNotes = () => {
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
        const response = await axios.post("http://localhost:3000/api/clients", formData);
        console.log("Cliente creado con éxito:", response.data);
        // Aquí puedes realizar alguna acción adicional después de crear el cliente
      } catch (error) {
        console.error("Error al crear el cliente:", error);
        // Aquí puedes manejar el error, como mostrar un mensaje de error al usuario
      }
    }
  };

  return (
    <div className="edit-profile-container">
      <h2>Crear Albarán</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label className="form-label">Número Albarán:</label>
          <input type="text" name="cif_cliente" value={formData.cif_cliente} onChange={handleInputChange} className="form-input" />
          {errors.cif_cliente && <span>{errors.cif_cliente}</span>}
        </div>
        <div className="form-group">
          <label className="form-label">Cliente:</label>
          <input type="text" name="nombre" value={formData.nombre} onChange={handleInputChange} className="form-input" />
          {errors.nombre && <span>{errors.nombre}</span>}
        </div>
        <div className="form-group">
          <label className="form-label">Fecha Albarán:</label>
          <input type="text" name="direccion" value={formData.direccion} onChange={handleInputChange} className="form-input" />
          {errors.direccion && <span>{errors.direccion}</span>}
        </div>
        <div className="form-group">
          <label className="form-label">Importe:</label>
          <input type="text" name="poblacion" value={formData.poblacion} onChange={handleInputChange} className="form-input" />
          {errors.poblacion && <span>{errors.poblacion}</span>}
        </div>
        <div className="form-group">
          <label className="form-label">CIF Pedido</label>
          <input type="text" name="provincia" value={formData.provincia} onChange={handleInputChange} className="form-input" />
          {errors.provincia && <span>{errors.provincia}</span>}
        </div>
       
        <button type="submit" className="button">Descargar Albarán</button>
        <button type="submit" className="button button-cancel">Descargar Albarán Firmado</button>
      </form>
    </div>
  );
};

export default CreateDelNotes;
