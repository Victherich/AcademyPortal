// import React, { useState, useEffect } from 'react';
// import styled from 'styled-components';
// import Swal from 'sweetalert2';
// import axios from 'axios';

// const Container = styled.div`
//   padding: 20px;
//   max-width: 1200px;
//   margin: 0 auto;
// `;

// const Title = styled.h1`
//   text-align: center;
//   color: #4caf50;
//   margin-bottom: 20px;
// `;

// const FilterContainer = styled.div`
//   display: flex;
//   flex-wrap: wrap;
//   gap: 20px;
//   justify-content: center;
//   margin-bottom: 20px;
// `;

// const Select = styled.select`
//   padding: 10px;
//   border: 1px solid #ddd;
//   border-radius: 5px;
//   width: 200px;
//   outline:none;
// `;

// const Button = styled.button`
//   padding: 10px 20px;
//   background-color: #4caf50;
//   color: white;
//   border: none;
//   border-radius: 5px;
//   cursor: pointer;

//   &:hover {
//     background-color: #45a049;
//   }
// `;

// const StudentList = styled.div`
//   display: flex;
//   flex-wrap: wrap;
//   gap: 20px;
//   justify-content: center;
// `;

// const StudentCard = styled.div`
//   background-color: #f9f9f9;
//   border: 1px solid #ddd;
//   border-radius: 10px;
//   padding: 15px;
//   box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
//   cursor: pointer;

//   &:hover {
//     box-shadow: 0 6px 12px rgba(0, 0, 0, 0.2);
//   }
// `;

// const Modal = styled.div`
//   position: fixed;
//   top: 50%;
//   left: 50%;
//   transform: translate(-50%, -50%);
//   background-color: white;
//   padding: 10px;
//   border-radius: 10px;
//   box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
//   z-index: 1000;
//   width:90%;
//   height:90%;
//   display:flex;
//   justify-content:center;
//   align-items:center;
//   gap:20px;
//   flex-wrap:wrap;
// `;

// const Overlay = styled.div`
//   position: fixed;
//   top: 0;
//   left: 0;
//   width: 100%;
//   height: 100%;
//   background: rgba(0, 0, 0, 0.5);
//   z-index: 999;
// `;

// const ActionButton = styled(Button)`
//   margin: 10px;
// `;

// const DeleteButton = styled(Button)`
//   background-color: #f44336;

//   &:hover {
//     background-color: #e53935;
//   }
// `;


// const Form = styled.form`

// `

// const ManageFeesPayments = () => {
//   const [classes, setClasses] = useState([]);
//   const [departments, setDepartments] = useState([]);
//   const [students, setStudents] = useState([]);
//   const [paidStudents, setPaidStudents] = useState([]); // State to store paid students
//   const [selectedClass, setSelectedClass] = useState('');
//   const [selectedDepartment, setSelectedDepartment] = useState('');
//   const [selectedSemester, setSelectedSemester] = useState(''); // For selected semester
//   const [selectedStudent, setSelectedStudent] = useState(null);

//   useEffect(() => {
//     fetchClasses();
//     fetchDepartments();
//   }, []);

//   const fetchClasses = async () => {
//     try {
//       const response = await axios.get('https://ephadacademyportal.com.ng/ephad_api/fetch_classes.php');
//       setClasses(response.data.classes || []);
//     } catch (error) {
//       Swal.fire('Error', 'Failed to fetch classes', 'error');
//     }
//   };

//   const fetchDepartments = async () => {
//     try {
//       const response = await axios.get('https://ephadacademyportal.com.ng/ephad_api/fetch_departments.php');
//       setDepartments(response.data.departments || []);
//     } catch (error) {
//       Swal.fire('Error', 'Failed to fetch departments', 'error');
//     }
//   };



//   //
//   const fetchPaidStudents = async (semester) => {

//     try {
//       const response = await axios.get('https://ephadacademyportal.com.ng/ephad_api/fetch_paid_students.php', {
//         params: {
//           semester: semester,
//         },
//       });
//       if (response.data.success) {
//         setPaidStudents(response.data.paid_students || []);
//         console.log(response.data.paid_students)
//       } else {
//         Swal.fire('Error', response.data.error, 'error');
//       }
//     } catch (error) {
//       Swal.fire('Error', 'Failed to fetch paid students', 'error');
//     }
//   };

//   const fetchStudents = async (e) => {
//     e.preventDefault();
//     Swal.fire({ text: 'Please wait...' });
//     Swal.showLoading();

