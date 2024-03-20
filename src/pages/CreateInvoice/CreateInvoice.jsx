import React, { useState } from "react";
import axios from "axios";
import "./CreateInvoice.css";

const CreateInvoice = () => {
  const [formData, setFormData] = useState({
    cif_invoicee: "",
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

    if (!formData.cif_invoicee) {
      errors.cif_invoicee = "El CIF del invoicee es requerido";
    }

    if (!formData.nombre) {
      errors.nombre = "El nombre del invoicee es requerido";
    }

    if (!formData.direccion) {
      errors.direccion = "La dirección del invoicee es requerida";
    }

    if (!formData.poblacion) {
      errors.poblacion = "La población del invoicee es requerida";
    }

    if (!formData.provincia) {
      errors.provincia = "La provincia del invoicee es requerida";
    }

    if (!formData.pais) {
      errors.pais = "El país del invoicee es requerido";
    }

    if (!formData.codigo_postal) {
      errors.codigo_postal = "El código postal del invoicee es requerido";
    }

    if (!formData.telefono) {
      errors.telefono = "El teléfono del invoicee es requerido";
    }

    if (!formData.email) {
      errors.email = "El correo electrónico del invoicee es requerido";
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
        const response = await axios.post("http://localhost:3000/api/invoices", formData);
        console.log("invoicee creado con éxito:", response.data);
        // Aquí puedes realizar alguna acción adicional después de crear el invoicee
      } catch (error) {
        console.error("Error al crear el invoicee:", error);
        // Aquí puedes manejar el error, como mostrar un mensaje de error al usuario
      }
    }
  };

  return (
    <div className="edit-profile-container">
      <h2>Crear Factura</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label className="form-label">CIF invoicee:</label>
          <input type="text" name="cif_invoicee" value={formData.cif_invoicee} onChange={handleInputChange} className="form-input" />
          {errors.cif_invoicee && <span>{errors.cif_invoicee}</span>}
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
        <button type="submit" className="button">Crear Factura</button>
      </form>
    </div>
  );
};

export default CreateInvoice;
