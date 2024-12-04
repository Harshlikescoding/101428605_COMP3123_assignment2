import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import apiClient from '../api/axiosConfig';

const ViewEmployee = () => {
  const [employee, setEmployee] = useState(null);
  const [error, setError] = useState('');
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

  return (
    <div style={{ padding: '20px', background: '#1a202c', color: '#e2e8f0', minHeight: '100vh' }}>
      <h2 style={{ color: '#38bdf8', fontFamily: "'Orbitron', sans-serif" }}>
        View Employee Details
      </h2>
      {error && <p style={{ color: 'red', fontSize: '18px' }}>{error}</p>}
      {employee ? (
        <div style={{ background: 'linear-gradient(145deg, #2b2d42, #1e293b)', padding: '20px', borderRadius: '10px' }}>
          <p style={{ fontSize: '18px', color: '#f87171' }}>First Name: <span style={{ color: '#e2e8f0' }}>{employee.first_name}</span></p>
          <p style={{ fontSize: '18px', color: '#f87171' }}>Last Name: <span style={{ color: '#e2e8f0' }}>{employee.last_name}</span></p>
          <p style={{ fontSize: '18px', color: '#f87171' }}>Email: <span style={{ color: '#e2e8f0' }}>{employee.email}</span></p>
          <p style={{ fontSize: '18px', color: '#f87171' }}>Position: <span style={{ color: '#e2e8f0' }}>{employee.position}</span></p>
          <p style={{ fontSize: '18px', color: '#f87171' }}>Department: <span style={{ color: '#e2e8f0' }}>{employee.department}</span></p>
        </div>
      ) : (
        <p style={{ fontSize: '18px', color: '#38bdf8' }}>Loading employee details...</p>
      )}
    </div>
  );
};

export default ViewEmployee;
