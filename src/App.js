import logo from './logo.svg';
import './App.css';
import {BrowserRouter,Routes,Route} from 'react-router-dom'
import Landingpage from './components/Landingpage';
import SchoolManagementDashboard from './components/SchoolManagementDashboard';
import Header from './components/Header';
import Footer from './components/Footer';
import ContactForm from './components/ContactForm';
import ScrollToTop from './components/ScrollToTop';
import SchoolManagementLogin from './components/SchoolManagementLogin';
import PrivateSchoolManagementDashboard from './components/PrivateSchoolManagementDashboard';
import PrivateSchoolManagementLogin from './components/PrivateSchoolManagementLogin';
import PrivateSchoolManagementSignup from './components/PrivateSchoolManagementSignUp';
import SchoolManagementSignup from './components/SchoolManagementSignup';
import StudentDashboard from './components/StudentDashboard';
import PrivateStudentDashboard from './components/PrivateStudentDashboard';
import PrivateStudentLogin from './components/PrivateStudentLogin';
import StudentLogin from './components/StudentLogin';
import PrivateStudentSignup from './components/PrivateStudentSignup';
import StudentSignup from './components/StudentSignup';
import PrivateTeacherDashboard from './components/PrivateTeacherDashboard';
import TeacherDashboard from './components/TeacherDashboard';
import PrivateTeacherLogin from './components/PrivateTeacherLogin';
import TeacherLogin from './components/TeacherLogin';
import PrivateTeacherSignup from './components/PrivateTeacherSignup';
import TeacherSignup from './components/TeacherSignup';
import SchoolManagementForgotPassword from './components/SchoolManagementForgotPassword';
import SchoolManagementResetPassword from './components/ManagementResetPassword';

function App() {
  return (
   <BrowserRouter>
   <Header/>
   <ScrollToTop/>
      <Routes>
          <Route path='/' element={<Landingpage/>}/>

          

          <Route path='/contactform' element={<ContactForm/>}/>
          <Route path='/managementforgotpassword' element={<SchoolManagementForgotPassword/>}/>
          <Route path='/managementresetpassword/:token' element={<SchoolManagementResetPassword/>}/>





          //private routes

          <Route path='/managementdashboard' element={<PrivateSchoolManagementDashboard/>}>
              <Route path="" element={<SchoolManagementDashboard/>}/>
          </Route>

          <Route path='/managementlogin' element={<PrivateSchoolManagementLogin/>}>
            <Route path='' element={<SchoolManagementLogin/>}/>
          </Route>

          <Route path='/managementsignup' element={<PrivateSchoolManagementSignup/>}>
            {/* <Route path='' element={<SchoolManagementSignup/>}/> */}
          </Route>


          <Route path='/studentdashboard' element={<PrivateStudentDashboard/>}>
              <Route path="" element={<StudentDashboard/>}/>
          </Route>

          <Route path='/studentlogin' element={<PrivateStudentLogin/>}>
            <Route path='' element={<StudentLogin/>}/>
          </Route>

          <Route path='/studentsignup' element={<PrivateStudentSignup/>}>
            {/* <Route path='' element={<StudentSignup/>}/> */}
          </Route>

          <Route path='/teacherdashboard' element={<PrivateTeacherDashboard/>}>
              <Route path="" element={<TeacherDashboard/>}/>
          </Route>

          <Route path='/teacherlogin' element={<PrivateTeacherLogin/>}>
            <Route path='' element={<TeacherLogin/>}/>
          </Route>

          <Route path='/teachersignup' element={<PrivateTeacherSignup/>}>
            <Route path='' element={<TeacherSignup/>}/>
          </Route>
          
      </Routes>
      <Footer/>
   </BrowserRouter>
  );
}

export default App;
