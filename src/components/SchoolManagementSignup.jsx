import React, { useContext, useState } from 'react';
import styled from 'styled-components';
import heroimg from '../images/schooladminimg1.png';
import { useNavigate } from 'react-router-dom';
import axios from 'axios'
import { Context } from './Context';
import Swal from 'sweetalert2'

const SignupContainer = styled.div`
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
  cursor: pointer;
  font-size:small;
  text-decoration:underline;
  color:purple;
`;

const Button = styled.button`
  padding: 15px;
  background: #8080FF;
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


const SchoolManagementSignup = () => {
  const {managmentSignupUrl}=useContext(Context);
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
    phoneNumber: "",
    profilePhoto: null, // For the profile photo file
  });
  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];

    // Validate file type and size
    const validTypes = ["image/jpeg", "image/png", "image/jpg"];
    if (!validTypes.includes(file.type)) {
      alert("Only JPEG, PNG, and JPG file types are allowed.");
      return;
    }

    if (file.size > 10 * 1024 * 1024) {
      alert("File size should not exceed 10MB.");
      return;
    }

    setFormData({ ...formData, profilePhoto: file });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (formData.password !== formData.confirmPassword) {
      alert("Passwords do not match!");
      return;
    }

    const loadingAlert=Swal.fire({title:"Please wait..."})
    Swal.showLoading();

    const formDataObj = new FormData();
    formDataObj.append("firstName", formData.firstName);
    formDataObj.append("lastName", formData.lastName);
    formDataObj.append("email", formData.email);
    formDataObj.append("password", formData.password);
    formDataObj.append("phoneNumber", formData.phoneNumber);
    formDataObj.append("profilePhoto", formData.profilePhoto); // Attach the profile photo file

    try {
      const response = await axios.post(`${managmentSignupUrl}`, formDataObj, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      if (response.data.success) {
        Swal.fire({text:response.data.message,allowOutsideClick:false,icon:"success"});
        navigate("/managementlogin");

      } else {
        Swal.fire({text:response.data.error,allowOutsideClick:false})
      }
    } catch (error) {
      console.error("Error signing up:", error);
      alert("There was an error processing your request.");
    }finally{
      loadingAlert.close();
    }
  };

  return (
    <SignupContainer>
      <Title>School Management Signup</Title>
      <Form onSubmit={handleSubmit}>
        <Input
          type="text"
          name="firstName"
          placeholder="First Name"
          value={formData.firstName}
          onChange={handleChange}
          required
        />
        <Input
          type="text"
          name="lastName"
          placeholder="Last Name"
          value={formData.lastName}
          onChange={handleChange}
          required
        />
        <Input
          type="email"
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
          required
        />
        <Input
          type={showPassword ? "text" : "password"}
          name="password"
          placeholder="Password"
          value={formData.password}
          onChange={handleChange}
          required
        />
        <Input
          type={showPassword ? "text" : "password"}
          name="confirmPassword"
          placeholder="Confirm Password"
          value={formData.confirmPassword}
          onChange={handleChange}
          required
        />
        <Input
          type="text"
          name="phoneNumber"
          placeholder="Phone Number"
          value={formData.phoneNumber}
          onChange={handleChange}
          required
        />
        <label>Upload Profile Photo:</label>
        <Input
          type="file"
          name="profilePhoto"
          accept=".jpeg, .png, .jpg"
          onChange={handleFileChange}
          required
        />
        <Button type="submit">Sign Up</Button>
        <LinkText onClick={()=>navigate('/managementlogin')}>Already Have an account? Login</LinkText>
      </Form>
    </SignupContainer>
  );
};

export default SchoolManagementSignup;