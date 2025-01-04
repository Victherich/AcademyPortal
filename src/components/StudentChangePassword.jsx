import React, { useState } from 'react';
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
  color: purple;
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

const StudentChangePasswordModal = ({ userId, showModal, setShowModal }) => {
  const [oldPassword, setOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmNewPassword, setConfirmNewPassword]=useState('')

  const handleSave = async () => {
    if (!oldPassword || !newPassword) {
      Swal.fire({
        text: 'All fields are required.',
        icon: 'warning',
        allowOutsideClick: false,
      });
      return;
    }


    if (newPassword !== confirmNewPassword) {
        Swal.fire({
          text: 'Password does not match',
          icon: 'warning',
          allowOutsideClick: false,
        });
        return;
      }



    let loadingAlert;
    try {
      // Show loading spinner
      loadingAlert = Swal.fire({
        text: 'Please wait...',
        allowOutsideClick: false,
        didOpen: () => {
          Swal.showLoading();
        },
      });

      const url = 'https://hotsalesng.com/ephad_api/student_change_password.php';
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ userId, oldPassword, newPassword }),
      });

      const data = await response.json();

      if (data.success) {
        Swal.fire({
          text: data.message || 'Password updated successfully!',
          icon: 'success',
        }).then(() => {
          setShowModal(false); // Close the modal after success
        });
        setConfirmNewPassword('')
        setNewPassword('')
        setOldPassword('')

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
        // Swal.close();
      }
    }
  };

  return (
    showModal && (
      <ModalWrapper>
        <ModalContent>
          <Title>Change Password</Title>
          <InputField
            type="password"
            placeholder="Enter old password"
            value={oldPassword}
            onChange={(e) => setOldPassword(e.target.value)}
          />
          <InputField
            type="password"
            placeholder="Enter new password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
          />

<InputField
            type="password"
            placeholder="Enter new password again"
            value={confirmNewPassword}
            onChange={(e) => setConfirmNewPassword(e.target.value)}
          />
          <Button onClick={handleSave}>Save</Button>
          <Button
            onClick={() => {setShowModal(false);setOldPassword("");setNewPassword("");setConfirmNewPassword("")}}
            style={{ marginTop: '10px', backgroundColor: '#f44336' }}
          >
            Cancel
          </Button>
        </ModalContent>
      </ModalWrapper>
    )
  );
};

export default StudentChangePasswordModal;
