

import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import heroimg from '../images/studentimg2.png';
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';

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
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    phoneNumber: '',
    email: '',
    password: '',
    confirmPassword: '',
    department_id: '',
    class_id: '',
    profilePhoto: null,
  });

  const [departments, setDepartments] = useState([]);
  const [classes, setClasses] = useState([]);

  useEffect(() => {
    fetchDepartments();
    fetchClasses();
  }, []);

  const fetchDepartments = async () => {
    try {
      const response = await fetch('https://ephadacademyportal.com.ng/ephad_api/fetch_departments.php');
      const data = await response.json();
      setDepartments(data.departments || []);
    } catch (error) {
      console.error('Error fetching departments:', error);
    }
  };

  const fetchClasses = async () => {
    try {
      const response = await fetch('https://ephadacademyportal.com.ng/ephad_api/fetch_classes.php');
      const data = await response.json();
      setClasses(data.classes || []);
    } catch (error) {
      console.error('Error fetching classes:', error);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    const allowedFileTypes = ['image/jpeg', 'image/png', 'image/jpg'];
    const maxFileSize = 10 * 1024 * 1024; // 10MB

    if (!file) return;

    if (!allowedFileTypes.includes(file.type)) {
      Swal.fire('Invalid File', 'Only JPEG, PNG, and JPG file types are allowed.', 'error');
      return;
    }

    if (file.size > maxFileSize) {
      Swal.fire('File Too Large', 'File size should not exceed 10MB.', 'error');
      return;
    }

    setFormData({ ...formData, profilePhoto: file });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (formData.password !== formData.confirmPassword) {
      Swal.fire('Password Mismatch', 'Passwords do not match!', 'error');
      return;
    }

    const formDataObj = new FormData();
    formDataObj.append('firstName', formData.firstName);
    formDataObj.append('lastName', formData.lastName);
    formDataObj.append('phoneNumber', formData.phoneNumber);
    formDataObj.append('email', formData.email);
    formDataObj.append('password', formData.password);
    formDataObj.append('department_id', formData.department_id);
    formDataObj.append('class_id', formData.class_id);
    if (formData.profilePhoto) {
      formDataObj.append('profilePhoto', formData.profilePhoto);
    }

    Swal.fire({
      title: 'Submitting...',
      text: 'Please wait while your information is being processed.',
      allowOutsideClick: false,
      didOpen: () => Swal.showLoading(),
    });

    try {
      const response = await fetch('https://ephadacademyportal.com.ng/ephad_api/student_signup.php', {
        method: 'POST',
        body: formDataObj,
      });

      const result = await response.json();
      Swal.close();

      if (result.success) {
        Swal.fire({title:'Success', text:result.message || 'Signup successful!', icon:'success',allowOutsideClick:false});
        navigate('/studentlogin');
      } else {
        Swal.fire({text: result.error || 'Signup failed.', allowOutsideClick:false});
      }
    } catch (error) {
      Swal.close();
      Swal.fire({text: 'An unexpected error occurred. Please try again.', icon:'error',allowOutsideClick:false});
    }
  };

  return (
    <SignupContainer>
      <Title>Student Signup</Title>
      <Form onSubmit={handleSubmit}>
        <Input
          type="text"
          name="firstName"
          placeholder="First Name"
          value={formData.firstName}
          onChange={handleChange}
          required
        />
        <Input
          type="text"
          name="lastName"
          placeholder="Last Name"
          value={formData.lastName}
          onChange={handleChange}
          required
        />
        <Input
          type="text"
          name="phoneNumber"
          placeholder="Phone Number"
          value={formData.phoneNumber}
          onChange={handleChange}
          required
        />
        <Input
          type="email"
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
          required
        />
        <Select
          name="department_id"
          value={formData.department_id}
          onChange={handleChange}
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
          name="class_id"
          value={formData.class_id}
          onChange={handleChange}
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
          name="profilePhoto"
          accept="image/png, image/jpeg, image/jpg"
          onChange={handleFileChange}
        />
        <Input
          type="password"
          name="password"
          placeholder="Password"
          value={formData.password}
          onChange={handleChange}
          required
        />
        <Input
          type="password"
          name="confirmPassword"
          placeholder="Confirm Password"
          value={formData.confirmPassword}
          onChange={handleChange}
          required
        />
        <Button type="submit">Sign Up</Button>
      </Form>
    </SignupContainer>
  );
};

