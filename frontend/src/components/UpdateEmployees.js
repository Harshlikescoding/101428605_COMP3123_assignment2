import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import apiClient from '../api/axiosConfig';

const UpdateEmployee = () => {
  const [employee, setEmployee] = useState({
    first_name: '',
    last_name: '',
    email: '',
    position: '',
    department: '',
  });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const { id } = useParams();  // Get employee ID from URL

  useEffect(() => {
    const fetchEmployeeDetails = async () => {
      try {
        const response = await apiClient.get(`/emp/employees/${id}`);
        setEmployee(response.data);
      } catch (error) {
        console.error('Error fetching employee details:', error);
        setError('Failed to fetch employee details.');
      }
    };

    fetchEmployeeDetails();
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    try {
      const token = localStorage.getItem('token');
      if (!token) {
        setError('Please log in first.');
        return;
      }

      await apiClient.put(`/emp/employees/${id}`, employee, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setSuccess('Employee updated successfully!');
    } catch (error) {
      console.error('Error updating employee:', error);
      setError('Failed to update employee.');
    }
  };

  return (
    <div style={{ padding: '20px', background: '#1a202c', color: '#e2e8f0', minHeight: '100vh' }}>
      <h2 style={{ color: '#38bdf8', fontFamily: "'Orbitron', sans-serif" }}>
        Update Employee
      </h2>
      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
        <input
          type="text"
          value={employee.first_name}
          onChange={(e) => setEmployee({ ...employee, first_name: e.target.value })}
          placeholder="First Name"
          required
          style={{
            padding: '10px',
            background: '#2b2d42',
            color: '#e2e8f0',
            border: '1px solid #38bdf8',
            borderRadius: '5px',
          }}
        />
        <input
          type="text"
          value={employee.last_name}
          onChange={(e) => setEmployee({ ...employee, last_name: e.target.value })}
          placeholder="Last Name"
          required
          style={{
            padding: '10px',
            background: '#2b2d42',
            color: '#e2e8f0',
            border: '1px solid #38bdf8',
            borderRadius: '5px',
          }}
        />
        <input
          type="email"
          value={employee.email}
          onChange={(e) => setEmployee({ ...employee, email: e.target.value })}
          placeholder="Email"
          required
          style={{
            padding: '10px',
            background: '#2b2d42',
            color: '#e2e8f0',
            border: '1px solid #38bdf8',
            borderRadius: '5px',
          }}
        />
        <input
          type="text"
          value={employee.position}
          onChange={(e) => setEmployee({ ...employee, position: e.target.value })}
          placeholder="Position"
          required
          style={{
            padding: '10px',
            background: '#2b2d42',
            color: '#e2e8f0',
            border: '1px solid #38bdf8',
            borderRadius: '5px',
          }}
        />
        <input
          type="text"
          value={employee.department}
          onChange={(e) => setEmployee({ ...employee, department: e.target.value })}
          placeholder="Department"
          required
          style={{
            padding: '10px',
            background: '#2b2d42',
            color: '#e2e8f0',
            border: '1px solid #38bdf8',
            borderRadius: '5px',
          }}
        />
        <button
          type="submit"
          style={{
            padding: '10px 20px',
            background: '#38bdf8',
            color: '#1a202c',
            border: 'none',
            borderRadius: '5px',
            cursor: 'pointer',
            fontSize: '16px',
            fontWeight: 'bold',
          }}
        >
          Save
        </button>
      </form>
      {error && <p style={{ color: 'red', fontSize: '18px' }}>{error}</p>}
      {success && <p style={{ color: 'green', fontSize: '18px' }}>{success}</p>}
    </div>
  );
};

export default UpdateEmployee;
