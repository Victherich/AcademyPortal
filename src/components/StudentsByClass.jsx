// import React, { useState, useEffect } from 'react';
// import styled from 'styled-components';
// import Swal from 'sweetalert2';
// import axios from 'axios';
// import StudentScoreSheet from './StudentScoreSheet';
// import {useLocation }from 'react-router-dom'

// const Container = styled.div`
//   padding: 20px;
//   max-width: 1200px;
//   margin: 0 auto;
// `;

// const Title = styled.h1`
//   text-align: center;
//   color: #8080FF;
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
//   background-color: #8080FF;
//   color: white;
//   border: none;
//   border-radius: 5px;
//   cursor: pointer;

//   &:hover {
//     background-color: #9000FF;
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
// //   width: 250px;
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
//   background-color: rgb(233, 233, 250);
//   padding: 10px;
//   border-radius: 10px;
//   box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
//   z-index: 1000;
//   width:90%;
//   height:90%;
//   display:flex;
//   justify-content:center;
//   align-items:center;
// //   flex-direction:column;
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

// const Form = styled.form`
//        display: flex;
//   flex-wrap: wrap;
//   gap: 20px;
//   justify-content: center;
//   margin-bottom: 20px;  
// `

// const DeleteButton = styled(Button)`
//     background-color: #f44336;

//     &:hover {
//         background-color: #e53935;
//     }
// `;


// const Img = styled.img`
// border-radius:50%;
// width:50px;
// height:50px;
// border:1px solid black;
// margin-right:5px;
// `



// const StudentsByClass = ({managementID}) => {
//   const location = useLocation();
//   const [classes, setClasses] = useState([]);
//   const [departments, setDepartments] = useState([]);
//   const [students, setStudents] = useState([]);
//   const [selectedClass, setSelectedClass] = useState('');
//   const [selectedDepartment, setSelectedDepartment] = useState(11);
//   const [selectedStudent, setSelectedStudent] = useState(null);
//   const [showScoreSheet,setShowScoreSheet]=useState(false)
//   const [user,setUser]=useState({})
//   // console.log(selectedStudent.id)

//   console.log(students)

//   useEffect(() => {
//     fetchClasses();
//     fetchDepartments();
//   }, []);

//   const fetchClasses = async () => {
//     try {
//       const response = await axios.get('https://ephadacademyportal.com.ng/ephad_api/fetch_classes.php');
//       setClasses(response.data.classes || []);
//     //   console.log(response.data.classes)
//     } catch (error) {
//       Swal.fire('Error', 'Failed to fetch classes', 'error');
//     }
//   };





// const fetchUserDetailsById = async () => {
//       try {
//         const response = await fetch(
//             `https://ephadacademyportal.com.ng/ephad_api/get_teacher_user.php?id=${managementID}`,
//           {
//             method: 'GET',
//             headers: {
//               'Cache-Control': 'no-store',
//             },
//           }
//         );
//         const data = await response.json();
//         if (data.success) {
//           setUser(data.user);
//           // console.log(data)
//         } else {
//           // setError(data.error || 'Error fetching user details.');

//         }
//       } catch (err) {
//         // setError('Failed to fetch user details. Please try again.');
//       }
//     };


//     useEffect(() => {
//     fetchUserDetailsById();
//   }, [managementID]);








  

//   const fetchDepartments = async () => {
//     try {
//       const response = await axios.get('https://ephadacademyportal.com.ng/ephad_api/fetch_departments.php');
//       setDepartments(response.data.departments || []);
//     } catch (error) {
//       Swal.fire('Error', 'Failed to fetch departments', 'error');
//     }
//   };






//   const fetchStudents = async (e) => {
//     e.preventDefault();

// if(location.pathname==="/teacherdashboard"&&selectedClass!=user.class_id){
//   Swal.fire({text:"Please select only your class"})
//     return ;
// }


//     Swal.fire({ text: "Please wait..." });
//     Swal.showLoading();
  
//     try {
//       const response = await axios.get('https://ephadacademyportal.com.ng/ephad_api/fetch_students_by_class.php', {
//         params: {
//           class_id: selectedClass, // Make sure this is the class ID you want to filter by
//           department_id: selectedDepartment, // Make sure this is the department ID you want to filter by
//         },
//         headers: {
//           'Content-Type': 'application/json',
//         },
//       });
  