export default StudentSignup;









// sign up backend

// <?php
// header('Access-Control-Allow-Origin: *');
// header('Content-Type: application/json');
// header('Access-Control-Allow-Methods: POST, OPTIONS');
// header('Access-Control-Allow-Headers: Content-Type');
// header('Cache-Control: no-store, no-cache, must-revalidate, max-age=0');
// header('Expires: Thu, 01 Jan 1970 00:00:00 GMT');
// header('Pragma: no-cache');

// include 'config.php'; // Database connection

// if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
//     http_response_code(200);
//     exit();
// }

// if ($_SERVER['REQUEST_METHOD'] === 'POST') {
//     $newFileName = null;

//     // Handle profile photo upload
//     if (isset($_FILES['profilePhoto']) && $_FILES['profilePhoto']['error'] === UPLOAD_ERR_OK) {
//         $fileTmpPath = $_FILES['profilePhoto']['tmp_name'];
//         $fileName = basename($_FILES['profilePhoto']['name']);
//         $fileSize = $_FILES['profilePhoto']['size'];
//         $fileType = mime_content_type($fileTmpPath);

//         // Allowed file types and max size
//         $allowedFileTypes = ['image/jpeg', 'image/png', 'image/jpg'];
//         $maxFileSize = 10 * 1024 * 1024; // 10MB

//         // Validate file type
//         if (!in_array($fileType, $allowedFileTypes)) {
//             echo json_encode(['success' => false, 'error' => 'Invalid file type. Only JPEG, PNG, and JPG are allowed.']);
//             exit();
//         }

//         // Validate file size
//         if ($fileSize > $maxFileSize) {
//             echo json_encode(['success' => false, 'error' => 'File size should not exceed 10MB.']);
//             exit();
//         }

//         // Upload directory
//         $uploadFolder = './uploads/student_profile_photos/';
//         if (!is_dir($uploadFolder)) {
//             mkdir($uploadFolder, 0777, true); // Create the directory if it does not exist
//         }

//         // Sanitize and generate unique file name
//         $fileExtension = pathinfo($fileName, PATHINFO_EXTENSION);
//         $newFileName = uniqid('student_', true) . '.' . $fileExtension;
//         $destPath = $uploadFolder . $newFileName;

//         // Move uploaded file
//         if (!move_uploaded_file($fileTmpPath, $destPath)) {
//             echo json_encode(['success' => false, 'error' => 'Error uploading profile photo.']);
//             exit();
//         }
//     }

//     // Collect and sanitize form data
//     $firstName = trim($_POST['firstName'] ?? '');
//     $lastName = trim($_POST['lastName'] ?? '');
//     $phoneNumber = trim($_POST['phoneNumber'] ?? '');
//     $phoneNumber2 = trim($_POST['phoneNumber2'] ?? '');
//     $email = trim($_POST['email'] ?? '');
//     $password = $_POST['password'] ?? '';
//     $studentID = trim($_POST['studentID'] ?? ''); // Accepting student ID from the front end
//     $departmentId = intval($_POST['department_id'] ?? 0);
//     $classId = intval($_POST['class_id'] ?? 0);
//     $dateOfBirth = $_POST['dateOfBirth'] ?? '';
//     $address = trim($_POST['address'] ?? '');
//     $parents = trim($_POST['parents'] ?? '');

//     // Validate required fields
//     if (empty($firstName) || empty($lastName) || empty($phoneNumber) || empty($email) || empty($password) || empty($studentID) || empty($dateOfBirth) || empty($address) || empty($parents)) {
//         echo json_encode(['success' => false, 'error' => 'All fields are required.']);
//         exit();
//     }

//     // Validate phone number format (basic validation)
//     if (!preg_match('/^\+?[0-9]{10,15}$/', $phoneNumber)) {
//         echo json_encode(['success' => false, 'error' => 'Invalid phone number format.']);
//         exit();
//     }

//     // Validate email format
//     if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
//         echo json_encode(['success' => false, 'error' => 'Invalid email format.']);
//         exit();
//     }

//     // Check if email already exists
//     $checkStmt = $conn->prepare("SELECT id FROM students WHERE email = ?");
//     $checkStmt->bind_param("s", $email);
//     $checkStmt->execute();
//     $checkStmt->store_result();

