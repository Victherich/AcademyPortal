

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

const Subjects = () => {
  const [form, setForm] = useState({
    id: '',
    name: '',
    code: '',
    department_id: '',
    class_id: '',
    semester_id: ''
  });
  const [subjects, setSubjects] = useState([]);
  const [departments, setDepartments] = useState([]);
  const [classes, setClasses] = useState([]);
  const [semesters, setSemesters] = useState([]);
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    fetchDepartments();
    fetchClasses();
    fetchSubjects();
    fetchSemesters();
  }, []);

  const fetchDepartments = async () => {
    const response = await fetch('https://ephadacademyportal.com.ng/ephad_api/fetch_departments.php');
    const data = await response.json();
    
    setDepartments(data.departments || []);
    // console.log(data.departments)
  };

  const fetchClasses = async () => {
    const response = await fetch('https://ephadacademyportal.com.ng/ephad_api/fetch_classes.php');
    const data = await response.json();
    setClasses(data.classes || []);
  };

  const fetchSubjects = async () => {
    const response = await fetch('https://ephadacademyportal.com.ng/ephad_api/fetch_subjects.php');
    const data = await response.json();
    setSubjects(data.subjects || []);
  };

  const fetchSemesters = async () => {
    try {
      const response = await fetch('https://ephadacademyportal.com.ng/ephad_api/fetch_semesters.php');
      const data = await response.json();
      if (data.success) setSemesters(data.semesters || []);
    } catch {}
  };

  const generateCode = (updatedForm) => {
    const namePart = (updatedForm.name || '').slice(0, 2).toUpperCase();
    const departmentPart = (updatedForm.department_id || '').slice(0, 2).toUpperCase();
    const classPart = (updatedForm.class_id || '').slice(0, 2).toUpperCase();
    const semesterPart = (updatedForm.semester_id || '').slice(0, 2).toUpperCase();
    return `${namePart}-${departmentPart}-${classPart}-${semesterPart}`;
  };

  const handleFormChange = (key, value) => {
    const updatedForm = { ...form, [key]: value };
    updatedForm.code = generateCode(updatedForm);
    setForm(updatedForm);
    // console.log(updatedForm);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const result = await Swal.fire({
      title: form.id ? 'Are you sure?' : 'New Subject Creation',
      text: form.id ? 'This action will update existing data.' : 'A new subject will be created.',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'Yes, Proceed!',
    });

    if (result.isConfirmed) {
      Swal.fire({ text: 'Please wait...', allowOutsideClick: false });
      Swal.showLoading();

      const url = form.id ? 'https://ephadacademyportal.com.ng/ephad_api/update_subject.php' : 'https://ephadacademyportal.com.ng/ephad_api/create_subject.php';

      const response = await fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });

      const data = await response.json();
      if (data.success) {
        setMessage(data.message);
        fetchSubjects();
        Swal.fire({ text: data.message || 'Successful', icon: 'success', allowOutsideClick: false });
        setForm({ id: '', name: '', code: '', department_id: '', class_id: '', semester_id: '' });
      } else {
        setError(data.error);
        Swal.fire({ text: data.error, allowOutsideClick: false });
      }
    }
  };


  
  const handleEdit = (subject) => {
    // setForm(subject);
    setForm({ id: subject.id, name:subject.subject_name, code: subject.code, department_id: subject.department_id, class_id: subject.class_id, semester_id: subject.semester_id });
    window.scroll(0,0)
  };

  const handleDelete = async (id) => {
    // const confirmed = window.confirm('Are you sure you want to delete this subject?');
    // if (!confirmed) return;
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

    const response = await fetch('https://ephadacademyportal.com.ng/ephad_api/delete_subject.php', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id }),
    });

    const data = await response.json();
    if (data.success) {
      fetchSubjects();
      Swal.fire({ text: "Subject deleted successfully", icon: "success", allowOutsideClick: false });
      loadingAlert.close();
    } else {
      setError(data.error);
      loadingAlert.close();
      Swal.fire({ text: "Failed to delete subject. Please try again.", allowOutsideClick: false });
      
    }
  };
  };

  return (
    <Container>
      <Title>{form.id ? 'Edit Subject' : 'Add Subject'}</Title>
      <Form onSubmit={handleSubmit}>
        <Input
          type="text"
          placeholder="Subject Name"
          value={form.name}
          onChange={(e) => handleFormChange('name', e.target.value.toUpperCase())}
          required
        />
        <Input type="text" placeholder="Subject Code" value={form.code} readOnly />
        <Select
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
        </Select>
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
          {semesters.map((semester) => (
            <option key={semester.id} value={semester.id}>
              {semester.name}
            </option>
          ))}
        </Select>
        <Button type="submit">{form.id ? 'Update Subject' : 'Add Subject'}</Button>
        {form.id && <Button type="button" onClick={() => setForm({ id: '', name: '', code: '', department_id: '', class_id: '', semester_id: '' })}>Clear</Button>}
      </Form>

      {message && <p>{message}</p>}
      {error && <p style={{ color: 'red' }}>{error}</p>}

      <ClassGrid>
        {subjects.sort((a, b) => b.id - a.id).map((subj) => (
          <ClassCard key={subj.id}>
            {subj.subject_name} ({subj.code}) - {subj.department_name} - {subj.class_level} - {subj.semester_name}
            <br />
            <Button onClick={() => handleEdit(subj)}>Edit</Button>
            <Button onClick={() => handleDelete(subj.id)} style={{ marginLeft: '10px', marginTop: '10px' }}>Delete</Button>
          </ClassCard>
        ))}
      </ClassGrid>
    </Container>
  );
};

export default Subjects;

