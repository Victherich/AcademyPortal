import React, { useState, useEffect } from "react";
import { useNavigate, useLocation, useParams } from "react-router-dom";
import Swal from "sweetalert2";
import styled from "styled-components";
import heroimg from '../images/schooladminimg1.png';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 50px 20px;
  background: url(${heroimg}) no-repeat center center/cover;
  min-height: 100vh;
  position: relative;

  &::before {
    position: absolute;
    width: 100%;
    height: 100%;
    content: "";
    background-color: rgba(0, 0, 0, 0.2);
  }
`;

const Title = styled.h1`
  font-size: 2.5rem;
  color: white;
  position: relative;
  margin-bottom: 20px;
  text-align:center;
`;

const Form = styled.form`
  background: rgba(255, 255, 255, 0.7);
  padding: 30px;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  display: flex;
  flex-direction: column;
  gap: 20px;
  width: 100%;
  max-width: 400px;
  position: relative;
`;

const Input = styled.input`
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
  font-size: 1rem;
  width: 100%;
  &:focus {
    outline: none;
    border-color: #4CAF50;
    box-shadow: 0 0 5px rgba(76, 175, 80, 0.5);
  }
`;

const PasswordToggle = styled.span`
  position: absolute;
  right: 10px;
  top: 50%;
  transform: translateY(-50%);
  cursor: pointer;
`;

const Button = styled.button`
  padding: 15px;
  background: rgba(255, 0, 43, 0.5);
  color: white;
  border: none;
  border-radius: 5px;
  font-size: 1.2rem;
  cursor: pointer;
  transition: all 0.3s ease-in-out;

  &:hover {
    background: rgba(128, 0, 128, 0.8);
  }

  &:disabled {
    background: #ccc;
    cursor: not-allowed;
  }
`;

const LinkText = styled.p`
  font-size: 1rem;
  color: purple;
  cursor: pointer;
  text-align: center;
  &:hover {
    text-decoration: underline;
  }
`;


const ManagementResetPassword = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const {token} = useParams();

  const handleResetPassword = async (e) => {
    e.preventDefault();

    if (!password || !confirmPassword) {
      Swal.fire({
        text: "Please fill in both password fields.",
        icon: "warning",
        allowOutsideClick: false,
      });
      return;
    }

    if (password !== confirmPassword) {
      Swal.fire({
        text: "Passwords do not match.",
        icon: "error",
        allowOutsideClick: false,
      });
      return;
    }


    const loadingAlert = Swal.fire({text:"Please wait..."})
        Swal.showLoading();

    try {
      const response = await fetch("https://ephadacademyportal.com.ng/ephad_api/management_reset_password.php", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ token, password }),
      });

      const data = await response.json();

      if (data.success) {
        Swal.fire({
          text: "Your password has been successfully reset.",
          icon: "success",
          allowOutsideClick: false,

        })
        navigate("/managementlogin");
      } else {
        Swal.fire({
          text: data.error || "Something went wrong.",
          icon: "error",
          allowOutsideClick: false,
        });
      }
    } catch (error) {
      Swal.fire({
        text: "An error occurred. Please try again.",
        icon: "error",
        allowOutsideClick: false,
      });
      console.error(error);
    }finally{
        loadingAlert.close();
    }
  };

  return (
    <Container>
      <Title>Reset Your Password</Title>
      <Form onSubmit={handleResetPassword}>
        <Input
          type="password"
          placeholder="Enter new password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <Input
          type="password"
          placeholder="Confirm new password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
        />
        <Button type="submit">Reset Password</Button>
        <LinkText onClick={()=>navigate('/managementlogin')}>Login</LinkText>
      </Form>
    </Container>
  );
};

export default ManagementResetPassword;
