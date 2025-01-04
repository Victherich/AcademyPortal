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

const SchoolManagementLogin = () => {
    const navigate = useNavigate();
  const [formData, setFormData] = useState({ managementID: '', password: '' });
  const [showPassword, setShowPassword] = useState(false);
  const {managementLoginUrl}=useContext(Context);
  const dispatch = useDispatch();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const loadingAlert=Swal.fire({title:"Please wait..."})
    Swal.showLoading();

    try {
      const response = await fetch(`${managementLoginUrl}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          managementID: formData.managementID, 
          password: formData.password 
        }),
      });
  
      const data = await response.json();
      if (data.success) {
        Swal.fire({text:'Login Successful!',allowOutsideClick:false,icon:"success"});
       
        // console.log(data)
        // Redirect or perform other actions on successful login
        const managementInfo = data.user
        const managementToken = data.user.token
        dispatch(managementLogin({managementInfo,managementToken}));
        navigate('/managementdashboard')

      } else {
        Swal.fire({text:data.error,allowOutsideClick:false});
       
      }
    } catch (error) {
      // alert('An error occurred. Please try again.');
      Swal.fire({text:'An error occurred. Please try again.',allowOutsideClick:false});
      console.error('Login Error:', error);
    }
  };
  

  return (
    <LoginContainer>
      <Title>School Management Login</Title>
      <Form onSubmit={handleSubmit}>
        {/* <Input
          type="email"
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
        /> */}
        <Input
  type="text"
  name="managementID"
  placeholder="Management ID"
  value={formData.managementID}
  onChange={handleChange}
  required
/>

        <div style={{ position: 'relative' }}>
          <Input
            type={showPassword ? 'text' : 'password'}
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
            required
          />
          <PasswordToggle onClick={togglePasswordVisibility}>
            {showPassword ? 'Hide' : 'Show'}
          </PasswordToggle>
        </div>
        <Button type="submit">Login</Button>
        {/* <LinkText onClick={()=>navigate('/managementsignup')}>Don't have an account? Sign up</LinkText> */}
        <LinkText onClick={()=>navigate('/managementforgotpassword')}>Forgot Password?</LinkText>
      
      </Form>
    </LoginContainer>
  );
};

export default SchoolManagementLogin;