//       if (response.data.success) {
//         // console.log(response.data);
//         setStudents(response.data.students); // Assuming setStudents is a function to update the state
//       } else {
//         Swal.fire('Error', response.data.error, 'error');
//       }
//     } catch (error) {
//       Swal.fire('Error', 'Failed to fetch students', 'error');
//       console.error(error);
//     } finally {
//       Swal.close();
//     }
//   };


//     const toggleSuspend = async (suspended,suspendWarning, selectedStudent) => {
//         const result = await Swal.fire({
//             title: 'Are you sure?',
//             text: `"Are you sure you want to ${suspendWarning} this student?"`,
//             icon: 'warning',
//             showCancelButton: true,
//             confirmButtonColor: '#d33',
//             cancelButtonColor: '#3085d6',
//             confirmButtonText: `Yes, ${suspendWarning}!`,
//           });
        
//           if (result.isConfirmed) {
//         Swal.fire({ title: "Processing...", allowOutsideClick: false, didOpen: () => Swal.showLoading() });

//         try {
//             const response = await fetch("https://ephadacademyportal.com.ng/ephad_api/toggle_suspend_student.php", {
//                 method: "POST",
//                 headers: { "Content-Type": "application/json" },
//                 body: JSON.stringify({ student_id: selectedStudent.student_id, suspended }),
//             });
//             const data = await response.json();

//             if (data.success) {
//                 // setStudent({ ...student, suspended });
//                 Swal.fire("Success", data.message, "success");
//                 fetchUserDetails(selectedStudent.id)
//                 setSelectedStudent({...selectedStudent, suspended:suspended})
//             } else {
//                 Swal.fire("Error", data.error || "Failed to update student status.", "error");
//             }
//         } catch (err) {
//             Swal.fire("Error", err.message, "error");
//         }
//     }
//     };

//     const deleteStudent = async (selectedStudent) => {
//          const result = await Swal.fire({
//               title: 'Are you sure?',
//               text: '"Are you sure you want to delete this student? This action cannot be undone!"',
//               icon: 'warning',
//               showCancelButton: true,
//               confirmButtonColor: '#d33',
//               cancelButtonColor: '#3085d6',
//               confirmButtonText: 'Yes, delete!',
//             });
          
//             if (result.isConfirmed) {

//         Swal.fire({ title: "Processing...", allowOutsideClick: false, didOpen: () => Swal.showLoading() });

//         try {
//             const response = await fetch("https://ephadacademyportal.com.ng/ephad_api/delete_student.php", {
//                 method: "POST",
//                 headers: { "Content-Type": "application/json" },
//                 body: JSON.stringify({ student_id: selectedStudent.student_id }),
//             });
//             const data = await response.json();

//             if (data.success) {
//                 setSelectedStudent(null);
//                 Swal.fire("Success", data.message, "success");
//                 fetchStudents();
//             } else {
//                 Swal.fire("Error", data.error || "Failed to delete student.", "error");
//             }
//         } catch (err) {
//             Swal.fire("Error", err.message, "error");
//         }
//     }
//     };


//     const fetchUserDetails = async (studentID) => {
//         Swal.fire({text:"Fetching student..."})
//         Swal.showLoading();
//         try {
//           const response = await fetch(
//           //   `${studentInfoUrl}${studentID}`,
//           `https://ephadacademyportal.com.ng/ephad_api/get_student_details.php?id=${studentID}`,
//             {
//               method: 'GET',
//               headers: {
//                 'Cache-Control': 'no-store',
//               },
//             }
//           );
//           const data = await response.json();
//           if (data.success) {
//             setSelectedStudent(data.student);
//             // console.log(data) 
//           } else {
//             Swal.fire({text:data.error || 'Error fetching user details.'});
  
//           }
//         } catch (err) {
//           Swal.fire({text:'Failed to fetch user details. Please try again.'});
//         }finally{
//             Swal.close();
//         }
//       };



  


//       const handlePromoteStudent = async (studentId, classId) => {
//         if (!studentId || !classId) {
//           Swal.fire({
//             icon: 'error',
//             title: 'Invalid Input',
//             text: 'Both Student ID and Class ID are required.',
//           });
//           return;
//         }


      
//         try {
//           // Show loading state
//           Swal.fire({
//             title: 'Updating Class...',
//             text: 'Please wait while we update the records.',
//             allowOutsideClick: false,
//             didOpen: () => {
//               Swal.showLoading();
//             },
//           });
      
//           // Prepare payload
//           const payload = {
//             student_id: studentId,
//             class_id: classId,
//           };
      
//           console.log('Payload being sent:', payload); // Debugging payload
      
