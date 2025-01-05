// import React, { useEffect, useState } from 'react';
// import styled from 'styled-components';

// const ScoreSheetContainer = styled.div`
//   display: flex;
//   flex-direction: column;
//   align-items: center;
//   padding: 20px;
//   background-color: #f8f9fa;
//   min-height: 100vh;
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
// `;

// const OverallTotal = styled.div`
//   margin-top: 20px;
//   font-size: 18px;
//   font-weight: bold;
//   color: #007bff;
// `;




// const StudentResultContainer = styled.div`

// `


// const Filter = styled.div`

// `
// const Resultcard = styled.div`

// `


// const Div = styled.div`
//     display:flex;
//     justify-content:center;
//     align-items:center;
//     flex-direction:column;
//     gap:5px;
// `

// // const StudentResult = () => {
//     const StudentResult = ({ studentId, semesterId, classId }) => {
//   const [data, setData] = useState({ subjects2_results: [], tests_results: [], exams_results: [], assignments_results: [] });
//   const [overallTotal, setOverallTotal] = useState(0);

 
//     const fetchScores = async () => {
//       const url = `https://ephadacademyportal.com.ng/ephad_api/fetch_student_result_by_id_class_semester.php?student_id=${studentId}&semester_id=${semesterId}&class_id=${classId}`;
//       try {
//         const response = await fetch(url);
//         const result = await response.json();

//         if (result.success) {
//             console.log(result.data)
//           setData(result.data);

//           // Calculate the overall total
//           const subjectsTotal = result.data.subjects2_results.reduce((sum, subject) => {
//             return sum + Object.keys(subject)
//               .filter((key) => key.startsWith('subject_'))
//               .reduce((subSum, key) => subSum + parseInt(subject[key] || 0, 10), 0);
//           }, 0);

//           const testsTotal = result.data.tests_results.reduce((sum, test) => sum + parseInt(test.score || 0, 10), 0);
//           const examsTotal = result.data.exams_results.reduce((sum, exam) => sum + parseInt(exam.score || 0, 10), 0);
//           const assignmentsTotal = result.data.assignments_results.reduce(
//             (sum, assignment) => sum + parseInt(assignment.score || 0, 10),
//             0
//           );

//           setOverallTotal(subjectsTotal + testsTotal + examsTotal + assignmentsTotal);
//         }
//       } catch (error) {
//         console.error("Error fetching scores:", error);
//       }
//     };


//     useEffect(() => {
//     fetchScores();
//   }, [studentId, semesterId, classId]);

//   return (
//     <StudentResultContainer>
//         <Filter>

//         </Filter>
//         <ScoreSheetContainer>
//             {/* <button onClick={()=>fetchScores(93, 6, 6)}>fetch score</button> */}
//       <h1>Student Score Sheet</h1>
      
//     <Resultcard>
//     {data.subjects2_results.map((subject)=>( <Div>
//                <p>{subject.student_id}</p> 
//                <p>{subject.current_semester_id}</p>
//                <p>{subject.subject_1}</p>
// <p>{subject.subject_2}</p>
// <p>{subject.subject_3}</p>
// <p>{subject.subject_4}</p>
// <p>{subject.subject_5}</p>
// <p>{subject.subject_6}</p>
// <p>{subject.subject_7}</p>
// <p>{subject.subject_8}</p>
// <p>{subject.subject_9}</p>
// <p>{subject.subject_10}</p>
// <p>{subject.subject_11}</p>
// <p>{subject.subject_12}</p>
// <p>{subject.subject_13}</p>
// <p>{subject.subject_14}</p>
// <p>{subject.subject_15}</p>
// <p>{subject.subject_16}</p>
// <p>{subject.subject_17}</p>
// <p>{subject.subject_18}</p>
// <p>{subject.subject_19}</p>
// <p>{subject.subject_20}</p>
// <p>{subject.subject_21}</p>
// <p>{subject.subject_22}</p>
// <p>{subject.subject_23}</p>
// <p>{subject.subject_24}</p>
// <p>{subject.subject_25}</p>
// <p>{subject.subject_26}</p>
// <p>{subject.subject_27}</p>
// <p>{subject.subject_28}</p>
// <p>{subject.subject_29}</p>
// <p>{subject.subject_30}</p>

            
//         </Div>))}
//     </Resultcard>

//     </StudentResultContainer>



//   );
// };

// export default StudentResult;