//     if ($checkStmt->num_rows > 0) {
//         echo json_encode(['success' => false, 'error' => 'Email already exists. Please use a different email.']);
//         $checkStmt->close();
//         $conn->close();
//         exit();
//     }
//     $checkStmt->close();

//     // Insert the data into the database
//     $stmt = $conn->prepare("INSERT INTO students (first_name, last_name, phone_number, phone_number2, email, password, department_id, class_id, profile_photo, student_id, date_of_birth, address, parents) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)");
//     $passwordHash = password_hash($password, PASSWORD_BCRYPT); // Hash password
//     $stmt->bind_param("ssssssissssss", $firstName, $lastName, $phoneNumber, $phoneNumber2, $email, $passwordHash, $departmentId, $classId, $newFileName, $studentID, $dateOfBirth, $address, $parents);

//     if ($stmt->execute()) {
//         echo json_encode(['success' => true, 'message' => 'Signup successful!']);
//     } else {
//         echo json_encode(['success' => false, 'error' => 'Error occurred while saving data.']);
//     }

//     // Close statement and database connection
//     $stmt->close();
//     $conn->close();
// }
// ?>







// import React, { useEffect, useState } from 'react';
// import Swal from 'sweetalert2';
// import styled from 'styled-components';

// // Styled Components
// const Container = styled.div`
//   max-width: 800px;
//   margin: 20px auto;
//   padding: 15px;
//   background-color:pink;
//   border-radius: 10px;
//   box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
//   position:fixed;
//   width:100%;
//   height:100%;
//   top:50%;
//   left:50%;
//   transform: translate(-50%, -50%);
  

//   /* Responsive Design */
//   @media (max-width: 768px) {
//     max-width: 100%;
//     padding: 15px;
//   }
// `;

// const Title = styled.h1`
//   font-size: 1.5rem;
//   text-align: center;
//   color: rgb(128, 0, 128);

//   /* Responsive Design */
//   @media (max-width: 768px) {
//     font-size: 1.5rem;
//   }
// `;

// const Button = styled.button`
//   display: inline-block;
//   padding: 12px 20px;
//   font-size: 1rem;
//   background-color: #007bff;
//   color: white;
//   border: none;
//   border-radius: 5px;
//   cursor: pointer;
//   transition: background-color 0.3s ease;

//   &:hover {
//     background-color: #0056b3;
//   }

//   &:disabled {
//     background-color: #cccccc;
//     cursor: not-allowed;
//   }

//   /* Responsive Design */
//   @media (max-width: 768px) {
//     padding: 10px 15px;
//     font-size: 0.9rem;
//   }
// `;

// const DataContainer = styled.div`
//   // margin-top: 20px;
//   height:100%;
//   // overflow-y:scroll;

//   /* Responsive Design */
//   @media (max-width: 768px) {
//     margin-top: 15px;
//   }
// `;

// const TableTitle = styled.h3`
//   font-size: 1rem;
//   margin-bottom: 10px;
  
//   color:rgb(128, 0, 128); ;

//   /* Responsive Design */
//   @media (max-width: 768px) {
//     font-size: 1.2rem;
//   }
// `;

// const PreformattedText = styled.pre`
//   // background-color: #f1f1f1;
//   padding: 15px;
//   border-radius: 5px;
//   font-size: 1rem;
//   height:100%;
//   // white-space: pre-wrap;
//   // word-wrap: break-word;

//   /* Responsive Design */
//   @media (max-width: 768px) {
//     font-size: 0.9rem;
//     padding: 10px;
//   }
// `;

// const Button2 = styled.button`

//   padding: 2px;
//   font-size: small;
//   background-color:rgb(128, 0, 128);
//   color: white;
//   border: none;
//   border-radius: 5px;
//   cursor: pointer;
//   transition: background-color 0.3s ease;
 

//   &:hover {
//     background-color: #0056b3;
//   }
// `

// const StudentScoreSheet = ({studentID, setShowScoreSheet}) => {
//   const [studentData, setStudentData] = useState(null);
//   const [loading, setLoading] = useState(false);

//   console.log(studentID)


//   useEffect(()=>{
//     fetchScoreSheet(studentID)
//   },[])

//   const fetchScoreSheet = async (studentID) => {
//     setLoading(true);
//     Swal.fire({
//       title: 'Loading...',
//       html: 'Fetching data, please wait...',
//       allowOutsideClick: false,
//       didOpen: () => {
//         Swal.showLoading();
//       },
//     });

