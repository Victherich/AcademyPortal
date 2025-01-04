import React, { useState } from "react";
import Swal from "sweetalert2";
import styled from "styled-components";
import { useEffect } from "react";

const SearchStudent = () => {
    const [studentId, setStudentId] = useState("");
    const [student, setStudent] = useState(null);
    const [studentClass, setStudentClass] = useState([]);
    const [studentDepartment,setStudentDepartment]=useState([]);
    // const [suspendWarning, setSuspendWarning]=useState('')

    const fetchStudent = async () => {
        Swal.fire({ title: "Loading...", allowOutsideClick: false, didOpen: () => Swal.showLoading() });

        try {
            const response = await fetch(`https://ephadacademyportal.com.ng/ephad_api/fetch_student_by_id.php?student_id=${studentId}`);
            const data = await response.json();

            if (data.success) {
                setStudent(data.student);
                Swal.fire("Success", "Student details fetched successfully.", "success");
                setStudentId("");
                console.log(data.student);

            } else {
                Swal.fire("Error", data.error || "Failed to fetch student.", "error");
                setStudent(null)
            }
        } catch (err) {
            Swal.fire("Error", err.message, "error");
            setStudent(null)
        }
    };

 


    const toggleSuspend = async (suspended,suspendWarning) => {
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
                body: JSON.stringify({ student_id: student.student_id, suspended }),
            });
            const data = await response.json();

            if (data.success) {
                setStudent({ ...student, suspended });
                Swal.fire("Success", data.message, "success");
            } else {
                Swal.fire("Error", data.error || "Failed to update student status.", "error");
            }
        } catch (err) {
            Swal.fire("Error", err.message, "error");
        }
    }
    };

    const deleteStudent = async () => {
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
                body: JSON.stringify({ student_id: student.student_id }),
            });
            const data = await response.json();

            if (data.success) {
                setStudent(null);
                Swal.fire("Success", data.message, "success");
            } else {
                Swal.fire("Error", data.error || "Failed to delete student.", "error");
            }
        } catch (err) {
            Swal.fire("Error", err.message, "error");
        }
    }
    };



    
      //fetching department
      const [department, setDepartment] = useState(null);
        const [loading, setLoading] = useState(true);
        const [error, setError] = useState(null);
    
        useEffect(() => {
            const fetchDepartment = async () => {
                setLoading(true);
                setError(null);
    
                try {
                    const response = await fetch(`https://ephadacademyportal.com.ng/ephad_api/fetch_department_by_id.php?id=${student?.department_id}`);
                    
                    if (!response.ok) {
                        // throw new Error(`Error: ${response.status} - ${response.statusText}`);
                        Swal.fire({text:response.status - response.statusText})
                    }
    
                    const data = await response.json();
    
                    if (data.success) {
                        setDepartment(data.department);
                        // console.log(data.department)
                    } else {
                        // throw new Error(data.error || "Failed to fetch department.");
                        Swal.fire({text:data.error|| "Failed to fetch department."})
                    }
                } catch (err) {
                    // setError(err.message);
                    Swal.fire({text:err.message})
                } finally {
                    // setLoading(false);
                }
            };
    
            if (student?.department_id) {
                fetchDepartment();
            }
        }, [student?.department_id]);
    
    
    
    //fetching class
    const [classData, setClassData] = useState(null);
    // const [loading, setLoading] = useState(true);
    // const [error, setError] = useState(null);
    
    useEffect(() => {
        const fetchClass = async () => {
            // setLoading(true);
            // setError(null);
    
            try {
                const response = await fetch(`https://ephadacademyportal.com.ng/ephad_api/fetch_class_by_id.php?id=${student?.class_id}`);
                
                if (!response.ok) {
                    // throw new Error(`Error: ${response.status} - ${response.statusText}`);
                    Swal.fire({text:response.status - response.statusText})
                }
    
                const data = await response.json();
    
                if (data.success) {
                    setClassData(data.class);
                    // console.log(data.class)
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
    
        if (student?.class_id) {
            fetchClass();
        }
    }, [student?.class_id]);
    
    
    





    return (
        <Container>
            <Title>Search Student by ID</Title>
            <Input
                type="text"
                value={studentId}
                onChange={(e) => setStudentId(e.target.value.toLocaleUpperCase())}
                placeholder="Enter Student ID"
            />
            <Button onClick={fetchStudent}>Get Student</Button>

            {student && (
                <StudentDetails>
                    <h4>Student Details</h4>
                    <img
              // src={`${mainDomain}/uploads/management_profile_photos/${user.profile_photo}`}
              src={`https://ephadacademyportal.com.ng/ephad_api/uploads/student_profile_photos/${student.profile_photo}`}
              alt={`${student.first_name}'s profile`}
              style={{
                width:"200px",
                height:"200px",
                borderRadius:"50%"
              }}
            />
                    
                    <Detail><strong>Reg No:</strong> {student.student_id}</Detail>
                    <Detail><strong>Name:</strong> {student.first_name} {student.last_name}</Detail>
                    <Detail><strong>Pickup Id:</strong> {student.pickup_id}</Detail>
                    <Detail><strong>Parents:</strong> {student.parents}</Detail>
                    <Detail><strong>Phone:</strong> {student.phone_number}</Detail>
                    <Detail><strong>Address:</strong> {student.address}</Detail>
                    {/* <Detail><strong>Department:</strong> {department?.name}</Detail> */}
                    <Detail><strong>Class:</strong> {classData?.level}</Detail>
                    <Detail style={{backgroundColor:`${student.suspended?"red":""}`,color:`${student.suspended?"white":""}`}}><strong>Suspended:</strong> {student.suspended ? "Yes" : "No"}</Detail>

                    <Button onClick={() => toggleSuspend(1,"suspend")}>Suspend</Button>
                    <Button onClick={() => toggleSuspend(0,"unsuspend")}>Unsuspend</Button>
                    <DeleteButton onClick={deleteStudent}>Delete</DeleteButton>
                </StudentDetails>
            )}
        </Container>
    );
};

export default SearchStudent;

// Styled Components
const Container = styled.div`
    max-width: 600px;
    margin: 0 auto;
    padding: 20px;
    font-family: Arial, sans-serif;
`;

const Title = styled.h3`
    text-align: center;
    color: purple;
    font-size:1.5rem;
`;

const Input = styled.input`
    width: 100%;
    padding: 10px;
    margin: 20px 0;
    border: 1px solid #ccc;
    border-radius: 4px;
    font-size: 16px;
    outline:none;
`;

const Button = styled.button`
    padding: 10px 20px;
    margin: 5px;
    // background-color: #4CAF50;
    background: #ff8095;
    color: white;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    font-size: 16px;

    &:hover {
        // background-color: #45a049;
        background: #e76880;
    }
`;

const DeleteButton = styled(Button)`
    background-color: #f44336;

    &:hover {
        background-color: #e53935;
    }
`;

const StudentDetails = styled.div`
    margin-top: 20px;
    background-color: #f9f9f9;
    padding: 20px;
    border-radius: 8px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
`;

const Detail = styled.p`
    font-size: small;
    margin: 5px 0;
`;
