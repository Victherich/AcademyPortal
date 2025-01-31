
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
//   position: fixed;
//   top: 50%;
//   left: 50%;
//   height: 100vh;
//   transform: translate(-50%, -50%);
//   overflow-x:scroll;
  width:100%;
 `

const Titles = styled.h5`
  color:purple;
`

const Container = styled.div`
  display: flex;
  // align-items: center;
  // padding: 20px;
    //  overflow-y:scroll;
    width:100%;
    justify-content:space-between;
    // background-color:red;
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
//   width: 100%;
 
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


const StudentResult2 = ({assignments, tests, exams, studentId, classId, semesterId}) => {


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
    "(Primary)-Cultural and Creative Arts (CCA)",
    "Extra",
    "Extra",
    "Extra"
  ];
  


  


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




// getting the student position

// const [studentId, setStudentId] = useState('');
// const [classId, setClassId] = useState('');
// const [semesterId, setSemesterId] = useState('');
const [position, setPosition] = useState(null);
const [error, setError] = useState(null);

useEffect(()=>{
  fetchPosition()
},[studentId, classId, semesterId])

const fetchPosition = async () => {
  setPosition(null);
  setError(null);

  try {
      const response = await fetch('https://ephadacademyportal.com.ng/ephad_api/get_one_student_position.php', {
          method: 'POST',
          headers: {
              'Content-Type': 'application/json',
          },
          body: JSON.stringify({
              student_id: studentId,
              class_id: classId,
              semester_id: semesterId,
          }),
      });

      if (!response.ok) {
          // If the response status is not OK, show an error
          const errorText = await response.text();
          setError(`Server error: ${response.status} - ${errorText}`);
          console.error(`Server error: ${response.status} - ${errorText}`);
          return;
      }

      const data = await response.json();
      if (data.success) {
          setPosition(data.position);
      } else {
          setError(data.error || 'An unknown error occurred.');
      }
  } catch (err) {
      setError('Unable to connect to the server. Please try again later.');
      console.error(err);
  }
};

  


  return (

    <ScoreSheetContainer>

      {/* <H1>Student Score Sheet</H1> */}
      <H3>Total Score: {totalScoreA}</H3>
    

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
  <Row>
    <div>{subjectsList[27]}</div>
  </Row>
  <Row>
    <div>{subjectsList[28]}</div>
  </Row>
  <Row>
    <div>{subjectsList[29]}</div>
  </Row>
</TableContainer>


{/* assignmnet scores */}
<TableContainer>
  {Array.from({ length: 30 }, (_, index) => {
    const assignmentKey = `assignment_${index + 1}`;
    return (
      <Row key={index}>
        <Score>{assignments[0]?.[assignmentKey]}</Score>
  
      </Row>
    );
  })}
</TableContainer>
 

<TableContainer>

    {/* For Tests */}
    {Array.from({ length: 30 }, (_, index) => {
    const testKey = `test_${index + 1}`;
    return (
      <Row key={`test-${index}`}>
        <Score>{tests[0]?.[testKey]}</Score>

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
  
      </Row>
    );
  })}
</TableContainer>


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

export default StudentResult2;





































