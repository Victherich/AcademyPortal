import React from 'react';
import styled from 'styled-components';
import { FaUserTie, FaChalkboardTeacher, FaUserGraduate } from 'react-icons/fa';

const FeaturesContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 50px;
  background: #f9f9f9;
`;

const Title = styled.h2`
  font-size: 2rem;
  margin-bottom: 20px;
  text-align:center;
  color:#8080FF;
`;

const FeaturesGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 20px;
  width: 100%;
`;

const FeatureCard = styled.div`
  background: white;
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  text-align: center;
  transition: transform 0.3s ease-in-out;

  &:hover {
    transform: scale(1.05);
  }
`;

const FeatureIcon = styled.div`
  font-size: 2.5rem;
color:rgba(128,0,128,0.7);
  margin-bottom: 10px;
`;

const FeatureTitle = styled.h3`
  font-size: 1.5rem;
  margin-bottom: 10px;
color:rgba(128,0,128,0.7);
`;

const FeatureDescription = styled.p`
  font-size: 1rem;
  color: #666;
`;

const Features = () => {
  return (
    <FeaturesContainer id="features">
      <Title>Why Choose Ephad Academy?</Title>
      <FeaturesGrid>
        <FeatureCard>
          <FeatureIcon>
            <FaUserTie />
          </FeatureIcon>
          <FeatureTitle>Qualified Teachers</FeatureTitle>
          <FeatureDescription>Experienced and certified educators for all levels.</FeatureDescription>
        </FeatureCard>
        <FeatureCard>
          <FeatureIcon>
            <FaChalkboardTeacher />
          </FeatureIcon>
          <FeatureTitle>Innovative Methods</FeatureTitle>
          <FeatureDescription>Modern teaching techniques for effective learning.</FeatureDescription>
        </FeatureCard>
        <FeatureCard>
          <FeatureIcon>
            <FaUserGraduate />
          </FeatureIcon>
          <FeatureTitle>Holistic Growth</FeatureTitle>
          <FeatureDescription>Focus on academic, social, and emotional development.</FeatureDescription>
        </FeatureCard>
      </FeaturesGrid>
    </FeaturesContainer>
  );
};

export default Features;
