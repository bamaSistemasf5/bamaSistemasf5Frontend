import React, { useState, useEffect } from "react";
// import { useParams, useLocation } from "react-router-dom";
import "./CreateClient.css";

const CreateClient = ({ onSave, onCancel }) => {
  const [formData, setFormData] = useState({
    name: '',
    lastname: '',
    tel: '',
    email: '',
    password: '',
    telefono: ''
  });

  const [errores, setErrores] = useState({});

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const validarFormulario = () => {
    const errores = {};

    // Validación de nombre cliente
    if (!formData.name || formData.name.trim() === '') {
      errores.nombreCliente = 'El nombre del cliente es requerido';
    }

    // Validación de dirección social
    if (!formData.lastname || formData.lastname.trim() === '') {
      errores.direccionSocial = 'La dirección social es requerida';
    }

    // Validación de CIF
    if (!formData.tel || !/^\d{9}$/.test(formData.tel)) {
      errores.CIF = 'El CIF debe contener 9 dígitos numéricos';
    }

    // Validación de correo electrónico
    if (!formData.email || !/\S+@\S+\.\S+/.test(formData.email)) {
      errores.correoElectronico = 'El correo electrónico no es válido';
    }

    // Validación de forma de pago
    if (!formData.password || !/^(Transferencia|Confirming|Giro bancario)$/.test(formData.password)) {
      errores.formaPago = 'La forma de pago debe ser Transferencia, Confirming o Giro bancario';
    }

    // Validación de teléfono
    if (!formData.telefono || !/^\d{9}$/.test(formData.telefono)) {
      errores.telefono = 'El teléfono debe contener 9 dígitos numéricos';
    }

    setErrores(errores);
    return Object.keys(errores).length === 0;
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    if (validarFormulario()) {
      // Aquí puedes enviar el formulario
      console.log('Formulario válido, enviar datos:', formData);
    } else {
      console.log('Formulario inválido, por favor corrija los errores');
    }
  };

  return (
    <div className="edit-profile-container">
      <h2 className="edit-profile-heading">Crear nuevo cliente</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label className="form-label">Nombre cliente</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleInputChange}
            className="form-input"
          />
          {errores.nombreCliente && <span className="error-message">{errores.nombreCliente}</span>}
        </div>
        <div className="form-group">
          <label className="form-label">Dirección social</label>
          <input
            type="text"
            name="lastname"
            value={formData.lastname}
            onChange={handleInputChange}
            className="form-input"
          />
          {errores.direccionSocial && <span className="error-message">{errores.direccionSocial}</span>}
        </div>
        <div className="form-group">
          <label className="form-label">CIF</label>
          <input
            type="tel"
            name="tel"
            value={formData.tel}
            onChange={handleInputChange}
            className="form-input"
          />
          {errores.CIF && <span className="error-message">{errores.CIF}</span>}
        </div>
        <div className="form-group">
          <label className="form-label">Correo Electrónico</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleInputChange}
            className="form-input"
          />
          {errores.correoElectronico && <span className="error-message">{errores.correoElectronico}</span>}
        </div>
        <div className="form-group">
          <label className="form-label">Forma de pago: Transferencia/Confirming/Giro bancario</label>
          <input
            type="text"
            name="password"
            value={formData.password}
            onChange={handleInputChange}
            className="form-input"
          />
          {errores.formaPago && <span className="error-message">{errores.formaPago}</span>}
        </div>
        <div className="form-group">
          <label className="form-label">Teléfono</label>
          <input
            type="tel"
            name="telefono"
            value={formData.telefono}
            onChange={handleInputChange}
            className="form-input"
          />
          {errores.telefono && <span className="error-message">{errores.telefono}</span>}
        </div>
        <div className="button-group">
          <button className="button" type="submit">
            Guardar Cambios
          </button>
          <button className="button button-cancel" type="button" onClick={() => setFormData({})}>
            Cancelar
          </button>
        </div>
      </form>
    </div>
  );
}

export default CreateClient;
