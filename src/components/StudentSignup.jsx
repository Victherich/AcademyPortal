import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import heroimg from '../images/studentimg2.png';
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';
import axios from 'axios'

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

const Select = styled.select`
  padding: 5px;
  outline: none;
  cursor: pointer;
`;

const StudentSignup = () => {
  const navigate = useNavigate();
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [studentID, setStudentID] = useState('');
  const [password, setPassword] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [dateOfBirth, setDateOfBirth] = useState('');
  const [address, setAddress] = useState('');
  const [parents, setParents] = useState('');
  const [departmentId, setDepartmentId] = useState('');
  const [classId, setClassId] = useState('');
  const [profilePhoto, setProfilePhoto] = useState(null);
  const [confirmPassword, setConfirmPassword]=useState(null);



  const handleFileChange = (event) => {
    const file = event.target.files[0]; // Get the selected file
    const allowedFileTypes = ['image/jpeg', 'image/png', 'image/jpg'];
    const maxFileSize = 10 * 1024 * 1024; // 10MB in bytes
  
    if (file) {
      // Check file type
      if (!allowedFileTypes.includes(file.type)) {
        Swal.fire({
          icon: 'error',
          title: 'Invalid File Type',
          text: 'Only JPEG, JPG, and PNG file types are allowed.',
        });
        event.target.value = ''; // Clear the file input field
        return;
      }
  
      // Check file size
      if (file.size > maxFileSize) {
        Swal.fire({
          icon: 'error',
          title: 'File Too Large',
          text: 'The selected file exceeds the 10MB size limit. Please choose a smaller file.',
        });
        event.target.value = ''; // Clear the file input field
        return;
      }
  
      // If file is valid, set it
      setProfilePhoto(file);
    }
  };
  
  
  const [departments, setDepartments] = useState([]);
  const [classes, setClasses] = useState([]);

  useEffect(() => {
    fetchDepartments();
    fetchClasses();
  }, []);

  const fetchDepartments = async () => {
    try {
      const response = await fetch('https://hotsalesng.com/ephad_api/fetch_departments.php');
      const data = await response.json();
      setDepartments(data.departments || []);
    } catch (error) {
      console.error('Error fetching departments:', error);
    }
  };

  const fetchClasses = async () => {
    try {
      const response = await fetch('https://hotsalesng.com/ephad_api/fetch_classes.php');
      const data = await response.json();
      setClasses(data.classes || []);
    } catch (error) {
      console.error('Error fetching classes:', error);
    }
  };

 


  const handleSubmit = (event) => {
    event.preventDefault();

    if(password!==confirmPassword){
      Swal.fire({text:"Passwords does not match"})
      return;
    }
  
    const formData = new FormData();
    formData.append('firstName', firstName);
    formData.append('lastName', lastName);
    formData.append('studentID', studentID);
    formData.append('password', password);
    formData.append('phoneNumber', phoneNumber);
    formData.append('dateOfBirth', dateOfBirth);
    formData.append('address', address);
    formData.append('parents', parents);
    formData.append('department_id', departmentId);
    formData.append('class_id', classId);
    formData.append('profilePhoto', profilePhoto);
  
    // Show loading state
    Swal.fire({
      title: 'Submitting...',
      text: 'Please wait while we create the student account.',
      allowOutsideClick: false,
      showConfirmButton: false,
      didOpen: () => {
        Swal.showLoading();
      },
    });
  
    fetch('https://hotsalesng.com/ephad_api/student_signup.php', {
      method: 'POST',
      body: formData,
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.success) {
          // Show success message
          Swal.fire({
            title: 'Success!',
            text: 'Student account created successfully!',
            icon: 'success',
            confirmButtonText: 'OK',
          });
          console.log(data)
          
          addStudentToSubject2(data.student_id, data.class_id)
        } else {
          // Show error message from the response
          Swal.fire({
            title: 'Error',
            text: data.error || 'An unknown error occurred.',
            icon: 'error',
            confirmButtonText: 'OK',  
          });
        }
      })
      .catch((error) => {
        console.error('Error:', error);
        // Show generic error message
        Swal.fire({
          title: 'Submission Failed',
          text: 'Something went wrong during submission. Please try again later.',
          icon: 'error',
          confirmButtonText: 'OK',
        });
      });
  };
  












  const addStudentToSubject2 = async (student_id, class_id) => {
      const apiUrl = 'https://hotsalesng.com/ephad_api/insert_student_initail_scores.php';
    
      try {
          const response = await fetch(apiUrl, {
              method: 'POST',
              headers: {
                  'Content-Type': 'application/x-www-form-urlencoded',
              },
              body: new URLSearchParams({
                  student_id: student_id
              })
          });
    
          const result = await response.json();
          if (result.success) {
              console.log('Student added successfully:', result.message);
              updateCurrentSemester();
              updateClassId(student_id, class_id)
              handleUpdatePickupIds();
          } else {
              console.error('Error:', result.error);
          }
      } catch (error) {
          console.error('Request failed:', error);
      }
    }

    
    
      const handleUpdatePickupIds = async () => {
        Swal.fire({text:"Please wait..."})
        Swal.showLoading();
        try {
          const response = await fetch('https://hotsalesng.com/ephad_api/update_pickup_id.php', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
          });
    
          const data = await response.json();
    
          if (response.ok) {
            Swal.fire({text:data.message || 'Pickup IDs updated successfully!',timer:1000});
          } else {
            Swal.fire({text:data.error || 'Failed to update Pickup IDs.'});
          }
        } catch (error) {
          console.error('Error updating Pickup IDs:', error);
          Swal.fire({text:'An error occurred while updating Pickup IDs.'});
        }
      };
    
    
    
    
    // updating subject, assignmnet, exam, test semester
    const updateCurrentSemester = () => {
      Swal.fire({
          title: 'Updating...',
          text: 'Please wait while the current semester ID is being updated.',
          allowOutsideClick: false,
          didOpen: () => {
              Swal.showLoading();
              fetch('https://hotsalesng.com/ephad_api/update_subject_semester.php', {
                  method: 'POST',
                  headers: {
                      'Content-Type': 'application/json'
                  },
                  body: JSON.stringify({})
              })
              .then(response => response.json())
              .then(data => {
                  Swal.close();
                  if (data.success) {
                      Swal.fire({
                          icon: 'success',
                          title: 'Successful',
                          text: data.message,
                          timer:2000
                      });
                  } else {
                      Swal.fire({
                          icon: 'error',
                          title: 'Update Failed',
                          text: data.error
                      });
                  }
              })
              .catch(error => {
                  Swal.close();
                  Swal.fire({
                      icon: 'error',
                      title: 'Error',
                      text: 'An unexpected error occurred: ' + error.message
                  });
              });
          }
      });
    };
    
    