//     try {
//       const response = await axios.get('https://ephadacademyportal.com.ng/ephad_api/fetch_students_by_class.php', {
//         params: {
//           class_id: selectedClass,
//           department_id: selectedDepartment,
//         },
//       });

//       if (response.data.success) {
//         setStudents(response.data.students);
//         // Fetch paid students for the selected semester after students are fetched
//         if (selectedSemester) {
//           fetchPaidStudents(selectedSemester);
//         }
//       } else {
//         Swal.fire('Error', response.data.error, 'error');
//       }
//     } catch (error) {
//       Swal.fire('Error', 'Failed to fetch students', 'error');
//     } finally {
//       Swal.close();
//     }
//   };

//   const fetchUserDetails = async (studentID) => {
//     Swal.fire({ text: 'Fetching student...' });
//     Swal.showLoading();
//     try {
//       const response = await fetch(`https://ephadacademyportal.com.ng/ephad_api/get_student_details.php?id=${studentID}`);
//       const data = await response.json();
//       if (data.success) {
//         setSelectedStudent(data.student);
//       } else {
//         Swal.fire({ text: data.error || 'Error fetching user details.' });
//       }
//     } catch (err) {
//       Swal.fire({ text: 'Failed to fetch user details. Please try again.' });
//     } finally {
//       Swal.close();
//     }
//   };

//   // Check if the student has paid for the selected semester
//   const isStudentPaid = (studentId) => {
//     return paidStudents.some((paidStudent) => paidStudent.student_id === studentId);
//   };


  


//   const [semesters, setSemesters] = useState([]);

//   // Fetch semesters and current semester on component mount
//   useEffect(() => {
//     fetchSemesters();
//   }, []);

//   // Fetch all semesters from the server
//   const fetchSemesters = async () => {
//     try {
//       const response = await axios.get("https://ephadacademyportal.com.ng/ephad_api/fetch_semesters.php");
//       if (response.data.success) {
//         setSemesters(response.data.semesters || []);
//       } else {
//         Swal.fire({ text: "Failed to fetch semesters.", icon: "error" });
//       }
//     } catch (error) {
//       Swal.fire({ text: "An error occurred while fetching semesters.", icon: "error" });
//     }
//   };

//   return (
//     <Container>
//       <Title>Manage Fees Payments</Title>
//       <FilterContainer>
//         <Form onSubmit={fetchStudents}>
//           <Select onChange={(e) => setSelectedClass(e.target.value)} value={selectedClass} required>
//             <option value="">Select Class</option>
//             {classes.map((cls) => (
//               <option key={cls.id} value={cls.id}>
//                 {cls.level}
//               </option>
//             ))}
//           </Select>
//           <Select onChange={(e) => setSelectedDepartment(e.target.value)} value={selectedDepartment} required>
//             <option value="">Select Department</option>
//             {departments.map((dept) => (
//               <option key={dept.id} value={dept.id}>
//                 {dept.name}
//               </option>
//             ))}
//           </Select>
//           <Select onChange={(e) => setSelectedSemester(e.target.value)} value={selectedSemester} required>
//           <option value="">Select Term</option>
//           {semesters.map((semester) => (
//             <option key={semester.id} value={semester.id}>
//               {semester.name}
//             </option>))}
//           </Select>
//           <Button type="submit">Fetch Students</Button>
//         </Form>
//       </FilterContainer>
//       <StudentList>
//         {students.map((student) => (
//           <StudentCard key={student.student_id} onClick={() => fetchUserDetails(student.student_id)}>
//             {student.first_name} {student.last_name} - {student.student_id} - {student.email} - {student.phone_number}
//             <p>{isStudentPaid(student.student_id) ? 'Paid' : 'Not Paid'}</p>
//           </StudentCard>
//         ))}
//       </StudentList>


