// UpdateOrder.jsx

import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import axios from 'axios';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import './UpdateOrder.css';

function UpdateOrder() {
  const location = useLocation();
  const { orderData } = location.state;

  // Estados locales para almacenar los valores modificados
  const [idPedido, setIdPedido] = useState(orderData.id_pedido);
  const [cifCliente, setCifCliente] = useState(orderData.cif_cliente);
  const [fechaPedido, setFechaPedido] = useState(new Date(orderData.fecha_pedido));
  const [baseImponible, setBaseImponible] = useState(orderData.base_imponible);
  const [showModal, setShowModal] = useState(false);

  // Manejadores de cambios para actualizar los estados
  const handleIdPedidoChange = (event) => {
    setIdPedido(event.target.value);
  };

  const handleCifClienteChange = (event) => {
    setCifCliente(event.target.value);
  };

  // Manejador para enviar el formulario
  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      // Realizar la solicitud de actualización a través de Axios
      const response = await axios.put(`http://localhost:3000/order/update-order/${orderData.id_pedido}`, {
        id_pedido: idPedido,
        cif_cliente: cifCliente,
        fecha_pedido: fechaPedido.toISOString().split('T')[0], // Formatear la fecha
        base_imponible: baseImponible
      });

      // Verificar si la solicitud fue exitosa
      if (response.status === 200) {
        console.log("Pedido actualizado con éxito:", response.data);
        setShowModal(true); // Mostrar el modal
        // Aquí podrías realizar cualquier otra acción después de la actualización, como redirigir a otra página
      }
    } catch (error) {
      console.error("Error al actualizar el pedido:", error);
      // Manejar el error, mostrar un mensaje al usuario, etc.
    }
  };

  return (
    <div>
      <h2 className='editar-pedido-header'>Editar Pedido</h2>
      <form onSubmit={handleSubmit} className='formulario-editar-pedido'>
        {/* Campo de edición para el ID del pedido */}
        <label className='label-editar-pedido'>
          ID del Pedido:
          <input
            type="text"
            value={idPedido}
            onChange={handleIdPedidoChange}
          />
        </label>
        {/* Campo de edición para el CIF del cliente */}
        <label className='label-editar-pedido'>
          CIF Cliente:
          <input
            type="text"
            value={cifCliente}
            onChange={handleCifClienteChange}
          />
        </label>
        {/* DatePicker para la fecha del pedido */}
        <label className='label-editar-pedido'>
          Fecha del Pedido:
          <DatePicker
            selected={fechaPedido}
            onChange={date => setFechaPedido(date)}
            dateFormat="yyyy-MM-dd"
          />
        </label>
        {/* Campo de edición para la base imponible */}
        <label className='label-editar-pedido'>
          Base Imponible:
          <input
            type="text"
            value={baseImponible}
            onChange={(event) => setBaseImponible(event.target.value)}
          />
        </label>
        <button type="submit" className='guardar-editar-pedido'>Guardar</button>
      </form>
      
      {/* Modal */}
      {showModal && (
        <div className="modal-overlay">
          <div className="modal-content">
            <h2>¡Pedido actualizado!</h2>
            <button onClick={() => setShowModal(false)}>Cerrar</button>
          </div>
        </div>
      )}
    </div>
  );
}

export default UpdateOrder;









