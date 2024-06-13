import React, { useState } from 'react';
import axios from 'axios';
import { Form, Button, Container, Row, Col } from 'react-bootstrap';
import Swal from 'sweetalert2';

const ChangePassword = () => {
  const [oldPassword, setOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');

  const handleChangePassword = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem('token');

    try {
      await axios.post(
        'https://proyecto2-production-ba5b.up.railway.app/api/users/change-password',
        { oldPassword, newPassword },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      Swal.fire({
        title: 'Éxito',
        text: 'Contraseña actualizada correctamente',
        icon: 'success',
      });
    } catch (error) {
      console.error('Error al cambiar la contraseña:', error);
      Swal.fire({
        title: 'Error',
        text: error.response?.data?.message || 'Error al cambiar la contraseña',
        icon: 'error',
      });
    }
  };

  return (
    <Container className="mt-5">
      <Row>
        <Col md={{ span: 6, offset: 3 }}>
          <h3>Cambiar Contraseña</h3>
          <Form onSubmit={handleChangePassword}>
            <Form.Group>
              <Form.Label>Contraseña Antigua</Form.Label>
              <Form.Control
                type="password"
                value={oldPassword}
                onChange={(e) => setOldPassword(e.target.value)}
                required
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>Contraseña Nueva</Form.Label>
              <Form.Control
                type="password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                required
              />
            </Form.Group>
            <Button type="submit" variant="primary" className="mt-3">
              Cambiar Contraseña
            </Button>
          </Form>
        </Col>
      </Row>
    </Container>
  );
};

export default ChangePassword;
