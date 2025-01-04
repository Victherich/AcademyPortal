import React from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

const DashboardContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 50px;
background:rgba(255,0,43,0.5);

  color: white;
`;

const Title = styled.h2`
  font-size: 2rem;
  margin-bottom: 20px;
`;

const DashboardsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 20px;
  width: 100%;
`;

const DashboardCard = styled.a`
  background: white;
  padding: 20px;
  border-radius: 10px;
//   color: #4CAF50;
color:rgba(128,0,128,0.8);
  font-weight: bold;
  text-align: center;
  text-decoration: none;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s ease-in-out;
  cursor:pointer;

  &:hover {
    transform: scale(1.05);
    background: #FFD700;
    color: white;
  }
`;

const Dashboards = () => {
    const navigate = useNavigate();
  return (
    <DashboardContainer id="dashboards">
      <Title>Access Dashboards</Title>
      <DashboardsGrid>
        
        <DashboardCard onClick={()=>navigate("/studentdashboard")}>Students/Parents Dashboard</DashboardCard>
        <DashboardCard onClick={()=>navigate("/teacherdashboard")}>Teachers Dashboard</DashboardCard>
        <DashboardCard onClick={()=>navigate("/managementdashboard")}>Management Dashboard</DashboardCard>
      </DashboardsGrid>
    </DashboardContainer>
  );
};

export default Dashboards;