// {/* delete this after */}
//       <StudentList>
//         {paidStudents.map((student) => (
//           <StudentCard key={student.student_id} onClick={() => fetchUserDetails(student.student_id)}>
//             {student.first_name} {student.last_name} - {student.student_id} - {student.email} - {student.phone_number}
//             <p>{isStudentPaid(student.student_id) ? 'Paid' : 'Not Paid'}</p>
//           </StudentCard>
//         ))}
//       </StudentList>
//       {selectedStudent && (
//         <>
//           <Overlay onClick={() => setSelectedStudent(null)} />
//           <Modal>
//             <img
//               src={`https://ephadacademyportal.com.ng/ephad_api/uploads/student_profile_photos/${selectedStudent.profile_photo}`}
//               alt={`${selectedStudent.first_name}'s profile`}
//               style={{
//                 width: '200px',
//                 height: '200px',
//                 borderRadius: '50%',
//               }}
//             />
//             <div>
//               <h2>{selectedStudent.name}</h2>
//               <p><strong>Name:</strong> {selectedStudent.first_name} {selectedStudent.last_name}</p>
//               <p><strong>Student Id:</strong> {selectedStudent.student_id}</p>
//               <p><strong>Email:</strong> {selectedStudent.email}</p>
//               <p><strong>Phone:</strong> {selectedStudent.phone_number}</p>
//             </div>
//           </Modal>
//         </>
//       )}
//     </Container>
//   );
// };

// export default ManageFeesPayments;

























// ########################################################################################################################33333333

// import React, { useState, useEffect } from 'react';
// import styled from 'styled-components';
// import Swal from 'sweetalert2';
// import axios from 'axios';

// const Container = styled.div`
//   padding: 20px;
//   max-width: 1200px;
//   margin: 0 auto;
// `;

// const Title = styled.h1`
//   text-align: center;
//   color: #4caf50;
//   margin-bottom: 20px;
// `;

// const FilterContainer = styled.div`
//   display: flex;
//   flex-wrap: wrap;
//   gap: 20px;
//   justify-content: center;
//   margin-bottom: 20px;
// `;

// const Select = styled.select`
//   padding: 10px;
//   border: 1px solid #ddd;
//   border-radius: 5px;
//   width: 200px;
//   outline: none;
// `;

// const Button = styled.button`
//   padding: 10px 20px;
//   background-color: #4caf50;
//   color: white;
//   border: none;
//   border-radius: 5px;
//   cursor: pointer;

//   &:hover {
//     background-color: #45a049;
//   }
// `;

// const StudentList = styled.div`
//   display: flex;
//   flex-wrap: wrap;
//   gap: 20px;
//   justify-content: center;
// `;

// const StudentCard = styled.div`
//   background-color: #f9f9f9;
//   border: 1px solid #ddd;
//   border-radius: 10px;
//   padding: 15px;
//   box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
//   cursor: pointer;

//   &:hover {
//     box-shadow: 0 6px 12px rgba(0, 0, 0, 0.2);
//   }
// `;

// const Modal = styled.div`
//   position: fixed;
//   top: 50%;
//   left: 50%;
//   transform: translate(-50%, -50%);
//   background-color: white;
//   padding: 10px;
//   border-radius: 10px;
//   box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
//   z-index: 1000;
//   width: 90%;
//   height: 90%;
//   display: flex;
//   justify-content: center;
//   align-items: center;
//   gap: 20px;
//   flex-wrap: wrap;
// `;

// const Overlay = styled.div`
//   position: fixed;
//   top: 0;
//   left: 0;
//   width: 100%;
//   height: 100%;
//   background: rgba(0, 0, 0, 0.5);
//   z-index: 999;
// `;

// const ManageFeesPayments = () => {
//   const [classes, setClasses] = useState([]);
//   const [departments, setDepartments] = useState([]);
//   const [students, setStudents] = useState([]);
//   const [paidStudents, setPaidStudents] = useState([]);
//   const [selectedClass, setSelectedClass] = useState('');
//   const [selectedDepartment, setSelectedDepartment] = useState('');
//   const [selectedSemester, setSelectedSemester] = useState('');
//   const [selectedStudent, setSelectedStudent] = useState(null);
//   const [semesters, setSemesters] = useState([]);

//   useEffect(() => {
//     fetchClasses();
//     fetchDepartments();
//     fetchSemesters();
//   }, []);

//   const fetchClasses = async () => {
//     try {
//       const response = await axios.get('https://ephadacademyportal.com.ng/ephad_api/fetch_classes.php');
//       setClasses(response.data.classes || []);
//     } catch (error) {
//       Swal.fire('Error', 'Failed to fetch classes', 'error');
//     }
//   };

//   const fetchDepartments = async () => {
//     try {
//       const response = await axios.get('https://ephadacademyportal.com.ng/ephad_api/fetch_departments.php');
//       setDepartments(response.data.departments || []);
//     } catch (error) {
//       Swal.fire('Error', 'Failed to fetch departments', 'error');
//     }
//   };

