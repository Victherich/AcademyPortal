import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import styled from 'styled-components';
import Swal from 'sweetalert2';

const ModalWrapper = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
`;

const ModalContent = styled.div`
  background-color: white;
  padding: 20px;
  border-radius: 10px;
  max-width: 400px;
  width: 100%;
`;

const Title = styled.h3`
  margin: 0;
  padding-bottom: 20px;
  color:purple;
`;

const InputField = styled.input`
  width: 100%;
  padding: 10px;
  margin-bottom: 15px;
  border: 1px solid #ccc;
  border-radius: 5px;
`;

const Button = styled.button`
  width: 100%;
  padding: 10px;
  background-color: #4caf50;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;

  &:hover {
    background-color: #45a049;
  }
`;

const StudentEditPhoneNumberModal = ({ userId, showModal, setShowModal, fetchUserDetails }) => {
  const [newPhoneNumber, setNewPhoneNumber] = useState('');
  // const location = useLocation();

  const handlePhoneNumberChange = (e) => {
    setNewPhoneNumber(e.target.value);
  };


// const [url,setUrl]=useState('')

// useEffect(()=>{
//   if(location.pathname==="/managementdashboard"){
//     setUrl("https://ephadacademyportal.com.ng/ephad_api/management_update-phone-number.php")
//     alert("management")
//   }else{
//     setUrl("https://ephadacademyportal.com.ng/ephad_api/student_update-phone-number.php")
//     alert("student")
//   }
// },[])

const handleSave = async () => {
    if (!newPhoneNumber) {
      Swal.fire({
        text: "Phone number is required.",
        icon: "warning",
        allowOutsideClick: false,
      });
      return;
    }
  
    // Check if phone number is valid (optional validation)
    const phoneRegex = /^[0-9]{10,15}$/;
    if (!phoneRegex.test(newPhoneNumber)) {
      Swal.fire({
        text: "Please enter a valid phone number.",
        icon: "warning",
        allowOutsideClick: false,
      });
      return;
    }
  
    let loadingAlert;
    try {
      // Show loading spinner
      loadingAlert = Swal.fire({
        text: "Please wait...",
        allowOutsideClick: false,
        didOpen: () => {
          Swal.showLoading();
        },
      });
  
      const url = 'https://ephadacademyportal.com.ng/ephad_api/student_update_phone_number.php';
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ userId, phoneNumber: newPhoneNumber }),
      });
  
      const data = await response.json();
  
      if (data.success) {
        Swal.fire({
          text: data.message || 'Phone number updated successfully!',
          icon: 'success',
        }).then(() => {
          setShowModal(false); // Close the modal after success
          fetchUserDetails(); // Refresh user details after update
        });
      } else {
        Swal.fire({
          text: data.error || 'Something went wrong.',
          icon: 'error',
        });
      }
    } catch (error) {
      Swal.fire({
        text: 'An error occurred. Please try again later.',
        icon: 'error',
      });
    } finally {
      // Close the loading alert if it is open
      if (loadingAlert) {
        Swal.close();
      }
    }
  };
  

  return (
    showModal && (
      <ModalWrapper>
        <ModalContent>
          <Title>Update Phone Number</Title>
          <InputField
            type="text"
            placeholder="Enter new phone number"
            value={newPhoneNumber}
            onChange={handlePhoneNumberChange}
          />
          <Button onClick={handleSave}>Save</Button>
          <Button onClick={() => setShowModal(false)} style={{ marginTop: '10px', backgroundColor: '#f44336' }}>Cancel</Button>
        </ModalContent>
      </ModalWrapper>
    )
  );
};

export default StudentEditPhoneNumberModal;
