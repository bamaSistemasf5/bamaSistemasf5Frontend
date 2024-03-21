import { useState, useEffect } from 'react';
import { Table, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';

export default function UserDashboard() {
  const [orders, setOrders] = useState([]);
  const [invoices, setInvoices] = useState([]);
  const [deliveries, setDeliveries] = useState([]);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const res = await fetch('/api/orders');
        const data = await res.json();
        if (res.ok) {
          setOrders(data.orders);
        }
      } catch (error) {
        console.log(error.message);
      }
    };

    const fetchInvoices = async () => {
      try {
        const res = await fetch('/api/invoices');
        const data = await res.json();
        if (res.ok) {
          setInvoices(data.invoices);
        }
      } catch (error) {
        console.log(error.message);
      }
    };

    const fetchDeliveries = async () => {
      try {
        const res = await fetch('/api/deliveries');
        const data = await res.json();
        if (res.ok) {
          setDeliveries(data.deliveries);
        }
      } catch (error) {
        console.log(error.message);
      }
    };

    fetchOrders();
    fetchInvoices();
    fetchDeliveries();
  }, []);

  return (
    <div className='p-3 md:mx-auto'>
      <div className='d-flex flex-wrap justify-center'>
        <div className='d-flex flex-column p-3 bg-light rounded-md shadow-md m-2'>
          <div className='d-flex justify-content-between'>
            <div>
              <h3 className='text-muted text-md uppercase'>Pedidos Totales</h3>
              <p className='text-2xl'>{orders.length}</p>
            </div>
          </div>
        </div>
        <div className='d-flex flex-column p-3 bg-light rounded-md shadow-md m-2'>
          <div className='d-flex justify-content-between'>
            <div>
              <h3 className='text-muted text-md uppercase'>Facturas Totales</h3>
              <p className='text-2xl'>{invoices.length}</p>
            </div>
          </div>
        </div>
        <div className='d-flex flex-column p-3 bg-light rounded-md shadow-md m-2'>
          <div className='d-flex justify-content-between'>
            <div>
              <h3 className='text-muted text-md uppercase'>Albaranes Totales</h3>
              <p className='text-2xl'>{deliveries.length}</p>
            </div>
          </div>
        </div>
      </div>

      <div className='d-flex flex-wrap justify-center'>
        <div className='d-flex flex-column shadow-md p-2 rounded-md bg-light m-2'>
          <div className='d-flex justify-content-between p-3 font-weight-bold'>
            <h1 className='text-center p-2'>Pedidos Recientes</h1>
            <Button variant='primary' as={Link} to='/dashboard/orders'>
              Ver Todos
            </Button>
          </div>
          <Table striped bordered hover>
            <thead>
              <tr>
                <th>ID Pedido</th>
                <th>Cliente</th>
                <th>Fecha</th>
              </tr>
            </thead>
            <tbody>
              {orders.map((order) => (
                <tr key={order.id}>
                  <td>{order.id}</td>
                  <td>{order.customer}</td>
                  <td>{order.date}</td>
                </tr>
              ))}
            </tbody>
          </Table>
        </div>

        <div className='d-flex flex-column shadow-md p-2 rounded-md bg-light m-2'>
          <div className='d-flex justify-content-between p-3 font-weight-bold'>
            <h1 className='text-center p-2'>Facturas Recientes</h1>
            <Button variant='primary' as={Link} to='/dashboard/invoices'>
              Ver Todos
            </Button>
          </div>
          <Table striped bordered hover>
            <thead>
              <tr>
                <th>ID Factura</th>
                <th>Cliente</th>
                <th>Total</th>
              </tr>
            </thead>
            <tbody>
              {invoices.map((invoice) => (
                <tr key={invoice.id}>
                  <td>{invoice.id}</td>
                  <td>{invoice.customer}</td>
                  <td>{invoice.total}</td>
                </tr>
              ))}
            </tbody>
          </Table>
        </div>

        <div className='d-flex flex-column shadow-md p-2 rounded-md bg-light m-2'>
          <div className='d-flex justify-content-between p-3 font-weight-bold'>
            <h1 className='text-center p-2'>Albaranes Recientes</h1>
            <Button variant='primary' as={Link} to='/dashboard/deliveries'>
              Ver Todos
            </Button>
          </div>
          <Table striped bordered hover>
            <thead>
              <tr>
                <th>ID Albarán</th>
                <th>Cliente</th>
                <th>Fecha de entrega</th>
              </tr>
            </thead>
            <tbody>
              {deliveries.map((delivery) => (
                <tr key={delivery.id}>
                  <td>{delivery.id}</td>
                  <td>{delivery.customer}</td>
                  <td>{delivery.deliveryDate}</td>
                </tr>
              ))}
            </tbody>
          </Table>
        </div>
      </div>
    </div>
  );
}

  
      