import React from 'react'
import styled, {keyframes} from 'styled-components';
import { useState, useEffect } from 'react';




const Select = styled.select`
  padding: 5px;
  outline: none;
  cursor: pointer;
`;


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


const Form = styled.form`
  display: grid;
  grid-template-columns: 1fr;
  gap: 20px;
  background: white;
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
  // animation: ${fadeIn} 0.8s ease-in-out;

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
  background:#8080FF;
  color: white;
  border: none;
  border-radius: 5px;
  font-size: 1rem;
  cursor: pointer;

  &:hover {
    background: #9000FF;
  }
`;











const StudentResultFilter = ({setSemesterId, setClassId, semesterId, classId, handleMenuClick}) => {

    // const [semesterId,setSemesterId]=useState(null);
    // const [classId,setClassId]=useState(null);



    const [semesters,setSemesters]=useState([])

    const fetchSemesters = async () => {
      try {
        const response = await fetch('https://ephadacademyportal.com.ng/ephad_api/fetch_semesters.php');
        const data = await response.json();
        if (data.success) setSemesters(data.semesters || []);
      } catch {}
    };
    
    useEffect(()=>{
      fetchSemesters()
    },[])


  const [classes, setClasses] = useState([]);

useEffect(() => {
    fetchClasses();
  }, []);  

  const fetchClasses = async () => {
    try {
      const response = await fetch('https://ephadacademyportal.com.ng/ephad_api/fetch_classes.php');
      const data = await response.json();
      if (data.success) {
        setClasses(data.classes);
      } else {
        // setError(data.error || 'Error fetching classes.');
      }
    } catch (err) {
    //   setError('Failed to fetch classes. Please try again.');
    }
  };

  const [componentSwitch, setComponentSwitch]=useState(false)


const handleSubmit=(e)=>{
  e.preventDefault();
  setComponentSwitch(true)
    handleMenuClick('studentResult')
}




  return (
    <div>
      <Form onSubmit={handleSubmit}>
       
        
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

       <Select
         value={classId}
         onChange={(e) => setClassId( e.target.value)}
        //  required
       >
         <option value="">Select Class</option>
         {classes.map((cls) => (
           <option key={cls.id} value={cls.id}>
             {cls.level}
           </option>
         ))}
       </Select>
       <Select
         value={semesterId}
         onChange={(e) => setSemesterId(e.target.value)}
        //  required
       >
         <option value="">Select Term</option>
         {semesters.map((semester) => (
           <option key={semester.id} value={semester.id}>
             {semester.name}
           </option>
         ))}
       </Select>
       <Button type="submit">Get Result</Button>
        </Form>
    </div>
  )
}

export default StudentResultFilter
