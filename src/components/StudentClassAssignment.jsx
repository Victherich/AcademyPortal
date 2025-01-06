import React, { useState, useEffect } from 'react';
import styled, { keyframes } from 'styled-components';
import Swal from 'sweetalert2';
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
  margin-right:10px;
  margin-top:10px;

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

const AnnouncementGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: 20px;

  @media (min-width: 768px) {
    grid-template-columns: 1fr 1fr;
  }
`;

const AnnouncementCard = styled.div`
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

const StudentClassAssignment = ({class_id}) => {
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const [announcements, setAnnouncements] = useState([]);
  const location = useLocation();
 
  useEffect(() => {
    fetchAssignments();
  }, []);

  const fetchAssignments = async () => {
    try {
      const response = await fetch(
        `https://ephadacademyportal.com.ng/ephad_api/fetch_class_assignment.php?class_id=${class_id}`
      );
      const data = await response.json();
      if (data.success) {
        setAnnouncements(data.assignments); // Updated to use 'assignments'
        // console.log(data.assignments)
      } else {
        setError(data.error || 'Error fetching assignments.');
      }
    } catch (err) {
      setError('Failed to fetch assignments. Please try again.');
    }
  };






  return (
    <Container>
       <Title>Assignments</Title>
    
      <AnnouncementGrid>
        {announcements.map((announcement) => (
          <AnnouncementCard key={announcement.id}>
            <Label>Title:</Label>
            <Value>{announcement.title}</Value>
            <Label>Content:</Label>
            <Value>{announcement.content}</Value>
          </AnnouncementCard>
        ))}
      </AnnouncementGrid>
      {error && <p style={{ color: 'red', textAlign: 'center' }}>{error}</p>}
    </Container>
  );
};

export default StudentClassAssignment;