//           // Send POST request
//           const response = await axios.post('https://ephadacademyportal.com.ng/ephad_api/promote_one_student.php', payload, {
//             headers: {
//               'Content-Type': 'application/x-www-form-urlencoded',
//             },
//           });
      
//           // Handle success
//           if (response.data.success) {
//             Swal.fire({
//               icon: 'success',
//               title: 'Success',
//               text: response.data.message || 'Student promoted successfully.',
//             });
//           } else {
//             // Handle failure with backend errors
//             Swal.fire({
//               icon: 'error',
//               title: 'Error',
//               text: response.data.error || 'Failed to promote student.',
//             });
//           }
//         } catch (error) {
//           // Handle network or server errors
//           Swal.fire({
//             icon: 'error',
//             title: 'Request Failed',
//             text: error.response?.data?.error || 'An error occurred while processing your request.',
//           });
//         }
//       };









      
//       const handleDemoteStudent = async (studentId, classId) => {
//         if (!studentId || !classId) {
//           Swal.fire({
//             icon: 'error',
//             title: 'Invalid Input',
//             text: 'Both Student ID and Class ID are required.',
//           });
//           return;
//         }


      
//         try {
//           // Show loading state
//           Swal.fire({
//             title: 'Updating Class...',
//             text: 'Please wait while we update the records.',
//             allowOutsideClick: false,
//             didOpen: () => {
//               Swal.showLoading();
//             },
//           });
      
//           // Prepare payload
//           const payload = {
//             student_id: studentId,
//             class_id: classId,
//           };
      
//           console.log('Payload being sent:', payload); // Debugging payload
      
//           // Send POST request
//           const response = await axios.post('https://ephadacademyportal.com.ng/ephad_api/demote_one_student.php', payload, {
//             headers: {
//               'Content-Type': 'application/x-www-form-urlencoded',
//             },
//           });
      
//           // Handle success
//           if (response.data.success) {
//             Swal.fire({
//               icon: 'success',
//               title: 'Success',
//               text: response.data.message || 'Student demoted.',
//             });
//           } else {
//             // Handle failure with backend errors
//             Swal.fire({
//               icon: 'error',
//               title: 'Error',
//               text: response.data.error || 'Failed to demote student.',
//             });
//           }
//         } catch (error) {
//           // Handle network or server errors
//           Swal.fire({
//             icon: 'error',
//             title: 'Request Failed',
//             text: error.response?.data?.error || 'An error occurred while processing your request.',
//           });
//         }
//       };





// useEffect(()=>{
//   fetchAssignmentsByClassId();
//   fetchExamsByClassId();
//   fetchTestsByClassId();
// },[selectedClass])


// const [assignmentScores,setAssignmentScores]=useState([])
// const [testScores, setTestScores]=useState([])
// const [examScores,setExamScores]=useState([])


// // fetch assignments by class_id
//       const fetchAssignmentsByClassId = async () => {
    
//         try {
//           const response = await axios.get('https://ephadacademyportal.com.ng/ephad_api/fetch_assignments_by_class_id.php', {
//             params: { class_id: selectedClass },
//           });
    
//           if (response.data.success) {
//             // console.log(response.data.assignments)
//             setAssignmentScores(response.data.assignments)
//           } else {
//             // setError(response.data.error || 'Failed to fetch assignments.');
//           }
//         } catch (err) {
//           // setError('An error occurred while fetching data.');
//           console.error(err);
//         }
//       };


//       const fetchExamsByClassId = async () => {
    
//         try {
//           const response = await axios.get('https://ephadacademyportal.com.ng/ephad_api/fetch_exams_by_class_id.php', {
//             params: { class_id: selectedClass },
//           });
    
//           if (response.data.success) {
//             // console.log(response.data.exams)
//             setExamScores(response.data.exams)
//           } else {
//             // setError(response.data.error || 'Failed to fetch assignments.');
//           }
//         } catch (err) {
//           // setError('An error occurred while fetching data.');
//           console.error(err);
//         }
//       };



//       const fetchTestsByClassId = async () => {
    
//         try {
//           const response = await axios.get('https://ephadacademyportal.com.ng/ephad_api/fetch_tests_by_class_id.php', {
//             params: { class_id: selectedClass },
//           });
    
//           if (response.data.success) {
//             // console.log(response.data.tests)
//             setTestScores(response.data.tests)
//           } else {
//             // setError(response.data.error || 'Failed to fetch assignments.');
//           }
//         } catch (err) {
//           // setError('An error occurred while fetching data.');
//           console.error(err);
//         }
//       };
  

  

