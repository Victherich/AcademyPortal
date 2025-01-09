import React, { useState, useEffect } from 'react';
import styled, { keyframes } from 'styled-components';
import Swal from 'sweetalert2';
import axios from 'axios';
import {useLocation} from 'react-router-dom'

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
  margin-top:10px;
  margin-right:10px;

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

const WeekList = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: 20px;
`;

const WeekCard = styled.div`
  background: white;
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
  animation: ${fadeIn} 1s ease-in-out;
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
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 5px;
  font-size: 1rem;
  outline: none;
`;






const SchoolWeekManager = () => {
  const location = useLocation();
  const [form, setForm] = useState({ id: '', week_number: '', start_date: '', end_date: '', activity: '' });
  const [weeks, setWeeks] = useState([]);
  const [currentSemester,setCurrentSemester]=useState({})

  useEffect(() => {
    fetchWeeks();
  }, []);

  const fetchWeeks = async () => {
    try {
      const response = await fetch('https://ephadacademyportal.com.ng/ephad_api/fetch_weeks.php');
      const data = await response.json();
      if (data.success) {
        setWeeks(data.weeks);
      }
    } catch (error) {
      Swal.fire({ text: 'Error fetching weeks.', icon: 'error' });
    }
  };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     Swal.fire({ text: 'Please wait...', showConfirmButton: false });

//     const response = await fetch('https://ephadacademyportal.com.ng/ephad_api/create_week.php', {
//       method: 'POST',
//       headers: { 'Content-Type': 'application/json' },
//       body: JSON.stringify(form),
//     });

//     const data = await response.json();

//     if (data.success) {
//       Swal.fire({ text: 'Week created successfully!', icon: 'success' });
//       fetchWeeks();
//       setForm({ id: '', week_number: '', start_date: '', end_date: '', activity: '' });
//     } else {
//       Swal.fire({ text: data.error, icon: 'error' });
//     }
//   };


const handleSubmit = async (e) => {
    e.preventDefault();
    Swal.fire({ text: 'Please wait...', showConfirmButton: false });
  
    const url = form.id
      ? 'https://ephadacademyportal.com.ng/ephad_api/update_week.php'  // URL for updating week
      : 'https://ephadacademyportal.com.ng/ephad_api/create_week.php'; // URL for creating week
  
    const response = await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(form),
    });
  
    const data = await response.json();
  
    if (data.success) {
      Swal.fire({ text: form.id ? 'Week updated successfully!' : 'Week created successfully!', icon: 'success' });
      fetchWeeks();  // Reload the list of weeks
      setForm({ id: '', week_number: '', start_date: '', end_date: '', activity: '' });  // Reset the form
    } else {
      Swal.fire({ text: data.error, icon: 'error' });
    }
  };
  





  const handleEdit = (week) => {
    setForm({ ...week });
    window.scroll(0,0)
  };

  const handleDelete = async (id) => {
    Swal.fire({
      title: 'Are you sure?',
      text: 'This action cannot be undone!',
      icon: 'warning',
      showCancelButton: true,
    }).then(async (result) => {
      if (result.isConfirmed) {
        Swal.fire({ text: 'Please wait...', showConfirmButton: false });
        const response = await fetch('https://ephadacademyportal.com.ng/ephad_api/delete_week.php', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ id }),
        });

        const data = await response.json();

        if (data.success) {
          Swal.fire({ text: 'Week deleted successfully!', icon: 'success' });
          fetchWeeks();
        } else {
          Swal.fire({ text: data.error, icon: 'error' });
        }
      }
    });
  };



  useEffect(()=>{
    fetchCurrentSemester()
  },[])



// Fetch the current semester from the server
const fetchCurrentSemester = async () => {
  try {
    const response = await axios.get("https://ephadacademyportal.com.ng/ephad_api/fetch_current_semester.php");
    if (response.data.success && response.data.current_semester) {
      // setCurrentSemester(response.data.current_semester); 
      // Set the current semester
      fetchSemesterById(response.data.current_semester.semester_id)
    
    } else {
      Swal.fire({ text: "No current semester found.", icon: "warning" });
    }
  } catch (error) {
    Swal.fire({ text: "An error occurred while fetching the current semester.", icon: "error" });
  }
};





const fetchSemesterById = async (id) => {
  if (!id || isNaN(id)) {
    Swal.fire({
      icon: "error",
      title: "Invalid ID",
      text: "Please enter a valid numeric ID.",
    });
    return;
  }

  const lodaingAlert = Swal.fire({
    title: "Loading...",
    text: "Fetching semester details, please wait.",
    allowOutsideClick: false,
    didOpen: () => {
      Swal.showLoading();
    },
  });

  try {
    const response = await fetch(`https://ephadacademyportal.com.ng/ephad_api/fetch_semester_by_id.php?id=${id}`);
    const data = await response.json();

    if (data.success) {
      // Swal.fire({
      //   icon: "success",
      //   title: "Semester Found",
      //   html: `<pre>${JSON.stringify(data.semester, null, 2)}</pre>`,
      // });
      setCurrentSemester(data.semester)

    } else {
      Swal.fire({
        icon: "error",
        title: "Error",
        text: data.error || "Failed to fetch semester details.",
      });
    }
  } catch (error) {
    Swal.fire({
      icon: "error",
      title: "Request Failed",
      text: "An error occurred while fetching semester details.",
    });
  }finally{
    lodaingAlert.close();
  }
};





  return (
    <Container>
     {location.pathname==="/managementdashboard"&& <Title>{form.id ? "Edit School Week" : "School Week Management"}</Title>}
     {location.pathname==="/managementdashboard"&& <Form onSubmit={handleSubmit}>
        Select Week number (Eg. 1, 2, 3 etc):
        {/* <Input
          type="number"
          placeholder="Enter Week Number"
          value={form.week_number}
          onChange={(e) => setForm({ ...form, week_number: e.target.value })}
        /> */}
         <Select
          value={form.week_number}
          onChange={(e) => setForm({...form, week_number: e.target.value})}
          required
        >
          <option value="">Select week Number</option>
          
          <option value="1">1</option>
<option value="2">2</option>
<option value="3">3</option>
<option value="4">4</option>
<option value="5">5</option>
<option value="6">6</option>
<option value="7">7</option>
<option value="8">8</option>
<option value="9">9</option>
<option value="10">10</option>
<option value="11">11</option>
<option value="12">12</option>
<option value="13">13</option>

          
        </Select>
        Start Date:
        <Input
          type="date"
          value={form.start_date}
          onChange={(e) => setForm({ ...form, start_date: e.target.value })}
        />

        End Date:
        <Input
          type="date"
          value={form.end_date}
          onChange={(e) => setForm({ ...form, end_date: e.target.value })}
        />
        Activity for the week:
        <Input
          type="text"
          placeholder="Enter Activity for the week"
          value={form.activity}
          onChange={(e) => setForm({ ...form, activity: e.target.value })}
        />
        <Button type="submit">{form.id ? 'Update Week' : 'Create Week'}</Button>
        {form.id&&<Button type="button" onClick={()=>setForm({...form, id: '',week_number: '', start_date: '', end_date: '', activity: ''})}>Clear</Button>}
   
      </Form>}

      <WeekList>
        <Title style={{ marginTop: '20px' }}> {currentSemester.name} WEEKS CALENDER</Title>
        {weeks.sort((a,b)=>a.week_number - b.week_number).map((week) => (
          <WeekCard key={week.id}>
            <Label>Week Number:</Label>
            <Value>Week {week.week_number}</Value>
            <Label>Start Date:</Label>
            <Value>{week.start_date}</Value>
            <Label>End Date:</Label>
            <Value>{week.end_date}</Value>
            <Label>Activity:</Label>
            <Value>{week.activity}</Value>
            {location.pathname==="/managementdashboard"&&<Button onClick={() => handleEdit(week)}>Update</Button>}
            {location.pathname==="/managementdashboard"&&<Button onClick={() => handleDelete(week.id)}>Delete</Button>}
          </WeekCard>
        ))}
      </WeekList>
    </Container>
  );
};

export default SchoolWeekManager;
