import React, { useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import { useLocation, useNavigate } from 'react-router-dom';
import { FaBeer,FaChevronCircleDown,FaChevronDown,FaHamburger } from 'react-icons/fa';

const HeaderContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20px 50px;
  background:#FF8095;
  color: white;
  position: sticky;
  top: 0;
  z-index: 1000;

`;

const Logo = styled.h1`
  font-size: 1.8rem;
  font-weight: bold;
  cursor: pointer;
`;

const Nav = styled.nav`
  display: flex;
  gap: 20px;

  @media (max-width: 768px) {
    display: none;
  }
`;

const NavItem = styled.a`
  color: white;
  text-decoration: none;
  font-size: 1rem;
  cursor: pointer;
  &:hover {
    text-decoration:underline;
  }
`;

const Burger = styled(FaHamburger)`
  display:none;

  @media (max-width:768px) {
    display:flex;
  }
`

const NavMobile = styled.div`
  display:flex;
  justify-content:center;
  flex-direction:column;
  position:absolute;
  top:20px;
  right:0px;
  background:#FF8095;
  padding:20px;
  gap:20px;
  box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;
`


const DashboardDropdown = styled.div`
    display:flex;
    flex-direction:column;
    justify-content:center;
    align-items:center;
    background-color:white;
    gap:10px;
    color:#FF8095;
    padding:5px;
    position:absolute;
    top:60px;
    right:60px;
    box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;
`

const DashboardDropdown2 = styled.div`
    display:flex;
    flex-direction:column;
    justify-content:center;
    align-items:center;
    background-color:white;
    gap:10px;
    color:#FF8095;
    padding:5px;
    // position:absolute;
    // top:60px;
    // right:60px;
    box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;
`

const DropdownOptions = styled.p`
  cursor:pointer;
  padding:5px;
  width:100%;
  

  &:hover{
  color:white;
  background-color:#FF8095
  }
`


const Header = () => {
  const navigate = useNavigate();
  const [mobileMenuSwitch,setMobileMenuSwitch]=useState(false);
  const menuRef = useRef();
  const location = useLocation();
  const menuRef2 = useRef();

  useEffect(()=>{
    const handleClickOutside = (e)=>{
      if(menuRef.current&&!menuRef.current.contains(e.target)){
          setMobileMenuSwitch(false)
      }
     
    }
    document.addEventListener('mousedown',handleClickOutside)
    return()=>{
      document.removeEventListener('mousedown',handleClickOutside)
    }
  },[])



  const [openDropdown,setOpenDropdown]=useState(false);

  useEffect(()=>{
    const handleClickOutside = (e)=>{
      if(menuRef2.current&&!menuRef2.current.contains(e.target)){
          setOpenDropdown(false)
      }
     
    }
    document.addEventListener('mousedown',handleClickOutside)
    return()=>{
      document.removeEventListener('mousedown',handleClickOutside)
    }
  },[])


  const [openDropdown2,setOpenDropdown2]=useState(false);



  return (
    <HeaderContainer>
      <Logo>Ephad Academy</Logo>
      <Nav>
        <NavItem onClick={()=>{navigate("/");window.scroll(0,0)}} >Home</NavItem>
        {/* {location.pathname==="/"&&<NavItem href="#features">Features</NavItem>} */}
        <NavItem onMouseOver={()=>setOpenDropdown(true)}>Dashboards <FaChevronCircleDown/></NavItem>
        <NavItem onClick={()=>navigate("/contactform")}>Contact</NavItem>
        {openDropdown&&<DashboardDropdown ref={menuRef2}>
          <DropdownOptions onClick={()=>{setOpenDropdown(false);navigate('/studentdashboard')}}>Student / Parents</DropdownOptions>
          <DropdownOptions onClick={()=>{setOpenDropdown(false);navigate('/teacherdashboard')}}>Teacher</DropdownOptions>
          <DropdownOptions onClick={()=>{setOpenDropdown(false);navigate('/managementdashboard')}}>School Management</DropdownOptions>
        </DashboardDropdown>}
      </Nav>
      <Burger onClick={()=>setMobileMenuSwitch(!mobileMenuSwitch)}/>

      {mobileMenuSwitch&&<NavMobile ref={menuRef}>
      <NavItem onClick={()=>{navigate("/");setMobileMenuSwitch(false);window.scroll(0,0)}}>Home</NavItem>
        {/* {location.pathname==="/"&&<NavItem href="#features" onClick={()=>setMobileMenuSwitch(false)}>Features</NavItem>} */}
        <NavItem onMouseOver={()=>setOpenDropdown2(true)}>Dashboards</NavItem>
        {openDropdown2&&<DashboardDropdown2 ref={menuRef2}>
          <DropdownOptions onClick={()=>{setMobileMenuSwitch(false);navigate('/studentdashboard')}}>Student / Parents</DropdownOptions>
          <DropdownOptions onClick={()=>{setMobileMenuSwitch(false);navigate('/teacherdashboard')}}>Teacher</DropdownOptions>
          <DropdownOptions onClick={()=>{setMobileMenuSwitch(false);navigate('/managementdashboard')}}>School Management</DropdownOptions>
        </DashboardDropdown2>}
        <NavItem onClick={()=>{navigate("/contactform");setMobileMenuSwitch(false)}}>Contact</NavItem>
      </NavMobile>}
    </HeaderContainer>
  );
};

export default Header;
