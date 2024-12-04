import React, { useEffect, useState } from 'react';
import apiClient from '../api/axiosConfig';
import {
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  Paper,
} from '@mui/material';

const Employees = () => {
  const [employees, setEmployees] = useState([]);
  const [allEmployees, setAllEmployees] = useState([]);
  const [error, setError] = useState('');
  const [searchCriteria, setSearchCriteria] = useState({ department: '', position: '' });

  useEffect(() => {
    const fetchEmployees = async () => {
      try {
        const token = localStorage.getItem('token');
        if (!token) {
          setError('No token found. Please log in.');
          return;
        }

        const response = await apiClient.get('/emp/employees', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        setEmployees(response.data);
        setAllEmployees(response.data);
      } catch (err) {
        console.error('Error fetching employees:', err);
        setError('Failed to fetch employees.');
      }
    };

    fetchEmployees();
  }, []);

  const handleSearch = () => {
    const { department, position } = searchCriteria;

    if (!department && !position) {
      setEmployees(allEmployees);
      return;
    }

    const filteredEmployees = allEmployees.filter((employee) => {
      const matchesDepartment = department
        ? employee.department?.toLowerCase().includes(department.toLowerCase())
        : true;
      const matchesPosition = position
        ? employee.position?.toLowerCase().includes(position.toLowerCase())
        : true;
      return matchesDepartment && matchesPosition;
    });

    setEmployees(filteredEmployees);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setSearchCriteria({ ...searchCriteria, [name]: value });
  };

  const handleLogout = () => {
    localStorage.removeItem('token'); // Clear user session
    window.location.href = '/'; // Redirect to login page
  };

  const deleteEmployee = async (id) => {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        alert('Please login first.');
        return;
      }

      // API call to delete the employee
      await apiClient.delete(`/emp/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`, // Pass the token for authentication
        },
      });

      alert('Employee deleted successfully');
      // Update state to remove the deleted employee from the list
      setEmployees(employees.filter((employee) => employee._id !== id));
    } catch (error) {
      console.error('Error deleting employee:', error);
      alert('Failed to delete employee.');
    }
  };

  return (
    <div style={{ padding: '20px', background: '#1a202c', minHeight: '100vh', color: '#e2e8f0' }}>
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginBottom: '20px',
        }}
      >
        <h2 style={{ color: '#38bdf8', fontFamily: "'Orbitron', sans-serif" }}>
          Employee Management
        </h2>
        <Button
          variant="contained"
          onClick={handleLogout}
          style={{
            background: 'linear-gradient(90deg, #f87171, #f43f5e)',
            color: '#ffffff',
            borderRadius: '10px',
          }}
        >
          Logout
        </Button>
      </div>

      {error && <p style={{ color: 'red' }}>{error}</p>}

      <div style={{ display: 'flex', gap: '10px', marginBottom: '20px' }}>
        <TextField
          label="Search by Department"
          variant="outlined"
          name="department"
          value={searchCriteria.department}
          onChange={handleInputChange}
          InputProps={{
            style: {
              color: '#e2e8f0',
              background: '#1e293b',
              borderRadius: '10px',
            },
          }}
          InputLabelProps={{ style: { color: '#94a3b8' } }}
        />
        <TextField
          label="Search by Position"
          variant="outlined"
          name="position"
          value={searchCriteria.position}
          onChange={handleInputChange}
          InputProps={{
            style: {
              color: '#e2e8f0',
              background: '#1e293b',
              borderRadius: '10px',
            },
          }}
          InputLabelProps={{ style: { color: '#94a3b8' } }}
        />
        <Button
          variant="contained"
          onClick={handleSearch}
          style={{
            background: 'linear-gradient(90deg, #38bdf8, #3b82f6)',
            color: '#ffffff',
            borderRadius: '10px',
          }}
        >
          Search
        </Button>
        <Button
          variant="outlined"
          onClick={() => setEmployees(allEmployees)}
          style={{
            borderColor: '#f87171',
            color: '#f87171',
            borderRadius: '10px',
          }}
        >
          Clear Search
        </Button>
      </div>

      <Button
        variant="contained"
        onClick={() => (window.location.href = '/add-employee')}
        style={{
          background: 'linear-gradient(90deg, #10b981, #059669)',
          color: '#ffffff',
          borderRadius: '10px',
          marginBottom: '20px',
        }}
      >
        Add Employee
      </Button>

      <TableContainer
        component={Paper}
        style={{
          background: 'linear-gradient(145deg, #1e293b, #334155)',
          boxShadow: '0px 10px 20px rgba(0, 0, 0, 0.5), inset 0px 4px 6px rgba(255, 255, 255, 0.1)',
        }}
      >
        <Table>
          <TableHead>
            <TableRow>
              {['First Name', 'Last Name', 'Email', 'Position', 'Department', 'Actions'].map((header) => (
                <TableCell key={header} style={{ color: '#38bdf8', fontWeight: 'bold' }}>
                  {header}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {employees.map((employee) => (
              <TableRow key={employee._id}>
                <TableCell>{employee.first_name}</TableCell>
                <TableCell>{employee.last_name}</TableCell>
                <TableCell>{employee.email}</TableCell>
                <TableCell>{employee.position}</TableCell>
                <TableCell>{employee.department}</TableCell>
                <TableCell>
                  <Button
                    variant="outlined"
                    onClick={() => (window.location.href = `/view-employee/${employee._id}`)}
                    style={{
                      color: '#38bdf8',
                      borderColor: '#38bdf8',
                      marginRight: '10px',
                    }}
                  >
                    View
                  </Button>
                  <Button
                    variant="contained"
                    onClick={() => (window.location.href = `/update-employee/${employee._id}`)}
                    style={{
                      background: 'linear-gradient(90deg, #4ade80, #059669)',
                      color: '#ffffff',
                      marginRight: '10px',
                    }}
                  >
                    Update
                  </Button>
                  <Button
                    variant="contained"
                    onClick={() => deleteEmployee(employee._id)}
                    style={{
                      background: 'linear-gradient(90deg, #f87171, #f43f5e)',
                      color: '#ffffff',
                    }}
                  >
                    Delete
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default Employees;