const updateClassId = async (studentId, classId) => {
  if (!studentId || !classId) {
    Swal.fire({
      icon: 'error',
      title: 'Missing Input',
      text: 'Student ID and Class ID are required.',
    });
    return;
  }

  try {
    // Show loading state
    Swal.fire({
      title: 'Processing...',
      text: 'Please wait while we update the Class ID.',
      allowOutsideClick: false,
      didOpen: () => {
        Swal.showLoading();
      },
    });

    // Make API request
    const response = await axios.post('https://hotsalesng.com/ephad_api/class_id_update.php', new URLSearchParams({
      student_id: studentId,
      class_id: classId,
    }),
    {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
    });

    // Check response and show success or failure message
    if (response.data.success) {
      Swal.fire({
        icon: 'success',
        title: 'Success',
        text: response.data.message || 'Class ID updated successfully!',
      });
                    setFirstName('');
                setLastName('');
                setStudentID('');
                setPassword('');
                setPhoneNumber('');
                setDateOfBirth('');
                setAddress('');
                setParents('');
                setDepartmentId('');
                setClassId('');
                setProfilePhoto(null);
                setConfirmPassword('');
    } else {
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: response.data.error || 'An error occurred while updating the Class ID.',
      });
    }
  } catch (error) {
    Swal.fire({
      icon: 'error',
      title: 'Network Error',
      text: error.message || 'Failed to communicate with the server.',
    });
  }
};



  return (
    <SignupContainer>
      <Title>Student Signup</Title>
      <Form onSubmit={handleSubmit}>
      <Input
            type="text"
            placeholder="First Name"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            required
          />
            <Input
            type="text"
            placeholder="Last Name"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            required
          />
          <Input
            type="text"
            placeholder="Enter Student ID / Reg No.:"
            value={studentID}
            onChange={(e) => setStudentID(e.target.value)}
            required
          />
          <Input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <Input
          type="password"
          name="confirmPassword"
          placeholder="Confirm Password"
          value={confirmPassword}
          onChange={(e)=>setConfirmPassword(e.target.value)}
          required
        />
          <Input
            type="text"
            placeholder="Phone Number"
            value={phoneNumber}
            onChange={(e) => setPhoneNumber(e.target.value)}
            required
          />
         
          <Input
            placeholder="Address"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            required
          />
          <Input
            type="text"
            placeholder="Parents"
            value={parents}
            onChange={(e) => setParents(e.target.value)}
            required
          />

        <p style={{fontSize:"small",fontWeight:"bold"}}>Enter date of birth: </p>
        <Input
            type="date"
            placeholder="Date of Birth"
            value={dateOfBirth}
            onChange={(e) => setDateOfBirth(e.target.value)}
            required
          />
  



        <Select
       
          value={departmentId}
          onChange={(e)=>setDepartmentId(e.target.value)}
          required
        >
          <option value="">Select Department</option>
          {departments.map((dept) => (
            <option key={dept.id} value={dept.id}>
              {dept.name}
            </option>
          ))}
        </Select>
        <Select
       
          value={classId}
          onChange={(e)=>setClassId(e.target.value)}
          required
        >
          <option value="">Select Class Level</option>
          {classes
            .sort((a, b) => a.level - b.level)
            .map((cls) => (
              <option key={cls.id} value={cls.id}>
                {cls.level}
              </option>
            ))}
        </Select>
        <label>Upload Profile Photo: (.jpeg, .jpg, .png) (max file size: 10MB)</label>
        <Input
  type="file"
  onChange={handleFileChange}
  required
  accept="image/*"
/>
        
        
        <Button type="submit">Sign Up</Button>
      </Form>
    </SignupContainer>
  );
};