//     try {
//       const response = await fetch(`https://ephadacademyportal.com.ng/ephad_api/get_student_score_sheet.php?student_id=${studentID}`, {
//         method: 'GET',
//         headers: {
//           'Cache-Control': 'no-store, no-cache, must-revalidate, max-age=0', // Ensure the cache headers
//           // 'Pragma': 'no-cache', // You may remove this line if not necessary
//         },
//       });

//       const result = await response.json();
//       setLoading(false);

//       if (result.success) {
//         Swal.close();
//         setStudentData(result.data);
//         // Swal.fire('Success', 'Student data fetched successfully.', 'success');
//       } else {
//         Swal.fire('Error', result.error || 'Failed to fetch data.', 'error');
//       }
//     } catch (error) {
//       setLoading(false);
//       Swal.fire('Error', error.message || 'An unexpected error occurred.', 'error');
//     }
//   };


//   return (
//     <Container>
//       <div style={{display:"flex", width:"100%",justifyContent:"space-between"}}>
//       <Title>Student Score Sheet</Title>
//       <Button2 onClick={() => setShowScoreSheet(false)}>Close score sheet</Button2>
//       </div>

//       {studentData && (
//         <DataContainer>
//           {/* <h2>Student Data</h2> */}
//           {Object.entries(studentData).map(([table, rows]) => (
//             <div key={table}>
//               <TableTitle>{table}</TableTitle>
//               {/* <PreformattedText>{JSON.stringify(rows, null, 2)}</PreformattedText> */}
//             </div>
//           ))}
//         </DataContainer>
//       )}
//     </Container>
//   );
// };

// export default StudentScoreSheet;






// import React, { useState } from 'react';
// import styled from 'styled-components';

// const ScoreSheetContainer = styled.div`
//   display: flex;
//   flex-direction: column;
//   align-items: center;
//   padding: 20px;
//   background-color: #f8f9fa;
//   min-height: 100vh;
//   position:fixed;
//   top:50%;
//   left:50%;
//   height:600px;
//   transform: translate(-50%, -50%);
// `;

// const TableContainer = styled.div`
//   overflow-x: auto;
//   width: 100%;
//   max-width: 1200px;
// `;

// const ScoreTable = styled.table`
//   width: 100%;
//   border-collapse: collapse;
//   margin: 20px 0;
//   background-color: #ffffff;
//   border-radius: 8px;
//   box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);

//   th, td {
//     padding: 12px;
//     text-align: center;
//     border: 1px solid #ddd;
//   }

//   th {
//     background-color: #007bff;
//     color: #fff;
//     font-weight: bold;
//   }

//   td {
//     font-size: 14px;
//   }
// `;

// const Button = styled.button`
//   padding: 5px 10px;
//   border: none;
//   border-radius: 4px;
//   font-size: 12px;
//   cursor: pointer;

//   &.increment {
//     background-color: #28a745;
//     color: white;
//   }

//   &.decrement {
//     background-color: #dc3545;
//     color: white;
//   }

//   &:disabled {
//     background-color: #6c757d;
//     cursor: not-allowed;
//   }
// `;

// const Total = styled.span`
//   font-weight: bold;
//   color: #343a40;
// `;

// const StudentScoreSheet = () => {
//   const subjects = Array.from({ length: 20 }, (_, i) => `Subject ${i + 1}`);
//   const [scores, setScores] = useState(
//     subjects.map(() => ({ assignment: 0, test: 0, exam: 0 }))
//   );

//   const handleScoreChange = (index, type, delta) => {
//     setScores((prevScores) =>
//       prevScores.map((score, i) =>
//         i === index
//           ? { ...score, [type]: Math.max(0, score[type] + delta) }
//           : score
//       )
//     );
//   };

//   const calculateTotal = (score) => score.assignment + score.test + score.exam;

