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
  background: #8080FF;
  color: white;
  border: none;
  border-radius: 5px;
  font-size: 1rem;
  cursor: pointer;

  &:hover {
    background:#9000FF;
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

const Select = styled.select`
  padding:5px;
  outline:none;
  cursor:pointer;
`

const Classes = () => {
  const [form, setForm] = useState({ id: '', name: 'CLASS LEVEL', level: '', department_id: '' });
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const [classes, setClasses] = useState([]);
  const [departments, setDepartments] = useState([]);

  useEffect(() => {
    fetchClasses();
    fetchDepartments();
  }, []);

  const fetchDepartments = async () => {
      

    try {
      const response = await fetch(`https://ephadacademyportal.com.ng/ephad_api/fetch_departments.php`);
      const data = await response.json();
      if (data.success) {
        setDepartments(data.departments);
        // console.log(data.departments)
      } else {
        setError(data.error || 'Error fetching departments.');
      }
    } catch (err) {
      setError('Failed to fetch departments. Please try again.');
    }
  };

  const fetchClasses = async () => {
    try {
      const response = await fetch('https://ephadacademyportal.com.ng/ephad_api/fetch_classes.php');
      const data = await response.json();
      if (data.success) {
        setClasses(data.classes);
      } else {
        setError(data.error || 'Error fetching classes.');
      }
    } catch (err) {
      setError('Failed to fetch classes. Please try again.');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const loadingAlert = Swal.fire({text:"Please wait..."});
    Swal.showLoading();

    try {
      const response = await fetch('https://ephadacademyportal.com.ng/ephad_api/create_class.php', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });

      const data = await response.json();
      if (data.success) {
        setMessage(data.message || 'Class created successfully.');
        Swal.fire({text:data.message||"Class created successfully",icon:"success",allowOutsideClick:false})

        setForm({ name: '', level: '', department_id: '' });
        fetchClasses();
      } else {
        setMessage(data.error || 'Failed to create class.');
        Swal.fire({text:data.error||"Failed to create class",allowOutsideClick:false})
      }
    } catch (error) {
      setMessage('An error occurred. Please try again.');
      Swal.fire({text:"An error occured. Please try again.",allowOutsideClick:false})
    }finally{
      loadingAlert.close();
    }
  };

  const editClass = (classItem) => {
    // console.log(classItem)
    setForm({ id: classItem.id, name: classItem.class_name, level: classItem.level, department_id: classItem.department_id });
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
      const response = await fetch('https://ephadacademyportal.com.ng/ephad_api/update_class.php', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });

      const data = await response.json();
      if (data.success) {
        setMessage('Class updated successfully!');
        Swal.fire({text:"Class updated successfully!",icon:"success",allowOutsideClick:false})

        fetchClasses();
        setForm({ id: '', name: '', level: '', department_id: '' });
      } else {
        setMessage(data.error || 'Failed to update class.');
        Swal.fire({text:data.error||"Failed to update class. Please try again.",allowOutsideClick:false})
      }
    } catch (error) {
      setMessage('An error occurred. Please try again.');
      Swal.fire({text:"An error occured. Please try again.",allowOutsideClick:false})
    }finally{
      loadingAlert.close();
    }
  };
  };

  const deleteClass = async (id) => {
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

    try {
      const response = await fetch('https://ephadacademyportal.com.ng/ephad_api/delete_class.php', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id }),
      });

      const data = await response.json();
      if (data.success) {
        // alert('Class deleted successfully!');
        Swal.fire({text:"Class deleted successfully!",icon:"success",allowOutsideClick:false})
        fetchClasses();
      } else {
        // alert('Failed to delete class. Please try again.');
        Swal.fire({text:data.error||"Failed to delete class. Please try again.",allowOutsideClick:false})
      }
    } catch (err) {
      // alert('Failed to delete class. Please try again.');
      Swal.fire({text:"Failed to delete class. Please try again.",allowOutsideClick:false})
    }finally{
      loadingAlert.close();
    }

  }
  };

  const [showClass, setShowclass]=useState(false)

  return (
    <Container>
      {showClass&&<Title>{form.id ? 'Edit Class' : 'Create Class'}</Title>}
      {showClass&&<Form onSubmit={form.id ? handleEditSubmit : handleSubmit}>
        <Input
          type="text"
          placeholder="Class Name"
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value.toUpperCase() })}
          required
          disabled
        />
        {/* <Input
          type="text"
          placeholder="Class Level"
          value={form.level}
          onChange={(e) => setForm({ ...form, level: e.target.value.toUpperCase() })}
          required
        /> */}
        <Select
          value={form.level}
          onChange={(e) => setForm({ ...form, level: e.target.value })}
          required
        >
          <option value="">Select Class</option>
          <option value="CRECHE">CRECHE</option>
          <option value="PRE-NURSERY">PRE-NURSERY</option>
          <option value="NURSERY 1">NURSERY 1</option>
          <option value="NURSERY 2">NURSERY 2</option>
          <option value="NURSERY 3">NURSERY 3</option>
            <option value="PRIMARY 1">PRIMARY 1</option>
            <option value="PRIMARY 2">PRIMARY 2</option>
            <option value="PRIMARY 3">PRIMARY 3</option>
            <option value="PRIMARY 4">PRIMARY 4</option>
            <option value="PRIMARY 5">PRIMARY 5</option>
            <option value="PRIMARY 6">PRIMARY 6</option>
            <option value="JSS 1">JSS 1</option>
            <option value="JSS 2">JSS 2</option>
            <option value="JSS 3">JSS 3</option>
            <option value="SSS 1">SSS 1</option>
            <option value="SSS 2">SSS 2</option>
            <option value="SSS 3">SSS 3</option>
          
        </Select>
        <Select
          value={form.department_id}
          onChange={(e) => setForm({ ...form, department_id: e.target.value })}
          required
        >
          <option value="">Select Department</option>
          {departments.map((department) => (
            <option key={department.id} value={department.id}>
              {department.name}
            </option>
          ))}
        </Select>
        <Button type="submit">{form.id ? 'Update Class' : 'Add Class'}</Button>
        {form.id&&<Button type="button" onClick={()=>setForm({...form, id: '',level:''})}>Clear</Button>}
      </Form>}

      {message && <p style={{ color: message.includes('successfully') ? 'green' : 'red' }}>{message}</p>}

      <ClassGrid>
        {classes.sort((a,b)=>b.id-a.id).map((classItem) => (
          <ClassCard key={classItem.id}>
            {/* <Label>Class Name:</Label> */}
            {/* <Value>{classItem.class_name}</Value> */}
            <Label>Level:</Label>
            <Value>{classItem.level}</Value>
            {/* <Label>Department:</Label> */}
            {/* <Value>{classItem.department_name}</Value> */}
            <Button onClick={() => editClass(classItem)} style={{marginTop:"10px"}}>Edit</Button>
            {/* <Button style={{ marginLeft: '10px',marginTop:"10px" }} onClick={() => deleteClass(classItem.id)}>Delete</Button> */}
          </ClassCard>
        ))}
      </ClassGrid>

      {error && <p style={{ color: 'red', textAlign: 'center' }}>{error}</p>}
    </Container>
  );
};

export default Classes;