//   return (
//     <Container>
//       <Title>Students By Class</Title>
//       <FilterContainer>
//         <Form onSubmit={fetchStudents}>
//         <Select onChange={(e) => setSelectedClass(e.target.value)} value={selectedClass} required>
//           <option value="">Select Class</option>
//           {classes.map((cls) => (
//             <option key={cls.id} value={cls.id}>
//               {cls.level}
//             </option>
//           ))}
//         </Select>
//         {/* <Select onChange={(e) => setSelectedDepartment(e.target.value)} value={selectedDepartment} required>
//           <option value="">Select Department</option>
//           {departments.map((dept) => (
//             <option key={dept.id} value={dept.id}>
//               {dept.name}
//             </option>
//           ))}
//         </Select> */}
//         <Button type="submit">Fetch Students</Button>
//         {/* <Button onClick={fetchStudentsByClassDepartment}>Fetch Students</Button> */}
    
//         </Form>
//       </FilterContainer>
//       <StudentList>
//         {students.map((student) => (
//           <StudentCard key={student.id} onClick={() => fetchUserDetails(student.id)}>
//             <Img src={`https://ephadacademyportal.com.ng/ephad_api/uploads/student_profile_photos/${student.profile_photo}`} alt="student img"/>{student.first_name} {student.last_name} - Reg No.: {student.student_id} - {student.email} - {student.phone_number}
//           </StudentCard>
//         ))}
//       </StudentList>
//       {selectedStudent && (
//         <>
//           <Overlay 
//           // onClick={() => setSelectedStudent(null)} 
//             />
//           <Modal>
//           <img  
//               // src={`${mainDomain}/uploads/management_profile_photos/${user.profile_photo}`}
//               src={`https://ephadacademyportal.com.ng/ephad_api/uploads/student_profile_photos/${selectedStudent.profile_photo}`}
//               alt={`${selectedStudent.first_name}'s profile`}
//               style={{
//                 width:"200px",
//                 height:"200px",
//                 borderRadius:"50%"
//               }}
//             />
//             <div>
//             <h2>{selectedStudent.name}</h2>
//             <p><strong>Name:</strong> {selectedStudent.first_name} {selectedStudent.last_name}</p>
//             <p><strong>Reg No.:</strong> {selectedStudent.student_id}</p>
//             <p><strong>Address:</strong> {selectedStudent.address}</p>
//             <p><strong>Parents:</strong> {selectedStudent.parents}</p>
//             <p><strong>Phone:</strong> {selectedStudent.phone_number}</p>
//             <p><strong>Pickup Id:</strong> {selectedStudent.pickup_id}</p>
//             <p style={{backgroundColor:`${selectedStudent.suspended?"red":""}`,color:`${selectedStudent.suspended?"white":""}`}}><strong>Suspended:</strong> {selectedStudent.suspended ? "Yes" : "No"}</p>
        
//             </div>
            
// <div style={{display:"flex",justifyContent:"center", alignItems:"center",gap:"10px", flexWrap:"wrap"}}>
// <Button onClick={() => toggleSuspend(1,"suspend", selectedStudent)}>Suspend</Button>
//                     <Button onClick={() => toggleSuspend(0,"unsuspend", selectedStudent)}>Unsuspend</Button>
//                     <DeleteButton onClick={()=>deleteStudent(selectedStudent)}>Delete</DeleteButton>
//                     {location.pathname.includes("teacher")&&<Button onClick={() => setShowScoreSheet(true)}>Score Sheet</Button>}
//                     {location.pathname.includes("management") && <Button onClick={()=>handlePromoteStudent(selectedStudent.id, 1)} style={{backgroundColor:"#4caf50"}}>Promote Student</Button>}
//       {location.pathname.includes("management") && <Button onClick={()=>handleDemoteStudent(selectedStudent.id, 1)} >Demote Student</Button>}
//                     <DeleteButton onClick={() => setSelectedStudent(null)}>Close</DeleteButton>
//                     {showScoreSheet && <StudentScoreSheet 
//                     studentID={selectedStudent.id}
//                     setShowScoreSheet={setShowScoreSheet}
//                     selectedStudent={selectedStudent}
//                     />}
// </div>

//             </Modal>
//         </>
//       )}
      
//     </Container>
//   );
// };

// export default StudentsByClass;







// department_id: selectedDepartment,

// const [selectedDepartment, setSelectedDepartment] = useState(11);






