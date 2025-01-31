
import React, { useEffect, useState } from "react";
import styled from "styled-components";
import Swal from "sweetalert2";
import axios from "axios";


const ScoreSheetContainer = styled.div`
  display: flex;
  flex-direction:column;
  // align-items: center;
  // padding: 20px;
  background-color: #f8f9fa;
  // min-height: 100vh;
  position: fixed;
  top: 50%;
  left: 50%;
  height: 100vh;
  transform: translate(-50%, -50%);
  overflow-x:scroll;
  width:800px;
 `

const Titles = styled.h5`
  color:purple;
`

const Container = styled.div`
  display: flex;
  // align-items: center;
  // padding: 20px;
     overflow-y:scroll;
`;

const TableContainerA = styled.div`
  display: flex;
  justify-content:space-between;
  // flex-direction: column;
  // border: 1px solid #ddd;
  // margin: 10px;
  padding: 10px;
  width: 100%;
  box-shadow: rgba(0, 0, 0, 0.1) 0px 3px 0px;
  
`;

// Styled components for table-like structure
const TableContainer = styled.div`
  display: flex;
  flex-direction: column;
  // border: 1px solid #ddd;
  margin: 10px;
  padding: 10px;
  font-size:14px;
  // width: 300px;
 
`;

const Row = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 8px 0;
  border-bottom: 1px solid #eee;
`;

const SubjectName = styled.div`
  flex: 1;
  padding-left: 10px;
  font-weight: 500;
`;

const Score = styled.div`
  // width: 100px;
  text-align: center;
  font-weight: 500;
`;

const H1 = styled.h2`
  text-align:center;
  color:purple;

`

const H3 = styled.h3`
  text-align:center;
  color:purple;
`

const P = styled.p`
  cursor:pointer; 
  position:absolute;
  top:0px;
  right:0px;
  background-color:red;
  color:white;
  padding:5px;
`
const P2 = styled.p`
  cursor:pointer; 
  position:absolute;
  top:0px;
  right:50px;
  background-color:green;
  color:white;
  padding:5px;
`


const Input = styled.input`
  width:30px;
  // height:20px; 
  margin-left:10px;
