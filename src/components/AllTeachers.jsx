



import React, { useState, useEffect } from "react";
import styled from "styled-components";
import axios from "axios";
import Swal from "sweetalert2";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
  background-color: #f9f9f9;
`;

const Title = styled.h1`
  font-size: 2.5rem;
  color: #333;
  margin-bottom: 20px;
  text-align: center;
`;

const TeacherCard = styled.div`
  background: white;
  padding: 20px;
  margin: 10px;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  width: 100%;
  max-width: 600px;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
`;

const TeacherInfo = styled.p`
  font-size: 1rem;
  color: #555;
  margin: 5px 0;
`;

const ResponsiveWrapper = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 20px;
  width: 100%;
`;

const Button = styled.button`
    padding: 10px 20px;
    margin: 5px;
    // background-color: #4CAF50;
    background: #8080FF;
    color: white;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    font-size: 16px;

    &:hover {
        // background-color: #45a049;
        background: #9000FF;
    }
`;

const DeleteButton = styled(Button)`
    background-color: #f44336;

    &:hover {
        background-color: #e53935;
    }
`;


const TeacherList = () => {
  const [teachers, setTeachers] = useState([]);
  const [classes, setClasses] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    fetchTeachers();
    fetchClasses();
  }, []);

  const fetchTeachers = async () => {
    try {
      const response = await axios.get("https://ephadacademyportal.com.ng/ephad_api/fetch_all_teachers.php");
      if (response.data.success) {
        setTeachers(response.data.teachers);
        console.log(response.data)
        // console.log(response.data.teachers)
      } else {
        setError(response.data.error || "Failed to load teachers.");
        console.log(response.data.error)
      }
    } catch (err) {
      console.error(err)
      setError("An error occurred while fetching teachers.");
    }
  };

  const fetchClasses = async () => {
    try {
      const response = await axios.get("https://ephadacademyportal.com.ng/ephad_api/fetch_classes.php");
      if (response.data.success) {
        const classMapping = {};
        response.data.classes.forEach((cls) => {
          // Use `level` as the class name (and append department if needed)
          classMapping[cls.id] = cls.level; // Adjust if more fields are needed
        });
        setClasses(classMapping);
      } else {
        setError(response.data.error || "Error fetching classes.");
      }
    } catch (err) {
      setError("Failed to fetch classes. Please try again.");
    } finally {
      setLoading(false);
    }
  };






  const toggleSuspend = async (teacherId, suspended, suspendWarning) => {
    const result = await Swal.fire({
        title: 'Are you sure?',
        text: `Are you sure you want to ${suspendWarning} this teacher?`,
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#d33',
        cancelButtonColor: '#3085d6',
        confirmButtonText: `Yes, ${suspendWarning}!`,
    });

    if (result.isConfirmed) {
        Swal.fire({ title: "Processing...", allowOutsideClick: false, didOpen: () => Swal.showLoading() });

        try {
            const response = await fetch("https://ephadacademyportal.com.ng/ephad_api/toggle_suspend_teacher.php", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ teacher_id: teacherId, suspended }),
            });

            const data = await response.json();

            if (data.success) {
                Swal.fire("Success", data.message, "success");
            
                setTeachers(teachers.map(t => 
                  t.id === teacherId ? { ...t, suspended: suspended } : t
                ));
                
            } else {
                Swal.fire("Error", data.error || "Failed to update teacher status.", "error");
            }
        } catch (err) {
            Swal.fire("Error", err.message || "Failed to connect to the server.", "error");
        }
    }
};


const deleteTeacher = async (teacherId) => {
  // Display confirmation dialog
  const result = await Swal.fire({
    title: 'Are you sure?',
    text: 'Are you sure you want to delete this teacher? This action cannot be undone!',
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#d33',
    cancelButtonColor: '#3085d6',
    confirmButtonText: 'Yes, delete!',
  });

  if (result.isConfirmed) {
    // Show loading spinner while processing
    Swal.fire({ title: "Processing...", allowOutsideClick: false, didOpen: () => Swal.showLoading() });

    try {
      // Send request to delete the teacher via POST
      const response = await fetch("https://ephadacademyportal.com.ng/ephad_api/delete_teacher.php", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id: teacherId }), // Sending the teacher ID in the body
      });

      const data = await response.json();

      if (data.success) {
        // Optionally, you can reset state if needed, e.g., remove the teacher from a list
        Swal.fire("Success", data.message, "success");
        fetchTeachers();
      } else {
        Swal.fire("Error", data.error || "Failed to delete teacher.", "error");
      }
    } catch (err) {
      Swal.fire("Error", err.message, "error");
    }
  }
};








  if (loading) {
    return <Container>Loading...</Container>;
  }

  if (error) {
    return <Container>Error: {error}</Container>;
  }

  return (
    <Container>
      <Title>Teachers</Title>
      <ResponsiveWrapper>
        {teachers.map((teacher) => (
          <TeacherCard key={teacher.id}>
            <TeacherInfo>
              <strong>Name:</strong> {teacher.first_name} {teacher.last_name}
            </TeacherInfo>
            <TeacherInfo>
              <strong>Email:</strong> {teacher.email}
            </TeacherInfo>
            <TeacherInfo>
              <strong>Phone:</strong> {teacher.phone_number}
            </TeacherInfo>
            <TeacherInfo>
              <strong>Class:</strong> {classes[teacher.class_id] || "Unknown"}
            </TeacherInfo>
            <TeacherInfo style={{backgroundColor:teacher.suspended===1?"red":'',
               color:teacher.suspended===1?"white":"",padding:"2px"}}>
              <strong>Suspended:</strong> {teacher.suspended}
            </TeacherInfo>

              <div style={{display:"flex",flexWrap:"wrap"}}>
              <Button onClick={() => toggleSuspend(teacher.id, 1,"suspend")}>Suspend</Button>
                    <Button onClick={() => toggleSuspend(teacher.id, 0,"unsuspend")}>Unsuspend</Button>
                    <DeleteButton onClick={()=>deleteTeacher(teacher.id)}>Delete</DeleteButton>
              </div>

          </TeacherCard>
        ))}
      </ResponsiveWrapper>
    </Container>
  );
};

export default TeacherList;