//   return (
//     <ScoreSheetContainer>
//       <h1>Student Score Sheet</h1>
//       <p></p>
//       <TableContainer>
//         <ScoreTable>
//           <thead>
//             <tr>
//               <th>Subject</th>
//               <th>Assignment</th>
//               <th>Test</th>
//               <th>Exam</th>
//               <th>Total</th>
//             </tr>
//           </thead>
//           <tbody>
//             {scores.map((score, index) => (
//               <tr key={index}>
//                 <td>{subjects[index]}</td>
//                 <td>
//                   <div>
//                     <Button
//                       className="decrement"
//                       onClick={() => handleScoreChange(index, 'assignment', -1)}
//                     >
//                       -
//                     </Button>
//                     <input placeholder='enter scrore'/>
//                     <span> {score.assignment} </span>
//                     <Button
//                       className="increment"
//                       onClick={() => handleScoreChange(index, 'assignment', 1)}
//                     >
//                       +
//                     </Button>
//                   </div>
//                 </td>
//                 <td>
//                   <div>
//                     <Button
//                       className="decrement"
//                       onClick={() => handleScoreChange(index, 'test', -1)}
//                     >
//                       -
//                     </Button>
//                     <span> {score.test} </span>
//                     <Button
//                       className="increment"
//                       onClick={() => handleScoreChange(index, 'test', 1)}
//                     >
//                       +
//                     </Button>
//                   </div>
//                 </td>
//                 <td>
//                   <div>
//                     <Button
//                       className="decrement"
//                       onClick={() => handleScoreChange(index, 'exam', -1)}
//                     >
//                       -
//                     </Button>
//                     <span> {score.exam} </span>
//                     <Button
//                       className="increment"
//                       onClick={() => handleScoreChange(index, 'exam', 1)}
//                     >
//                       +
//                     </Button>
//                   </div>
//                 </td>
//                 <td>
//                   <Total>{calculateTotal(score)}</Total>
//                 </td>
//               </tr>
//             ))}
//           </tbody>
//         </ScoreTable>
//       </TableContainer>
//     </ScoreSheetContainer>
//   );
// };

// export default StudentScoreSheet;

















// import React, { useState } from 'react';
// import styled from 'styled-components';

// const ScoreSheetContainer = styled.div`
//   display: flex;
//   flex-direction: column;
//   align-items: center;
//   padding: 20px;
//   background-color: #f8f9fa;
//   min-height: 100vh;
//   position: fixed;
//   top: 50%;
//   left: 50%;
//   height: 600px;
//   transform: translate(-50%, -50%);
// `;

// const TableContainer = styled.div`
//   overflow-x: auto;
//   width: 100%;
//   max-width: 1200px;
// `;

// const ScoreTable = styled.table`
//   width: 100%;
//   border-collapse: collapse;
//   margin: 20px 0;
//   background-color: #ffffff;
//   border-radius: 8px;
//   box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);

//   th, td {
//     padding: 12px;
//     text-align: center;
//     border: 1px solid #ddd;
//   }

//   th {
//     background-color: #007bff;
//     color: #fff;
//     font-weight: bold;
//   }

//   td {
//     font-size: 14px;
//   }
// `;

// const Button = styled.button`
//   padding: 5px 10px;
//   border: none;
//   border-radius: 4px;
//   font-size: 12px;
//   cursor: pointer;

//   &.increment {
//     background-color: #28a745;
//     color: white;
//   }

//   &.decrement {
//     background-color: #dc3545;
//     color: white;
//   }

//   &:disabled {
//     background-color: #6c757d;
//     cursor: not-allowed;
//   }
// `;

// const Total = styled.span`
//   font-weight: bold;
//   color: #343a40;
// `;

// const OverallTotal = styled.div`
//   margin-top: 20px;
//   font-size: 18px;
//   font-weight: bold;
//   color: #007bff;
// `;

// const StudentScoreSheet = () => {
//   const subjects = Array.from({ length: 20 }, (_, i) => `Subject ${i + 1}`);
//   const [scores, setScores] = useState(
//     subjects.map(() => ({ assignment: 0, test: 0, exam: 0 }))
//   );

//   const handleScoreChange = (index, type, delta) => {
//     setScores((prevScores) =>
//       prevScores.map((score, i) =>
//         i === index
//           ? { ...score, [type]: Math.max(0, score[type] + delta) }
//           : score
//       )
//     );
//   };

//   const calculateTotal = (score) => score.assignment + score.test + score.exam;

//   const calculateOverallTotal = () =>
//     scores.reduce((sum, score) => sum + calculateTotal(score), 0);

