import React, { useState, useEffect } from 'react';
import styled from 'styled-components';

// Styled components
const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
  background-color: #f9f9f9;
  min-height: 100vh;
`;

const Title = styled.h1`
  font-size: 2rem;
  color: purple;
  margin-bottom: 20px;
  text-align: center;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 10px;
  width: 100%;
  max-width: 400px;
`;

const Input = styled.input`
  padding: 10px;
  font-size: 1rem;
  border: 1px solid #ccc;
  border-radius: 5px;
  outline: none;
  &:focus {
    border-color: #007bff;
  }
`;

const Button = styled.button`
  padding: 10px 15px;
  font-size: 1rem;
  color: #fff;
  background-color: #007bff;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s;
  &:hover {
    background-color: #0056b3;
  }
`;

const TeacherList = styled.ul`
  list-style: none;
  padding: 0;
  margin: 20px 0;
  width: 100%;
  max-width: 600px;
`;

const TeacherCard = styled.li`
  display: flex;
  flex-direction: column;
  padding: 15px;
  margin-bottom: 10px;
  border: 1px solid #ddd;
  border-radius: 5px;
  background-color: #fff;
  box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.1);

  @media (min-width: 768px) {
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
  }
`;

const TeacherDetails = styled.div`
  display: flex;
  flex-direction: column;
  gap: 5px;

  span {
    font-size: 0.9rem;
    color: #555;
  }
`;

const ProfilePhoto = styled.img`
  width: 50px;
  height: 50px;
  border-radius: 50%;
  margin-bottom: 10px;

  @media (min-width: 768px) {
    margin-bottom: 0;
  }
`;

// Component
const GetTeacherByClassId = ({ studentID}) => {
//   const [classId, setClassId] = useState('');
  const [teachers, setTeachers] = useState([]);
  const [error, setError] = useState('');


useEffect(()=>{
    fetchUserDetails()
},[])


  const fetchUserDetails = async () => {
    try {
      const response = await fetch(
      //   `${studentInfoUrl}${studentID}`,
      `https://ephadacademyportal.com.ng/ephad_api/get_student_details.php?id=${studentID}`,
        {
          method: 'GET',
          headers: {
            'Cache-Control': 'no-store',
          },
        }
      );
      const data = await response.json();
      if (data.success) {
        // setUser(data.student);
        console.log(data) 
        fetchTeachers(data.student.class_id)
      } else {
        setError(data.error || 'Error fetching user details.');

      }
    } catch (err) {
      setError('Failed to fetch user details. Please try again.');
    }
  };


  const fetchTeachers = async (classId) => {

    setError('');
    setTeachers([]);

    try {
      const response = await fetch(`https://ephadacademyportal.com.ng/ephad_api/fetch_teacher_by_class_id.php?class_id=${classId}`);
      const data = await response.json();

      if (data.success) {
        setTeachers(data.teachers);
      } else {
        setError(data.error);
      }
    } catch (err) {
      setError('Failed to fetch teachers. Please try again later.');
    }
  };

  return (
    <Container>
      <Title>Class Teacher Information</Title>
      {/* <Form onSubmit={fetchTeachers}>
        <Input
          type="text"
          placeholder="Enter Class ID"
          value={classId}
          onChange={(e) => setClassId(e.target.value)}
          required
        />
        <Button type="submit">Fetch Teachers</Button>
      </Form> */}
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <TeacherList>
        {teachers.map((teacher) => (
          <TeacherCard key={teacher.id}>
            <ProfilePhoto  
            src={`https://ephadacademyportal.com.ng/ephad_api/uploads/teacher_profile_photos/${teacher.profile_photo}`}
            alt="Profile" />
            <TeacherDetails>
              <strong>{`${teacher.first_name} ${teacher.last_name}`}</strong>
              <span>Email: {teacher.email}</span>
              <span>Phone: {teacher.phone_number}</span>
            </TeacherDetails>
          </TeacherCard>
        ))}
      </TeacherList>
    </Container>
  );
};

export default GetTeacherByClassId;
