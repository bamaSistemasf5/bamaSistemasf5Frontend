import React, { useState } from 'react';
import { Form, Button } from 'react-bootstrap';
import rectangule from '/Img/Rectangle.svg';
import telephone from '/Img/phone-logo2.svg';
import envelope from '/Img/envelope-icono.svg'
import './Support.css';

const Support = ({ currentUser }) => {
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  const handleMessageChange = (event) => {
    setMessage(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (message.trim() === '') {
      setError('Please enter a message');
      return;
    }
    
    console.log('Message sent:', message);
    
    setMessage('');
    setError('');
  };

  return (
    <div className="support-container">
      <div className="content">
        <h2 className='access'>Contacta con Soporte Técnico</h2>
        {error && <p className="error-message">{error}</p>}
        <Form onSubmit={handleSubmit} className='form'>
          <Form.Group controlId="formMessage">
            <Form.Label>Mensaje</Form.Label>
            <Form.Control
              as="textarea"
              rows={3}
              value={message}
              onChange={handleMessageChange}
              placeholder="Escribe tu incidencia aquí..."
            />
          </Form.Group>
          <Button className="btn-support"variant="primary" type="submit">Enviar mensaje</Button>
        </Form>
      </div>
      <div className="support-info">
        <p>Si necesitas ayuda urgente contacta aqui:</p>
        <div className="phone-icon">
          <img src={telephone} alt="" className='telephone' />
          <p className='phone-number'>TEL <br />+34 917 666 999</p>
        </div>
        <div className="email-icon">
          <img src={envelope} alt="" className='telephone' />
          <p className='email-address'>EMAIL <br />infobama@bama.es</p>
        </div>
      </div>
    </div>
  );
};

export default Support;