//   const fetchSemesters = async () => {
//     try {
//       const response = await axios.get('https://ephadacademyportal.com.ng/ephad_api/fetch_semesters.php');
//       if (response.data.success) {
//         setSemesters(response.data.semesters || []);
//       } else {
//         Swal.fire({ text: 'Failed to fetch semesters.', icon: 'error' });
//       }
//     } catch (error) {
//       Swal.fire({ text: 'An error occurred while fetching semesters.', icon: 'error' });
//     }
//   };

//   const fetchPaidStudents = async (semester) => {
//     try {
//       const response = await axios.get(`https://ephadacademyportal.com.ng/ephad_api/fetch_paid_students.php?timestamp=${Date.now()}`, {
//         params: { semester },
//       });
//       if (response.data.success) {
//         setPaidStudents(response.data.paid_students || []);
//       } else {
//         Swal.fire('Error', response.data.error, 'error');
//       }
//     } catch (error) {
//       Swal.fire('Error', 'Failed to fetch paid students', 'error');
//     }
//   };

//   const fetchStudents = async (e) => {
//     e.preventDefault();
//     Swal.fire({ text: 'Please wait...' });
//     Swal.showLoading();

//     try {
//       const response = await axios.get('https://ephadacademyportal.com.ng/ephad_api/fetch_students_by_class.php', {
//         params: {
//           class_id: selectedClass,
//           department_id: selectedDepartment,
//         },
//       });

//       if (response.data.success) {
//         setStudents(response.data.students);
//         if (selectedSemester) {
//           fetchPaidStudents(selectedSemester);
//         }
//       } else {
//         Swal.fire('Error', response.data.error, 'error');
//       }
//     } catch (error) {
//       Swal.fire('Error', 'Failed to fetch students', 'error');
//     } finally {
//       Swal.close();
//     }
//   };

//   const fetchUserDetails = async (studentID) => {
//     Swal.fire({ text: 'Fetching student...' });
//     Swal.showLoading();
//     try {
//       const response = await axios.get(`https://ephadacademyportal.com.ng/ephad_api/get_student_details.php?id=${studentID}`);
//       if (response.data.success) {
//         setSelectedStudent(response.data.student);
//       } else {
//         Swal.fire({ text: response.data.error || 'Error fetching user details.' });
//       }
//     } catch (err) {
//       Swal.fire({ text: 'Failed to fetch user details. Please try again.' });
//     } finally {
//       Swal.close();
//     }
//   };

//   const isStudentPaid = (studentId) => {
//     return paidStudents.some((paidStudent) => paidStudent.student_id === studentId);
//   };

//   return (
//     <Container>
//       <Title>Manage Fees Payments</Title>
//       <FilterContainer>
//         <form onSubmit={fetchStudents}>
//           <Select onChange={(e) => setSelectedClass(e.target.value)} value={selectedClass} required>
//             <option value="">Select Class</option>
//             {classes.map((cls) => (
//               <option key={cls.id} value={cls.id}>
//                 {cls.level}
//               </option>
//             ))}
//           </Select>
//           <Select onChange={(e) => setSelectedDepartment(e.target.value)} value={selectedDepartment} required>
//             <option value="">Select Department</option>
//             {departments.map((dept) => (
//               <option key={dept.id} value={dept.id}>
//                 {dept.name}
//               </option>
//             ))}
//           </Select>
//           <Select onChange={(e) => setSelectedSemester(e.target.value)} value={selectedSemester} required>
//             <option value="">Select Term</option>
//             {semesters.map((semester) => (
//               <option key={semester.id} value={semester.id}>
//                 {semester.name}
//               </option>
//             ))}
//           </Select>
//           <Button type="submit">Fetch Students</Button>
//         </form>
//       </FilterContainer>
//       <StudentList>
//         {students.map((student) => (
//           <StudentCard key={student.student_id} onClick={() => fetchUserDetails(student.student_id)}>
//             {student.first_name} {student.last_name} - {student.student_id}
//             <p>{isStudentPaid(student.student_id) ? 'Paid' : 'Not Paid'}</p>
//           </StudentCard>
//         ))}
//       </StudentList>
//       {selectedStudent && (
//         <>
//           <Overlay onClick={() => setSelectedStudent(null)} />
//           <Modal>
//             <img
//               src={`https://ephadacademyportal.com.ng/ephad_api/uploads/student_profile_photos/${selectedStudent.profile_photo}`}
//               alt={`${selectedStudent.first_name}'s profile`}
//               style={{ width: '200px', height: '200px', borderRadius: '50%' }}
//             />
//             <div>
//               <h2>{selectedStudent.name}</h2>
//               <p><strong>Name:</strong> {selectedStudent.first_name} {selectedStudent.last_name}</p>
//               <p><strong>Student ID:</strong> {selectedStudent.student_id}</p>
//               <p><strong>Email:</strong> {selectedStudent.email}</p>
//               <p><strong>Phone:</strong> {selectedStudent.phone_number}</p>
//             </div>
//           </Modal>
//         </>
//       )}
//     </Container>
//   );
// };

