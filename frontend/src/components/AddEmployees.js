import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import apiClient from '../api/axiosConfig'; // Ensure axios config is imported
import { TextField, Button, Typography, Paper, Alert, Grid } from '@mui/material';

const AddEmployee = () => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [position, setPosition] = useState('');
  const [department, setDepartment] = useState('');
  const [salary, setSalary] = useState('');
  const [dateOfJoining, setDateOfJoining] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    try {
      const employeeData = {
        first_name: firstName,
        last_name: lastName,
        email: email,
        position: position,
        department: department,
        salary: salary,
        date_of_joining: dateOfJoining,
      };

      const response = await apiClient.post('/emp/employees', employeeData);
      console.log('Employee added response:', response);
      setSuccess('Employee added successfully!');
      setTimeout(() => {
        navigate('/employees'); // Redirect to employee list after success
      }, 2000);
    } catch (error) {
      console.error('Error adding employee:', error);
      setError('Failed to add employee. Please try again.');
    }
  };

  return (
    <Paper
      elevation={10}
      style={{
        maxWidth: 600,
        margin: '50px auto',
        padding: '20px',
        textAlign: 'center',
        background: 'linear-gradient(145deg, #1e293b, #334155)',
        borderRadius: '20px',
        boxShadow: '0px 10px 20px rgba(0, 0, 0, 0.5), inset 0px 4px 6px rgba(255, 255, 255, 0.1)',
        color: '#e2e8f0',
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
        Add Employee
      </Typography>
      <form
        onSubmit={handleSubmit}
        style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}
      >
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6}>
            <TextField
              label="First Name"
              variant="outlined"
              fullWidth
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              required
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
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              label="Last Name"
              variant="outlined"
              fullWidth
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              required
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
          </Grid>
        </Grid>
        <TextField
          label="Email"
          variant="outlined"
          fullWidth
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
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
          label="Position"
          variant="outlined"
          fullWidth
          value={position}
          onChange={(e) => setPosition(e.target.value)}
          required
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
          label="Department"
          variant="outlined"
          fullWidth
          value={department}
          onChange={(e) => setDepartment(e.target.value)}
          required
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
          label="Salary"
          variant="outlined"
          fullWidth
          type="number"
          value={salary}
          onChange={(e) => setSalary(e.target.value)}
          required
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
          label="Date of Joining"
          variant="outlined"
          fullWidth
          type="date"
          value={dateOfJoining}
          onChange={(e) => setDateOfJoining(e.target.value)}
          InputLabelProps={{
            shrink: true,
            style: { color: '#94a3b8' },
          }}
          InputProps={{
            style: {
              color: '#e2e8f0',
              background: '#1e293b',
              borderRadius: '10px',
            },
          }}
          required
        />
        <Button
          type="submit"
          variant="contained"
          size="large"
          style={{
            background: 'linear-gradient(90deg, #0ea5e9, #2563eb)',
            color: '#e2e8f0',
            fontWeight: 'bold',
            borderRadius: '10px',
            boxShadow: '0px 5px 15px rgba(14, 165, 233, 0.5)',
          }}
        >
          Save
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

export default AddEmployee;