//   return (
//     <ScoreSheetContainer>
//       <h1>Student Score Sheet</h1>
//       <TableContainer>
//         <ScoreTable>
//           <thead>
//             <tr>
//               <th>Subject</th>
//               <th>Assignment</th>
//               <th>Test</th>
//               <th>Exam</th>
//               <th>Total</th>
//             </tr>
//           </thead>
//           <tbody>
//             {scores.map((score, index) => (
//               <tr key={index}>
//                 <td>{subjects[index]}</td>
//                 <td>
//                   <div>
//                     <Button
//                       className="decrement"
//                       onClick={() => handleScoreChange(index, 'assignment', -1)}
//                     >
//                       -
//                     </Button>
//                     <span> {score.assignment} </span>
//                     <Button
//                       className="increment"
//                       onClick={() => handleScoreChange(index, 'assignment', 1)}
//                     >
//                       +
//                     </Button>
//                   </div>
//                 </td>
//                 <td>
//                   <div>
//                     <Button
//                       className="decrement"
//                       onClick={() => handleScoreChange(index, 'test', -1)}
//                     >
//                       -
//                     </Button>
//                     <span> {score.test} </span>
//                     <Button
//                       className="increment"
//                       onClick={() => handleScoreChange(index, 'test', 1)}
//                     >
//                       +
//                     </Button>
//                   </div>
//                 </td>
//                 <td>
//                   <div>
//                     <Button
//                       className="decrement"
//                       onClick={() => handleScoreChange(index, 'exam', -1)}
//                     >
//                       -
//                     </Button>
//                     <span> {score.exam} </span>
//                     <Button
//                       className="increment"
//                       onClick={() => handleScoreChange(index, 'exam', 1)}
//                     >
//                       +
//                     </Button>
//                   </div>
//                 </td>
//                 <td>
//                   <Total>{calculateTotal(score)}</Total>
//                 </td>
//               </tr>
//             ))}
//           </tbody>
//         </ScoreTable>
//       </TableContainer>
//       <OverallTotal>Overall Total: {calculateOverallTotal()}</OverallTotal>
//     </ScoreSheetContainer>
//   );
// };

// export default StudentScoreSheet;














// import React, { useState } from 'react';
// import styled from 'styled-components';

// const ScoreSheetContainer = styled.div`
//   display: flex;
//   flex-direction: column;
//   align-items: center;
//   padding: 20px;
//   background-color: #f8f9fa;
//   min-height: 100vh;
//   position: fixed;
//   top: 50%;
//   left: 50%;
//   height: 600px;
//   transform: translate(-50%, -50%);
// `;

// const TableContainer = styled.div`
//   overflow-x: auto;
//   width: 100%;
//   max-width: 1200px;
// `;

// const ScoreTable = styled.table`
//   width: 100%;
//   border-collapse: collapse;
//   margin: 20px 0;
//   background-color: #ffffff;
//   border-radius: 8px;
//   box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);

//   th, td {
//     padding: 12px;
//     text-align: center;
//     border: 1px solid #ddd;
//   }

//   th {
//     background-color: #007bff;
//     color: #fff;
//     font-weight: bold;
//   }

//   td {
//     font-size: 14px;
//   }
// `;

// const Total = styled.span`
//   font-weight: bold;
//   color: #343a40;
// `;

// const InputField = styled.input`
//   width: 60px;
//   padding: 5px;
//   margin-top: 5px;
//   border: 1px solid #ccc;
//   border-radius: 4px;
//   text-align: center;
// `;

// const SaveButton = styled.button`
//   margin-top: 20px;
//   padding: 10px 20px;
//   font-size: 16px;
//   background-color: #007bff;
//   color: #fff;
//   border: none;
//   border-radius: 4px;
//   cursor: pointer;

//   &:hover {
//     background-color: #0056b3;
//   }
// `;

// const OverallTotal = styled.div`
//   margin-top: 20px;
//   font-size: 18px;
//   font-weight: bold;
//   color: #007bff;
// `;

// const StudentScoreSheet = () => {
//   const subjects = Array.from({ length: 20 }, (_, i) => `Subject ${i + 1}`);
//   const [scores, setScores] = useState(
//     subjects.map(() => ({ assignment: 0, test: 0, exam: 0 }))
//   );

//   const [inputs, setInputs] = useState(
//     subjects.map(() => ({ assignment: 0, test: 0, exam: 0 }))
//   );

