import React, { useState } from "react";
import axios from "axios";
import "./CreateInvoice.css";

const CreateInvoice = () => {
  const [formData, setFormData] = useState({
    nro_factura: "",
    fecha: "",
    cliente: "",
    cif_cliente: "",
    fecha_vencimiento: "",
    fecha_cobro: "",
    estado: "",
    base_imponible: "",
    porc_iva: "",
    importe_iva: "",
    total_factura: "",
    nro_pedido: "",
    pedido: "",
    albaran: ""
  });

  const [errors, setErrors] = useState({});

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };

  const validateForm = () => {
    const errors = {};

    // Validación de los campos aquí

    setErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (validateForm()) {
      try {
        const response = await axios.post("http://localhost:3000/create-invoice", formData);
        console.log("Factura creada con éxito:", response.data);
        // Aquí puedes realizar alguna acción adicional después de crear la factura
      } catch (error) {
        console.error("Error al crear la factura:", error);
        // Aquí puedes manejar el error, como mostrar un mensaje de error al usuario
      }
    }
  };

  return (
    <div className="create-invoice-container">
      <h2>Crear Factura</h2>
      <form onSubmit={handleSubmit}>
        {/* Aquí va el formulario para crear la factura */}
      </form>
    </div>
  );
};

export default CreateInvoice;
