import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

export default function Register() {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const { register } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    const result = await register(username, email, password);
    if (result.success) {
      navigate('/');
    } else {
      setError(result.error);
    }
  };

  return (
    <div className="container section">
      <div className="card" style={{ maxWidth: '400px', margin: '0 auto' }}>
        <div className="card-body">
          <h2 className="center">Crear Cuenta</h2>
          {error && <p style={{ color: 'var(--red)', textAlign: 'center' }}>{error}</p>}
          <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            <div>
              <label style={{ display: 'block', marginBottom: '8px' }}>Nombre de Usuario</label>
              <input
                type="text"
                required
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                style={{ width: '100%', padding: '10px', borderRadius: '8px', border: '1px solid #ccc' }}
              />
            </div>
            <div>
              <label style={{ display: 'block', marginBottom: '8px' }}>Email</label>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                style={{ width: '100%', padding: '10px', borderRadius: '8px', border: '1px solid #ccc' }}
              />
            </div>
            <div>
              <label style={{ display: 'block', marginBottom: '8px' }}>Contraseña</label>
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                style={{ width: '100%', padding: '10px', borderRadius: '8px', border: '1px solid #ccc' }}
              />
            </div>
            <button type="submit" className="btn btn-primary" style={{ justifyContent: 'center' }}>
              Registrarse
            </button>
          </form>
          <p className="center" style={{ marginTop: '16px' }}>
            ¿Ya tienes cuenta? <a href="/login" style={{ color: 'var(--primary)', fontWeight: 'bold' }}>Inicia Sesión</a>
          </p>
        </div>
      </div>
    </div>
  );
}
