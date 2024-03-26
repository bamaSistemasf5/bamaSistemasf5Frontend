import React, { useState } from "react";
import axios from "axios";
import "./CreateInvoice.css";
import { Container, Modal, Button } from "react-bootstrap";
import 'bootstrap/dist/css/bootstrap.min.css';


const CreateInvoiceForm = () => {
  const [formData, setFormData] = useState({
    id_pedido: "",
    cif_cliente: "",
    fecha_fact: "",
    porcentaje_iva: "",
    total_factura: ""
  });

  const [errors, setErrors] = useState({});

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };

  const validateForm = () => {
    const errors = {};

    if (!formData.id_pedido) {
      errors.id_pedido = "El id de pedido  es requerido";
    }

    if (!formData.cif_cliente) {
      errors.cif_cliente = "el CIF es requerido";
    }

    if (!formData.fecha_fact) {
      errors.fecha_fact = "La fecha de factura es requerida";
    }

    if (!formData.porcentaje_iva) {
      errors.porcentaje_iva = "% IVA es requerida";
    }

    if (!formData.total_factura) {
      errors.total_factura = "total factura es requerido";
    }

    setErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (validateForm()) {
      try {
        const response = await axios.post("http://localhost:3000/create-invoice", formData);
        console.log("Factura creada con éxito:", response.data);
        // Puedes realizar alguna acción adicional después de crear el cliente
      } catch (error) {
        console.error("Error al crear la factura:", error);
        // Puedes manejar el error aquí, como mostrar un mensaje de error al usuario
      }
    }
  };

  return (
    <Container className="create-container">
      <h2 className="h2-client-create">Crear Nueva Factura</h2>
      <form onSubmit={handleSubmit} className="formulario-create">
      
        <div className="form-group">
          <label className="form-label">ID Pedido:</label>
          <input type="text" name="id_pedido" value={formData.id_pedido} onChange={handleInputChange} className="form-input" />
          {errors.id_pedido && <span>{errors.id_pedido}</span>}
        </div>
        <div className="form-group">
          <label className="form-label">CIF Cliente:</label>
          <input type="text" name="cif_cliente" value={formData.cif_cliente} onChange={handleInputChange} className="form-input" />
          {errors.cif_cliente && <span>{errors.cif_cliente}</span>}
        </div>
       
        <div className="form-group">
          <label className="form-label">Fecha factura:</label>
          <input type="date" name="fecha_fact" value={formData.fecha_fact} onChange={handleInputChange} className="form-input" />
          {errors.fecha_fact && <span>{errors.fecha_fact}</span>}
        </div>
        <div className="form-group">
          <label className="form-label">% IVA:</label>
          <input type="text" name="porcentaje_iva" value={formData.porcentaje_iva} onChange={handleInputChange} className="form-input" />
          {errors.porcentaje_iva && <span>{errors.porcentaje_iva}</span>}
        </div>
        <div className="form-group">
          <label className="form-label">Total Factura:</label>
          <input type="text" name="total_factura" value={formData.total_factura} onChange={handleInputChange} className="form-input" />
          {errors.total_factura && <span>{errors.total_factura}</span>}
        </div>
        
        <button type="submit" className="button">Crear Factura</button>
      </form>
    </Container>
  );
};

export default CreateInvoiceForm;


