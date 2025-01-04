import React, { useState } from 'react';
import styled from 'styled-components';
import { FaBars, FaTimes } from 'react-icons/fa';
import { useDispatch, useSelector } from 'react-redux';
import ManagementUserDetails from './ManagementUserDetails';
import Swal from 'sweetalert2';
import { managementLogout } from '../Features/Slice';
import Departments from './Departments';
import Classes from './Classes';
import Subjects from './Subjects';
import Students from './Students';
import StudentUserDetails from './StudentUserDetails';
import { studentLogout } from '../Features/Slice';
import StudentSchoolFees from './StudentSchoolFees';
import ManagementAnnouncements from './ManagementAnnouncements';
import StudentFeedbacks from './StudentFeedbacks';
import SchoolWeekManager from './SchoolTermCalender';
import StudentResult from './StudentResult';

// Styled Components
const DashboardContainer = styled.div`
  display: flex;
  min-height: 100vh;
  // background: #f8f9fa;
  overflow: hidden;
`;

const Sidebar = styled.div`
  // background: #4caf50;
  // background:rgba(128,0,128,0.3);
  // background:rgba(255,0,43,0.2);
  background:#F4F4F4;
  color: white;
  width: ${(props) => (props.isOpen ? '250px' : '0')};
  overflow: hidden;
  transition: width 0.3s ease-in-out;
  display: flex;
  flex-direction: column;
  position: fixed;
  height: 100%;
  min-height:100vh;
  z-index: 999;
  box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;

  @media (min-width: 768px) {
    width: 250px;
    position: static;
    transition: none;
  }
`;

const SidebarHeader = styled.div`
  padding: 20px;
  font-size: 1.5rem;
  text-align: center;
  font-weight: bold;
  color:purple;
  // background: #3b8d41;
`;

const SidebarMenu = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

const SidebarMenuItem = styled.li`
  padding: 15px 20px;
  cursor: pointer;
  background: ${(props) => (props.active ? 'rgba(255,0,43,0.5);' : 'transparent')};
  color: ${(props)=>(props.active ? 'white':"purple")};
  // color:white;

  font-weight: ${(props) => (props.active ? 'bold' : 'normal')};
  transition: all 0.3s ease-in-out;

  &:hover {
    // background: #3b8d41;
    background:rgba(255,0,43,0.3);
  }
`;

const ContentArea = styled.div`
  flex-grow: 1;
  margin-left: ${(props) => (props.isOpen ? '250px' : '0')};
  transition: margin-left 0.3s ease-in-out;
  padding: 20px;

  @media (min-width: 768px) {
    // margin-left: 250px;
  }
`;

const Hamburger = styled.div`
  position: fixed;
  top: 60px;
  left: 20px;
  // background: #4caf50;
  background:rgba(128,0,128,0.7);
  color: white;
  padding: 10px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  z-index: 1100;

  @media (min-width: 768px) {
    display: none;
  }
`;

const Overlay = styled.div`
  display: ${(props) => (props.isOpen ? 'block' : 'none')};
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  z-index: 900;
`;

// Content Components
const HomeContent = () => <h1 style={{color:"purple"}}>Home Content</h1>;
const ProfileContent = () => <h1>Profile Content</h1>;
const SettingsContent = () => <h1>Settings Content</h1>;
const HelpContent = () => <h1>Help Content</h1>;

// Main Component
const StudentDashboard = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeMenu, setActiveMenu] = useState('profile');
  const studentInfo = useSelector(state=>state.studentInfo)


  
  // console.log(managementInfo)

  const dispatch = useDispatch();


  
  const handleLogout = () => {
    Swal.fire({
      title: "Are you sure you want to log out?",
      text: "You will need to log in again to access your account.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, log me out",
      cancelButtonText: "Cancel",
    }).then((result) => {
      if (result.isConfirmed) {
        // Perform the logout actions
        dispatch(studentLogout());
        Swal.fire({
          title: "Logged Out",
          text: "You have been logged out successfully.",
          icon: "success",
          timer: 2000,
          showConfirmButton: false,
        });
  
      
      }
    });
  };
  



  const handleMenuClick = (menu) => {
    setActiveMenu(menu);
    setMenuOpen(false); // Close menu on mobile when a menu item is clicked
  };

  const toggleMenu = () => setMenuOpen((prev) => !prev);

  const closeMenuOnOutsideClick = () => setMenuOpen(false);

  // Map menu options to content
  const renderContent = () => {
    switch (activeMenu) {
      case 'profile':
        return <StudentUserDetails studentID={studentInfo.id}/>;
        case 'schoolFees':
        return <StudentSchoolFees studentID={studentInfo.id}/>;
        case 'announcement':
        return <ManagementAnnouncements/>;
        case 'feedback':
          return <StudentFeedbacks/>;
          case 'schoolCalender':
          return <SchoolWeekManager/>;
          case 'studentResult':
          return <StudentResult studentId={94} semesterId={6} classId={2}/>;
      
      default:
        return <h1 style={{color:"purple",textAlign:"left",width:"100%"}}>Welcome to your Dashboard</h1>;
    }
  };

  return (
    <DashboardContainer>
      <Hamburger onClick={toggleMenu}>
        {menuOpen ? <FaTimes /> : <FaBars />}
      </Hamburger>
      <Overlay isOpen={menuOpen} onClick={closeMenuOnOutsideClick} />
      <Sidebar isOpen={menuOpen}>
        <SidebarHeader>Student Dashboard</SidebarHeader>
        <SidebarMenu>
       
          <SidebarMenuItem
            active={activeMenu === 'profile'}
            onClick={() => handleMenuClick('profile')}
          >
            Hi, {studentInfo.first_name}
          </SidebarMenuItem>

          <SidebarMenuItem
            active={activeMenu === 'announcement'}
            onClick={() => handleMenuClick('announcement')}
          >
            Announcement
          </SidebarMenuItem>

          <SidebarMenuItem
            active={activeMenu === 'schoolFees'}
            onClick={() => handleMenuClick('schoolFees')}
          >
            School Fees
          </SidebarMenuItem>

          <SidebarMenuItem
            active={activeMenu === 'schoolCalender'}
            onClick={() => handleMenuClick('schoolCalender')}
          >
            Term week Calender
          </SidebarMenuItem>

          <SidebarMenuItem
            active={activeMenu === 'feedback'}
            onClick={() => handleMenuClick('feedback')}
          >
            Feedbacks to Management
          </SidebarMenuItem>

          <SidebarMenuItem
            active={activeMenu === 'subjects'}
            onClick={() => handleMenuClick('subjects')}
          >
            Subjects
          </SidebarMenuItem>


          <SidebarMenuItem
            active={activeMenu === 'studentResult'}
            onClick={() => handleMenuClick('studentResult')}
          >
            Results
          </SidebarMenuItem>
         
         
          <SidebarMenuItem
            onClick={handleLogout}
          >
            Logout
          </SidebarMenuItem>
        </SidebarMenu>
      </Sidebar>
      <ContentArea isOpen={menuOpen}>{renderContent()}</ContentArea>
    </DashboardContainer>
  );
};

export default StudentDashboard;