`


const StudentScoreSheet = ({setShowScoreSheet, selectedStudent}) => {

  const [subjects,setSubjects]=useState([])
  const [exams,setExams]=useState([])
  const [tests, setTests]=useState([])
  const [assignments, setAssignments]=useState([])
  const [assignmentsEdit, setAssignmentsEdit] = useState({
    assignment_1: assignments[0]?.assignment_1,
    assignment_2: assignments[0]?.assignment_2,
    assignment_3: assignments[0]?.assignment_3,
    assignment_4: assignments[0]?.assignment_4,
    assignment_5: assignments[0]?.assignment_5,
    assignment_6: assignments[0]?.assignment_6,
    assignment_7: assignments[0]?.assignment_7,
    assignment_8: assignments[0]?.assignment_8,
    assignment_9: assignments[0]?.assignment_9,
    assignment_10: assignments[0]?.assignment_10,
    assignment_11: assignments[0]?.assignment_11,
    assignment_12: assignments[0]?.assignment_12,
    assignment_13: assignments[0]?.assignment_13,
    assignment_14: assignments[0]?.assignment_14,
    assignment_15: assignments[0]?.assignment_15,
    assignment_16: assignments[0]?.assignment_16,
    assignment_17: assignments[0]?.assignment_17,
    assignment_18: assignments[0]?.assignment_18,
    assignment_19: assignments[0]?.assignment_19,
    assignment_20: assignments[0]?.assignment_20,
    assignment_21: assignments[0]?.assignment_21,
    assignment_22: assignments[0]?.assignment_22,
    assignment_23: assignments[0]?.assignment_23,
    assignment_24: assignments[0]?.assignment_24,
    assignment_25: assignments[0]?.assignment_25,
    assignment_26: assignments[0]?.assignment_26,
    assignment_27: assignments[0]?.assignment_27,
    assignment_28: assignments[0]?.assignment_28,
    assignment_29: assignments[0]?.assignment_29,
    assignment_30: assignments[0]?.assignment_30
});


  console.log(assignmentsEdit)

  const [examsEdit, setExamsEdit] = useState({
    exam_1: exams[0]?.exam_1,
    exam_2: exams[0]?.exam_2,
    exam_3: exams[0]?.exam_3,
    exam_4: exams[0]?.exam_4,
    exam_5: exams[0]?.exam_5,
    exam_6: exams[0]?.exam_6,
    exam_7: exams[0]?.exam_7,
    exam_8: exams[0]?.exam_8,
    exam_9: exams[0]?.exam_9,
    exam_10: exams[0]?.exam_10,
    exam_11: exams[0]?.exam_11,
    exam_12: exams[0]?.exam_12,
    exam_13: exams[0]?.exam_13,
    exam_14: exams[0]?.exam_14,
    exam_15: exams[0]?.exam_15,
    exam_16: exams[0]?.exam_16,
    exam_17: exams[0]?.exam_17,
    exam_18: exams[0]?.exam_18,
    exam_19: exams[0]?.exam_19,
    exam_20: exams[0]?.exam_20,
    exam_21: exams[0]?.exam_21,
    exam_22: exams[0]?.exam_22,
    exam_23: exams[0]?.exam_23,
    exam_24: exams[0]?.exam_24,
    exam_25: exams[0]?.exam_25,
    exam_26: exams[0]?.exam_26,
    exam_27: exams[0]?.exam_27,
    exam_28: exams[0]?.exam_28,
    exam_29: exams[0]?.exam_29,
    exam_30: exams[0]?.exam_30
});

console.log(examsEdit)


const [testsEdit, setTestsEdit] = useState({
  test_1: tests[0]?.test_1,
  test_2: tests[0]?.test_2,
  test_3: tests[0]?.test_3,
  test_4: tests[0]?.test_4,
  test_5: tests[0]?.test_5,
  test_6: tests[0]?.test_6,
  test_7: tests[0]?.test_7,
  test_8: tests[0]?.test_8,
  test_9: tests[0]?.test_9,
  test_10: tests[0]?.test_10,
  test_11: tests[0]?.test_11,
  test_12: tests[0]?.test_12,
  test_13: tests[0]?.test_13,
  test_14: tests[0]?.test_14,
  test_15: tests[0]?.test_15,
  test_16: tests[0]?.test_16,
  test_17: tests[0]?.test_17,
  test_18: tests[0]?.test_18,
  test_19: tests[0]?.test_19,
  test_20: tests[0]?.test_20,
  test_21: tests[0]?.test_21,
  test_22: tests[0]?.test_22,
  test_23: tests[0]?.test_23,
  test_24: tests[0]?.test_24,
  test_25: tests[0]?.test_25,
  test_26: tests[0]?.test_26,
  test_27: tests[0]?.test_27,
  test_28: tests[0]?.test_28,
  test_29: tests[0]?.test_29,
  test_30: tests[0]?.test_30
});


  




const [subjectsEdit, setSubjectsEdit] = useState({
  subject_1: subjects[0]?.subject_1,
  subject_2: subjects[0]?.subject_2,
  subject_3: subjects[0]?.subject_3,
  subject_4: subjects[0]?.subject_4,
  subject_5: subjects[0]?.subject_5,
  subject_6: subjects[0]?.subject_6,
  subject_7: subjects[0]?.subject_7,
  subject_8: subjects[0]?.subject_8,
  subject_9: subjects[0]?.subject_9,
  subject_10: subjects[0]?.subject_10,
  subject_11: subjects[0]?.subject_11,
  subject_12: subjects[0]?.subject_12,
  subject_13: subjects[0]?.subject_13,
  subject_14: subjects[0]?.subject_14,
  subject_15: subjects[0]?.subject_15,
  subject_16: subjects[0]?.subject_16,
  subject_17: subjects[0]?.subject_17,
  subject_18: subjects[0]?.subject_18,
  subject_19: subjects[0]?.subject_19,
  subject_20: subjects[0]?.subject_20,
  subject_21: subjects[0]?.subject_21,
  subject_22: subjects[0]?.subject_22,
  subject_23: subjects[0]?.subject_23,
  subject_24: subjects[0]?.subject_24,
  subject_25: subjects[0]?.subject_25,
  subject_26: subjects[0]?.subject_26,
  subject_27: subjects[0]?.subject_27,
  subject_28: subjects[0]?.subject_28,
  subject_29: subjects[0]?.subject_29,
  subject_30: subjects[0]?.subject_30,
});

// console.log(subjectsEdit)


// useEffect(() => {
//   // Function to calculate totals for each subject
//   const calculateSubjectTotals = () => {
//     const updatedSubjects = {};

//     for (let i = 1; i <= 30; i++) {
//       const assignmentScore = parseFloat(assignmentsEdit[`assignment_${i}`]);
//       const testScore = parseFloat(testsEdit[`test_${i}`]);
//       const examScore = parseFloat(examsEdit[`exam_${i}`]);

//       updatedSubjects[`subject_${i}`] = assignmentScore + testScore + examScore;
//     }

//     setSubjectsEdit(updatedSubjects);
//   };

//   calculateSubjectTotals();
// }, [assignmentsEdit, testsEdit, examsEdit]); // Recalculate whenever any of the states change






useEffect(()=>{
  fetchSubjects(selectedStudent.id)
  fetchExams(selectedStudent.id)
  fetchTests(selectedStudent.id)
  fetchAssignments(selectedStudent.id)
},[])

  const fetchSubjects = async (studentId) => {
    try {
      const response = await fetch(`https://ephadacademyportal.com.ng/ephad_api/fetch_subjets2_by_student_id.php?student_id=${studentId}`, {
        method: 'GET',
      });
      const data = await response.json();
  
      if (data.success) {
        // console.log('Subjects:', data.subjects);
        setSubjects(data.subjects)
      } else {
        console.error('Error:', data.error);
      } 
    } catch (error) {
      console.error('Fetch failed:', error);
    }
  };



  const fetchExams = async (studentId) => {
    try {
      const response = await fetch(`https://ephadacademyportal.com.ng/ephad_api/fetch_exams_by_student_id.php?student_id=${studentId}`, {
        method: 'GET',
      });
      const data = await response.json();
  
      if (data.success) {
        // console.log('Subjects:', data.exams);
        setExams(data.exams)
      } else {
        console.error('Error:', data.error);
      }
    } catch (error) {
      console.error('Fetch failed:', error);
    }
  };


  const fetchTests = async (studentId) => {
    try {
      const response = await fetch(`https://ephadacademyportal.com.ng/ephad_api/fetch_tests_by_student_id.php?student_id=${studentId}`, {
        method: 'GET',
      });
      const data = await response.json();
  
      if (data.success) {
        // console.log('Subjects:', data.tests);
        setTests(data.tests)
      } else {
        console.error('Error:', data.error);
      }
    } catch (error) {
      console.error('Fetch failed:', error);
    }
  };



  const fetchAssignments = async (studentId) => {
    try {
      const response = await fetch(`https://ephadacademyportal.com.ng/ephad_api/fetch_assignments_by_student_id.php?student_id=${studentId}`, {
        method: 'GET',
      });
      const data = await response.json();
  
      if (data.success) {
        // console.log('Subjects:', data.assignments);
        setAssignments(data.assignments)
      } else {
        // console.error('Error:', data.error);
      }
    } catch (error) {
      console.error('Fetch failed:', error);
    }
  };



  const subjectsList = [
    // Pre-Nursery and Nursery unique subjects
    "(Pre-Nursery & Nursery)-Literacy",
    "(Pre-Nursery & Nursery)-Numeracy",
    "(Pre-Nursery & Nursery)-Social Norms",
    "(Pre-Nursery & Nursery)-Pre-Sciences",
    "(Pre-Nursery & Nursery)-Moral Habits",
    "(Pre-Nursery & Nursery)-Health Habits",
    "(Pre-Nursery & Nursery)-Sensorial Education",
    "(Pre-Nursery & Nursery)-Practical Life Exercise (PLE)",
    "(Pre-Nursery & Nursery)-Rhymes",
    "(Pre-Nursery & Nursery)-Drawing and Colouring",
  
    // Subjects from all three lists (avoiding duplicates)
    "(Pre-Nursery, Nursery, Primary)-Phonics",
    "(Pre-Nursery, Nursery, Primary)-Handwriting",
  
    // Primary unique subjects
    "(Primary)-English Studies",
    "(Primary)-Mathematics",
    "(Primary)-Verbal Reasoning",
    "(Primary)-Quantitative Reasoning",
    "(Primary)-Basic Science",
    "(Primary)-Social Studies",
    "(Primary)-Christian Religious Studies (CRS)",
    "(Primary)-Vocational Aptitude",
    "(Primary)-Civic Education",
    "(Primary)-Computer Science (ICT)",
    "(Primary)-Agricultural Science",
    "(Primary)-Physical Health Education (PHE)",
    "(Primary)-History",
    "(Primary)-Home Economics",
    "(Primary)-Cultural and Creative Arts (CCA)"
  ];

  console.log(subjectsList.length)
  


  const preNurserySubjects = [
    "Literacy",
    "Numeracy",
    "Social Norms",
    "Pre-Sciences",
    "Moral Habits",
    "Health Habits",
    "Sensorial Education",
    "Practical Life Exercise (PLE)",
    "Rhymes",
    "Drawing and Colouring",
    "Phonics",
    "Handwriting"
  ];

  
  const nurserySubjects = [
    "Literacy",
    "Numeracy",
    "Social Norms",
    "Pre-Sciences",
    "Moral Habits",
    "Health Habits",
    "Sensorial Education",
    "Practical Life Exercise (PLE)",
    "Rhymes",
    "Drawing and Colouring",
    "Verbal Reasoning",
    "Quantitative Reasoning",
    "Phonics",
    "Handwriting"
  ];

  
  const primarySubjects = [
    "English Studies",
    "Mathematics",
    "Verbal Reasoning",
    "Quantitative Reasoning",
    "Phonics",
    "Basic Science",
    "Social Studies",
    "Christian Religious Studies (CRS)",
    "Vocational Aptitude",
    "Civic Education",
    "Computer Science (ICT)",
    "Agricultural Science",
    "Physical Health Education (PHE)",
    "History",
    "Home Economics",
    "Handwriting",
    "Cultural and Creative Arts (CCA)"
  ];




  const handleSubmitAssignmentEdit = async () => {
    const loadingAlert = Swal.fire({text:'Please wait...'})
    Swal.showLoading();
    try {
      const response = await axios.post(
        `https://ephadacademyportal.com.ng/ephad_api/update_student_assignment_score.php`,
        {
          student_id: selectedStudent.id,
          assignment_scores: assignmentsEdit, // Sending updated assignments as an object
        }
      );

      console.log(assignmentsEdit)



      if (response.data.success) {
        // alert("Scores updated successfully!");
        Swal.fire({text:"Scores updated successfully!", icon:"success"})
        loadingAlert.close();
        // fetchSubjects(selectedStudent.id)
        // fetchExams(selectedStudent.id)
        // fetchTests(selectedStudent.id)
        fetchAssignments(selectedStudent.id)

        setShowScoreSheet(false);

      } else {
        Swal.fire({text:response.data.error || "Failed to update scores."});
        loadingAlert.close();
      }
    } catch (err) {
      // setError("An error occurred while updating assignments.");
      console.error(err)
      loadingAlert.close();
    }finally{
      // loadingAlert.close();
    }
  };
  


  
  const handleSubmitExamsEdit = async () => {
    const loadingAlert = Swal.fire({text:'Please wait...'})
    Swal.showLoading();
    try {
      const response = await axios.post(
        `https://ephadacademyportal.com.ng/ephad_api/update_student_exam_score.php`,
        {
          student_id: selectedStudent.id,
          exam_scores: examsEdit, // Sending updated assignments as an object
        }
      );

      if (response.data.success) {
        // alert("Scores updated successfully!");
        Swal.fire({text:"Scores updated successfully!", icon:"success"})
        loadingAlert.close();
        // fetchSubjects(selectedStudent.id)
        fetchExams(selectedStudent.id)
        // fetchTests(selectedStudent.id)
        // fetchAssignments(selectedStudent.id)

        setShowScoreSheet(false);

      } else {
        Swal.fire({text:response.data.error || "Failed to update scores."});
        loadingAlert.close();
      }
    } catch (err) {
      // setError("An error occurred while updating assignments.");
      console.error(err)
      loadingAlert.close();
    }finally{
      // loadingAlert.close();
    }
  };
  




  const handleSubmitTestsEdit = async () => {
    const loadingAlert = Swal.fire({text:'Please wait...'})
    Swal.showLoading();
    try {
      const response = await axios.post(
        `https://ephadacademyportal.com.ng/ephad_api/update_student_test_score.php`,
        {
          student_id: selectedStudent.id,
          test_scores: testsEdit, // Sending updated assignments as an object
        }
      );

      if (response.data.success) {
        // alert("Scores updated successfully!");
        Swal.fire({text:"Scores updated successfully!", icon:"success"})
        loadingAlert.close();
        // fetchSubjects(selectedStudent.id)
        // fetchExams(selectedStudent.id)
        fetchTests(selectedStudent.id)
        // fetchAssignments(selectedStudent.id)

        setShowScoreSheet(false);

      } else {
        Swal.fire({text:response.data.error || "Failed to update scores."});
        loadingAlert.close();
      }
    } catch (err) {
      // setError("An error occurred while updating assignments.");
      console.error(err)
      loadingAlert.close();
    }finally{
      // loadingAlert.close();
    }
  };
  

  const [totalScoreA,setTotalScoreA]=useState(0)
   
  const calculateTotalScore = () => {
    let totalScore = 0;
  
    // Iterate through all keys for assignments, tests, and exams
    for (let i = 1; i <= 30; i++) {
      const assignmentKey = `assignment_${i}`;
      const testKey = `test_${i}`;
      const examKey = `exam_${i}`;
  
      // Add the respective values to the totalScore, ensuring they are numbers
      totalScore += (assignments[0]?.[assignmentKey] || 0);
      totalScore += (tests[0]?.[testKey] || 0);
      totalScore += (exams[0]?.[examKey] || 0);
    }
  
    setTotalScoreA(totalScore)
  };

  useEffect(()=>{
    calculateTotalScore()
  },[assignments, tests, exams])
  


  return (

    <ScoreSheetContainer>

      <H1>Student Score Sheet</H1>
      <H3>Total Score: {totalScoreA}</H3>
      <P2 onClick={()=>{handleSubmitAssignmentEdit();handleSubmitExamsEdit();handleSubmitTestsEdit()}}>Save</P2>
      <P onClick={()=>setShowScoreSheet(false)}>Close</P>

            <TableContainerA>
  <Row>
    <Titles>Subjects</Titles>
  </Row>
  <Row>
    <Titles>Assignments</Titles>
  </Row>
  <Row>
    <Titles>Tests</Titles>
  </Row>

  <Row>
    <Titles>Exams</Titles>
  </Row>

  <Row>
    <Titles>Total</Titles>
  </Row>
 
</TableContainerA>
          <Container>
          <TableContainer>
  <Row>
    <div>{subjectsList[0]}</div>
  </Row>
  <Row>
    <div>{subjectsList[1]}</div>
  </Row>
  <Row>
    <div>{subjectsList[2]}</div>
  </Row>
  <Row>
    <div>{subjectsList[3]}</div>
  </Row>
  <Row>
    <div>{subjectsList[4]}</div>
  </Row>
  <Row>
    <div>{subjectsList[5]}</div>
  </Row>
  <Row>
    <div>{subjectsList[6]}</div>
  </Row>
  <Row>
    <div>{subjectsList[7]}</div>
  </Row>
  <Row>
    <div>{subjectsList[8]}</div>
  </Row>
  <Row>
    <div>{subjectsList[9]}</div>
  </Row>
  <Row>
    <div>{subjectsList[10]}</div>
  </Row>
  <Row>
    <div>{subjectsList[11]}</div>
  </Row>
  <Row>
    <div>{subjectsList[12]}</div>
  </Row>
  <Row>
    <div>{subjectsList[13]}</div>
  </Row>
  <Row>
    <div>{subjectsList[14]}</div>
  </Row>
  <Row>
    <div>{subjectsList[15]}</div>
  </Row>
  <Row>
    <div>{subjectsList[16]}</div>
  </Row>
  <Row>
    <div>{subjectsList[17]}</div>
  </Row>
  <Row>
    <div>{subjectsList[18]}</div>
  </Row>
  <Row>
    <div>{subjectsList[19]}</div>
  </Row>
  <Row>
    <div>{subjectsList[20]}</div>
  </Row>
  <Row>
    <div>{subjectsList[21]}</div>
  </Row>
  <Row>
    <div>{subjectsList[22]}</div>
  </Row>
  <Row>
    <div>{subjectsList[23]}</div>
  </Row>
  <Row>
    <div>{subjectsList[24]}</div>
  </Row>
  <Row>
    <div>{subjectsList[25]}</div>
  </Row>
  <Row>
    <div>{subjectsList[26]}</div>
  </Row>
</TableContainer>



        {/* assignment scores */}
        {/* <TableContainer>
  <Row>
    <Score>{assignments[0]?.assignment_1}</Score>
    <Input onChange={(e)=>setAssignmentsEdit({...assignmentsEdit, assignment_1:parseFloat(e.target.value) + parseFloat(assignments[0]?.assignment_1) })}/>
  </Row>
  <Row>
    <Score>{assignments[0]?.assignment_2}</Score>
  </Row>
  <Row>
    <Score>{assignments[0]?.assignment_3}</Score>
  </Row>
  <Row>
    <Score>{assignments[0]?.assignment_4}</Score>
  </Row>
  <Row>
    <Score>{assignments[0]?.assignment_5}</Score>
  </Row>
  <Row>
    <Score>{assignments[0]?.assignment_6}</Score>
  </Row>
  <Row>
    <Score>{assignments[0]?.assignment_7}</Score>
  </Row>
  <Row>
    <Score>{assignments[0]?.assignment_8}</Score>
  </Row>
  <Row>
    <Score>{assignments[0]?.assignment_9}</Score>
  </Row>
  <Row>
    <Score>{assignments[0]?.assignment_10}</Score>
  </Row>
  <Row>
    <Score>{assignments[0]?.assignment_11}</Score>
  </Row>
  <Row>
    <Score>{assignments[0]?.assignment_12}</Score>
  </Row>
  <Row>
    <Score>{assignments[0]?.assignment_13}</Score>
  </Row>
  <Row>
    <Score>{assignments[0]?.assignment_14}</Score>
  </Row>
  <Row>
    <Score>{assignments[0]?.assignment_15}</Score>
  </Row>
  <Row>
    <Score>{assignments[0]?.assignment_16}</Score>
  </Row>
  <Row>
    <Score>{assignments[0]?.assignment_17}</Score>
  </Row>
  <Row>
    <Score>{assignments[0]?.assignment_18}</Score>
  </Row>
  <Row>
    <Score>{assignments[0]?.assignment_19}</Score>
  </Row>
  <Row>
    <Score>{assignments[0]?.assignment_20}</Score>
  </Row>
  <Row>
    <Score>{assignments[0]?.assignment_21}</Score>
  </Row>
  <Row>
    <Score>{assignments[0]?.assignment_22}</Score>
  </Row>
  <Row>
    <Score>{assignments[0]?.assignment_23}</Score>
  </Row>
  <Row>
    <Score>{assignments[0]?.assignment_24}</Score>
  </Row>
  <Row>
    <Score>{assignments[0]?.assignment_25}</Score>
  </Row>
  <Row>
    <Score>{assignments[0]?.assignment_26}</Score>
  </Row>
  <Row>
    <Score>{assignments[0]?.assignment_27}</Score>
  </Row>
  <Row>
    <Score>{assignments[0]?.assignment_28}</Score>
  </Row>
  <Row>
    <Score>{assignments[0]?.assignment_29}</Score>
  </Row>
  <Row>
    <Score>{assignments[0]?.assignment_30}</Score>
  </Row>
</TableContainer> */}

<TableContainer>
  {Array.from({ length: 30 }, (_, index) => {
    const assignmentKey = `assignment_${index + 1}`;
    return (
      <Row key={index}>
        <Score>{assignments[0]?.[assignmentKey]}</Score>
        <Input 
          onChange={(e) => 
            setAssignmentsEdit({
              ...assignmentsEdit,
              [assignmentKey]: parseFloat(e.target.value) + parseFloat(assignments[0]?.[assignmentKey]),
            })
          }
        />
      </Row>
    );
  })}
</TableContainer>


  
  {/* test scores */}
  {/* <TableContainer>
  <Row>
    <Score>{tests[0]?.test_1}</Score>
  </Row>
  <Row>
    <Score>{tests[0]?.test_2}</Score>
  </Row>
  <Row>
    <Score>{tests[0]?.test_3}</Score>
  </Row>
  <Row>
    <Score>{tests[0]?.test_4}</Score>
  </Row>
  <Row>
    <Score>{tests[0]?.test_5}</Score>
  </Row>
  <Row>
    <Score>{tests[0]?.test_6}</Score>
  </Row>
  <Row>
    <Score>{tests[0]?.test_7}</Score>
  </Row>
  <Row>
    <Score>{tests[0]?.test_8}</Score>
  </Row>
  <Row>
    <Score>{tests[0]?.test_9}</Score>
  </Row>
  <Row>
    <Score>{tests[0]?.test_10}</Score>
  </Row>
  <Row>
    <Score>{tests[0]?.test_11}</Score>
  </Row>
  <Row>
    <Score>{tests[0]?.test_12}</Score>
  </Row>
  <Row>
    <Score>{tests[0]?.test_13}</Score>
  </Row>
  <Row>
    <Score>{tests[0]?.test_14}</Score>
  </Row>
  <Row>
    <Score>{tests[0]?.test_15}</Score>
  </Row>
  <Row>
    <Score>{tests[0]?.test_16}</Score>
  </Row>
  <Row>
    <Score>{tests[0]?.test_17}</Score>
  </Row>
  <Row>
    <Score>{tests[0]?.test_18}</Score>
  </Row>
  <Row>
    <Score>{tests[0]?.test_19}</Score>
  </Row>
  <Row>
    <Score>{tests[0]?.test_20}</Score>
  </Row>
  <Row>
    <Score>{tests[0]?.test_21}</Score>
  </Row>
  <Row>
    <Score>{tests[0]?.test_22}</Score>
  </Row>
  <Row>
    <Score>{tests[0]?.test_23}</Score>
  </Row>
  <Row>
    <Score>{tests[0]?.test_24}</Score>
  </Row>
  <Row>
    <Score>{tests[0]?.test_25}</Score>
  </Row>
  <Row>
    <Score>{tests[0]?.test_26}</Score>
  </Row>
  <Row>
    <Score>{tests[0]?.test_27}</Score>
  </Row>
  <Row>
    <Score>{tests[0]?.test_28}</Score>
  </Row>
  <Row>
    <Score>{tests[0]?.test_29}</Score>
  </Row>
  <Row>
    <Score>{tests[0]?.test_30}</Score>
  </Row>
</TableContainer> */}



  {/* exam scores */}
  {/* <TableContainer>
  <Row>
    <Score>{exams[0]?.exam_1}</Score>
  </Row>
  <Row>
    <Score>{exams[0]?.exam_2}</Score>
  </Row>
  <Row>
    <Score>{exams[0]?.exam_3}</Score>
  </Row>
  <Row>
    <Score>{exams[0]?.exam_4}</Score>
  </Row>
  <Row>
    <Score>{exams[0]?.exam_5}</Score>
  </Row>
  <Row>
    <Score>{exams[0]?.exam_6}</Score>
  </Row>
  <Row>
    <Score>{exams[0]?.exam_7}</Score>
  </Row>
  <Row>
    <Score>{exams[0]?.exam_8}</Score>
  </Row>
  <Row>
    <Score>{exams[0]?.exam_9}</Score>
  </Row>
  <Row>
    <Score>{exams[0]?.exam_10}</Score>
  </Row>
  <Row>
    <Score>{exams[0]?.exam_11}</Score>
  </Row>
  <Row>
    <Score>{exams[0]?.exam_12}</Score>
  </Row>
  <Row>
    <Score>{exams[0]?.exam_13}</Score>
  </Row>
  <Row>
    <Score>{exams[0]?.exam_14}</Score>
  </Row>
  <Row>
    <Score>{exams[0]?.exam_15}</Score>
  </Row>
  <Row>
    <Score>{exams[0]?.exam_16}</Score>
  </Row>
  <Row>
    <Score>{exams[0]?.exam_17}</Score>
  </Row>
  <Row>
    <Score>{exams[0]?.exam_18}</Score>
  </Row>
  <Row>
    <Score>{exams[0]?.exam_19}</Score>
  </Row>
  <Row>
    <Score>{exams[0]?.exam_20}</Score>
  </Row>
  <Row>
    <Score>{exams[0]?.exam_21}</Score>
  </Row>
  <Row>
    <Score>{exams[0]?.exam_22}</Score>
  </Row>
  <Row>
    <Score>{exams[0]?.exam_23}</Score>
  </Row>
  <Row>
    <Score>{exams[0]?.exam_24}</Score>
  </Row>
  <Row>
    <Score>{exams[0]?.exam_25}</Score>
  </Row>
  <Row>
    <Score>{exams[0]?.exam_26}</Score>
  </Row>
  <Row>
    <Score>{exams[0]?.exam_27}</Score>
  </Row>
  <Row>
    <Score>{exams[0]?.exam_28}</Score>
  </Row>
  <Row>
    <Score>{exams[0]?.exam_29}</Score>
  </Row>
  <Row>
    <Score>{exams[0]?.exam_30}</Score>
  </Row>
</TableContainer> */}



<TableContainer>

    {/* For Tests */}
    {Array.from({ length: 30 }, (_, index) => {
    const testKey = `test_${index + 1}`;
    return (
      <Row key={`test-${index}`}>
        <Score>{tests[0]?.[testKey]}</Score>
        <Input 
          onChange={(e) => 
            setTestsEdit({
              ...testsEdit,
              [testKey]: parseFloat(e.target.value) + parseFloat(tests[0]?.[testKey]),
            })
          }
        />
      </Row>
    );
  })}
  
</TableContainer>




 {/* For Exams */}
 <TableContainer>
  {Array.from({ length: 30 }, (_, index) => {
    const examKey = `exam_${index + 1}`;
    return (
      <Row key={`exam-${index}`}>
        <Score>{exams[0]?.[examKey]}</Score>
        <Input 
          onChange={(e) => {
            const newValue = parseFloat(e.target.value) + parseFloat(exams[0]?.[examKey] || 0);
            setExamsEdit((prevExamsEdit) => ({
              ...prevExamsEdit,
              [examKey]: newValue,
            }));
          }}
        />
      </Row>
    );
  })}
</TableContainer>







  {/* TOTAL scores
  <TableContainer>
  <Row>
    <Score>{subjects[0]?.subject_1}</Score>
  </Row>
  <Row>
    <Score>{subjects[0]?.subject_2}</Score>
  </Row>
  <Row>
    <Score>{subjects[0]?.subject_3}</Score>
  </Row>
  <Row>
    <Score>{subjects[0]?.subject_4}</Score>
  </Row>
  <Row>
    <Score>{subjects[0]?.subject_5}</Score>
  </Row>
  <Row>
    <Score>{subjects[0]?.subject_6}</Score>
  </Row>
  <Row>
    <Score>{subjects[0]?.subject_7}</Score>
  </Row>
  <Row>
    <Score>{subjects[0]?.subject_8}</Score>
  </Row>
  <Row>
    <Score>{subjects[0]?.subject_9}</Score>
  </Row>
  <Row>
    <Score>{subjects[0]?.subject_10}</Score>
  </Row>
  <Row>
    <Score>{subjects[0]?.subject_11}</Score>
  </Row>
  <Row>
    <Score>{subjects[0]?.subject_12}</Score>
  </Row>
  <Row>
    <Score>{subjects[0]?.subject_13}</Score>
  </Row>
  <Row>
    <Score>{subjects[0]?.subject_14}</Score>
  </Row>
  <Row>
    <Score>{subjects[0]?.subject_15}</Score>
  </Row>
  <Row>
    <Score>{subjects[0]?.subject_16}</Score>
  </Row>
  <Row>
    <Score>{subjects[0]?.subject_17}</Score>
  </Row>
  <Row>
    <Score>{subjects[0]?.subject_18}</Score>
  </Row>
  <Row>
    <Score>{subjects[0]?.subject_19}</Score>
  </Row>
  <Row>
    <Score>{subjects[0]?.subject_20}</Score>
  </Row>
  <Row>
    <Score>{subjects[0]?.subject_21}</Score>
  </Row>
  <Row>
    <Score>{subjects[0]?.subject_22}</Score>
  </Row>
  <Row>
    <Score>{subjects[0]?.subject_23}</Score>
  </Row>
  <Row>
    <Score>{subjects[0]?.subject_24}</Score>
  </Row>
  <Row>
    <Score>{subjects[0]?.subject_25}</Score>
  </Row>
  <Row>
    <Score>{subjects[0]?.subject_26}</Score>
  </Row>
  <Row>
    <Score>{subjects[0]?.subject_27}</Score>
  </Row>
  <Row>
    <Score>{subjects[0]?.subject_28}</Score>
  </Row>
  <Row>
    <Score>{subjects[0]?.subject_29}</Score>
  </Row>
  <Row>
    <Score>{subjects[0]?.subject_30}</Score>
  </Row>
</TableContainer> */}


  {/* TOTAL scores */}
  <TableContainer>
  <Row>
    <Score>{assignments[0]?.assignment_1 + tests[0]?.test_1 + exams[0]?.exam_1}</Score>
  </Row>
  <Row>
    <Score>{assignments[0]?.assignment_2 + tests[0]?.test_2 + exams[0]?.exam_2}</Score>
  </Row>
  <Row>
    <Score>{assignments[0]?.assignment_3 + tests[0]?.test_3 + exams[0]?.exam_3}</Score>
  </Row>
  <Row>
    <Score>{assignments[0]?.assignment_4 + tests[0]?.test_4 + exams[0]?.exam_4}</Score>
  </Row>
  <Row>
    <Score>{assignments[0]?.assignment_5 + tests[0]?.test_5 + exams[0]?.exam_5}</Score>
  </Row>
  <Row>
    <Score>{assignments[0]?.assignment_6 + tests[0]?.test_6 + exams[0]?.exam_6}</Score>
  </Row>
  <Row>
    <Score>{assignments[0]?.assignment_7 + tests[0]?.test_7 + exams[0]?.exam_7}</Score>
  </Row>
  <Row>
    <Score>{assignments[0]?.assignment_8 + tests[0]?.test_8 + exams[0]?.exam_8}</Score>
  </Row>
  <Row>
    <Score>{assignments[0]?.assignment_9 + tests[0]?.test_9 + exams[0]?.exam_9}</Score>
  </Row>
  <Row>
    <Score>{assignments[0]?.assignment_10 + tests[0]?.test_10 + exams[0]?.exam_10}</Score>
  </Row>
  <Row>
    <Score>{assignments[0]?.assignment_11 + tests[0]?.test_11 + exams[0]?.exam_11}</Score>
  </Row>
  <Row>
    <Score>{assignments[0]?.assignment_12 + tests[0]?.test_12 + exams[0]?.exam_12}</Score>
  </Row>
  <Row>
    <Score>{assignments[0]?.assignment_13 + tests[0]?.test_13 + exams[0]?.exam_13}</Score>
  </Row>
  <Row>
    <Score>{assignments[0]?.assignment_14 + tests[0]?.test_14 + exams[0]?.exam_14}</Score>
  </Row>
  <Row>
    <Score>{assignments[0]?.assignment_15 + tests[0]?.test_15 + exams[0]?.exam_15}</Score>
  </Row>
  <Row>
    <Score>{assignments[0]?.assignment_16 + tests[0]?.test_16 + exams[0]?.exam_16}</Score>
  </Row>
  <Row>
    <Score>{assignments[0]?.assignment_17 + tests[0]?.test_17 + exams[0]?.exam_17}</Score>
  </Row>
  <Row>
    <Score>{assignments[0]?.assignment_18 + tests[0]?.test_18 + exams[0]?.exam_18}</Score>
  </Row>
  <Row>
    <Score>{assignments[0]?.assignment_19 + tests[0]?.test_19 + exams[0]?.exam_19}</Score>
  </Row>
  <Row>
    <Score>{assignments[0]?.assignment_20 + tests[0]?.test_20 + exams[0]?.exam_20}</Score>
  </Row>
  <Row>
    <Score>{assignments[0]?.assignment_21 + tests[0]?.test_21 + exams[0]?.exam_21}</Score>
  </Row>
  <Row>
    <Score>{assignments[0]?.assignment_22 + tests[0]?.test_22 + exams[0]?.exam_22}</Score>
  </Row>
  <Row>
    <Score>{assignments[0]?.assignment_23 + tests[0]?.test_23 + exams[0]?.exam_23}</Score>
  </Row>
  <Row>
    <Score>{assignments[0]?.assignment_24 + tests[0]?.test_24 + exams[0]?.exam_24}</Score>
  </Row>
  <Row>
    <Score>{assignments[0]?.assignment_25 + tests[0]?.test_25 + exams[0]?.exam_25}</Score>
  </Row>
  <Row>
    <Score>{assignments[0]?.assignment_26 + tests[0]?.test_26 + exams[0]?.exam_26}</Score>
  </Row>
  <Row>
    <Score>{assignments[0]?.assignment_27 + tests[0]?.test_27 + exams[0]?.exam_27}</Score>
  </Row>
  <Row>
    <Score>{assignments[0]?.assignment_28 + tests[0]?.test_28 + exams[0]?.exam_28}</Score>
  </Row>
  <Row>
    <Score>{assignments[0]?.assignment_29 + tests[0]?.test_29 + exams[0]?.exam_29}</Score>
  </Row>
  <Row>
    <Score>{assignments[0]?.assignment_30 + tests[0]?.test_30 + exams[0]?.exam_30}</Score>
  </Row>
</TableContainer>



    </Container>
    </ScoreSheetContainer>

  
   
  );
};

export default StudentScoreSheet;





