import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import Swal from 'sweetalert2';
import axios from 'axios';
import { useLocation } from 'react-router-dom';
import StudentScoreSheet from './StudentScoreSheet'

const Container = styled.div`
  padding: 20px;
  max-width: 1200px;
  margin: 0 auto;
`;

const Title = styled.h1`
  text-align: center;
  color: #8080FF;
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
  outline:none;
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
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  cursor: pointer;

  &:hover {
    box-shadow: 0 6px 12px rgba(0, 0, 0, 0.2);
  }
`;

const Img = styled.img`
  border-radius: 50%;
  width: 50px;
  height: 50px;
  border: 1px solid black;
  margin-right: 5px;
`;





const Modal = styled.div`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: rgb(233, 233, 250);
  padding: 10px;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  z-index: 1000;
  width:90%;
  height:90%;
  display:flex;
  justify-content:center;
  align-items:center;
//   flex-direction:column;
  gap:20px;
  flex-wrap:wrap;
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

const ActionButton = styled(Button)`
  margin: 10px;
`;

// const Form = styled.form`
//        display: flex;
//   flex-wrap: wrap;
//   gap: 20px;
//   justify-content: center;
//   margin-bottom: 20px;  
// `

const DeleteButton = styled(Button)`
    background-color: #f44336;

    &:hover {
        background-color: #e53935;
    }
`;


// const Img = styled.img`
// border-radius:50%;
// width:50px;
// height:50px;
// border:1px solid black;
// margin-right:5px;
// `