//   const handleInputChange = (index, type, value) => {
//     setInputs((prevInputs) =>
//       prevInputs.map((input, i) =>
//         i === index ? { ...input, [type]: parseInt(value) || 0 } : input
//       )
//     );
//   };

//   const handleSaveChanges = () => {
//     setScores((prevScores) =>
//       prevScores.map((score, index) => ({
//         assignment: Math.max(0, score.assignment + inputs[index].assignment),
//         test: Math.max(0, score.test + inputs[index].test),
//         exam: Math.max(0, score.exam + inputs[index].exam),
//       }))
//     );

//     // Reset inputs to zero
//     setInputs(subjects.map(() => ({ assignment: 0, test: 0, exam: 0 })));
//   };

//   const calculateTotal = (score) => score.assignment + score.test + score.exam;

//   const calculateOverallTotal = () =>
//     scores.reduce((sum, score) => sum + calculateTotal(score), 0);

//   return (
//     <ScoreSheetContainer>
//       <h1>Student Score Sheet</h1>
//       <TableContainer>
//         <ScoreTable>
//           <thead>
//             <tr>
//               <th>Subject</th>
//               <th>Assignment</th>
//               <th>Test</th>
//               <th>Exam</th>
//               <th>Total</th>
//             </tr>
//           </thead>
//           <tbody>
//             {scores.map((score, index) => (
//               <tr key={index}>
//                 <td>{subjects[index]}</td>
//                 <td>
//                   <div>
//                     <Total>{score.assignment}</Total>
//                     <InputField
//                       type="number"
//                       value={inputs[index].assignment}
//                       onChange={(e) =>
//                         handleInputChange(index, 'assignment', e.target.value)
//                       }
//                     />
//                   </div>
//                 </td>
//                 <td>
//                   <div>
//                     <Total>{score.test}</Total>
//                     <InputField
//                       type="number"
//                       value={inputs[index].test}
//                       onChange={(e) =>
//                         handleInputChange(index, 'test', e.target.value)
//                       }
//                     />
//                   </div>
//                 </td>
//                 <td>
//                   <div>
//                     <Total>{score.exam}</Total>
//                     <InputField
//                       type="number"
//                       value={inputs[index].exam}
//                       onChange={(e) =>
//                         handleInputChange(index, 'exam', e.target.value)
//                       }
//                     />
//                   </div>
//                 </td>
//                 <td>
//                   <Total>{calculateTotal(score)}</Total>
//                 </td>
//               </tr>
//             ))}
//           </tbody>
//         </ScoreTable>
//       </TableContainer>
//       <SaveButton onClick={handleSaveChanges}>Save All Changes</SaveButton>
//       <SaveButton onClick={handleSaveChanges}>Close score sheet</SaveButton>
//       <OverallTotal>Overall Total: {calculateOverallTotal()}</OverallTotal>
//     </ScoreSheetContainer>
//   );
// };

// export default StudentScoreSheet;



















// import React, { useState, useEffect } from 'react';
// import styled from 'styled-components';

// const ScoreSheetContainer = styled.div`
//   display: flex;
//   flex-direction: column;
//   align-items: center;
//   padding: 20px;
//   background-color: #f8f9fa;
//   min-height: 100vh;
//   width: 100%;
// `;

// const Title = styled.h1`
//   margin-bottom: 20px;
//   color: #343a40;
// `;

// const TableContainer = styled.div`
//   overflow-x: auto;
//   width: 100%;
//   max-width: 1200px;
// `;

// const ScoreTable = styled.table`
//   width: 100%;
//   border-collapse: collapse;
//   margin: 20px 0;
//   background-color: #ffffff;
//   border-radius: 8px;
//   box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);

//   th, td {
//     padding: 12px;
//     text-align: center;
//     border: 1px solid #ddd;
//   }

//   th {
//     background-color: #007bff;
//     color: #fff;
//     font-weight: bold;
//   }

//   td {
//     font-size: 14px;
//   }
// `;

// const Total = styled.span`
//   font-weight: bold;
//   color: #343a40;
// `;

// const InputField = styled.input`
//   width: 60px;
//   padding: 5px;
//   margin-top: 5px;
//   border: 1px solid #ccc;
//   border-radius: 4px;
//   text-align: center;
// `;

