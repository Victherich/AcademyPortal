// import React, { useState } from 'react';
// import styled from 'styled-components';
// import heroimg from '../images/studentimg2.png';
// import { useNavigate } from 'react-router-dom';
// import Swal from 'sweetalert2';
// import { studentLogin } from '../Features/Slice';
// import { useDispatch } from 'react-redux';

// const LoginContainer = styled.div`
//   display: flex;
//   flex-direction: column;
//   align-items: center;
//   justify-content: center;
//   padding: 50px 20px;
//   background: url(${heroimg}) no-repeat center center/cover;
//   min-height: 100vh;
//   position: relative;

//   &::before {
//     position: absolute;
//     width: 100%;
//     height: 100%;
//     content: "";
//     background-color: rgba(0, 0, 0, 0.2);
//   }
// `;

// const Title = styled.h1`
//   font-size: 2.5rem;
//   color: white;
//   position: relative;
//   margin-bottom: 20px;
//   text-align: center;
// `;

// const Form = styled.form`
//   background: rgba(255, 255, 255, 0.7);
//   padding: 30px;
//   border-radius: 10px;
//   box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
//   display: flex;
//   flex-direction: column;
//   gap: 20px;
//   width: 100%;
//   max-width: 400px;
//   position: relative;
// `;

// const Input = styled.input`
//   padding: 10px;
//   border: 1px solid #ccc;
//   border-radius: 5px;
//   font-size: 1rem;
//   width: 100%;
//   &:focus {
//     outline: none;
//     border-color: #4CAF50;
//     box-shadow: 0 0 5px rgba(76, 175, 80, 0.5);
//   }
// `;

// const PasswordToggle = styled.span`
//   position: absolute;
//   right: 10px;
//   top: 50%;
//   transform: translateY(-50%);
//   cursor: pointer;
// `;

// const Button = styled.button`
//   padding: 15px;
//   background: rgba(255, 0, 43, 0.5);
//   color: white;
//   border: none;
//   border-radius: 5px;
//   font-size: 1.2rem;
//   cursor: pointer;
//   transition: all 0.3s ease-in-out;

//   &:hover {
//     background: rgba(128, 0, 128, 0.8);
//   }

//   &:disabled {
//     background: #ccc;
//     cursor: not-allowed;
//   }
// `;

// const LinkText = styled.p`
//   font-size: 1rem;
//   color: purple;
//   cursor: pointer;
//   text-align: center;
//   &:hover {
//     text-decoration: underline;
//   }
// `;

// const StudentLogin = () => {
//   const navigate = useNavigate();
//   const [formData, setFormData] = useState({ studentId: '', password: '' });
//   const [showPassword, setShowPassword] = useState(false);
//   const dispatch = useDispatch();

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData({ ...formData, [name]: value });
//   };

//   const togglePasswordVisibility = () => {
//     setShowPassword(!showPassword);
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     Swal.fire({
//       title: 'Logging in...',
//       text: 'Please wait while we authenticate your credentials.',
//       icon: 'info',
//       allowOutsideClick: false,
//       showConfirmButton: false,
//       didOpen: () => {
//         Swal.showLoading();
//       },
//     });

//     try {
//       const response = await fetch('https://ephadacademyportal.com.ng/ephad_api/student_login.php', {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify(formData),
//       });

//       const result = await response.json();
//       console.log(result)
//       if (result.success) {
//         Swal.fire({
//           title: 'Login Successful!',
//           text: `Welcome back, ${result.student.first_name}`,
//           icon: 'success',
//           allowOutsideClick:false,
//         }).then(() => {
          
//         });

//         navigate('/studentdashboard');
//         const studentInfo = result.student
//         const studentToken = result.student.token

//         dispatch(studentLogin({studentInfo,studentToken}))
//       } else {
//         Swal.fire({
//           title: 'Login Failed',
//           text: result.error || 'Invalid Student ID or Password',
//           icon: 'error',
//           allowOutsideClick:false
//         });
//       }
//     } catch (error) {
//       Swal.fire({
//         title: 'Error',
//         text: 'Something went wrong. Please try again later.',
//         icon: 'error',
//         allowOutsideClick:false
//       });
//     }
//   };

//   return (
//     <LoginContainer>
//       <Title>Student Login</Title>
//       <Form onSubmit={handleSubmit}>
//         <Input
//           type="text"
//           name="studentId"
//           placeholder="Student ID"
//           value={formData.studentId}
//           onChange={handleChange}
//           required
//         />
//         <div style={{ position: 'relative' }}>
//           <Input
//             type={showPassword ? 'text' : 'password'}
//             name="password"
//             placeholder="Password"
//             value={formData.password}
//             onChange={handleChange}
//             required
//           />
//           <PasswordToggle onClick={togglePasswordVisibility}>
//             {showPassword ? 'Hide' : 'Show'}
//           </PasswordToggle>
//         </div>
//         <Button type="submit">Login</Button>
//         {/* <LinkText onClick={() => navigate('/studentsignup')}>Don't have an account? Sign up</LinkText> */}
//         {/* <LinkText onClick={() => navigate('/studentsignup')}>Don't have an account? Sign up</LinkText> */}
        
//       </Form>
//     </LoginContainer>
//   );
// };

// export default StudentLogin;





import React, { useState } from 'react';
import styled from 'styled-components';
import heroimg from '../images/studentimg2.png';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import { studentLogin } from '../Features/Slice';
import { useDispatch } from 'react-redux';

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
  text-align: center;
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

const StudentLogin = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ studentId: '', password: '' });
  const [showPassword, setShowPassword] = useState(false);
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

    Swal.fire({
      title: 'Logging in...',
      text: 'Please wait while we authenticate your credentials.',
      icon: 'info',
      allowOutsideClick: false,
      showConfirmButton: false,
      didOpen: () => {
        Swal.showLoading();
      },
    });

    try {
      const response = await fetch('https://ephadacademyportal.com.ng/ephad_api/student_login.php', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const result = await response.json();
      console.log(result)
      if (result.success) {
        Swal.fire({
          title: 'Login Successful!',
          text: `Welcome back, ${result.student.first_name}`,
          icon: 'success',
          allowOutsideClick: false,
        }).then(() => {
          navigate('/studentdashboard');
        });

        // Dispatch to redux
        const studentInfo = result.student;
        const studentToken = result.student.token;
        dispatch(studentLogin({ studentInfo, studentToken }));
      } else {
        Swal.fire({
          title: 'Login Failed',
          text: result.error || 'Invalid Student ID or Password',
          icon: 'error',
          allowOutsideClick: false,
        });
      }
    } catch (error) {
      Swal.fire({
        title: 'Error',
        text: 'Something went wrong. Please try again later.',
        icon: 'error',
        allowOutsideClick: false,
      });
    }
  };

  return (
    <LoginContainer>
      <Title>Student Login</Title>
      <Form onSubmit={handleSubmit}>
        <Input
          type="text"
          name="studentId"
          placeholder="Student ID / Reg number"
          value={formData.studentId}
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
      </Form>
    </LoginContainer>
  );
};

export default StudentLogin;

