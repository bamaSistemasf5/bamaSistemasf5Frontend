import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import { Container, Form, Button } from 'react-bootstrap';
import axios from 'axios';

const UpdateClient = () => {
  const { id } = useParams(); // Obtén el valor de id de la URL
  const navigate = useNavigate(); // Inicializa useNavigate
  const location = useLocation();

  const [formData, setFormData] = useState({
    cif_cliente: '',
    nombre: '',
    direccion: '',
    poblacion: '',
    provincia: '',
    pais: '',
    codigo_postal: '',
    telefono: '',
    email: ''
  });

  useEffect(() => {
    console.log('useEffect ejecutado');
    // Comprueba si hay datos del cliente en las props de location
    if (location && location.state && location.state.noteData) {
      console.log('Datos del cliente encontrados en location.state:', location.state.noteData);
      // Si hay datos, establece el estado con esos datos
      setFormData(location.state.noteData);
    } else {
      console.log('Datos del cliente no encontrados en location.state.');
    }
  }, [location]); // Asegúrate de que useEffect se ejecute cada vez que location cambie

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Formulario enviado');
    // Llamar a la API para actualizar los datos del cliente
    axios.put(`http://localhost:3000/update-client/${id}`, formData)
      .then(response => {
        console.log('Client data updated successfully:', response.data);
        // Redirigir a la página de detalles del cliente después de la actualización (BETA)
        // navigate(`/client-details/${id}`);
      })
      .catch(error => {
        console.error('Error updating client data:', error);
        // Puedes mostrar un mensaje de error al usuario si la actualización falla
      });
  };

  return (
    <Container>
      <Form onSubmit={handleSubmit}>
        <Form.Group controlId="cif_cliente">
          <Form.Label>CIF Cliente</Form.Label>
          <Form.Control type="text" name="cif_cliente" value={formData.cif_cliente} onChange={handleInputChange} placeholder="CIF Cliente" />
        </Form.Group>
        <Form.Group controlId="nombre">
          <Form.Label>Nombre</Form.Label>
          <Form.Control type="text" name="nombre" value={formData.nombre} onChange={handleInputChange} placeholder="Nombre" />
        </Form.Group>
        <Form.Group controlId="direccion">
          <Form.Label>Dirección</Form.Label>
          <Form.Control type="text" name="direccion" value={formData.direccion} onChange={handleInputChange} placeholder="Dirección" />
        </Form.Group>
        <Form.Group controlId="poblacion">
          <Form.Label>Población</Form.Label>
          <Form.Control type="text" name="poblacion" value={formData.poblacion} onChange={handleInputChange} placeholder="Población" />
        </Form.Group>
        <Form.Group controlId="provincia">
          <Form.Label>Provincia</Form.Label>
          <Form.Control type="text" name="provincia" value={formData.provincia} onChange={handleInputChange} placeholder="Provincia" />
        </Form.Group>
        <Form.Group controlId="pais">
          <Form.Label>País</Form.Label>
          <Form.Control type="text" name="pais" value={formData.pais} onChange={handleInputChange} placeholder="País" />
        </Form.Group>
        <Form.Group controlId="codigo_postal">
          <Form.Label>Código Postal</Form.Label>
          <Form.Control type="text" name="codigo_postal" value={formData.codigo_postal} onChange={handleInputChange} placeholder="Código Postal" />
        </Form.Group>
        <Form.Group controlId="telefono">
          <Form.Label>Teléfono</Form.Label>
          <Form.Control type="text" name="telefono" value={formData.telefono} onChange={handleInputChange} placeholder={formData.telefono} />
        </Form.Group>
        <Form.Group controlId="email">
          <Form.Label>Email</Form.Label>
          <Form.Control type="email" name="email" value={formData.email} onChange={handleInputChange} placeholder="Email" />
        </Form.Group>
        <Button variant="primary" type="submit">
          Guardar Cambios
        </Button>
      </Form>
    </Container>
  );
};

export default UpdateClient;