export default StudentSignup;















// import React, { useState, useEffect } from 'react';
// import styled from 'styled-components';
// import heroimg from '../images/studentimg2.png';
// import Swal from 'sweetalert2';
// import { useNavigate } from 'react-router-dom';

// const SignupContainer = styled.div`
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

// const Select = styled.select`
//   padding: 5px;
//   outline: none;
//   cursor: pointer;
// `;

// const StudentSignup = () => {
//   const navigate = useNavigate();
//   const [formData, setFormData] = useState({
//     firstName: '',
//     lastName: '',
//     studentID: '', // New Student ID Field
//     phoneNumber: '',
//     phoneNumber2: '',
//     email: '',
//     password: '',
//     confirmPassword: '',
//     department_id: '',
//     class_id: '',
//     profilePhoto: null,
//     dateOfBirth: '',
//     address: '',
//     parents: '',
//   });

//   const [departments, setDepartments] = useState([]);
//   const [classes, setClasses] = useState([]);

//   useEffect(() => {
//     fetchDepartments();
//     fetchClasses();
//   }, []);

//   const fetchDepartments = async () => {
//     try {
//       const response = await fetch('https://hotsalesng.com/ephad_api/fetch_departments.php');
//       const data = await response.json();
//       setDepartments(data.departments || []);
//     } catch (error) {
//       console.error('Error fetching departments:', error);
//     }
//   };

//   const fetchClasses = async () => {
//     try {
//       const response = await fetch('https://hotsalesng.com/ephad_api/fetch_classes.php');
//       const data = await response.json();
//       setClasses(data.classes || []);
//     } catch (error) {
//       console.error('Error fetching classes:', error);
//     }
//   };

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData({ ...formData, [name]: value });
//   };

//   const handleFileChange = (e) => {
//     const file = e.target.files[0];
//     const allowedFileTypes = ['image/jpeg', 'image/png', 'image/jpg'];
//     const maxFileSize = 10 * 1024 * 1024; // 10MB

//     if (!file) return;

//     if (!allowedFileTypes.includes(file.type)) {
//       Swal.fire('Invalid File', 'Only JPEG, PNG, and JPG file types are allowed.', 'error');
//       return;
//     }

//     if (file.size > maxFileSize) {
//       Swal.fire('File Too Large', 'File size should not exceed 10MB.', 'error');
//       return;
//     }

//     setFormData({ ...formData, profilePhoto: file });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     if (formData.password !== formData.confirmPassword) {
//       Swal.fire('Password Mismatch', 'Passwords do not match!', 'error');
//       return;
//     }

//     const formDataObj = new FormData();
//     for (const key in formData) {
//       formDataObj.append(key, formData[key]);
//     }

//     Swal.fire({
//       title: 'Submitting...',
//       text: 'Please wait while your information is being processed.',
//       allowOutsideClick: false,
//       didOpen: () => Swal.showLoading(),
//     });

//     try {
//       const response = await fetch('https://hotsalesng.com/ephad_api/student_signup.php', {
//         method: 'POST',
//         body: formDataObj,
//       });

//       const result = await response.json();
//       Swal.close();

//       if (result.success) {
//         Swal.fire({ title: 'Success', text: result.message || 'Signup successful!', icon: 'success', allowOutsideClick: false });
//         navigate('/studentlogin');
//       } else {
//         Swal.fire({ text: result.error || 'Signup failed.', allowOutsideClick: false });
//       }
//     } catch (error) {
//       console.error(error)
//       Swal.close();
//       Swal.fire({ text: 'An unexpected error occurred. Please try again.', icon: 'error', allowOutsideClick: false });
//     }
//   };