const StudentsByClass = ({ managementID }) => {
  const location = useLocation();
  const [classes, setClasses] = useState([]);
  const [students, setStudents] = useState([]);
  const [selectedClass, setSelectedClass] = useState('');
  const [selectedDepartment, setSelectedDepartment] = useState(11);
  const [user, setUser] = useState({});
  const [assignmentScores, setAssignmentScores] = useState([]);
  const [testScores, setTestScores] = useState([]);
  const [examScores, setExamScores] = useState([]);
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [showScoreSheet,setShowScoreSheet]=useState(false)

  useEffect(() => {
    fetchClasses();
    fetchUserDetailsById();
  }, []);

  useEffect(() => {
    if (selectedClass) {
      fetchAssignmentsByClassId();
      fetchExamsByClassId();
      fetchTestsByClassId();
    }
  }, [selectedClass]);

  const fetchClasses = async () => {
    try {
      const response = await axios.get('https://ephadacademyportal.com.ng/ephad_api/fetch_classes.php');
      console.log('Classes:', response.data.classes); // Debugging line
      setClasses(response.data.classes || []);
    } catch (error) {
      // Swal.fire('Error', 'Failed to fetch classes', 'error');
    }
  };

  const fetchUserDetailsById = async () => {
    try {
      const response = await fetch(
        `https://ephadacademyportal.com.ng/ephad_api/get_teacher_user.php?id=${managementID}`
      );
      const data = await response.json();
      console.log('User Details:', data); // Debugging line
      if (data.success) {
        setUser(data.user);
      } else {
        // Swal.fire('Error', data.error || 'Failed to fetch user details', 'error');
      }
    } catch (error) {
      // Swal.fire('Error', 'Failed to fetch user details', 'error');
    }
  };

  const fetchAssignmentsByClassId = async () => {
    try {
      const response = await axios.get('https://ephadacademyportal.com.ng/ephad_api/fetch_assignments_by_class_id.php', {
        params: { class_id: selectedClass },
      });
      console.log('Assignments:', response.data.assignments); // Debugging line
      if (response.data.success) {
        setAssignmentScores(response.data.assignments);
      }
    } catch (err) {
      console.error(err);
    }
  };

  const fetchExamsByClassId = async () => {
    try {
      const response = await axios.get('https://ephadacademyportal.com.ng/ephad_api/fetch_exams_by_class_id.php', {
        params: { class_id: selectedClass },
      });
      console.log('Exams:', response.data.exams); // Debugging line
      if (response.data.success) {
        setExamScores(response.data.exams);
      }
    } catch (err) {
      console.error(err);
    }
  };

  const fetchTestsByClassId = async () => {
    try {
      const response = await axios.get('https://ephadacademyportal.com.ng/ephad_api/fetch_tests_by_class_id.php', {
        params: { class_id: selectedClass },
      });
      console.log('Tests:', response.data.tests); // Debugging line
      if (response.data.success) {
        setTestScores(response.data.tests);
      }
    } catch (err) {
      console.error(err);
    }
  };

  const fetchStudents = async (e) => {
    e.preventDefault();

if(location.pathname==="/teacherdashboard"&&selectedClass!=user.class_id){
  Swal.fire({text:"Please select only your class"})
    return ;
}


    Swal.fire({ text: 'Please wait...' });
    Swal.showLoading();
    try {
      const response = await axios.get('https://ephadacademyportal.com.ng/ephad_api/fetch_students_by_class.php', {
        params: {
          class_id: selectedClass,
          department_id: selectedDepartment,
        },
      });
      console.log('Fetched Students:', response.data.students); // Debugging line
      if (response.data.success) {
        let fetchedStudents = response.data.students;
        // Add total score to each student by matching student.id and student_id
        fetchedStudents = fetchedStudents.map((student) => {
          const assignments = assignmentScores.filter(score => score.student_id === student.id); // Use student_id to match
          const exams = examScores.filter(score => score.student_id === student.id); // Use student_id to match
          const tests = testScores.filter(score => score.student_id === student.id); // Use student_id to match

          // Calculate total score by adding the total_score from assignments, exams, and tests
          const totalAssignments = assignments.reduce((total, score) => total + score.total_score, 0);
          const totalExams = exams.reduce((total, score) => total + score.total_score, 0);
          const totalTests = tests.reduce((total, score) => total + score.total_score, 0);

          student.totalScore = totalAssignments + totalExams + totalTests; // Add total score
          return student;
        });

        // Sort students by total score (highest to lowest)
        fetchedStudents.sort((a, b) => b.totalScore - a.totalScore);
        setStudents(fetchedStudents);
      } else {
        // Swal.fire('Error', response.data.error, 'error');
      }
    } catch (error) {
      // Swal.fire('Error', 'Failed to fetch students', 'error');
    } finally {
      Swal.close();
    }
  };




















  // rest of teh functions
  
    const toggleSuspend = async (suspended,suspendWarning, selectedStudent) => {
        const result = await Swal.fire({
            title: 'Are you sure?',
            text: `"Are you sure you want to ${suspendWarning} this student?"`,
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#d33',
            cancelButtonColor: '#3085d6',
            confirmButtonText: `Yes, ${suspendWarning}!`,
          });
        
          if (result.isConfirmed) {
        Swal.fire({ title: "Processing...", allowOutsideClick: false, didOpen: () => Swal.showLoading() });

        try {
            const response = await fetch("https://ephadacademyportal.com.ng/ephad_api/toggle_suspend_student.php", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ student_id: selectedStudent.student_id, suspended }),
            });
            const data = await response.json();

            if (data.success) {
                // setStudent({ ...student, suspended });
                Swal.fire("Success", data.message, "success");
                fetchUserDetails(selectedStudent.id)
                setSelectedStudent({...selectedStudent, suspended:suspended})
            } else {
                Swal.fire("Error", data.error || "Failed to update student status.", "error");
            }
        } catch (err) {
            Swal.fire("Error", err.message, "error");
        }
    }
    };

    const deleteStudent = async (selectedStudent) => {
         const result = await Swal.fire({
              title: 'Are you sure?',
              text: '"Are you sure you want to delete this student? This action cannot be undone!"',
              icon: 'warning',
              showCancelButton: true,
              confirmButtonColor: '#d33',
              cancelButtonColor: '#3085d6',
              confirmButtonText: 'Yes, delete!',
            });
          
            if (result.isConfirmed) {

        Swal.fire({ title: "Processing...", allowOutsideClick: false, didOpen: () => Swal.showLoading() });

        try {
            const response = await fetch("https://ephadacademyportal.com.ng/ephad_api/delete_student.php", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ student_id: selectedStudent.student_id }),
            });
            const data = await response.json();

            if (data.success) {
                setSelectedStudent(null);
                Swal.fire("Success", data.message, "success");
                fetchStudents();
            } else {
                Swal.fire("Error", data.error || "Failed to delete student.", "error");
            }
        } catch (err) {
            Swal.fire("Error", err.message, "error");
        }
    }
    };


    const fetchUserDetails = async (studentID) => {
        Swal.fire({text:"Fetching student..."})
        Swal.showLoading();
        try {
          const response = await fetch(
          //   `${studentInfoUrl}${studentID}`,
          `https://ephadacademyportal.com.ng/ephad_api/get_student_details.php?id=${studentID}`,
            {
              method: 'GET',
              headers: {
                'Cache-Control': 'no-store',
              },
            }
          );
          const data = await response.json();
          if (data.success) {
            setSelectedStudent(data.student);
            // console.log(data) 
          } else {
            Swal.fire({text:data.error || 'Error fetching user details.'});
  
          }
        } catch (err) {
          Swal.fire({text:'Failed to fetch user details. Please try again.'});
        }finally{
            Swal.close();
        }
      };



  


      const handlePromoteStudent = async (studentId, classId) => {
        if (!studentId || !classId) {
          Swal.fire({
            icon: 'error',
            title: 'Invalid Input',
            text: 'Both Student ID and Class ID are required.',
          });
          return;
        }


      
        try {
          // Show loading state
          Swal.fire({
            title: 'Updating Class...',
            text: 'Please wait while we update the records.',
            allowOutsideClick: false,
            didOpen: () => {
              Swal.showLoading();
            },
          });
      
          // Prepare payload
          const payload = {
            student_id: studentId,
            class_id: classId,
          };
      
          console.log('Payload being sent:', payload); // Debugging payload
      
          // Send POST request
          const response = await axios.post('https://ephadacademyportal.com.ng/ephad_api/promote_one_student.php', payload, {
            headers: {
              'Content-Type': 'application/x-www-form-urlencoded',
            },
          });
      
          // Handle success
          if (response.data.success) {
            Swal.fire({
              icon: 'success',
              title: 'Success',
              text: response.data.message || 'Student promoted successfully.',
            });
          } else {
            // Handle failure with backend errors
            Swal.fire({
              icon: 'error',
              title: 'Error',
              text: response.data.error || 'Failed to promote student.',
            });
          }
        } catch (error) {
          // Handle network or server errors
          Swal.fire({
            icon: 'error',
            title: 'Request Failed',
            text: error.response?.data?.error || 'An error occurred while processing your request.',
          });
        }
      };









      
      const handleDemoteStudent = async (studentId, classId) => {
        if (!studentId || !classId) {
          Swal.fire({
            icon: 'error',
            title: 'Invalid Input',
            text: 'Both Student ID and Class ID are required.',
          });
          return;
        }


      
        try {
          // Show loading state
          Swal.fire({
            title: 'Updating Class...',
            text: 'Please wait while we update the records.',
            allowOutsideClick: false,
            didOpen: () => {
              Swal.showLoading();
            },
          });
      
          // Prepare payload
          const payload = {
            student_id: studentId,
            class_id: classId,
          };
      
          console.log('Payload being sent:', payload); // Debugging payload
      
          // Send POST request
          const response = await axios.post('https://ephadacademyportal.com.ng/ephad_api/demote_one_student.php', payload, {
            headers: {
              'Content-Type': 'application/x-www-form-urlencoded',
            },
          });
      
          // Handle success
          if (response.data.success) {
            Swal.fire({
              icon: 'success',
              title: 'Success',
              text: response.data.message || 'Student demoted.',
            });
          } else {
            // Handle failure with backend errors
            Swal.fire({
              icon: 'error',
              title: 'Error',
              text: response.data.error || 'Failed to demote student.',
            });
          }
        } catch (error) {
          // Handle network or server errors
          Swal.fire({
            icon: 'error',
            title: 'Request Failed',
            text: error.response?.data?.error || 'An error occurred while processing your request.',
          });
        }
      };





