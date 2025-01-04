// import React, { useState, useEffect } from "react";
// import styled , {keyframes} from "styled-components";
// import Swal from "sweetalert2";



// const fadeIn = keyframes`
//   from {
//     opacity: 0;
//     transform: translateY(10px);
//   }
//   to {
//     opacity: 1;
//     transform: translateY(0);
//   }
// `;

// const Container = styled.div`
//   padding: 20px;
//   background: #f9f9f9;
//   min-height: 100vh;
// `;


// const Title = styled.h1`
//   color: purple;
//   text-align: center;
//   margin-bottom: 20px;
//   animation: ${fadeIn} 0.8s ease-in-out;
// `;

// const Form = styled.form`
//   display: grid;
//   gap: 20px;
//   background: white;
//   padding: 20px;
//   border-radius: 10px;
//   box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
// `;

// const Select = styled.select`
//   padding: 10px;
//   border: 1px solid #ddd;
//   border-radius: 5px;
//   font-size: 1rem;
//   outline:none;
// `;

// const Button = styled.button`
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

// const CurrentSemesterOrTerm = () => {
//   const [semesters, setSemesters] = useState([]);
//   const [selectedSemester, setSelectedSemester] = useState("");

//   useEffect(() => {
//     fetchSemesters();
//   }, []);

