import React, { useState, useEffect } from 'react';
import styled, { keyframes } from 'styled-components';
import Swal from "sweetalert2";

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

const ClassGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: 20px;

  @media (min-width: 768px) {
    grid-template-columns: 1fr 1fr;
  }
`;

const ClassCard = styled.div`
  background: white;
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
  animation: ${fadeIn} 1s ease-in-out;
  margin-top: 10px;
`;

const Select = styled.select`
  padding: 5px;
  outline: none;
  cursor: pointer;
`;

const SchoolFees = () => {
  const [form, setForm] = useState({
    id: '',
    amount: '',
    class_id: '',
    semester_id: '',
    department_id: 11
  });
  const [fees, setFees] = useState([]);
  const [classes, setClasses] = useState([]);
  const [semesters, setSemesters] = useState([]);
  const [departments, setDepartments] = useState([]);
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  // console.log(fees)

  useEffect(() => {
    fetchClasses();
    fetchSemesters();
    fetchDepartments();
    fetchFees();
  }, []);

  const fetchClasses = async () => {
    const response = await fetch('https://ephadacademyportal.com.ng/ephad_api/fetch_classes.php');
    const data = await response.json();
    setClasses(data.classes || []);
  };

  const fetchSemesters = async () => {
    const response = await fetch('https://ephadacademyportal.com.ng/ephad_api/fetch_semesters.php');
    const data = await response.json();
    setSemesters(data.semesters || []);
  };

  const fetchDepartments = async () => {
    const response = await fetch('https://ephadacademyportal.com.ng/ephad_api/fetch_departments.php');
    const data = await response.json();
    setDepartments(data.departments || []);
    // console.log(data.departments)
  };

  const fetchFees = async () => {
    const response = await fetch('https://ephadacademyportal.com.ng/ephad_api/fetch_school_fees.php');
    const data = await response.json();
    setFees(data.school_fees || []);
    console.log(data)
  };

  const handleFormChange = (key, value) => {
    setForm({ ...form, [key]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const result = await Swal.fire({
      title: form.id ? 'Are you sure?' : 'New Fee Entry',
      text: form.id ? 'This will update the fee details.' : 'A new fee entry will be created.',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'Yes, Proceed!',
    });

    if (result.isConfirmed) {
      Swal.fire({ text: 'Processing...', allowOutsideClick: false });
      Swal.showLoading();

      const url = form.id ? 'https://ephadacademyportal.com.ng/ephad_api/update_school_fee.php' : 'https://ephadacademyportal.com.ng/ephad_api/create_school_fee.php';

      const response = await fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });

      const data = await response.json();
      if (data.success) {
        setMessage(data.message);
        fetchFees();
        Swal.fire({ text: data.message, icon: 'success' });
        setForm({ id: '', amount: '', class_id: '', semester_id: '', department_id: '' });
      } else {
        setError(data.error);
        Swal.fire({ text: data.error, icon: 'error' });
      }
    }
  };

  const handleEdit = (fee) => {
    setForm({id:fee.fee_id, amount:fee.school_fee, class_id:fee.class_id, semester_id:fee.semester_id, department_id:fee.department_id });
    window.scroll(0, 0);
   
  };

  const handleDelete = async (id) => {
    const result = await Swal.fire({
      title: 'Are you sure?',
      text: 'Deleting this fee entry cannot be undone.',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'Yes, Delete!',
    });

    if (result.isConfirmed) {
      const response = await fetch('https://ephadacademyportal.com.ng/ephad_api/delete_school_fee.php', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id }),
      });

      const data = await response.json();
      if (data.success) {
        fetchFees();
        Swal.fire({ text: data.message, icon: 'success' });
      } else {
        Swal.fire({ text: data.error, icon: 'error' });
      }
    }
  };

  return (
    <Container>
      <Title>{form.id ? 'Edit School Fee' : 'Add School Fee'}</Title>
      <Form onSubmit={handleSubmit}>
        <Input
          type="number"
          placeholder="Amount IN Naira"
          value={form.amount}
          onChange={(e) => handleFormChange('amount', e.target.value)}
          required
        />
        <Select
          value={form.class_id}
          onChange={(e) => handleFormChange('class_id', e.target.value)}
          required
        >
          <option value="">Select Class</option>
          {classes.map((cls) => (
            <option key={cls.id} value={cls.id}>
              {cls.level}
            </option>
          ))}
        </Select>
        <Select
          value={form.semester_id}
          onChange={(e) => handleFormChange('semester_id', e.target.value)}
          required
        >
          <option value="">Select Term</option>
          {semesters.map((sem) => (
            <option key={sem.id} value={sem.id}>
              {sem.name}
            </option>
          ))}
        </Select>
        {/* <Select
          value={form.department_id}
          onChange={(e) => handleFormChange('department_id', e.target.value)}
          required
        >
          <option value="">Select Department</option>
          {departments.map((dept) => (
            <option key={dept.id} value={dept.id}>
              {dept.name}
            </option>
          ))}
        </Select> */}
        <Button type="submit">{form.id ? 'Update Fee' : 'Add Fee'}</Button>
        {form.id && <Button type="button" onClick={() => setForm({ id: '', amount: '', department_id: '', class_id: '', semester_id: '' })}>Clear</Button>}
     
      </Form>
      {message && <p>{message}</p>}
      {error && <p style={{ color: 'red' }}>{error}</p>}

      <ClassGrid>
        {fees.map((fee) => (
          <ClassCard key={fee.fee_id}>
            Amount: ₦ {new Intl.NumberFormat().format(fee.school_fee)} | Class: {fee.class_level} | Semester: {fee.semester_name} 
            {/* | Department: {fee.department_name} */}
            <br />
            <Button onClick={() => handleEdit(fee)}>Edit</Button>
            <Button onClick={() => handleDelete(fee.fee_id)} style={{ marginLeft: '10px', marginTop: '10px' }}>Delete</Button>
          </ClassCard>
        ))}
      </ClassGrid>
    </Container>
  );
};

export default SchoolFees;