//   return (
//     <SignupContainer>
//       <Title>Student Signup</Title>
//       <Form onSubmit={handleSubmit}>
//         <Input
//           type="text"
//           name="firstName"
//           placeholder="First Name"
//           value={formData.firstName}
//           onChange={handleChange}
//           required
//         />
//         <Input
//           type="text"
//           name="lastName"
//           placeholder="Last Name"
//           value={formData.lastName}
//           onChange={handleChange}
//           required
//         />
//         <Input
//           type="text"
//           name="studentID"
//           placeholder="Student ID"
//           value={formData.studentID}
//           onChange={handleChange}
//           required
//         />
//         <Input
//           type="text"
//           name="parents"
//           placeholder="Parent/Guardian Name"
//           value={formData.parents}
//           onChange={handleChange}
//           required
//         />
//         <Input
//           type="date"
//           name="dateOfBirth"
//           value={formData.dateOfBirth}
//           onChange={handleChange}
//           required
//         />
//         <Input
//           type="text"
//           name="address"
//           placeholder="Address"
//           value={formData.address}
//           onChange={handleChange}
//           required
//         />
//         <Input
//           type="text"
//           name="phoneNumber"
//           placeholder="Phone Number"
//           value={formData.phoneNumber}
//           onChange={handleChange}
//           required
//         />
//         <Input
//           type="text"
//           name="phoneNumber2"
//           placeholder="Second Phone Number (Optional)"
//           value={formData.phoneNumber2}
//           onChange={handleChange}
//         />
//         <Input
//           type="email"
//           name="email"
//           placeholder="Email"
//           value={formData.email}
//           onChange={handleChange}
//           required
//         />
//         <Select
//           name="department_id"
//           value={formData.department_id}
//           onChange={handleChange}
//           required
//         >
//           <option value="">Select Department</option>
//           {departments.map((dept) => (
//             <option key={dept.id} value={dept.id}>
//               {dept.name}
//             </option>
//           ))}
//         </Select>
//         <Select
//           name="class_id"
//           value={formData.class_id}
//           onChange={handleChange}
//           required
//         >
//           <option value="">Select Class Level</option>
//           {classes
//             .sort((a, b) => a.level - b.level)
//             .map((cls) => (
//               <option key={cls.id} value={cls.id}>
//                 {cls.level}
//               </option>
//             ))}
//         </Select>
//         <label>Upload Profile Photo: (.jpeg, .jpg, .png) (max file size: 10MB)</label>
//         <Input
//           type="file"
//           name="profilePhoto"
//           accept="image/png, image/jpeg, image/jpg"
//           onChange={handleFileChange}
//         />
//         <Input
//           type="password"
//           name="password"
//           placeholder="Password"
//           value={formData.password}
//           onChange={handleChange}
//           required
//         />
//         <Input
//           type="password"
//           name="confirmPassword"
//           placeholder="Confirm Password"
//           value={formData.confirmPassword}
//           onChange={handleChange}
//           required
//         />
//         <Button type="submit">Sign Up</Button>
//       </Form>
//     </SignupContainer>
//   );
// };

// export default StudentSignup;





// import React, { useState, useEffect } from 'react';
// import styled from 'styled-components';
// import heroimg from '../images/studentimg2.png';
// import Swal from 'sweetalert2';
// import { useNavigate } from 'react-router-dom';

// const SignupContainer = styled.div`
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

// const Select = styled.select`
//   padding: 5px;
//   outline: none;
//   cursor: pointer;
// `;

// const StudentSignup = () => {
//   const navigate = useNavigate();
//   const [formData, setFormData] = useState({
//     firstName: '',
//     lastName: '',
//     studentID: '', // Student ID Field
//     phoneNumber: '',
//     phoneNumber2: '',
//     password: '',
//     confirmPassword: '',
//     department_id: '',
//     class_id: '',
//     profilePhoto: null,
//     dateOfBirth: '',
//     address: '',
//     parents: '',
//   });

//   const [departments, setDepartments] = useState([]);
//   const [classes, setClasses] = useState([]);

//   useEffect(() => {
//     fetchDepartments();
//     fetchClasses();
//   }, []);

//   const fetchDepartments = async () => {
//     try {
//       const response = await fetch('https://hotsalesng.com/ephad_api/fetch_departments.php');
//       const data = await response.json();
//       setDepartments(data.departments || []);
//     } catch (error) {
//       console.error('Error fetching departments:', error);
//     }
//   };

//   const fetchClasses = async () => {
//     try {
//       const response = await fetch('https://hotsalesng.com/ephad_api/fetch_classes.php');
//       const data = await response.json();
//       setClasses(data.classes || []);
//     } catch (error) {
//       console.error('Error fetching classes:', error);
//     }
//   };

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData({ ...formData, [name]: value });
//   };

