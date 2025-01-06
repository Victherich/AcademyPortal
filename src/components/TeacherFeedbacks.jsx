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

const TeacherFeedbacks = () => {
  const [form, setForm] = useState({ id: '', title: '', content: '' });
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const [announcements, setAnnouncements] = useState([]);
  const location = useLocation();

  useEffect(() => {
    fetchAnnouncements();
  }, []);

  const fetchAnnouncements = async () => {
    try {
      const response = await fetch(`https://ephadacademyportal.com.ng/ephad_api/fetch_teacher_feedbacks.php`);
      const data = await response.json();
      if (data.success) {
        setAnnouncements(data.student_feedbacks);
        // console.log(data.student_feedbacks)
      } else {
        setError(data.error || 'Error fetching announcements.');
      }
    } catch (err) {
      setError('Failed to fetch announcements. Please try again.');
    }
  };




  const handleSubmit = async (e) => {
    e.preventDefault();
    
     Swal.fire({
      title: 'Are you sure?',
      text: 'This action cannot be undone!',
      icon: 'warning',
      showCancelButton: true,
    }).then(async (result) => {
      if (result.isConfirmed) {
        Swal.fire({text:"Please wait..."})
        Swal.showLoading(); 
    try {
      const response = await fetch(`https://ephadacademyportal.com.ng/ephad_api/teacher_create_feedback.php`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });
      const data = await response.json();
      if (data.success) {
        Swal.fire({ text: 'Feedback sent successfully!', icon: 'success' });
        fetchAnnouncements();
        setForm({ id: '', title: '', content: '' });
      } else {
        Swal.fire({ text: data.error || 'Failed to create feedback.', icon: 'error' });
      }
    } catch {
      Swal.fire({ text: 'An error occurred. Please try again.', icon: 'error' });
    }
  }})
  };



  const editAnnouncement = (announcement) => {
    setForm(announcement);
    window.scrollTo(0, 0);
  };

  const handleEditSubmit = async (e) => {
    e.preventDefault();
    Swal.fire({ text: 'Please wait...', showConfirmButton: false });
    try {
      const response = await fetch(`https://ephadacademyportal.com.ng/ephad_api/update_announcement.php`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });
      const data = await response.json();
      if (data.success) {
        Swal.fire({ text: 'Announcement updated successfully!', icon: 'success' });
        fetchAnnouncements();
        setForm({ id: '', title: '', content: '' });
      } else {
        Swal.fire({ text: data.error || 'Failed to update announcement.', icon: 'error' });
      }
    } catch {
      Swal.fire({ text: 'An error occurred. Please try again.', icon: 'error' });
    }
  };

  const deleteAnnouncement = async (id) => {
    Swal.fire({
      title: 'Are you sure?',
      text: 'This action cannot be undone!',
      icon: 'warning',
      showCancelButton: true,
    }).then(async (result) => {
      if (result.isConfirmed) {
        Swal.fire({text:"Please wait..."})
        Swal.showLoading(); 
        try {
          const response = await fetch(`https://ephadacademyportal.com.ng/ephad_api/delete_teacher_feedback.php`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ id }),
          });
          const data = await response.json();
          if (data.success) {
            Swal.fire({ text: 'Announcement deleted successfully!', icon: 'success' });
            fetchAnnouncements();
          } else {
            Swal.fire({ text: data.error || 'Failed to delete announcement.', icon: 'error' });
          }
        } catch {
          Swal.fire({ text: 'An error occurred. Please try again.', icon: 'error' });
        }finally{
            Swal.close();
        }
      }
    });
  };

  return (
    <Container>
      {location.pathname==="/teacherdashboard"&&<Title>{form.id ? 'Edit Feedback' : 'Create Feedback'}</Title>}
      {location.pathname!=="/teacherdashboard"&&<Title>Teachers Feedbacks</Title>}
     {location.pathname==="/teacherdashboard"&& <Form onSubmit={form.id ? handleEditSubmit : handleSubmit}>
        <Input
          type="text"
          placeholder="Title"
          value={form.title}
          onChange={(e) => setForm({ ...form, title: e.target.value })}
          required
        />
        <Input
          type="text"
          placeholder="Content"
          value={form.content}
          onChange={(e) => setForm({ ...form, content: e.target.value })}
          required
        />
        <Button type="submit">{form.id ? 'Update Feedback' : 'Send Feedback'}</Button>
        {form.id&&<Button type="button" onClick={()=>setForm({...form, id: '',title:'',content:""})}>Clear</Button>}
      </Form>}
      {location.pathname==="/managementdashboard"&&<AnnouncementGrid>
        {announcements.map((announcement) => (
          <AnnouncementCard key={announcement.id}>
            <Label>Title:</Label>
            <Value>{announcement.title}</Value>
            <Label>Content:</Label>
            <Value>{announcement.content}</Value>
           { location.pathname==="/teacherdashboard"&&<Button onClick={() => editAnnouncement(announcement)}>Edit</Button>}
           {<Button onClick={() => deleteAnnouncement(announcement.id)}>Delete</Button>}
          </AnnouncementCard>
        ))}
      </AnnouncementGrid>}
      {error && <p style={{ color: 'red', textAlign: 'center' }}>{error}</p>}
    </Container>
  );
};

export default TeacherFeedbacks;
