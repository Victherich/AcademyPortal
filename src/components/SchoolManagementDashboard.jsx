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
import Semesters from './SemesterOrTerms';
import SearchStudent from './SearchStudent';
import SchoolFees from './SchoolFees';
import CurrentSemesterOrTerm from './CurrentSemesterOrTerm';
import StudentsByClass from './StudentsByClass';
import ManagementAnnouncements from './ManagementAnnouncements';
import ManageFeesPayments from './ManageFeesPayments';
import StudentSignup from './StudentSignup';
import SchoolWeekManager from './SchoolTermCalender';
import SchoolManagementSignup from './SchoolManagementSignup';
import TeacherSignup from './TeacherSignup';
import TeacherList from './AllTeachers';
import StudentFeedbacks from './StudentFeedbacks';
import TeacherFeedbacks from './TeacherFeedbacks';

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
const SchoolManagementDashboard = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeMenu, setActiveMenu] = useState('profile');
  const managementInfo = useSelector(state=>state.managementInfo)
  
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
        dispatch(managementLogout());
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
    window.scroll(0,0);
    setActiveMenu(menu);
    setMenuOpen(false); // Close menu on mobile when a menu item is clicked
  };

  const toggleMenu = () => setMenuOpen((prev) => !prev);

  const closeMenuOnOutsideClick = () => setMenuOpen(false);

  // Map menu options to content
  const renderContent = () => {
    switch (activeMenu) {
      case 'profile':
        return <ManagementUserDetails managementID={managementInfo.id}/>;
        case 'departments':
        return <Departments />;
        case 'classes':
        return <Classes />;
        case 'semesters':
        return <Semesters />;
        case 'subjects':
        return <Subjects />;
        case 'searchStudent':
        return <SearchStudent />;
        case 'studentsByClass':
        return <StudentsByClass />;
        case 'schoolFees':
        return <SchoolFees />;
      case 'currentSemester':
        return <CurrentSemesterOrTerm/>;
        case 'announcements':
        return <ManagementAnnouncements/>;
        case 'schoolFeesManagement':
          return <ManageFeesPayments />;
          case 'registerStudent':
            return <StudentSignup />;
            case 'schoolCalender':
              return <SchoolWeekManager />;
              case 'registerAdmin':
                return <SchoolManagementSignup/>;
                case 'registerTeacher':
                  return <TeacherSignup/>;
                  case 'allTeacher':
                  return <TeacherList/>;
                  case 'studentsFeedbacks':
                    return <StudentFeedbacks/>;
                    case 'teachersFeedbacks':
                    return <TeacherFeedbacks/>;
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
        <SidebarHeader>Management Dashboard</SidebarHeader>
        <SidebarMenu>
       
          <SidebarMenuItem
            active={activeMenu === 'profile'}
            onClick={() => handleMenuClick('profile')}
          >
            Hi, {managementInfo.first_name}
          </SidebarMenuItem>

          <SidebarMenuItem
            active={activeMenu === 'announcements'}
            onClick={() => handleMenuClick('announcements')}
          >
            Announcements
          </SidebarMenuItem>


          {/* <SidebarMenuItem
            active={activeMenu === 'departments'}
            onClick={() => handleMenuClick('departments')}
          >
            Departments
          </SidebarMenuItem> */}
          <SidebarMenuItem
            active={activeMenu === 'classes'}
            onClick={() => handleMenuClick('classes')}
          >
            Classes
          </SidebarMenuItem>

          <SidebarMenuItem
            active={activeMenu === 'allTeacher'}
            onClick={() => handleMenuClick('allTeacher')}
          >
            All Teachers
          </SidebarMenuItem>
          {/* <SidebarMenuItem
            active={activeMenu === 'semesters'}
            onClick={() => handleMenuClick('semesters')}
          >
            School Terms
          </SidebarMenuItem> */}

          <SidebarMenuItem
            active={activeMenu === 'currentSemester'}
            onClick={() => handleMenuClick('currentSemester')}
          >
            Academic Controls
          </SidebarMenuItem>

          {/* <SidebarMenuItem
            active={activeMenu === 'subjects'}
            onClick={() => handleMenuClick('subjects')}
          >

            Subjects
          </SidebarMenuItem> */}
          <SidebarMenuItem
            active={activeMenu === 'schoolFees'}
            onClick={() => handleMenuClick('schoolFees')}
          >

            School Fees
          </SidebarMenuItem>

          <SidebarMenuItem
            active={activeMenu === 'schoolFeesManagement'}
            onClick={() => handleMenuClick('schoolFeesManagement')}
          >

            Manage Fees Payment
          </SidebarMenuItem>

          <SidebarMenuItem
            active={activeMenu === 'searchStudent'}
            onClick={() => handleMenuClick('searchStudent')}
          >
            Search Student
          </SidebarMenuItem>

          <SidebarMenuItem
            active={activeMenu === 'studentsByClass'}
            onClick={() => handleMenuClick('studentsByClass')}
          >
            Students by Class
          </SidebarMenuItem>

          <SidebarMenuItem
            active={activeMenu === 'registerStudent'}
            onClick={() => handleMenuClick('registerStudent')}
          >
            Register Student
          </SidebarMenuItem>

          <SidebarMenuItem
            active={activeMenu === 'registerTeacher'}
            onClick={() => handleMenuClick('registerTeacher')}
          >
            Register Teacher
          </SidebarMenuItem>

          <SidebarMenuItem
            active={activeMenu === 'registerAdmin'}
            onClick={() => handleMenuClick('registerAdmin')}
          >
            Register Admin / Management staff
          </SidebarMenuItem>

          <SidebarMenuItem
            active={activeMenu === 'schoolCalender'}
            onClick={() => handleMenuClick('schoolCalender')}
          >
           School week Manager / Calender
          </SidebarMenuItem>

          <SidebarMenuItem
            active={activeMenu === 'studentsFeedbacks'}
            onClick={() => handleMenuClick('studentsFeedbacks')}
          >
           Students Feedbacks
          </SidebarMenuItem>

          <SidebarMenuItem
            active={activeMenu === 'teachersFeedbacks'}
            onClick={() => handleMenuClick('teachersFeedbacks')}
          >
           Teachers Feedbacks
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

export default SchoolManagementDashboard;