// export default ManageFeesPayments;














import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import Swal from 'sweetalert2';
import axios from 'axios';

const Container = styled.div`
  padding: 20px;
  max-width: 1200px;
  margin: 0 auto;
`;

const Title = styled.h1`
  text-align: center;
  color:#8080FF;
  margin-bottom: 20px;
`;

const FilterContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
  justify-content: center;
  margin-bottom: 20px;
`;

const Select = styled.select`
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 5px;
  width: 200px;
  outline: none;
`;

const Button = styled.button`
  padding: 10px 20px;
  background-color: #8080FF;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;

  &:hover {
    background-color: #9000FF;
  }
`;

const StudentList = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
  justify-content: center;
`;

const StudentCard = styled.div`
  background-color: #f9f9f9;
  border: 1px solid #ddd;
  border-radius: 10px;
  padding: 15px;
  // box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  

  &:hover {
    // box-shadow: 0 6px 12px rgba(0, 0, 0, 0.2);
  }
`;

const Modal = styled.div`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: white;
  padding: 10px;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  z-index: 1000;
  width: 90%;
  height: 90%;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 20px;
  flex-wrap: wrap;
`;

const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  z-index: 999;
`;

const P = styled.p`
  padding:10px;
  // background-color:red;
  color:white;
  margin-top:5px;