//   // const handleFileChange = (e) => {
//   //   const file = e.target.files[0];
//   //   const allowedFileTypes = ['image/jpeg', 'image/png', 'image/jpg'];
//   //   const maxFileSize = 10 * 1024 * 1024; // 10MB

//   //   if (!file) return;

//   //   if (!allowedFileTypes.includes(file.type)) {
//   //     Swal.fire('Invalid File', 'Only JPEG, PNG, and JPG file types are allowed.', 'error');
//   //     return;
//   //   }

//   //   if (file.size > maxFileSize) {
//   //     Swal.fire('File Too Large', 'File size should not exceed 10MB.', 'error');
//   //     return;
//   //   }

//   //   setFormData({ ...formData, profilePhoto: file });
//   // };

//   const handleFileChange = (e) => {
//     const file = e.target.files[0];
//     const allowedFileTypes = ['image/jpeg', 'image/png', 'image/jpg'];
//     const maxFileSize = 10 * 1024 * 1024; // 10MB
  
//     if (!file) return;
  
//     if (!allowedFileTypes.includes(file.type)) {
//       Swal.fire('Invalid File', 'Only JPEG, PNG, and JPG file types are allowed.', 'error');
//       e.target.value = ''; // Clear the input field
//       return;
//     }
  
//     if (file.size > maxFileSize) {
//       Swal.fire('File Too Large', 'File size should not exceed 10MB.', 'error');
//       e.target.value = ''; // Clear the input field
//       return;
//     }
  
//     // Update form data with the file
//     setFormData((prevData) => ({ ...prevData, profilePhoto: file }));
  
//     // Optionally, reset the file input for further uploads if necessary
//     // e.target.value = '';

//     // setFileName(file.name);
//   };
  


//   console.log(formData)

//   // const handleSubmit = async (e) => {
//   //   e.preventDefault();

//   //   if (formData.password !== formData.confirmPassword) {
//   //     Swal.fire('Password Mismatch', 'Passwords do not match!', 'error');
//   //     return;
//   //   }

//   //   const formDataObj = new FormData();
//   //   for (const key in formData) {
//   //     formDataObj.append(key, formData[key]);
//   //   }

//   //   Swal.fire({
//   //     title: 'Submitting...',
//   //     text: 'Please wait while your information is being processed.',
//   //     allowOutsideClick: false,
//   //     didOpen: () => Swal.showLoading(),
//   //   });

//   //   try {
//   //     const response = await fetch('https://hotsalesng.com/ephad_api/student_signup.php', {
//   //       method: 'POST',
//   //       body: formDataObj,
//   //     });

//   //     const result = await response.json();
//   //     Swal.close();
//   //     console.log(result)

//   //     if (result.success) {
//   //       Swal.fire({ title: 'Success', text: result.message || 'Student Signup successful!', icon: 'success', allowOutsideClick: false });
//   //       // navigate('/studentlogin');
//   //       addStudentToSubject2(result.primary_id, result.class_id)

//   //     } else {
//   //       Swal.fire({ text: result.error || 'Signup failed.', allowOutsideClick: false });
//   //     }
//   //   } catch (error) {
//   //     console.error(error);
//   //     Swal.close();
//   //     Swal.fire({ text: 'An unexpected error occurred. Please try again.', icon: 'error', allowOutsideClick: false });
//   //   }
//   // };





//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     if (formData.password !== formData.confirmPassword) {
//       Swal.fire('Password Mismatch', 'Passwords do not match!', 'error');
//       return;
//     }

//     const formDataObj = new FormData();
//     for (const key in formData) {
//       formDataObj.append(key, formData[key]);
//     }

//     Swal.fire({
//       title: 'Submitting...',
//       text: 'Please wait while your information is being processed.',
//       allowOutsideClick: false,
//       didOpen: () => Swal.showLoading(),
//     });

//     try {
//       const response = await fetch('https://hotsalesng.com/ephad_api/student_signup.php', {
//         method: 'POST',
//         body: formDataObj,
//       });

//       const result = await response.json();
//       Swal.close();
//       console.log(result)

//       if (result.success) {
//         Swal.fire({ title: 'Success', text: result.message || 'Student Signup successful!', icon: 'success', allowOutsideClick: false });
//         // You can redirect to another page or clear form after success
//         // navigate('/studentlogin');
//       } else {
//         Swal.fire({ text: result.error || 'Signup failed.', allowOutsideClick: false });
//       }
//     } catch (error) {
//       console.error(error);
//       Swal.close();
//       Swal.fire({ text: 'An unexpected error occurred. Please try again.', icon: 'error', allowOutsideClick: false });
//     }
// };







