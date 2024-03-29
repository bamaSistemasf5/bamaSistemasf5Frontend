import React, { useState } from "react";
import axios from "axios";
import './CreateDelNotes.css'
import jsPDF from "jspdf";

const CreateDelNotes = () => {
  const [formData, setFormData] = useState({
    id_albaran: "",
    id_pedido: "",
    cliente: "",
    fecha_albaran: "",
    firmado: ""
  });

  const [errors, setErrors] = useState({});
  const [showModal, setShowModal] = useState(false);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };

  const validateForm = () => {
    const errors = {};

    if (!formData.id_albaran) {
      errors.id_albaran = "El número de albarán es requerido";
    }

    if (!formData.id_pedido) {
      errors.id_pedido = "El número de pedido es requerido";
    }

    if (!formData.cliente) {
      errors.cliente = "El cliente es requerido";
    }

    if (!formData.fecha_albaran) {
      errors.fecha_albaran = "La fecha del albarán es requerida";
    }

    if (!formData.firmado) {
      errors.firmado = "El estado de firma es requerido";
    }

    setErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const generatePDF = () => {
    const doc = new jsPDF();
    doc.text("Albarán", 10, 10);
    doc.text(`Número de Albarán: ${formData.id_albaran}`, 10, 20);
    doc.text(`Número de Pedido: ${formData.id_pedido}`, 10, 30);
    doc.text(`Cliente: ${formData.cliente}`, 10, 40);
    doc.text(`Fecha Albarán: ${formData.fecha_albaran}`, 10, 50);
    doc.text(`Firmado: ${formData.firmado}`, 10, 60);
    doc.save("albaran.pdf");
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (validateForm()) {
      try {
        const response = await axios.post("http://localhost:3000/delivery-note/create-note", formData);
        console.log("Albarán creado con éxito:", response.data);
        generatePDF(); // Generar el PDF después de crear el albarán
        setShowModal(true); // Mostrar modal después de crear el albarán
        // Aquí puedes realizar alguna acción adicional después de crear el cliente
      } catch (error) {
        console.error("Error al crear el albarán:", error);
        // Aquí puedes manejar el error, como mostrar un mensaje de error al usuario
      }
    }
  };

  return (
    <div className="edit-profile-container formulario-crear-notes">
      <h2 className="notes-header">Crear Albarán</h2>
      <form onSubmit={handleSubmit} className="form-notes">
        <div className="form-group">
          <label className="form-label">Número Albarán:</label>
          <input type="text" name="id_albaran" value={formData.id_albaran} onChange={handleInputChange} className="form-input" />
          {errors.id_albaran && <span>{errors.id_albaran}</span>}
        </div>
        <div className="form-group">
          <label className="form-label">Número Pedido:</label>
          <input type="text" name="id_pedido" value={formData.id_pedido} onChange={handleInputChange} className="form-input" />
          {errors.id_pedido && <span>{errors.id_pedido}</span>}
        </div>
        <div className="form-group">
          <label className="form-label">Cliente:</label>
          <input type="text" name="cliente" value={formData.cliente} onChange={handleInputChange} className="form-input" />
          {errors.cliente && <span>{errors.cliente}</span>}
        </div>
        <div className="form-group">
          <label className="form-label">Fecha Albarán:</label>
          <input type="date" name="fecha_albaran" value={formData.fecha_albaran} onChange={handleInputChange} className="form-input" />
          {errors.fecha_albaran && <span>{errors.fecha_albaran}</span>}
        </div>
        <div className="form-group">
          <label className="form-label">Firmado:</label>
          <input type="text" name="firmado" value={formData.firmado} onChange={handleInputChange} className="form-input" />
          {errors.firmado && <span>{errors.firmado}</span>}
        </div>
       <div className="botones">
        <button type="submit" className="button enviar-note">Enviar Albarán</button>
        <button type="button" onClick={generatePDF} className="button pdf-create-notes">Descargar Albarán</button>

       </div>
      </form>
      {showModal && (
        <div className="modal">
          <div className="modal-content">
            <span className="close" onClick={() => setShowModal(false)}>&times;</span>
            <p>¡Albarán creado con éxito!</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default CreateDelNotes;


