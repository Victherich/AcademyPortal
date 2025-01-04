import React, { useContext, useState } from 'react';
import styled from 'styled-components';
import heroimg from '../images/schooladminimg1.png';
import { useNavigate } from 'react-router-dom';
import Swal from "sweetalert2"
import { Context } from './Context';
import { useDispatch } from 'react-redux';
import { managementLogin } from '../Features/Slice';

const LoginContainer = styled.div`
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

const SchoolManagementForgotPassword = () => {
    const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const {managementLoginUrl}=useContext(Context);
  const [resendCode,setResendCode]=useState(false)

  console.log(email)

  
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!email) {
      Swal.fire({
        text: "Please enter your email address.",
        icon: "warning",
        allowOutsideClick: false,
      });
      return;
    }

    const loadingAlert = Swal.fire({text:"Please wait..."})
    Swal.showLoading();

    try {
      const response = await fetch("https://ephadacademyportal.com.ng/ephad_api/management_forgot_password.php", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const data = await response.json();

      if (data.success) {
        // Success response
        Swal.fire({
          text: "A password reset link has been sent to your email. Please check your inbox or spam folder!",
          icon: "success",
          allowOutsideClick: false,
        });
        setResendCode(true)
      } else {
        // Error response from the backend
        Swal.fire({
          text: data.error || "Unexpected error occurred.",
          icon: "error",
          allowOutsideClick: false,
        });
      }
    } catch (error) {
      // Catch any network or other errors
      Swal.fire({
        text: "An error occurred. Please try again.",
        icon: "error",
        allowOutsideClick: false,
      });
      console.error("Error:", error);
    } finally {
      loadingAlert.close(); // End loading
    }
  };

  

  return (
    <LoginContainer>
      <Title>School Management Forgot Password</Title>
      <Form onSubmit={handleSubmit}>
        <Input
          type="email"
          name="email"
          placeholder="Enter your signed up email address"
          value={email}
          onChange={(e)=>setEmail(e.target.value)}
        />
   
        {!resendCode?<Button type="submit">Send Code</Button>:
        <Button type="submit">Re-Send Code ?</Button>}
        {/* <LinkText onClick={()=>navigate('/managementsignup')}>Don't have an account? Sign up</LinkText> */}
        <LinkText onClick={()=>navigate('/managementlogin')}>Login</LinkText>
      
      </Form>
    </LoginContainer>
  );
};

export default SchoolManagementForgotPassword;