// // addStudentToSubject2(1)

// const addStudentToSubject2 = async (primary_id, class_id) => {
//   const apiUrl = 'https://hotsalesng.com/ephad_api/insert_student_initail_scores.php';

//   try {
//       const response = await fetch(apiUrl, {
//           method: 'POST',
//           headers: {
//               'Content-Type': 'application/x-www-form-urlencoded',
//           },
//           body: new URLSearchParams({
//               student_id: primary_id
//           })
//       });

//       const result = await response.json();
//       if (result.success) {
//           console.log('Student added successfully:', result.message);
//           updateCurrentSemester();
//           updateClassIdOnSubjects(primary_id, class_id)
//       } else {
//           console.error('Error:', result.error);
//       }
//   } catch (error) {
//       console.error('Request failed:', error);
//   }
// }



// // updating subject, assignmnet, exam, test semester
// const updateCurrentSemester = () => {
//   Swal.fire({
//       title: 'Updating...',
//       text: 'Please wait while the current semester ID is being updated.',
//       allowOutsideClick: false,
//       didOpen: () => {
//           Swal.showLoading();
//           fetch('https://hotsalesng.com/ephad_api/update_subject_semester.php', {
//               method: 'POST',
//               headers: {
//                   'Content-Type': 'application/json'
//               },
//               body: JSON.stringify({})
//           })
//           .then(response => response.json())
//           .then(data => {
//               Swal.close();
//               if (data.success) {
//                   Swal.fire({
//                       icon: 'success',
//                       title: 'Update Successful',
//                       text: data.message
//                   });
//               } else {
//                   Swal.fire({
//                       icon: 'error',
//                       title: 'Update Failed',
//                       text: data.error
//                   });
//               }
//           })
//           .catch(error => {
//               Swal.close();
//               Swal.fire({
//                   icon: 'error',
//                   title: 'Error',
//                   text: 'An unexpected error occurred: ' + error.message
//               });
//           });
//       }
//   });
// };




// const updateClassIdOnSubjects = (primary_id, class_id) => {
//   Swal.fire({
//     title: 'Updating...',
//     text: 'Please wait while the class ID is being updated.',
//     allowOutsideClick: false,
//     didOpen: () => {
//       Swal.showLoading();

//       // Send POST request with primary_id and class_id to the PHP script
//       fetch('https://hotsalesng.com/ephad_api/update_subject_class_id _for_student.php', {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/x-www-form-urlencoded',
//         },
//         body: `primary_id=${primary_id}&class_id=${class_id}`,
//       })
//         .then((response) => response.json())
//         .then((data) => {
//           Swal.close();
//           if (data.success) {
//             Swal.fire({
//               icon: 'success',
//               title: 'Successful',
//               text: data.message,
//             });

//             setFormData({
//               firstName: '',
//               lastName: '',
//               studentID: '', // Student ID Field
//               phoneNumber: '',
//               phoneNumber2: '',
//               password: '',
//               confirmPassword: '',
//               department_id: '',
//               class_id: '',
//               profilePhoto: null,
//               dateOfBirth: '',
//               address: '',
//               parents: '',
//             });

//           } else {
//             Swal.fire({
//               icon: 'error',
//               title: 'Update Failed',
//               text: data.error || 'Something went wrong.',
//             });
//           }
//         })
//         .catch((error) => {
//           Swal.close();
//           Swal.fire({
//             icon: 'error',
//             title: 'Error',
//             text: `An unexpected error occurred: ${error.message}`,
//           });
//         });
//     },
//   });
// };






