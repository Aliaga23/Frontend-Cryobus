// src/Components/Ciclo#1/CU1/Register_vista.js
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import usuario from '../Assets/registro_imagen.jpg'; // Verifica que la ruta del archivo de imagen sea correcta
import styles from '../Assets/register_style.module.css'; // Verifica que la ruta del archivo CSS sea correcta

const Register = () => {
  const [name, setName] = useState('');
  const [lastName, setLastName] = useState('');
  const [id, setId] = useState('');
  const [password, setPassword] = useState('');
  const [roles, setRoles] = useState([]);
  const [selectedRole, setSelectedRole] = useState('');
  const [error, setError] = useState('');
  const [isAnimating, setIsAnimating] = useState(false);
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);

  useEffect(() => {
    const fetchRoles = async () => {
      try {
        const response = await fetch('http://localhost:8081/api/roles');
        const data = await response.json();
        setRoles(data);
        if (data.length > 0) {
          setSelectedRole(data[0].ID); // Select the first role by default
        }
      } catch (error) {
        console.error('Error fetching roles:', error);
      }
    };

    fetchRoles();
  }, []);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setIsAnimating(true);

    const userData = { id, pass: password, apellidos: lastName, nombres: name, id_rol: selectedRole };

    try {
      const response = await fetch('http://localhost:8081/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(userData)
      });

      if (response.ok) {
        setTimeout(() => {
          setIsAnimating(false);
          setShowSuccessMessage(true);
        }, 2000); // Adjust time according to the duration of the truck animation
      } else {
        const errorData = await response.json();
        setError(errorData.message);
        setIsAnimating(false);
      }
    } catch (error) {
      setError('Error registering the user');
      setIsAnimating(false);
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.card}>
        <div className={styles['text-center']}>
          <div className={styles.animationContainer}>
            <img src={usuario} alt="Logo" className={`${styles['driving-image']} ${isAnimating ? styles.animate : ''}`} />
          </div>
          {showSuccessMessage && <h2 className={styles.typewriter}>Successfully Registered!</h2>}
          {!showSuccessMessage && <h1>Register</h1>}
        </div>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="name" className="form-label">Name</label>
            <input type="text" id="name" placeholder="Enter your name" className="form-control" onChange={e => setName(e.target.value)} required />
          </div>

          <div className="mb-3">
            <label htmlFor="lastName" className="form-label">Last Name</label>
            <input type="text" id="lastName" placeholder="Enter your last name" className="form-control" onChange={e => setLastName(e.target.value)} required />
          </div>

          <div className="mb-3">
            <label htmlFor="id" className="form-label">ID</label>
            <input type="text" id="id" placeholder="Enter your ID" className="form-control" onChange={e => setId(e.target.value)} required />
          </div>

          <div className="mb-3">
            <label htmlFor="password" className="form-label">Password</label>
            <input type="password" id="password" placeholder="Enter your password" className="form-control" onChange={e => setPassword(e.target.value)} required />
          </div>

          <div className="mb-3">
            <label htmlFor="role" className="form-label">Role</label>
            <select id="role" className="form-control" onChange={e => setSelectedRole(e.target.value)} value={selectedRole}>
              {roles.map(role => (
                <option key={role.ID} value={role.ID}>{role.NOMBRE}</option>
              ))}
            </select>
          </div>

          <button type="submit" className="btn btn-primary w-100">Register</button>
        </form>
        {error && <div className="alert alert-danger">{error}</div>}
        <p className="mt-3 text-center"><Link to="/login">Login</Link></p>
      </div>
    </div>
  );
}

export default Register;
