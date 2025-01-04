import React, { useState } from 'react';
import styled from 'styled-components';
import heroimg from '../images/heroimg.png';
import contactimg from "../images/contactimg.png"

const ContactContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 50px 20px;
background: url(${contactimg}) no-repeat center center/cover;
  min-height: 100vh;

   &::before{
    position:absolute;
    width:100%;
    height:100%;
    content:"";
    background-color:rgba(0,0,0,0.2);
  }
`;

const Title = styled.h1`
  font-size: 2.5rem;
  margin-bottom: 20px;
color:white;
  position:relative;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 20px;
  background: rgba(255,255,255,0.7);
  padding: 30px;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  width: 100%;
  max-width: 500px;
  position:relative;
`;

const Label = styled.label`
  font-size: 1rem;
  font-weight: bold;
  color: #333;
`;

const Input = styled.input`
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
  font-size: 1rem;
width:100%;
  &:focus {
    outline: none;
    border-color: #4CAF50;
    box-shadow: 0 0 5px rgba(76, 175, 80, 0.5);
  }
`;

const TextArea = styled.textarea`
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
  font-size: 1rem;
  resize: none;
  width:100%;

  &:focus {
    outline: none;
    border-color: #4CAF50;
    box-shadow: 0 0 5px rgba(76, 175, 80, 0.5);
  }
`;

const Button = styled.button`
  padding: 15px;
  background:rgba(255,0,43,0.5);
  color: white;
  border: none;
  border-radius: 5px;
  font-size: 1.2rem;
  cursor: pointer;
  transition: all 0.3s ease-in-out;

  &:hover {
    background: rgba(128,0,128,0.8);
  }

  &:disabled {
    background: #ccc;
    cursor: not-allowed;
  }
`;

const ErrorMessage = styled.p`
  color: red;
  font-size: 0.9rem;
  margin-top: -10px;
`;

const ContactForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: '',
  });

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const validate = () => {
    const errors = {};

    if (!formData.name.trim()) errors.name = 'Name is required';
    if (!formData.email.trim()) errors.email = 'Email is required';
    else if (!/\S+@\S+\.\S+/.test(formData.email)) errors.email = 'Invalid email';
    if (!formData.phone.trim()) errors.phone = 'Phone number is required';
    else if (!/^\d{10,15}$/.test(formData.phone))
      errors.phone = 'Phone number should be 10-15 digits';
    if (!formData.message.trim()) errors.message = 'Message is required';

    return errors;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const validationErrors = validate();
    setErrors(validationErrors);

    if (Object.keys(validationErrors).length === 0) {
      setIsSubmitting(true);
      // Simulate form submission
      setTimeout(() => {
        alert('Message sent successfully!');
        setFormData({ name: '', email: '', phone: '', message: '' });
        setIsSubmitting(false);
      }, 2000);
    }
  };

  return (
    <ContactContainer>
      <Title>Contact Us</Title>
      <Form onSubmit={handleSubmit}>
        <div>
          {/* <Label htmlFor="name">Name</Label> */}
          <Input
            id="name"
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Your name"
          />
          {errors.name && <ErrorMessage>{errors.name}</ErrorMessage>}
        </div>
        <div>
          {/* <Label htmlFor="email">Email</Label> */}
          <Input
            id="email"
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Your email"
          />
          {errors.email && <ErrorMessage>{errors.email}</ErrorMessage>}
        </div>
        <div>
          {/* <Label htmlFor="phone">Phone</Label> */}
          <Input
            id="phone"
            type="tel"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            placeholder="Your phone number"
          />
          {errors.phone && <ErrorMessage>{errors.phone}</ErrorMessage>}
        </div>
        <div>
          {/* <Label htmlFor="message">Message</Label> */}
          <TextArea
            id="message"
            name="message"
            value={formData.message}
            onChange={handleChange}
            rows="5"
            placeholder="Your message"
          />
          {errors.message && <ErrorMessage>{errors.message}</ErrorMessage>}
        </div>
        <Button type="submit" disabled={isSubmitting}>
          {isSubmitting ? 'Sending...' : 'Send Message'}
        </Button>
      </Form>
    </ContactContainer>
  );
};

export default ContactForm;
