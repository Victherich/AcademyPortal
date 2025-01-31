import React, { useContext, useEffect, useState } from 'react';
import styled, { keyframes } from 'styled-components';
import { Context } from './Context';
import ManagementEditPhoneNumberModal from './ManagementEditPhoneNumber';
import TeacherEditPhoneNumberModal from './TeacherEditPhoneNumber';
import Swal from 'sweetalert2';
import { useLocation } from 'react-router-dom';

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
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
  background-color: #f9f9f9;
  min-height: 100vh;
`;

const Title = styled.h1`
  font-size: 2.5rem;
  color: purple;
  margin-bottom: 20px;
  text-align: center;
  animation: ${fadeIn} 0.8s ease-in-out;
`;

const DetailsContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: 20px;
  width: 100%;
  max-width: 800px;
  background: white;
  padding: 30px;
  border-radius: 10px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
  animation: ${fadeIn} 1s ease-in-out;

  @media (min-width: 768px) {
    grid-template-columns: 1fr 1fr;
  }
`;

const Detail = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

const Label = styled.span`
  font-weight: bold;
  color: purple;
`;

const Value = styled.span`
  font-size: 1.1rem;
  color: #333;
`;

const ProfilePhoto = styled.img`
  grid-column: 1 / -1;
  width: 100%;
  max-width: 200px;
  height: auto;
  border-radius: 50%;
  margin: 0 auto;
  animation: ${fadeIn} 1.2s ease-in-out;
`;

const ErrorMessage = styled.p`
  color: red;
  font-size: 1.2rem;
`;


const Button = styled.button`
  padding: 10px 20px;
  background-color: #4caf50;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;

  &:hover {
    background-color: #45a049;
  }
`;

const TeacherUserDetails = ({ managementID}) => {
  const [user, setUser] = useState(null);
  const [error, setError] = useState('');
  const {managementInfoUrl,mainDomain}=useContext(Context);
  const [showModal,setShowModal]=useState(false)
  const location = useLocation();
  ////console.log(managementID)

  
    const fetchUserDetails = async () => {
      try {
        const response = await fetch(
            `https://ephadacademyportal.com.ng/ephad_api/get_teacher_user.php?id=${managementID}`,
          {
            method: 'GET',
            headers: {
              'Cache-Control': 'no-store',
            },
          }
        );
        const data = await response.json();
        if (data.success) {
          setUser(data.user);
          // console.log(data.user)
        } else {
          setError(data.error || 'Error fetching user details.');

        }
      } catch (err) {
        setError('Failed to fetch user details. Please try again.');
      }
    };


    useEffect(() => {
    fetchUserDetails();
  }, [managementID]);

const [classData, setClassData] = useState(null);
// const [loading, setLoading] = useState(true);
// const [error, setError] = useState(null);

useEffect(() => {
    const fetchClass = async () => {
        // setLoading(true);
        // setError(null);

        try {
            const response = await fetch(`https://ephadacademyportal.com.ng/ephad_api/fetch_class_by_id.php?id=${user?.class_id}`);
            
            if (!response.ok) {
                // throw new Error(`Error: ${response.status} - ${response.statusText}`);
                Swal.fire({text:response.status - response.statusText})
            }

            const data = await response.json();

            if (data.success) {
                setClassData(data.class);
                // ////console.log(data.class)
            } else {
                // throw new Error(data.error || "Failed to fetch class.");
                Swal.fire({text:data.error|| "Failed to fetch department."})
            }
        } catch (err) {
            // setError(err.message);
            Swal.fire({text:err.message})
        } finally {
            // setLoading(false);
        }
    };

    if (user?.class_id) {
        fetchClass();
    }
}, [user?.class_id]);


useEffect(()=>{
 if(user?.suspended===1&&location.pathname==="/teacherdashboard"){
  Swal.fire({icon:"info", 
    text:"You are currently suspended, kindly contact the management. Thanks",
  allowOutsideClick:false,
showConfirmButton:false})
 }
},[user?.suspended])



  if (error) {
    return (
      <Container>
        <ErrorMessage>{error}</ErrorMessage>
      </Container>
    );
  }

  return (
    <Container>
      <Title>Teacher User Details</Title>
      {user ? (
        <DetailsContainer>
          {user.profile_photo && (
            <ProfilePhoto
              // src={`${mainDomain}/uploads/management_profile_photos/${user.profile_photo}`}
              src={`https://ephadacademyportal.com.ng/ephad_api/uploads/teacher_profile_photos/${user.profile_photo}`}
              alt={`${user.first_name}'s profile`}
            />
          )}
          <Detail>
            <Label>First Name:</Label>
            <Value>{user.first_name}</Value>
          </Detail>
          <Detail>
            <Label>Last Name:</Label>
            <Value>{user.last_name}</Value>
          </Detail>
          <Detail>
            <Label>Email:</Label>
            <Value>{user.email}</Value>
          </Detail>
          <Detail>
            <Label>Phone Number:</Label>
            <Value>{user.phone_number}</Value>
          </Detail>
          <Detail>
            <Label>Teacher ID:</Label>
            <Value>{user.management_id}</Value>
          </Detail>
          <Detail>
            <Label>Class:</Label>
            <Value>{classData?.level}</Value>
          </Detail>
          <Button onClick={() => setShowModal(true)}>Edit Phone Number</Button>
        </DetailsContainer>
      ) : (
        <p>Loading...</p>
      )}
      <TeacherEditPhoneNumberModal
      userId={managementID}
      showModal={showModal}
      setShowModal={setShowModal}
      fetchUserDetails={fetchUserDetails}
      />
    </Container>
  );
};

export default TeacherUserDetails;
