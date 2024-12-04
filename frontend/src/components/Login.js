import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import apiClient from '../api/axiosConfig'; // Ensure this is the correct path to your Axios instance
import { TextField, Button, Typography, Paper, Alert } from '@mui/material';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    try {
      const response = await apiClient.post('/user/login', {
        email,
        password,
      });

      console.log('Login Response:', response.data);

      // Save the token to localStorage
      localStorage.setItem('token', response.data.token);

      setSuccess('Login successful! Redirecting...');
      setTimeout(() => {
        navigate('/employees');
      }, 2000);
    } catch (err) {
      console.error('Login Error:', err.response || err.message);

      if (err.response && err.response.status === 401) {
        setError('Invalid credentials. Please try again.');
      } else {
        setError('Something went wrong. Please try later.');
      }
    }
  };

  return (
    <Paper
      elevation={10}
      style={{
        maxWidth: 400,
        margin: '50px auto',
        padding: '20px',
        textAlign: 'center',
        background: 'linear-gradient(145deg, #1e293b, #334155)',
        color: '#e2e8f0',
        borderRadius: '20px',
        boxShadow: '0px 10px 20px rgba(0, 0, 0, 0.5), inset 0px 4px 6px rgba(255, 255, 255, 0.1)',
      }}
    >
      <Typography
        variant="h5"
        gutterBottom
        style={{
          fontFamily: "'Orbitron', sans-serif",
          color: '#0ea5e9',
          textShadow: '0px 0px 5px #0ea5e9',
        }}
      >
        Login
      </Typography>
      <form
        onSubmit={handleSubmit}
        style={{
          display: 'flex',
          flexDirection: 'column',
          gap: '15px',
          alignItems: 'center',
        }}
      >
        <TextField
          label="Email"
          variant="outlined"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          fullWidth
          InputProps={{
            style: {
              color: '#e2e8f0',
              background: '#1e293b',
              borderRadius: '10px',
            },
          }}
          InputLabelProps={{
            style: { color: '#94a3b8' },
          }}
        />
        <TextField
          label="Password"
          variant="outlined"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          fullWidth
          InputProps={{
            style: {
              color: '#e2e8f0',
              background: '#1e293b',
              borderRadius: '10px',
            },
          }}
          InputLabelProps={{
            style: { color: '#94a3b8' },
          }}
        />
        <Button
          type="submit"
          variant="contained"
          size="large"
          fullWidth
          style={{
            background: 'linear-gradient(90deg, #0ea5e9, #2563eb)',
            color: '#e2e8f0',
            fontWeight: 'bold',
            borderRadius: '10px',
            boxShadow: '0px 5px 15px rgba(14, 165, 233, 0.5)',
          }}
        >
          Login
        </Button>
      </form>
      {error && (
        <Alert
          severity="error"
          style={{
            marginTop: '20px',
            background: '#f87171',
            color: '#fff',
            fontWeight: 'bold',
            borderRadius: '10px',
          }}
        >
          {error}
        </Alert>
      )}
      {success && (
        <Alert
          severity="success"
          style={{
            marginTop: '20px',
            background: '#4ade80',
            color: '#fff',
            fontWeight: 'bold',
            borderRadius: '10px',
          }}
        >
          {success}
        </Alert>
      )}
    </Paper>
  );
};

export default Login;