//   return (
//     <SignupContainer>
//       <Title>Student Registration</Title>
//       <Form onSubmit={handleSubmit}>
//         <Input
//           type="text"
//           name="firstName"
//           placeholder="First Name"
//           value={formData.firstName}
//           onChange={handleChange}
//           required
//         />
//         <Input
//           type="text"
//           name="lastName"
//           placeholder="Last Name"
//           value={formData.lastName}
//           onChange={handleChange}
//           required
//         />
//         <Input
//           type="text"
//           name="studentID"
//           placeholder="Enter Student ID / REG NUMBER"
//           value={formData.studentID}
//           onChange={handleChange}
//           required
//         />
//         <Input
//           type="text"
//           name="parents"
//           placeholder="Parent/Guardian Name"
//           value={formData.parents}
//           onChange={handleChange}
//           required
//         />
//         <p style={{fontWeight:"500"}}>Select student date of birth below:</p>
//         <Input
//           type="date"
//           name="dateOfBirth"
//           value={formData.dateOfBirth}
//           onChange={handleChange}
//           required
//         />
//         <Input
//           type="text"
//           name="address"
//           placeholder="Address"
//           value={formData.address}
//           onChange={handleChange}
//           required
//         />
//         <Input
//           type="text"
//           name="phoneNumber"
//           placeholder="Phone Number"
//           value={formData.phoneNumber}
//           onChange={handleChange}
//           required
//         />
//         <Input
//           type="text"
//           name="phoneNumber2"
//           placeholder="Second Phone Number (Optional)"
//           value={formData.phoneNumber2}
//           onChange={handleChange}
//         />
//         <Select
//           name="department_id"
//           value={formData.department_id}
//           onChange={handleChange}
//           required
//         >
//           <option value="">Select Department</option>
//           {departments.map((dept) => (
//             <option key={dept.id} value={dept.id}>
//               {dept.name}
//             </option>
//           ))}
//         </Select>
//         <Select
//           name="class_id"
//           value={formData.class_id}
//           onChange={handleChange}
//           required
//         >
//           <option value="">Select Class Level</option>
//           {classes
//             .sort((a, b) => a.level - b.level)
//             .map((cls) => (
//               <option key={cls.id} value={cls.id}>
//                 {cls.level}
//               </option>
//             ))}
//         </Select>
//         <label>Upload Profile Photo: (.jpeg, .jpg, .png) (max file size: 10MB)</label>
//         <Input
//           type="file"
//           name="profilePhoto"
//           accept="image/png, image/jpeg"
//           onChange={handleFileChange}
//           // value={formData?.profilePhoto[0]?.name}
//         />
//         <Input
//           type="password"
//           name="password"
//           placeholder="Password"
//           value={formData.password}
//           onChange={handleChange}
//           required
//         />
//         <Input
//           type="password"
//           name="confirmPassword"
//           placeholder="Confirm Password"
//           value={formData.confirmPassword}
//           onChange={handleChange}
//           required
//         />
//         <Button type="submit">Sign Up</Button>
//       </Form>
//     </SignupContainer>
//   );
// };

// export default StudentSignup;







// import React, { useState, useEffect } from 'react';
// import styled from 'styled-components';


// function StudentSignup() {
//   const [firstName, setFirstName] = useState('');
//   const [lastName, setLastName] = useState('');
//   const [studentID, setStudentID] = useState('');
//   const [password, setPassword] = useState('');
//   const [phoneNumber, setPhoneNumber] = useState('');
//   const [dateOfBirth, setDateOfBirth] = useState('');
//   const [address, setAddress] = useState('');
//   const [parents, setParents] = useState('');
//   const [departmentId, setDepartmentId] = useState('');
//   const [classId, setClassId] = useState('');
//   const [profilePhoto, setProfilePhoto] = useState(null);

//   const handleFileChange = (event) => {
//     setProfilePhoto(event.target.files[0]);
//   };


//     const [departments, setDepartments] = useState([]);
//   const [classes, setClasses] = useState([]);

//   useEffect(() => {
//     fetchDepartments();
//     fetchClasses();
//   }, []);

//   const fetchDepartments = async () => {
//     try {
//       const response = await fetch('https://hotsalesng.com/ephad_api/fetch_departments.php');
//       const data = await response.json();
//       setDepartments(data.departments || []);
//     } catch (error) {
//       console.error('Error fetching departments:', error);
//     }
//   };

//   const fetchClasses = async () => {
//     try {
//       const response = await fetch('https://hotsalesng.com/ephad_api/fetch_classes.php');
//       const data = await response.json();
//       setClasses(data.classes || []);
//     } catch (error) {
//       console.error('Error fetching classes:', error);
//     }
//   };


//   const handleSubmit = (event) => {
//     event.preventDefault();

//     const formData = new FormData();
//     formData.append('firstName', firstName);
//     formData.append('lastName', lastName);
//     formData.append('studentID', studentID);
//     formData.append('password', password);
//     formData.append('phoneNumber', phoneNumber);
//     formData.append('dateOfBirth', dateOfBirth);
//     formData.append('address', address);
//     formData.append('parents', parents);
//     formData.append('department_id', departmentId);
//     formData.append('class_id', classId);
//     formData.append('profilePhoto', profilePhoto);

//     fetch('https://hotsalesng.com/ephad_api/student_signup.php', {
//       method: 'POST',
//       body: formData,
//     })
//       .then((response) => response.json())
//       .then((data) => {
//         if (data.success) {
//           alert('Student account created successfully!');
//         } else {
//           alert('Error: ' + data.error);
//         }
//       })
//       .catch((error) => {
//         console.error('Error:', error);
//         alert('Error during submission');
//       });
//   };