//   const fetchSemesters = async () => {
//     try {
//       const response = await fetch('https://ephadacademyportal.com.ng/ephad_api/fetch_semesters.php');
//       const data = await response.json();
//       if (data.success) setSemesters(data.semesters || []);
//     } catch {}
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     if (!selectedSemester) {
//       Swal.fire({ text: "Please select a semester.", icon: "warning" });
//       return;
//     }

//     try {
//       const result = await Swal.fire({
//         title: "Confirm Action",
//         text: `Set semester ID ${selectedSemester} as current semester?`,
//         icon: "warning",
//         showCancelButton: true,
//         confirmButtonColor: "#3085d6",
//         cancelButtonColor: "#d33",
//         confirmButtonText: "Yes, set it!",
//       });

//       if (result.isConfirmed) {
//         Swal.fire({ text: "Saving...", allowOutsideClick: false });
//         Swal.showLoading();

//         const response = await fetch("https://ephadacademyportal.com.ng/ephad_api/set_current_semester.php", {
//           method: "POST",
//           headers: { "Content-Type": "application/json" },
//           body: JSON.stringify({ semester_id: selectedSemester }),
//         });

//         const data = await response.json();
//         if (data.success) {
//           Swal.fire({ text: "Current semester set successfully!", icon: "success" });
//         } else {
//           Swal.fire({ text: data.error || "Failed to set current semester.", icon: "error" });
//         }
//       }
//     } catch (error) {
//       Swal.fire({ text: "An error occurred while setting the semester.", icon: "error" });
//     }
//   };

//   return (
//     <Container>
//       <Title>Current Term</Title>
//       <Form onSubmit={handleSubmit}>
//         <Select
//           value={selectedSemester}
//           onChange={(e) => setSelectedSemester(e.target.value)}
//           required
//         >
//           <option value="">Select Term</option>
//           {semesters.map((semester) => (
//             <option key={semester.id} value={semester.id}>
//               {semester.name}
//             </option>
//           ))}
//         </Select>
//         <Button type="submit">Set Current Term</Button>
//       </Form>
//     </Container>
//   );
// };

// export default CurrentSemesterOrTerm;


import React, { useState, useEffect } from "react";
import styled, { keyframes } from "styled-components";
import Swal from "sweetalert2";
import axios from "axios"; // Use axios for making HTTP requests

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

const Container = styled.div`
  padding: 20px;
  background: #f9f9f9;
  min-height: 100vh;
`;

const Title = styled.h1`
  color: purple;
  text-align: center;
  margin-bottom: 20px;
  animation: ${fadeIn} 0.8s ease-in-out;
`;

const Form = styled.form`
  display: grid;
  gap: 20px;
  background: white;
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
`;

const Select = styled.select`
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 5px;
  font-size: 1rem;
  outline: none;
`;

const Button = styled.button`
  padding: 10px 20px;
  background: #ff8095;
  color: white;
  border: none;
  border-radius: 5px;
  font-size: 1rem;
  cursor: pointer;
  margin-top:50px;
  margin-right:10px;

  &:hover {
    background: #e76880;
  }
`;

const CurrentSemesterOrTerm = () => {
  const [semesters, setSemesters] = useState([]);
  const [selectedSemester, setSelectedSemester] = useState("");
  const [currentSemester, setCurrentSemester] = useState(null);

  // Fetch semesters and current semester on component mount
  useEffect(() => {
    fetchSemesters();
    fetchCurrentSemester();
  }, []);

  // Fetch all semesters from the server
  const fetchSemesters = async () => {
    try {
      const response = await axios.get("https://ephadacademyportal.com.ng/ephad_api/fetch_semesters.php");
      if (response.data.success) {
        setSemesters(response.data.semesters || []);
      } else {
        Swal.fire({ text: "Failed to fetch semesters.", icon: "error" });
      }
    } catch (error) {
      Swal.fire({ text: "An error occurred while fetching semesters.", icon: "error" });
    }
  };

  // Fetch the current semester from the server
  const fetchCurrentSemester = async () => {
    try {
      const response = await axios.get("https://ephadacademyportal.com.ng/ephad_api/fetch_current_semester.php");
      if (response.data.success && response.data.current_semester) {
        setCurrentSemester(response.data.current_semester); // Set the current semester
      } else {
        Swal.fire({ text: "No current semester found.", icon: "warning" });
      }
    } catch (error) {
      Swal.fire({ text: "An error occurred while fetching the current semester.", icon: "error" });
    }
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!selectedSemester) {
      Swal.fire({ text: "Please select a semester.", icon: "warning" });
      return;
    }

    try {
      const result = await Swal.fire({
        title: "Confirm Action",
        text: `Set semester ID ${selectedSemester} as current semester?`,
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, set it!",
      });

      if (result.isConfirmed) {
        Swal.fire({ text: "Saving...", allowOutsideClick: false });
        Swal.showLoading();

        const response = await axios.post("https://ephadacademyportal.com.ng/ephad_api/set_current_semester.php", {
          semester_id: selectedSemester,
        });

        if (response.data.success) {
          Swal.fire({ text: "Current semester set successfully!", icon: "success" });
          fetchCurrentSemester();
          updateCurrentSemester();
        } else {
          Swal.fire({ text: response.data.error || "Failed to set current semester.", icon: "error" });
        }
      }
    } catch (error) {
      Swal.fire({ text: "An error occurred while setting the semester.", icon: "error" });
    }
  };



  // updating current semester on all subjects and assignmnets and test and exams tables
  const updateCurrentSemester = () => {
    Swal.fire({
        title: 'Updating...',
        text: 'Please wait while the current semester ID is being updated.',
        allowOutsideClick: false,
        didOpen: () => {
            Swal.showLoading();
            fetch('https://ephadacademyportal.com.ng/ephad_api/update_subject_semester.php', {
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
                        title: 'Update Successful',
                        text: data.message
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
  
  



  const handleUpdatePickupIds = async () => {
    Swal.fire({text:"Please wait..."})
    Swal.showLoading();
    try {
      const response = await fetch('https://ephadacademyportal.com.ng/ephad_api/update_pickup_id.php', {
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





  useEffect(() => {
    const runDaily = () => {
      // Calculate the time until midnight
      const now = new Date();
      const nextMidnight = new Date();
      nextMidnight.setDate(now.getDate() + 1);
      nextMidnight.setHours(0, 0, 0, 0);

      const timeUntilMidnight = nextMidnight - now;

      // Set a timeout to update pickup IDs at midnight
      const timeoutId = setTimeout(() => {
        handleUpdatePickupIds();
        runDaily(); // Recalculate for the next day
      }, timeUntilMidnight);

      // Cleanup timeout on component unmount
      return () => clearTimeout(timeoutId);
    };

    // Initial call and setup for daily execution
    // handleUpdatePickupIds(); // Run immediately on mount
    return runDaily();
  }, []);




  const handleGenerateResults = async () => {
    const result = await Swal.fire({
      title: "Are you sure?",
      text: `Are you sure you want to generate the termly results for the students?`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, generate it!",
    });

    if (result.isConfirmed) {
    

    // Show loading notification
    Swal.fire({
      title: 'Generating Results...',
      html: 'Please wait while results are being generated.',
      allowOutsideClick: false,
      didOpen: () => {
        Swal.showLoading();
      },
    });

    try {
      const response = await fetch('https://ephadacademyportal.com.ng/ephad_api/generate_students_results.php', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      const result = await response.json();

      if (result.success) {
        Swal.fire('Success', result.message || 'Results generated successfully!', 'success');
      } else {
        Swal.fire('Error', result.error || 'Failed to generate results.', 'error');
      }
    } catch (error) {
      Swal.fire('Error', error.message || 'An unexpected error occurred.', 'error');
    } finally {
  
    }
  }
  };








    const handleResetStudentsScores = async () => {
      Swal.fire({
        title: "Are you sure?",
        text: "This will reset scores for all students to 0!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#ff4d4f",
        cancelButtonColor: "#3085d6",
        confirmButtonText: "Yes, reset it!",
      }).then(async (result) => {
        if (result.isConfirmed) {
            const loadingAlert = Swal.fire({text:"Please wait..."})
            Swal.showLoading();

          try {
            const response = await axios.post(
              "https://ephadacademyportal.com.ng/ephad_api/reset_students_score_sheet.php"
            );
  
            if (response.data.success) {
              Swal.fire("Reset Successful!", response.data.message, "success");
            } else {
              Swal.fire("Error", response.data.error, "error");
            }
          } catch (error) {
            Swal.fire("Error", "Failed to reset student scores. Try again.", "error");
          }finally{
            loadingAlert.close();
          }
        }
      });
    };


    const handlePromoteStudents = async (classID) => {
      Swal.fire({
        title: "Are you sure?",
        text: "This will promote all students to next class",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#ff4d4f",
        cancelButtonColor: "#3085d6",
        confirmButtonText: "Yes, promote!",
      }).then(async (result) => {
        if (result.isConfirmed) {
            const loadingAlert = Swal.fire({text:"Please wait..."})
            Swal.showLoading();
     
  
      try {
        const response = await fetch('https://ephadacademyportal.com.ng/ephad_api/promote_all_students.php', {
          method: 'POST',
          body: new URLSearchParams({
            'class_id': classID,  // Pass the class_id to the server
          }),
        });
  
        const data = await response.json();
  
        // Check the response from the server
        if (data.success) {
      
          Swal.fire({
            icon: 'success',
            title: 'Success!',
            text: 'Students Promoted successfully.',
          });
          console.log(data)
        } else {
          Swal.fire({
            icon: 'error',
            title: 'Error',
            text: data.error || 'An error occurred while updating.',
          });
        }
      } catch (error) {
        // Handle network or other errors
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: 'An error occurred while connecting to the server.',
        });
        console.error('Error:', error);
      } finally {
        // Set loading state to false after request is completed
      loadingAlert.close();
      }
    }})
    };



    const handleDemoteStudents = async (classID) => {
      Swal.fire({
        title: "Are you sure?",
        text: "This will demote all students to lower class",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#ff4d4f",
        cancelButtonColor: "#3085d6",
        confirmButtonText: "Yes, demote!",
      }).then(async (result) => {
        if (result.isConfirmed) {
            const loadingAlert = Swal.fire({text:"Please wait..."})
            Swal.showLoading();
     
  
      try {
        const response = await fetch('https://ephadacademyportal.com.ng/ephad_api/demote_all_students.php', {
          method: 'POST',
          body: new URLSearchParams({
            'class_id': classID,  // Pass the class_id to the server
          }),
        });
  
        const data = await response.json();
  
        // Check the response from the server
        if (data.success) {
      
          Swal.fire({
            icon: 'success',
            title: 'Success!',
            text: 'Students Promoted successfully.',
          });
          console.log(data)
        } else {
          Swal.fire({
            icon: 'error',
            title: 'Error',
            text: data.error || 'An error occurred while updating.',
          });
        }
      } catch (error) {
        // Handle network or other errors
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: 'An error occurred while connecting to the server.',
        });
        console.error('Error:', error);
      } finally {
        // Set loading state to false after request is completed
      loadingAlert.close();
      }
    }})
    };



  return (
    <Container>
      <Title>Current Term</Title>

      {currentSemester ? (
        <div>
          <h3>Current Term:</h3>
          <p>
            <strong>Term ID:</strong> {currentSemester.semester_id}
            <br />
            <strong>Term Name:</strong> {currentSemester.semester_name}
          </p>
        </div>
      ) : (
        <p>Loading current semester...</p>
      )}

      <Form onSubmit={handleSubmit}>
        <Select
          value={selectedSemester}
          onChange={(e) => setSelectedSemester(e.target.value)}
          required
        >
          <option value="">Select Term</option>
          {semesters.map((semester) => (
            <option key={semester.id} value={semester.id}>
              {semester.name}
            </option>
          ))}
        </Select>
        <Button type="submit">Set Current Term</Button>
      </Form>
      <Button onClick={handleUpdatePickupIds} style={{backgroundColor:"#4caf50"}}>Update students's Pick up IDs</Button>
      <Button onClick={handleGenerateResults} style={{backgroundColor:"purple"}}>Generate Student's Termly Results</Button>
      <Button onClick={handleResetStudentsScores} >Reset Students Score Sheet</Button>
      <Button onClick={()=>handlePromoteStudents(1)} style={{backgroundColor:"#4caf50"}}>Promote Students</Button>
      <Button onClick={()=>handleDemoteStudents(1)} >Demote Students</Button>
    </Container>
  );
};

export default CurrentSemesterOrTerm;