useEffect(()=>{
  fetchAssignmentsByClassId();
  fetchExamsByClassId();
  fetchTestsByClassId();
},[selectedClass])


// const [assignmentScores,setAssignmentScores]=useState([])
// const [testScores, setTestScores]=useState([])
// const [examScores,setExamScores]=useState([])


// // fetch assignments by class_id
//       const fetchAssignmentsByClassId = async () => {
    
//         try {
//           const response = await axios.get('https://ephadacademyportal.com.ng/ephad_api/fetch_assignments_by_class_id.php', {
//             params: { class_id: selectedClass },
//           });
    
//           if (response.data.success) {
//             // console.log(response.data.assignments)
//             setAssignmentScores(response.data.assignments)
//           } else {
//             // setError(response.data.error || 'Failed to fetch assignments.');
//           }
//         } catch (err) {
//           // setError('An error occurred while fetching data.');
//           console.error(err);
//         }
//       };


      // const fetchExamsByClassId = async () => {
    
      //   try {
      //     const response = await axios.get('https://ephadacademyportal.com.ng/ephad_api/fetch_exams_by_class_id.php', {
      //       params: { class_id: selectedClass },
      //     });
    
      //     if (response.data.success) {
      //       // console.log(response.data.exams)
      //       setExamScores(response.data.exams)
      //     } else {
      //       // setError(response.data.error || 'Failed to fetch assignments.');
      //     }
      //   } catch (err) {
      //     // setError('An error occurred while fetching data.');
      //     console.error(err);
      //   }
      // };



      // const fetchTestsByClassId = async () => {
    
      //   try {
      //     const response = await axios.get('https://ephadacademyportal.com.ng/ephad_api/fetch_tests_by_class_id.php', {
      //       params: { class_id: selectedClass },
      //     });
    
      //     if (response.data.success) {
      //       // console.log(response.data.tests)
      //       setTestScores(response.data.tests)
      //     } else {
      //       // setError(response.data.error || 'Failed to fetch assignments.');
      //     }
      //   } catch (err) {
      //     // setError('An error occurred while fetching data.');
      //     console.error(err);
      //   }
      // };
  

  return (
    <Container>
      <Title>Students By Class</Title>
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
          <Button type="submit">Fetch Students</Button>
        </form>
      </FilterContainer>
      <StudentList>
        {students.length > 0 ? (
          students.map((student,index) => (
            <StudentCard key={student.id} onClick={() => fetchUserDetails(student.id)}>
              <Img
                src={`https://ephadacademyportal.com.ng/ephad_api/uploads/student_profile_photos/${student.profile_photo}`}
                alt="student img"
              />
              <p>{student.first_name} {student.last_name} - Reg No.: {student.student_id}</p>
              <p>Total Score: {student.totalScore}</p>
              <p style={{backgroundColor:"blue", color:"white"}}><strong>Position: {index+1} th</strong></p>
            </StudentCard>
          ))
        ) : (
          <p>No students found.</p>
        )}
      </StudentList>
          {selectedStudent && (
        <>
          <Overlay 
          // onClick={() => setSelectedStudent(null)} 
            />
          <Modal>
          <img  
              // src={`${mainDomain}/uploads/management_profile_photos/${user.profile_photo}`}
              src={`https://ephadacademyportal.com.ng/ephad_api/uploads/student_profile_photos/${selectedStudent.profile_photo}`}
              alt={`${selectedStudent.first_name}'s profile`}
              style={{
                width:"200px",
                height:"200px",
                borderRadius:"50%"
              }}
            />
            <div>
            <h2>{selectedStudent.name}</h2>
            <p><strong>Name:</strong> {selectedStudent.first_name} {selectedStudent.last_name}</p>
            <p><strong>Reg No.:</strong> {selectedStudent.student_id}</p>
            <p><strong>Address:</strong> {selectedStudent.address}</p>
            <p><strong>Parents:</strong> {selectedStudent.parents}</p>
            <p><strong>Phone:</strong> {selectedStudent.phone_number}</p>
            <p><strong>Pickup Id:</strong> {selectedStudent.pickup_id}</p>
            <p style={{backgroundColor:`${selectedStudent.suspended?"red":""}`,color:`${selectedStudent.suspended?"white":""}`}}><strong>Suspended:</strong> {selectedStudent.suspended ? "Yes" : "No"}</p>
        
            </div>
            
<div style={{display:"flex",justifyContent:"center", alignItems:"center",gap:"10px", flexWrap:"wrap"}}>
<Button onClick={() => toggleSuspend(1,"suspend", selectedStudent)}>Suspend</Button>
                    <Button onClick={() => toggleSuspend(0,"unsuspend", selectedStudent)}>Unsuspend</Button>
                    <DeleteButton onClick={()=>deleteStudent(selectedStudent)}>Delete</DeleteButton>
                    {location.pathname.includes("teacher")&&<Button onClick={() => setShowScoreSheet(true)}>Score Sheet</Button>}
                    {location.pathname.includes("management") && <Button onClick={()=>handlePromoteStudent(selectedStudent.id, 1)} style={{backgroundColor:"#4caf50"}}>Promote Student</Button>}
      {location.pathname.includes("management") && <Button onClick={()=>handleDemoteStudent(selectedStudent.id, 1)} >Demote Student</Button>}
                    <DeleteButton onClick={() => setSelectedStudent(null)}>Close</DeleteButton>
                    {showScoreSheet && <StudentScoreSheet 
                    studentID={selectedStudent.id}
                    setShowScoreSheet={setShowScoreSheet}
                    selectedStudent={selectedStudent}
                    />}
</div>

            </Modal>
        </>
      )}

    </Container>
  );
};

export default StudentsByClass;
