

import React, { useState, useEffect } from 'react';
import styled, { keyframes } from 'styled-components';
import Swal from 'sweetalert2'

const fadeIn = keyframes`
  from {
    opacity: 0;
    transform: translateY(10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

const Container = styled.div`
  padding: 20px;
  background: #f9f9f9;
  min-height: 100vh;
`;

const Form = styled.form`
  display: grid;
  grid-template-columns: 1fr;
  gap: 20px;
  background: white;
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
  animation: ${fadeIn} 0.8s ease-in-out;

  @media (min-width: 768px) {
    grid-template-columns: 1fr 1fr;
  }
`;

const Input = styled.input`
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 5px;
  font-size: 1rem;
  outline: none;
`;

const Button = styled.button`
  grid-column: 1 / -1;
  padding: 10px 20px;
  background: #ff8095;
  color: white;
  border: none;
  border-radius: 5px;
  font-size: 1rem;
  cursor: pointer;

  &:hover {
    background: #e76880;
  }
`;

const Title = styled.h1`
  color: purple;
  text-align: center;
  margin-bottom: 20px;
  animation: ${fadeIn} 0.8s ease-in-out;
`;

const DepartmentGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: 20px;

  @media (min-width: 768px) {
    grid-template-columns: 1fr 1fr;
  }
`;

const DepartmentCard = styled.div`
  background: white;
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
  animation: ${fadeIn} 1s ease-in-out;
  margin-top:10px;
`;

const Label = styled.span`
  font-weight: bold;
  color: purple;
`;

const Value = styled.span`
  display: block;
  margin-top: 5px;
  font-size: 1rem;
  color: #333;
`;

const Departments = () => {
  const [form, setForm] = useState({ id: '', name: '', code: '' });
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const [departments, setDepartments] = useState([]);

  // Fetch departments when the component mounts
  useEffect(() => {
    fetchDepartments();
  }, []);

  const fetchDepartments = async () => {
    try {
      const response = await fetch(`https://hotsalesng.com/ephad_api/fetch_departments.php`, {
        method: 'GET',
        headers: {
          'Cache-Control': 'no-store',
        },
      });
      const data = await response.json();
      if (data.success) {
        setDepartments(data.departments);
      } else {
        setError(data.error || 'Error fetching departments.');
      }
    } catch (err) {
      setError('Failed to fetch departments. Please try again.');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const loadingAlert = Swal.fire({text:"Please wait..."});
    Swal.showLoading();

    try {
      const response = await fetch(`https://hotsalesng.com/ephad_api/create_department.php`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });
      const data = await response.json();
      if (data.success) {
        setMessage(data.message || 'Department created successfully.');
        Swal.fire({text:data.message||"Department created successfully",icon:"success",allowOutsideClick:false})

        setForm({ name: '', code: '' });
        fetchDepartments();
      } else {
        setMessage(data.error || 'Failed to create department.');
        Swal.fire({text:data.error||"Failed to create department",allowOutsideClick:false})
      }
    } catch (error) {
      setMessage('An error occurred. Please try again.');
      Swal.fire({text:"An error occured. Please try again.",allowOutsideClick:false})
    }finally{
      loadingAlert.close();
    }
  };

  const editDepartment = async (department) => {
    setForm({ id: department.id, name: department.name, code: department.code });
    window.scroll(0,0);
  };

  const handleEditSubmit = async (e) => {
    e.preventDefault();

    const result = await Swal.fire({
      title: 'Are you sure?',
      text: '"Are you sure you want to edit this? This action will be updated at other functionalities making use of it!"',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'Yes, Edit it!',
    });
  
    if (result.isConfirmed) {

    const loadingAlert = Swal.fire({text:"Please wait..."});
    Swal.showLoading();

    try {
      const response = await fetch(`https://hotsalesng.com/ephad_api/update_department.php`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });
      const data = await response.json();
      if (data.success) {
        setMessage('Department updated successfully!');
        Swal.fire({text:"Department updated successfully",icon:"success",allowOutsideClick:false})
        fetchDepartments();
        setForm({ id: '', name: '', code: '' });
      } else {
        setMessage(data.error || 'Failed to update department.');
        Swal.fire({text:data.error||"Failed to update department",allowOutsideClick:false})
      }
    } catch (error) {
      setMessage('An error occurred. Please try again.');
      Swal.fire({text:"An error occured. Please try again.",allowOutsideClick:false})
    }finally{
      loadingAlert.close();
    }
  };
  };

  const deleteDepartment = async (id) => {
    // const confirmed = window.confirm('Are you sure you want to delete this department?');
    // if (!confirmed) return;

    const result = await Swal.fire({
      title: 'Are you sure?',
      text: '"Are you sure you want to delete this? This action might affect other functionalities and cannot be undone!"',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'Yes, delete it!',
    });
  
    if (result.isConfirmed) {

      const loadingAlert = Swal.fire({text:"Please wait..."});
      Swal.showLoading();

    const response = await fetch('https://hotsalesng.com/ephad_api/delete_department.php', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id }),
    });

    const data = await response.json();
    if (data.success) {
      // alert('Department deleted successfully!');
      Swal.fire({text:"Department deleted successfully",icon:"success",allowOutsideClick:false})
      fetchDepartments();
    } else {
      // alert('Failed to delete department. Please try again.');
      Swal.fire({text:"Failed to delete department. Please try again",allowOutsideClick:false})
    }

  };
  };

  return (
    <Container>
      <Title>{form.id ? 'Edit Department' : 'Create Department'}</Title>
      <Form onSubmit={form.id ? handleEditSubmit : handleSubmit}>
        <Input
          type="text"
          placeholder="Department Name"
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value.toUpperCase() })}
          required
        />
        <Input
          type="text"
          placeholder="Department Code"
          value={form.code}
          onChange={(e) => setForm({ ...form, code: e.target.value.toUpperCase() })}
          required
        />
        <Button type="submit">{form.id ? 'Update Department' : 'Add Department'}</Button>
        {form.id&&<Button type="button" onClick={()=>setForm({...form, id: '',name:'',code:""})}>Clear</Button>}
      </Form>
      {message && <p style={{ color: message.includes('successfully') ? 'green' : 'red' }}>{message}</p>}

      <DepartmentGrid>
        {departments.sort((a,b)=>b.id-a.id).map((department) => (
          <DepartmentCard key={department.id}>
            <Label>Department Name:</Label>
            <Value>{department.name}</Value>
            <Label>Department Code:</Label>
            <Value>{department.code}</Value>
            <Button onClick={() => editDepartment(department)}>Edit</Button>
            <Button style={{ marginLeft: '10px',marginTop:"10px" }} onClick={() => deleteDepartment(department.id)}>Delete</Button>
          </DepartmentCard>
        ))}
      </DepartmentGrid>

      {error && <p style={{ color: 'red', textAlign: 'center' }}>{error}</p>}
    </Container>
  );
};

export default Departments;