import React, { useEffect, useState } from 'react';
import styled, {keyframes} from 'styled-components';
import { useContext } from 'react';
import { Context } from './Context';
import Swal from 'sweetalert2';



const ScoreSheetContainerA = styled.div`
    width:100%;
    display:flex;

`

const ScoreSheetContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
  background-color: #f8f9fa;
  min-height: 100vh;
`;

const StudentInfoContainer = styled.div`
  width: 100%;
  max-width: 1200px;
  background-color: #ffffff;
  border-radius: 8px;
  padding: 20px;
  margin-bottom: 30px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
  display: flex;
  flex-direction: column;
  align-items: center;

  @media (max-width: 768px) {
    padding: 15px;
  }
`;

const StudentInfo = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  width: 100%;
  margin-bottom: 20px;

  div {
    margin-bottom: 10px;
    width: 48%;
    
    @media (max-width: 768px) {
      width: 100%;
    }

    span {
      font-weight: bold;
      color: rgb(255, 0, 43,0.7);
    }
  }
`;

const TableContainer = styled.div`
  overflow-x: auto;
  width: 100%;
  max-width: 1200px;
`;

const ScoreTable = styled.table`
  width: 100%;
  border-collapse: collapse;
  margin: 20px 0;
  background-color: #ffffff;
  border-radius: 8px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);

  th, td {
    padding: 12px;
    text-align: center;
    border: 1px solid #ddd;
  }

  th {
    background-color:rgba(128,0,128,0.7) ;
    color: #fff;
    font-weight: bold;
  }

  @media (max-width: 768px) {
    th, td {
      padding: 8px;
    }
  }

  @media (max-width: 576px) {
    th, td {
      font-size: 12px;
    }
  }
`;

const OverallTotal = styled.div`
  margin-top: 20px;
  font-size: 18px;
  font-weight: bold;
  color: #007bff;
`;

const Resultcard = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Div = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  gap: 5px;
`;

const H1 = styled.h1`
    color:rgba(128,0,128,0.9);
    margin-bottom:20px;


