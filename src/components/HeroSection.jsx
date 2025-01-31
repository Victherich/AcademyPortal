import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import heroimg from '../images/heroimg.png';
import heroimg2 from "../images/heroimg2.png";
import heroimg3 from "../images/heroimg3.png";

const HeroContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
  background: ${({ currentImage }) => `url(${currentImage}) no-repeat center center/cover`};
  height: 100vh;
  color: white;
  padding: 20px;
  animation: fadeIn 2s ease-in;
  position: relative;

  &::before {
    position: absolute;
    width: 100%;
    height: 100%;
    content: "";
    background-color: rgba(0, 0, 0, 0.2);
  }

  @keyframes fadeIn {
    from {
      opacity: 0;
    }
    to {
      opacity: 1;
    }
  }
`;

const Heading = styled.h1`
  font-size: 3rem;
  margin-bottom: 20px;
  position: relative;
`;

const SubHeading = styled.p`
  font-size: 1.2rem;
  margin-bottom: 40px;
  position: relative;
`;

const Button = styled.a`
  padding: 15px 30px;
  background: white;
  color: #8080FF;
  border-radius: 5px;
  font-size: 1.2rem;
  text-decoration: none;
  font-weight: bold;
  transition: all 0.3s ease-in-out;
  position: relative;

  &:hover {
    background: rgba(128,0,128,0.8);
    color: white;
  }
`;

const HeroSection = () => {
  const images = [heroimg, heroimg2, heroimg3];
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 3000);

    return () => clearInterval(interval); // Cleanup interval on component unmount
  }, []);

  return (
    <HeroContainer currentImage={images[currentImageIndex]} id="hero">
      <Heading>Welcome to Ephad Academy Portal</Heading>
      <SubHeading>Empowering education for nursery, primary, and secondary students.</SubHeading>
      <Button href="#features">Explore Now</Button>
    </HeroContainer>
  );
};

export default HeroSection;