//   return (
//     <Container>
//       <FormWrapper>
//         <FormTitle>Create Student Account</FormTitle>
//         <Form onSubmit={handleSubmit}>
//           <InputField
//             type="text"
//             placeholder="First Name"
//             value={firstName}
//             onChange={(e) => setFirstName(e.target.value)}
//             required
//           />
//           <InputField
//             type="text"
//             placeholder="Last Name"
//             value={lastName}
//             onChange={(e) => setLastName(e.target.value)}
//             required
//           />
//           <InputField
//             type="text"
//             placeholder="Student ID"
//             value={studentID}
//             onChange={(e) => setStudentID(e.target.value)}
//             required
//           />
//           <InputField
//             type="password"
//             placeholder="Password"
//             value={password}
//             onChange={(e) => setPassword(e.target.value)}
//             required
//           />
//           <InputField
//             type="text"
//             placeholder="Phone Number"
//             value={phoneNumber}
//             onChange={(e) => setPhoneNumber(e.target.value)}
//             required
//           />
//           <InputField
//             type="date"
//             placeholder="Date of Birth"
//             value={dateOfBirth}
//             onChange={(e) => setDateOfBirth(e.target.value)}
//             required
//           />
//           <TextArea
//             placeholder="Address"
//             value={address}
//             onChange={(e) => setAddress(e.target.value)}
//             required
//           />
//           <InputField
//             type="text"
//             placeholder="Parents"
//             value={parents}
//             onChange={(e) => setParents(e.target.value)}
//             required
//           />

// {/*           
// <Select
//           name="department_id"
//           value={formData.department_id}
//           onChange={(e)=>setDepartmentId(e.target.value)}
//           required
//         >
//           <option value="">Select Department</option>
//           {departments.map((dept) => (
//             <option key={dept.id} value={dept.id}>
//               {dept.name}
//             </option>
//           ))}
//         </Select>
//         <Select
//           name="class_id"
//           value={formData.class_id}
//           onChange={(e)=>setClassId(e.target.value)}
//           required
//         >
//           <option value="">Select Class Level</option>
//           {classes
//             .sort((a, b) => a.level - b.level)
//             .map((cls) => (
//               <option key={cls.id} value={cls.id}>
//                 {cls.level}
//               </option>
//             ))}
//         </Select> */}
//         {/* <label>Upload Profile Photo: (.jpeg, .jpg, .png) (max file size: 10MB)</label>
//         <Input
//           type="file"
//           name="profilePhoto"
//           accept="image/png, image/jpeg, image/jpg"
//           onChange={handleFileChange}
//         /> */}

//           <FileInput
//             type="file"
//             onChange={handleFileChange}
//             required
//           />
//           <SubmitButton type="submit">Submit</SubmitButton>
//         </Form>
//       </FormWrapper>
//     </Container>
//   );
// }

// export default StudentSignup;

// // Styled Components

// const Container = styled.div`
//   display: flex;
//   justify-content: center;
//   align-items: center;
//   min-height: 100vh;
//   background-color: #f4f4f4;
// `;

// const FormWrapper = styled.div`
//   background: #fff;
//   padding: 40px;
//   border-radius: 8px;
//   box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
//   width: 100%;
//   max-width: 500px;
// `;

// const FormTitle = styled.h2`
//   font-size: 2rem;
//   text-align: center;
//   margin-bottom: 20px;
//   color: #333;
// `;

// const Form = styled.form`
//   display: flex;
//   flex-direction: column;
// `;

// const InputField = styled.input`
//   padding: 12px 15px;
//   margin: 10px 0;
//   border: 1px solid #ccc;
//   border-radius: 5px;
//   font-size: 1rem;
//   outline: none;
//   transition: border 0.3s;
  
//   &:focus {
//     border-color: #007bff;
//   }
// `;

// const TextArea = styled.textarea`
//   padding: 12px 15px;
//   margin: 10px 0;
//   border: 1px solid #ccc;
//   border-radius: 5px;
//   font-size: 1rem;
//   outline: none;
//   transition: border 0.3s;
//   min-height: 100px;

//   &:focus {
//     border-color: #007bff;
//   }
// `;

// const FileInput = styled.input`
//   padding: 12px 15px;
//   margin: 10px 0;
//   border: 1px solid #ccc;
//   border-radius: 5px;
//   font-size: 1rem;
// `;

// const SubmitButton = styled.button`
//   background-color: #007bff;
//   color: white;
//   padding: 12px;
//   margin-top: 20px;
//   border: none;
//   border-radius: 5px;
//   font-size: 1.1rem;
//   cursor: pointer;
//   transition: background-color 0.3s;

//   &:hover {
//     background-color: #0056b3;
//   }
// `;