`


const fadeIn = keyframes`
  from {
    opacity: 0;
    transform: translateY(10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;


const Form = styled.form`
  display: grid;
  grid-template-columns: 1fr;
  gap: 20px;
  background: white;
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
  // animation: ${fadeIn} 0.8s ease-in-out;

  @media (min-width: 768px) {
    grid-template-columns: 1fr 1fr;
  }
`;

const Input = styled.input`
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 5px;
  font-size: 1rem;
  outline: none;
`;

const Button = styled.button`
  grid-column: 1 / -1;
  padding: 10px 20px;
  background: #ff8095;
  color: white;
  border: none;
  border-radius: 5px;
  font-size: 1rem;
  cursor: pointer;

  &:hover {
    background: #e76880;
  }
`;


const Select = styled.select`
  padding: 5px;
  outline: none;
  cursor: pointer;
`;


const StudentResult = ({ studentId, semesterId,classId }) => {
// const {department,setDepartment,user,setUser}=useContext(Context)

// const [semesterId,setSemesterId]=useState(null);
// const [classId,setClassId]=useState(null);


const [studentDetails,setStudentDetails]=useState("")
const [studentData, setStudentData] = useState({});
    const [error, setError] = useState(null);

  const [data, setData] = useState({
    subjects2_results: [],
    tests_results: [],
    exams_results: [],
    assignments_results: [],
  });
  const [overallTotal, setOverallTotal] = useState(0);
//   const [studentDetails, setStudentDetails] = useState(null);

  const fetchScores = async () => {
    const url = `https://ephadacademyportal.com.ng/ephad_api/fetch_student_result_by_id_class_semester.php?student_id=${studentId}&semester_id=${semesterId}&class_id=${classId}`;
    try {
      const response = await fetch(url);
      const result = await response.json();

      if (result.success) {
        setData(result.data);
        console.log(result.data.subjects2_results[0]?.current_semester_id)
        setStudentDetails(result.data[0]); // Assuming the student details are in the first element

        fetchSemesterById(result.data.subjects2_results[0]?.current_semester_id);

        // Calculate the overall total
        const subjectsTotal = result.data.subjects2_results.reduce(
          (sum, subject) => {
            return (
              sum +
              Object.keys(subject)
                .filter((key) => key.startsWith('subject_'))
                .reduce((subSum, key) => subSum + parseInt(subject[key] || 0, 10), 0)
            );
          },
          0
        );

        const testsTotal = result.data.tests_results.reduce(
          (sum, test) => sum + parseInt(test.score || 0, 10),
          0
        );
        const examsTotal = result.data.exams_results.reduce(
          (sum, exam) => sum + parseInt(exam.score || 0, 10),
          0
        );
        const assignmentsTotal = result.data.assignments_results.reduce(
          (sum, assignment) => sum + parseInt(assignment.score || 0, 10),
          0
        );

        setOverallTotal(subjectsTotal + testsTotal + examsTotal + assignmentsTotal);
      }
    } catch (error) {
      console.error('Error fetching scores:', error);
    }
  };

  useEffect(() => {
    fetchScores();
  }, [studentId, semesterId, classId]);









  const [classes, setClasses] = useState([]);

useEffect(() => {
    fetchClasses();
  }, []);  

  const fetchClasses = async () => {
    try {
      const response = await fetch('https://ephadacademyportal.com.ng/ephad_api/fetch_classes.php');
      const data = await response.json();
      if (data.success) {
        setClasses(data.classes);
      } else {
        setError(data.error || 'Error fetching classes.');
      }
    } catch (err) {
      setError('Failed to fetch classes. Please try again.');
    }
  };




// const [user,setUser]=useState('')
//fetching class
const [classData, setClassData] = useState(null);
// const [loading, setLoading] = useState(true);
// const [error, setError] = useState(null);

useEffect(() => {
    const fetchClass = async () => {
        // setLoading(true);
        // setError(null);

        try {
            const response = await fetch(`https://ephadacademyportal.com.ng/ephad_api/fetch_class_by_id.php?id=${studentData?.class_id}`);
            
            if (!response.ok) {
                // throw new Error(`Error: ${response.status} - ${response.statusText}`);
                Swal.fire({text:response.status - response.statusText})
            }

            const data = await response.json();

            if (data.success) {
                setClassData(data.class);
                console.log(data.class)
            } else {
                // throw new Error(data.error || "Failed to fetch class.");
                Swal.fire({text:data.error|| "Failed to fetch department."})
            }
        } catch (err) {
            // setError(err.message);
            Swal.fire({text:err.message})
        } finally {
            // setLoading(false);
        }
    };

    if (studentData?.class_id) {
        fetchClass();
    }
}, [studentData?.class_id]);







  const fetchStudentData = async () => {
    

  
    try {
      // Construct the API URL
      const url = `https://ephadacademyportal.com.ng/ephad_api/fetch_student_result_table_by_id_by_class_id.php?id=${studentId}&class_id=${classId}`;
  
      // Fetch data from the backend
      const response = await fetch(url);
  
      // Parse the response as JSON
      const result = await response.json();
  
      if (result.success) {
        // Update state with fetched student data
        console.log(result)
        setStudentData(result.student_data);
      } else {
        // Handle errors from the API
        // setError(result.error || 'Failed to fetch student data.');
      }
    } catch (err) {
      // Handle network or other unexpected errors
    //   setError(err.message || 'An unexpected error occurred.');
    }
  };


  useEffect(()=>{
    fetchStudentData()
  },[])





const [resultSemester, setResultSemester]=useState({})

const fetchSemesterById = async (id) => {
  if (!id || isNaN(id)) {
    Swal.fire({
      icon: "error",
      title: "Invalid ID",
      text: "Please enter a valid numeric ID.",
    });
    return;
  }

  const lodaingAlert = Swal.fire({
    title: "Loading...",
    text: "Fetching semester details, please wait.",
    allowOutsideClick: false,
    didOpen: () => {
      Swal.showLoading();
    },
  });

  try {
    const response = await fetch(`https://ephadacademyportal.com.ng/ephad_api/fetch_semester_by_id.php?id=${id}`);
    const data = await response.json();

    if (data.success) {
      // Swal.fire({
      //   icon: "success",
      //   title: "Semester Found",
      //   html: `<pre>${JSON.stringify(data.semester, null, 2)}</pre>`,
      // });
      setResultSemester(data.semester)

    } else {
      Swal.fire({
        icon: "error",
        title: "Error",
        text: data.error || "Failed to fetch semester details.",
      });
    }
  } catch (error) {
    Swal.fire({
      icon: "error",
      title: "Request Failed",
      text: "An error occurred while fetching semester details.",
    });
  }finally{
    lodaingAlert.close();
  }
};



// component switch
const [componentSwicth, setComponentSwitch]=useState(false)


const handleSubmit=(e)=>{
  e.preventDefault();
  setComponentSwitch(true)
}


const [semesters,setSemesters]=useState([])

const fetchSemesters = async () => {
  try {
    const response = await fetch('https://ephadacademyportal.com.ng/ephad_api/fetch_semesters.php');
    const data = await response.json();
    if (data.success) setSemesters(data.semesters || []);
  } catch {}
};

useEffect(()=>{
  fetchSemesters()
},[])


  return (
<ScoreSheetContainer>

<H1 style={{letterSpacing:"40px",textAlign:"center"}}>EPHAD ACADEMY</H1>
<H1>Student Termly Result</H1>


<StudentInfoContainer>
  <StudentInfo>
    <div>
      <span>Student ID:</span> {studentData?.student_id}
    </div>
    {/* <div>
      <span>Department:</span> {studentData?.department_id}
    </div> */}
    <div>
      <span>Class:</span> {classData?.level}
    </div>
    <div>
      <span>Semester:</span> {resultSemester.name}
    </div>
    <div>
      <span>Student Name:</span> {studentData?.first_name} {studentData?.last_name}
    </div>
  </StudentInfo>
</StudentInfoContainer>


<TableContainer>
<ScoreTable>
  <thead>
    <tr>
      <th>Subject</th>
      <th>Assignment</th>
      <th>Test</th>
      <th>Exam</th>
      <th>Total</th>
    </tr>
  </thead>
  <tbody>
    {data.subjects2_results.map((subject, index) => {
      const subjectKeys = Object.keys(subject).filter((key) => key.startsWith('subject_'));
      const assignment = data.assignments_results[index]?.score || 0;
      const test = data.tests_results[index]?.score || 0;
      const exam = data.exams_results[index]?.score || 0;

      return subjectKeys.map((key, keyIndex) => {
        return (
          <tr key={`${index}-${keyIndex}`}>
            <td>{`Subject ${key.replace('subject_', '')}`}</td>
            <td>{subject[key]}</td>
            <td>{test}</td>
            <td>{exam}</td>
            <td>{parseInt(subject[key] || 0, 10) + test + exam + assignment}</td>
          </tr>
        );
      });
    })}
  </tbody>
</ScoreTable>
</TableContainer>

<OverallTotal>Overall Total: {overallTotal}</OverallTotal>

{/* <Resultcard>
    {data.subjects2_results.map((subject)=>( <Div>
               <p>{subject.student_id}</p> 
               <p>{subject.current_semester_id}</p>
               <p>{subject.subject_1}</p>
<p>{subject.subject_2}</p>
<p>{subject.subject_3}</p>
<p>{subject.subject_4}</p>
<p>{subject.subject_5}</p>
<p>{subject.subject_6}</p>
<p>{subject.subject_7}</p>
<p>{subject.subject_8}</p>
<p>{subject.subject_9}</p>
<p>{subject.subject_10}</p>
<p>{subject.subject_11}</p>
<p>{subject.subject_12}</p>
<p>{subject.subject_13}</p>
<p>{subject.subject_14}</p>
<p>{subject.subject_15}</p>
<p>{subject.subject_16}</p>
<p>{subject.subject_17}</p>
<p>{subject.subject_18}</p>
<p>{subject.subject_19}</p>
<p>{subject.subject_20}</p>
<p>{subject.subject_21}</p>
<p>{subject.subject_22}</p>
<p>{subject.subject_23}</p>
<p>{subject.subject_24}</p>
<p>{subject.subject_25}</p>
<p>{subject.subject_26}</p>
<p>{subject.subject_27}</p>
<p>{subject.subject_28}</p>
<p>{subject.subject_29}</p>
<p>{subject.subject_30}</p>

            
        </Div>))}
    </Resultcard> */}


</ScoreSheetContainer>

  );
};

export default StudentResult;























// import React, { useEffect, useState } from 'react';
// import styled, { keyframes } from 'styled-components';
// import Swal from 'sweetalert2';

// // Styled Components for UI
// const ScoreSheetContainerA = styled.div`
//   width: 100%;
//   display: flex;
// `;

// const ScoreSheetContainer = styled.div`
//   display: flex;
//   flex-direction: column;
//   align-items: center;
//   padding: 20px;
//   background-color: #f8f9fa;
//   min-height: 100vh;
// `;

// const StudentInfoContainer = styled.div`
//   width: 100%;
//   max-width: 1200px;
//   background-color: #ffffff;
//   border-radius: 8px;
//   padding: 20px;
//   margin-bottom: 30px;
//   box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
//   display: flex;
//   flex-direction: column;
//   align-items: center;
// `;

// const StudentInfo = styled.div`
//   display: flex;
//   flex-wrap: wrap;
//   justify-content: space-between;
//   width: 100%;
//   margin-bottom: 20px;

//   div {
//     margin-bottom: 10px;
//     width: 48%;
    
//     span {
//       font-weight: bold;
//       color: rgba(255, 0, 43, 0.7);
//     }

//     @media (max-width: 768px) {
//       width: 100%;
//     }
//   }
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
//     background-color: rgba(128, 0, 128, 0.7);
//     color: #fff;
//     font-weight: bold;
//   }

//   @media (max-width: 768px) {
//     th, td {
//       padding: 8px;
//     }
//   }

//   @media (max-width: 576px) {
//     th, td {
//       font-size: 12px;
//     }
//   }
// `;

// const OverallTotal = styled.div`
//   margin-top: 20px;
//   font-size: 18px;
//   font-weight: bold;
//   color: #007bff;
// `;

// const H1 = styled.h1`
//   color: rgba(128, 0, 128, 0.9);
//   margin-bottom: 20px;
//   text-align: center;
// `;

// const Form = styled.form`
//   display: grid;
//   grid-template-columns: 1fr;
//   gap: 20px;
//   background: white;
//   padding: 20px;
//   border-radius: 10px;
//   box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);

//   @media (min-width: 768px) {
//     grid-template-columns: 1fr 1fr;
//   }
// `;

// const Input = styled.input`
//   padding: 10px;
//   border: 1px solid #ddd;
//   border-radius: 5px;
//   font-size: 1rem;
//   outline: none;
// `;

// const Button = styled.button`
//   grid-column: 1 / -1;
//   padding: 10px 20px;
//   background: #ff8095;
//   color: white;
//   border: none;
//   border-radius: 5px;
//   font-size: 1rem;
//   cursor: pointer;

//   &:hover {
//     background: #e76880;
//   }
// `;

// const Select = styled.select`
//   padding: 5px;
//   outline: none;
//   cursor: pointer;
// `;

// // Main Component
// const StudentResult = ({ studentId, semesterId, classId }) => {
//   // State variables
//   const [studentData, setStudentData] = useState({});
//   const [data, setData] = useState({
//     subjects2_results: [],
//     tests_results: [],
//     exams_results: [],
//     assignments_results: []
//   });
//   const [overallTotal, setOverallTotal] = useState(0);
//   const [classData, setClassData] = useState(null);
//   const [resultSemester, setResultSemester] = useState({});
//   const [classes, setClasses] = useState([]);
//   const [semesters, setSemesters] = useState([]);
//   const [componentSwitch, setComponentSwitch] = useState(false);

//   // Fetch student result data
//   const fetchScores = async () => {
//     const url = `https://ephadacademyportal.com.ng/ephad_api/fetch_student_result_by_id_class_semester.php?student_id=${studentId}&semester_id=${semesterId}&class_id=${classId}`;
//     try {
//       const response = await fetch(url);
//       const result = await response.json();

//       if (result.success) {
//         setData(result.data);
//         setStudentData(result.data[0]);
//         fetchSemesterById(result.data.subjects2_results[0]?.current_semester_id);

//         // Calculate overall total
//         const subjectsTotal = result.data.subjects2_results.reduce((sum, subject) => {
//           return (
//             sum +
//             Object.keys(subject)
//               .filter((key) => key.startsWith('subject_'))
//               .reduce((subSum, key) => subSum + parseInt(subject[key] || 0, 10), 0)
//           );
//         }, 0);

//         const testsTotal = result.data.tests_results.reduce(
//           (sum, test) => sum + parseInt(test.score || 0, 10),
//           0
//         );
//         const examsTotal = result.data.exams_results.reduce(
//           (sum, exam) => sum + parseInt(exam.score || 0, 10),
//           0
//         );
//         const assignmentsTotal = result.data.assignments_results.reduce(
//           (sum, assignment) => sum + parseInt(assignment.score || 0, 10),
//           0
//         );

//         setOverallTotal(subjectsTotal + testsTotal + examsTotal + assignmentsTotal);
//       }
//     } catch (error) {
//       console.error('Error fetching scores:', error);
//     }
//   };

//   useEffect(() => {
//     fetchScores();
//   }, [studentId, semesterId, classId]);

//   // Fetch class data
//   useEffect(() => {
//     if (studentData?.class_id) {
//       const fetchClass = async () => {
//         try {
//           const response = await fetch(`https://ephadacademyportal.com.ng/ephad_api/fetch_class_by_id.php?id=${studentData.class_id}`);
//           const data = await response.json();

//           if (data.success) {
//             setClassData(data.class);
//           }
//         } catch (error) {
//           Swal.fire({ text: error.message });
//         }
//       };
//       fetchClass();
//     }
//   }, [studentData?.class_id]);

//   // Fetch semester data by ID
//   const fetchSemesterById = async (id) => {
//     try {
//       const response = await fetch(`https://ephadacademyportal.com.ng/ephad_api/fetch_semester_by_id.php?id=${id}`);
//       const data = await response.json();

//       if (data.success) {
//         setResultSemester(data.semester);
//       }
//     } catch (error) {
//       Swal.fire({ text: error.message });
//     }
//   };

//   // Fetch list of classes and semesters
//   useEffect(() => {
//     const fetchClasses = async () => {
//       try {
//         const response = await fetch('https://ephadacademyportal.com.ng/ephad_api/fetch_classes.php');
//         const data = await response.json();

//         if (data.success) {
//           setClasses(data.classes);
//         }
//       } catch {}
//     };

//     const fetchSemesters = async () => {
//       try {
//         const response = await fetch('https://ephadacademyportal.com.ng/ephad_api/fetch_semesters.php');
//         const data = await response.json();

//         if (data.success) {
//           setSemesters(data.semesters);
//         }
//       } catch {}
//     };

//     fetchClasses();
//     fetchSemesters();
//   }, []);

//   // Handle form submission to switch components
//   const handleSubmit = (e) => {
//     e.preventDefault();
//     setComponentSwitch(true);
//   };

//   return (
//     <ScoreSheetContainerA>
//       {!componentSwitch ? (
//         <Form onSubmit={handleSubmit}>
//           <Select value={classId} onChange={(e) => setClassId(e.target.value)}>
//             <option value="">Select Class</option>
//             {classes.map((cls) => (
//               <option key={cls.id} value={cls.id}>{cls.level}</option>
//             ))}
//           </Select>
//           <Select value={semesterId} onChange={(e) => setSemesterId(e.target.value)}>
//             <option value="">Select Term</option>
//             {semesters.map((semester) => (
//               <option key={semester.id} value={semester.id}>{semester.name}</option>
//             ))}
//           </Select>
//           <Button type="submit">Get Result</Button>
//         </Form>
//       ) : (
//         <ScoreSheetContainer>
//           <H1>EPHAD ACADEMY</H1>
//           <H1>Student Termly Result</H1>

//           <StudentInfoContainer>
//             <StudentInfo>
//               <div><span>Student ID:</span> {studentData?.student_id}</div>
//               <div><span>Class:</span> {classData?.level}</div>
//               <div><span>Semester:</span> {resultSemester.name}</div>
//               <div><span>Student Name:</span> {studentData?.first_name} {studentData?.last_name}</div>
//             </StudentInfo>
//           </StudentInfoContainer>

//           <TableContainer>
//             <ScoreTable>
//               <thead>
//                 <tr>
//                   <th>Subject</th>
//                   <th>Assignment</th>
//                   <th>Test</th>
//                   <th>Exam</th>
//                   <th>Total</th>
//                 </tr>
//               </thead>
//               <tbody>
//                 {data.subjects2_results.map((subject, index) => {
//                   const subjectKeys = Object.keys(subject).filter((key) => key.startsWith('subject_'));
//                   const assignment = data.assignments_results[index]?.score || 0;
//                   const test = data.tests_results[index]?.score || 0;
//                   const exam = data.exams_results[index]?.score || 0;

//                   return subjectKeys.map((key, keyIndex) => (
//                     <tr key={`${index}-${keyIndex}`}>
//                       <td>{`Subject ${key.replace('subject_', '')}`}</td>
//                       <td>{subject[key]}</td>
//                       <td>{test}</td>
//                       <td>{exam}</td>
//                       <td>{parseInt(subject[key] || 0, 10) + test + exam + assignment}</td>
//                     </tr>
//                   ));
//                 })}
//               </tbody>
//             </ScoreTable>
//           </TableContainer>

//           <OverallTotal>Overall Total: {overallTotal}</OverallTotal>
//         </ScoreSheetContainer>
//       )}
//     </ScoreSheetContainerA>
//   );
// };

// export default StudentResult;