`

const Img = styled.img`
border-radius:50%;
width:50px;
height:50px;
border:1px solid black;
`

const ManageFeesPayments = () => {
  const [classes, setClasses] = useState([]);
  const [departments, setDepartments] = useState([]);
  const [students, setStudents] = useState([]);
  const [paidStudents, setPaidStudents] = useState([]);
  const [selectedClass, setSelectedClass] = useState('');
  const [selectedDepartment, setSelectedDepartment] = useState(11);
  const [selectedSemester, setSelectedSemester] = useState('');
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [semesters, setSemesters] = useState([]);



  useEffect(() => {
    fetchClasses();
    fetchDepartments();
    fetchSemesters();
  }, []);

  const fetchClasses = async () => {
    try {
      const response = await axios.get('https://ephadacademyportal.com.ng/ephad_api/fetch_classes.php');
      setClasses(response.data.classes || []);
    } catch (error) {
      Swal.fire('Error', 'Failed to fetch classes', 'error');
    }
  };

  const fetchDepartments = async () => {
    try {
      const response = await axios.get('https://ephadacademyportal.com.ng/ephad_api/fetch_departments.php');
      setDepartments(response.data.departments || []);
    } catch (error) {
      Swal.fire('Error', 'Failed to fetch departments', 'error');
    }
  };

  const fetchSemesters = async () => {
    try {
      const response = await axios.get('https://ephadacademyportal.com.ng/ephad_api/fetch_semesters.php');
      if (response.data.success) {
        setSemesters(response.data.semesters || []);
      } else {
        Swal.fire('Error', response.data.error, 'error');
      }
    } catch (error) {
      Swal.fire('Error', 'Failed to fetch semesters', 'error');
    }
  };

  const fetchPaidStudents = async (semester) => {
    try {
      const response = await axios.get('https://ephadacademyportal.com.ng/ephad_api/fetch_paid_students.php', {
        params: { semester },
      });

      console.log(response.data.paid_students)
      if (response.data.success) {
        setPaidStudents(
          (response.data.paid_students || []).map((student) => ({
            ...student,
            student_id: String(student.student_id).trim(),
          }))

          
        );
      } else {
        Swal.fire('Error', response.data.error, 'error');
      }
    } catch (error) {
      Swal.fire('Error', 'Failed to fetch paid students', 'error');
    }
  };

  const fetchStudents = async (e) => {
    e.preventDefault();
    Swal.fire({ text: 'Please wait...' });
    Swal.showLoading();

    try {
      const response = await axios.get('https://ephadacademyportal.com.ng/ephad_api/fetch_students_by_class.php', {
        params: { class_id: selectedClass, department_id: selectedDepartment },
      });

      if (response.data.success) {
        setStudents(response.data.students);
        console.log(response.data.students)
        if (selectedSemester) {
          fetchPaidStudents(selectedSemester);
        }
      } else {
        Swal.fire('Error', response.data.error, 'error');
      }
    } catch (error) {
      Swal.fire('Error', 'Failed to fetch students', 'error');
    } finally {
      Swal.close();
    }
  };

  const fetchUserDetails = async (studentID) => {
    Swal.fire({ text: 'Fetching student...' });
    Swal.showLoading();
    try {
      const response = await fetch(`https://ephadacademyportal.com.ng/ephad_api/get_student_details.php?id=${studentID}`);
      const data = await response.json();
      if (data.success) {
        setSelectedStudent(data.student);
      } else {
        Swal.fire({ text: data.error || 'Error fetching user details.' });
      }
    } catch (err) {
      Swal.fire({ text: 'Failed to fetch user details. Please try again.' });
    } finally {
      Swal.close();
    }
  };

  const isStudentPaid = (studentId) => {
    const paid = paidStudents.some((paidStudent) => paidStudent.student_id === studentId);
    console.log(`Student ${studentId} payment status: ${paid ? 'Paid' : 'Not Paid'}`);
    return paid;
  };

  return (
    <Container>
      <Title>Manage Fees Payments</Title>
      <FilterContainer>
        <form onSubmit={fetchStudents}>
          <Select onChange={(e) => setSelectedClass(e.target.value)} value={selectedClass} required>
            <option value="">Select Class</option>
            {classes.map((cls) => (
              <option key={cls.id} value={cls.id}>
                {cls.level}
              </option>
            ))}
          </Select>
          {/* <Select onChange={(e) => setSelectedDepartment(e.target.value)} value={selectedDepartment} required>
            <option value="">Select Department</option>
            {departments.map((dept) => (
              <option key={dept.id} value={dept.id}>
                {dept.name}
              </option>
            ))}
          </Select> */}
          <Select onChange={(e) => setSelectedSemester(e.target.value)} value={selectedSemester} required>
            <option value="">Select Term</option>
            {semesters.map((semester) => (
              <option key={semester.id} value={semester.id}>
                {semester.name}
              </option>
            ))}
          </Select>
          <Button type="submit">Fetch Students</Button>
        </form>
      </FilterContainer>
      <StudentList>
        {students.map((student) => (
          <StudentCard key={student.student_id}>
            <Img 
            src={`https://ephadacademyportal.com.ng/ephad_api/uploads/student_profile_photos/${student.profile_photo}`}
             alt="studentImage"/>
            <p style={{fontSize:"small"}} ><strong>Name:</strong> {student.first_name} {student.last_name}</p> 
            <p style={{fontSize:"small"}} ><strong>Reg No.:</strong> {student.student_id}</p>
            <p style={{fontSize:"small"}} ><strong>Phone No.:</strong> {student.phone_number}</p>
            <p style={{fontSize:"small"}} ><strong>Parents:</strong> {student.parents}</p>
            <P style={{backgroundColor:isStudentPaid(String(student.id).trim()) ?"green":"red"}}>{isStudentPaid(String(student.id).trim()) ? 'Paid' : 'Not Paid'}</P>
          </StudentCard>
        ))}
      </StudentList>
      {selectedStudent && (
        <>
          <Overlay onClick={() => setSelectedStudent(null)} />
          <Modal>
            <img
              src={`https://ephadacademyportal.com.ng/ephad_api/uploads/student_profile_photos/${selectedStudent.profile_photo}`}
              alt={`${selectedStudent.first_name}'s profile`}
              style={{
                width: '200px',
                height: '200px',
                borderRadius: '50%',
              }}
            />
            <div>
              <h2>{selectedStudent.name}</h2>
              <p>
                <strong>Name:</strong> {selectedStudent.first_name} {selectedStudent.last_name}
              </p>
              <p>
                <strong>Student Id:</strong> {selectedStudent.student_id}
              </p>
              <p>
                <strong>Email:</strong> {selectedStudent.email}
              </p>
              <p>
                <strong>Phone:</strong> {selectedStudent.phone_number}
              </p>
            </div>
          </Modal>
        </>
      )}
    </Container>
  );
};

export default ManageFeesPayments;