// const SaveButton = styled.button`
//   margin: 10px 5px;
//   padding: 10px 20px;
//   font-size: 16px;
//   background-color: #007bff;
//   color: #fff;
//   border: none;
//   border-radius: 4px;
//   cursor: pointer;
//   &:hover {
//     background-color: #0056b3;
//   }
// `;

// const OverallTotal = styled.div`
//   margin-top: 20px;
//   font-size: 18px;
//   font-weight: bold;
//   color: #007bff;
// `;

// const StudentScoreSheet = () => {
//   const subjects = Array.from({ length: 20 }, (_, i) => `Subject ${i + 1}`);
//   const [scores, setScores] = useState(
//     subjects.map(() => ({ assignment: 0, test: 0, exam: 0 }))
//   );

//   const [inputs, setInputs] = useState(
//     subjects.map(() => ({ assignment: 0, test: 0, exam: 0 }))
//   );

//   const handleInputChange = (index, type, value) => {
//     setInputs((prevInputs) =>
//       prevInputs.map((input, i) =>
//         i === index ? { ...input, [type]: parseInt(value) || 0 } : input
//       )
//     );
//   };

//   const handleSaveChanges = () => {
//     setScores((prevScores) =>
//       prevScores.map((score, index) => ({
//         assignment: Math.max(0, score.assignment + inputs[index].assignment),
//         test: Math.max(0, score.test + inputs[index].test),
//         exam: Math.max(0, score.exam + inputs[index].exam),
//       }))
//     );

//     // Reset inputs to zero
//     setInputs(subjects.map(() => ({ assignment: 0, test: 0, exam: 0 })));
//   };

//   const calculateTotal = (score) => score.assignment + score.test + score.exam;

//   const calculateOverallTotal = () =>
//     scores.reduce((sum, score) => sum + calculateTotal(score), 0);

//   const handleCloseScoreSheet = () => {
//     alert("Closing the score sheet!");
//     // Logic for closing can be added here
//   };

//   useEffect(() => {
//     // Simulate fetching data from an API
//     const fetchScores = async () => {
//       // Mock data fetching
//       const fetchedScores = subjects.map(() => ({
//         assignment: Math.floor(Math.random() * 10),
//         test: Math.floor(Math.random() * 10),
//         exam: Math.floor(Math.random() * 10),
//       }));
//       setScores(fetchedScores);
//     };

//     fetchScores();
//   }, []);

//   return (
//     <ScoreSheetContainer>
//       <Title>Student Score Sheet</Title>
//       <TableContainer>
//         <ScoreTable>
//           <thead>
//             <tr>
//               <th>Subject</th>
//               <th>Assignment</th>
//               <th>Test</th>
//               <th>Exam</th>
//               <th>Total</th>
//             </tr>
//           </thead>
//           <tbody>
//             {scores.map((score, index) => (
//               <tr key={index}>
//                 <td>{subjects[index]}</td>
//                 <td>
//                   <div>
//                     <Total>{score.assignment}</Total>
//                     <InputField
//                       type="number"
//                       value={inputs[index].assignment}
//                       onChange={(e) =>
//                         handleInputChange(index, "assignment", e.target.value)
//                       }
//                     />
//                   </div>
//                 </td>
//                 <td>
//                   <div>
//                     <Total>{score.test}</Total>
//                     <InputField
//                       type="number"
//                       value={inputs[index].test}
//                       onChange={(e) =>
//                         handleInputChange(index, "test", e.target.value)
//                       }
//                     />
//                   </div>
//                 </td>
//                 <td>
//                   <div>
//                     <Total>{score.exam}</Total>
//                     <InputField
//                       type="number"
//                       value={inputs[index].exam}
//                       onChange={(e) =>
//                         handleInputChange(index, "exam", e.target.value)
//                       }
//                     />
//                   </div>
//                 </td>
//                 <td>
//                   <Total>{calculateTotal(score)}</Total>
//                 </td>
//               </tr>
//             ))}
//           </tbody>
//         </ScoreTable>
//       </TableContainer>
//       <div>
//         <SaveButton onClick={handleSaveChanges}>Save All Changes</SaveButton>
//         <SaveButton onClick={handleCloseScoreSheet}>Close Score Sheet</SaveButton>
//       </div>
//       <OverallTotal>Overall Total: {calculateOverallTotal()}</OverallTotal>
//     </ScoreSheetContainer>
//   );
// };

// export default StudentScoreSheet;

