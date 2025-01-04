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














import React, { useState } from 'react';
import styled from 'styled-components';

const ScoreSheetContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
  background-color: #f8f9fa;
  min-height: 100vh;
  position: fixed;
  top: 50%;
  left: 50%;
  height: 600px;
  transform: translate(-50%, -50%);
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
    background-color: #007bff;
    color: #fff;
    font-weight: bold;
  }

  td {
    font-size: 14px;
  }
`;

const Total = styled.span`
  font-weight: bold;
  color: #343a40;
`;

const InputField = styled.input`
  width: 60px;
  padding: 5px;
  margin-top: 5px;
  border: 1px solid #ccc;
  border-radius: 4px;
  text-align: center;
`;

const SaveButton = styled.button`
  margin-top: 20px;
  padding: 10px 20px;
  font-size: 16px;
  background-color: #007bff;
  color: #fff;
  border: none;
  border-radius: 4px;
  cursor: pointer;

  &:hover {
    background-color: #0056b3;
  }
`;

const OverallTotal = styled.div`
  margin-top: 20px;
  font-size: 18px;
  font-weight: bold;
  color: #007bff;
`;

const StudentScoreSheet = () => {
  const subjects = Array.from({ length: 20 }, (_, i) => `Subject ${i + 1}`);
  const [scores, setScores] = useState(
    subjects.map(() => ({ assignment: 0, test: 0, exam: 0 }))
  );

  const [inputs, setInputs] = useState(
    subjects.map(() => ({ assignment: 0, test: 0, exam: 0 }))
  );

  const handleInputChange = (index, type, value) => {
    setInputs((prevInputs) =>
      prevInputs.map((input, i) =>
        i === index ? { ...input, [type]: parseInt(value) || 0 } : input
      )
    );
  };

  const handleSaveChanges = () => {
    setScores((prevScores) =>
      prevScores.map((score, index) => ({
        assignment: Math.max(0, score.assignment + inputs[index].assignment),
        test: Math.max(0, score.test + inputs[index].test),
        exam: Math.max(0, score.exam + inputs[index].exam),
      }))
    );

    // Reset inputs to zero
    setInputs(subjects.map(() => ({ assignment: 0, test: 0, exam: 0 })));
  };

  const calculateTotal = (score) => score.assignment + score.test + score.exam;

  const calculateOverallTotal = () =>
    scores.reduce((sum, score) => sum + calculateTotal(score), 0);

  return (
    <ScoreSheetContainer>
      <h1>Student Score Sheet</h1>
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
            {scores.map((score, index) => (
              <tr key={index}>
                <td>{subjects[index]}</td>
                <td>
                  <div>
                    <Total>{score.assignment}</Total>
                    <InputField
                      type="number"
                      value={inputs[index].assignment}
                      onChange={(e) =>
                        handleInputChange(index, 'assignment', e.target.value)
                      }
                    />
                  </div>
                </td>
                <td>
                  <div>
                    <Total>{score.test}</Total>
                    <InputField
                      type="number"
                      value={inputs[index].test}
                      onChange={(e) =>
                        handleInputChange(index, 'test', e.target.value)
                      }
                    />
                  </div>
                </td>
                <td>
                  <div>
                    <Total>{score.exam}</Total>
                    <InputField
                      type="number"
                      value={inputs[index].exam}
                      onChange={(e) =>
                        handleInputChange(index, 'exam', e.target.value)
                      }
                    />
                  </div>
                </td>
                <td>
                  <Total>{calculateTotal(score)}</Total>
                </td>
              </tr>
            ))}
          </tbody>
        </ScoreTable>
      </TableContainer>
      <SaveButton onClick={handleSaveChanges}>Save All Changes</SaveButton>
      <SaveButton onClick={handleSaveChanges}>Close score sheet</SaveButton>
      <OverallTotal>Overall Total: {calculateOverallTotal()}</OverallTotal>
    </ScoreSheetContainer>
  );
};

export default StudentScoreSheet;
