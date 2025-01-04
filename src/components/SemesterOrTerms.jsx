import React, { useState, useEffect } from 'react';
import styled, { keyframes } from 'styled-components';
import Swal from 'sweetalert2';

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

const SemesterGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: 20px;

  @media (min-width: 768px) {
    grid-template-columns: 1fr 1fr;
  }
`;

const SemesterCard = styled.div`
  background: white;
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
  animation: ${fadeIn} 1s ease-in-out;
  margin-top: 10px;
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

const Select = styled.select`
  padding:5px;
  outline:none;
  cursor:pointer;
`

const Semesters = () => {
  const [form, setForm] = useState({ id: '', name: '' });
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const [semesters, setSemesters] = useState([]);

  // Fetch semesters when the component mounts
  useEffect(() => {
    fetchSemesters();
  }, []);

  const fetchSemesters = async () => {
    try {
      const response = await fetch(`https://hotsalesng.com/ephad_api/fetch_semesters.php`, {
        method: 'GET',
        headers: {
          'Cache-Control': 'no-store',
        },
      });
      const data = await response.json();
      if (data.success) {
        setSemesters(data.semesters);
      } else {
        setError(data.error || 'Error fetching semesters.');
      }
    } catch (err) {
      setError('Failed to fetch semesters. Please try again.');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const loadingAlert = Swal.fire({ text: "Please wait..." });
    Swal.showLoading();

    try {
      const response = await fetch(`https://hotsalesng.com/ephad_api/create_semester.php`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });
      const data = await response.json();
      if (data.success) {
        setMessage(data.message || 'Semester created successfully.');
        Swal.fire({ text: data.message || "Semester created successfully", icon: "success", allowOutsideClick: false });

        setForm({ name: '' });
        fetchSemesters();
      } else {
        setMessage(data.error || 'Failed to create semester.');
        Swal.fire({ text: data.error || "Failed to create semester", allowOutsideClick: false });
      }
    } catch (error) {
      setMessage('An error occurred. Please try again.');
      Swal.fire({ text: "An error occurred. Please try again.", allowOutsideClick: false });
    } finally {
      loadingAlert.close();
    }
  };

  const editSemester = async (semester) => {
    setForm({ id: semester.id, name: semester.name });
    window.scroll(0, 0);
  };

  const handleEditSubmit = async (e) => {
    e.preventDefault();

    const result = await Swal.fire({
      title: 'Are you sure?',
      text: 'Are you sure you want to edit this? This action will be updated in other functionalities using it!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'Yes, Edit it!',
    });

    if (result.isConfirmed) {
      const loadingAlert = Swal.fire({ text: "Please wait..." });
      Swal.showLoading();

      try {
        const response = await fetch(`https://hotsalesng.com/ephad_api/update_semester.php`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(form),
        });
        const data = await response.json();
        if (data.success) {
          setMessage('Semester updated successfully!');
          Swal.fire({ text: "Semester updated successfully", icon: "success", allowOutsideClick: false });
          fetchSemesters();
          setForm({ id: '', name: '' });
        } else {
          setMessage(data.error || 'Failed to update semester.');
          Swal.fire({ text: data.error || "Failed to update semester", allowOutsideClick: false });
        }
      } catch (error) {
        setMessage('An error occurred. Please try again.');
        Swal.fire({ text: "An error occurred. Please try again.", allowOutsideClick: false });
      } finally {
        loadingAlert.close();
      }
    }
  };

  const deleteSemester = async (id) => {
    const result = await Swal.fire({
      title: 'Are you sure?',
      text: 'Are you sure you want to delete this? This action might affect other functionalities and cannot be undone!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'Yes, delete it!',
    });

    if (result.isConfirmed) {
      const loadingAlert = Swal.fire({ text: "Please wait..." });
      Swal.showLoading();

      const response = await fetch('https://hotsalesng.com/ephad_api/delete_semester.php', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id }),
      });

      const data = await response.json();
      if (data.success) {
        Swal.fire({ text: "Semester deleted successfully", icon: "success", allowOutsideClick: false });
        fetchSemesters();
      } else {
        Swal.fire({ text: "Failed to delete semester. Please try again.", allowOutsideClick: false });
      }
    }
  };

  return (
    <Container>
      <Title>{form.id ? 'Edit Terms' : 'Create Terms'}</Title>
      <Form onSubmit={form.id ? handleEditSubmit : handleSubmit}>
        {/* <Input
          type="text"
          placeholder="Semester Name"
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value.toUpperCase() })}
          required
        /> */}

<Select
          value={form.level}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
          required
        >
          <option value="">Select TERM</option>
          <option value="1ST TERM">1ST TERM</option>
          <option value="2ND TERM">2ND TERM</option>
          <option value="3RD TERM">3RD TERM</option>
          
        </Select>
        
        <Button type="submit">{form.id ? 'Update Term' : 'Add Term'}</Button>
        {form.id && <Button type="button" onClick={() => setForm({ id: '', name: '' })}>Clear</Button>}
      </Form>
      {message && <p style={{ color: message.includes('successfully') ? 'green' : 'red' }}>{message}</p>}

      <SemesterGrid>
        {semesters.sort((a, b) => b.id - a.id).map((semester) => (
          <SemesterCard key={semester.id}>
            <Label>Semester Name:</Label>
            <Value>{semester.name}</Value>
            <Button onClick={() => editSemester(semester)}>Edit</Button>
            <Button style={{ marginLeft: '10px', marginTop: "10px" }} onClick={() => deleteSemester(semester.id)}>Delete</Button>
          </SemesterCard>
        ))}
      </SemesterGrid>

      {error && <p style={{ color: 'red', textAlign: 'center' }}>{error}</p>}
    </Container>
  );
};

export default Semesters;
