import React, { useContext, useEffect, useState } from 'react';
import styled, { keyframes } from 'styled-components';
import { Context } from './Context';
import ManagementEditPhoneNumberModal from './ManagementEditPhoneNumber';

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

const ManagementUserDetails = ({ managementID}) => {
  const [user, setUser] = useState(null);
  const [error, setError] = useState('');
  const {managementInfoUrl,mainDomain}=useContext(Context);
  const [showModal,setShowModal]=useState(false)
  console.log(managementID)

  
    const fetchUserDetails = async () => {
      try {
        const response = await fetch(
          `${managementInfoUrl}${managementID}`,
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
          console.log(data)
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

  if (error) {
    return (
      <Container>
        <ErrorMessage>{error}</ErrorMessage>
      </Container>
    );
  }

  return (
    <Container>
      <Title>Management User Details</Title>
      {user ? (
        <DetailsContainer>
          {user.profile_photo && (
            <ProfilePhoto
              // src={`${mainDomain}/uploads/management_profile_photos/${user.profile_photo}`}
              src={`https://hotsalesng.com/ephad_api/uploads/management_profile_photos/${user.profile_photo}`}
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
            <Label>Management ID:</Label>
            <Value>{user.management_id}</Value>
          </Detail>
          <Button onClick={() => setShowModal(true)}>Edit Phone Number</Button>
        </DetailsContainer>
      ) : (
        <p>Loading...</p>
      )}
      <ManagementEditPhoneNumberModal
      userId={managementID}
      showModal={showModal}
      setShowModal={setShowModal}
      fetchUserDetails={fetchUserDetails}
      />
    </Container>
  );
};

export default ManagementUserDetails;
