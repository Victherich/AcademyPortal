

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
      const response = await fetch('https://hotsalesng.com/ephad_api/student_signup.php', {
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
