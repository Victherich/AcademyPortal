// import React, { useState, useEffect } from "react";
// import styled from "styled-components";
// import axios from "axios";

// const Container = styled.div`
//   display: flex;
//   flex-direction: column;
//   align-items: center;
//   padding: 20px;
//   background-color: #f9f9f9;
// `;

// const Title = styled.h1`
//   font-size: 2.5rem;
//   color: #333;
//   margin-bottom: 20px;
//   text-align: center;
// `;

// const TeacherCard = styled.div`
//   background: white;
//   padding: 20px;
//   margin: 10px;
//   border-radius: 10px;
//   box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
//   width: 100%;
//   max-width: 600px;
//   display: flex;
//   flex-direction: column;
//   align-items: flex-start;
// `;

// const TeacherInfo = styled.p`
//   font-size: 1rem;
//   color: #555;
//   margin: 5px 0;
// `;

// const ResponsiveWrapper = styled.div`
//   display: grid;
//   grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
//   gap: 20px;
//   width: 100%;
// `;

// const TeacherList = () => {
//   const [teachers, setTeachers] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState("");

//   useEffect(() => {
//     fetchTeachers();
//     fetchClasses();
//   }, []);

//   const fetchTeachers = async () => {
//     try {
//       const response = await axios.get("https://hotsalesng.com/ephad_api/fetch_all_teachers.php");
//       if (response.data.success) {
//         setTeachers(response.data.teachers);
//       } else {
//         setError(response.data.error || "Failed to load teachers.");
//       }
//     } catch (err) {
//       setError("An error occurred while fetching teachers.");
//     } finally {
//       setLoading(false);
//     }
//   };


//   const fetchClasses = async () => {
//     try {
//       const response = await fetch('https://hotsalesng.com/ephad_api/fetch_classes.php');
//       const data = await response.json();
//       if (data.success) {
//         // setClasses(data.classes);
//       } else {
//         setError(data.error || 'Error fetching classes.');
//       }
//     } catch (err) {
//       setError('Failed to fetch classes. Please try again.');
//     }
//   };





//   if (loading) {
//     return <Container>Loading...</Container>;
//   }

//   if (error) {
//     return <Container>Error: {error}</Container>;
//   }




 

 


  
 
  

//   return (
//     <Container>
//       <Title>Teachers</Title>
//       <ResponsiveWrapper>
//         {teachers.map((teacher) => (
//           <TeacherCard key={teacher.id}>
//             <TeacherInfo><strong>Name:</strong> {teacher.first_name} {teacher.last_name}</TeacherInfo>
//             <TeacherInfo><strong>Email:</strong> {teacher.email}</TeacherInfo>
//             <TeacherInfo><strong>Phone:</strong> {teacher.phone_number}</TeacherInfo>
//             <TeacherInfo><strong>Class ID:</strong> {teacher.class_id}</TeacherInfo>
//             {/* <TeacherInfo><strong>Department ID:</strong> {teacher.department_id}</TeacherInfo> */}
//           </TeacherCard>
//         ))}
//       </ResponsiveWrapper>
//     </Container>
//   );
// };

// export default TeacherList;





// import React, { useState, useEffect } from "react";
// import styled from "styled-components";
// import axios from "axios";

// const Container = styled.div`
//   display: flex;
//   flex-direction: column;
//   align-items: center;
//   padding: 20px;
//   background-color: #f9f9f9;
// `;

// const Title = styled.h1`
//   font-size: 2.5rem;
//   color: #333;
//   margin-bottom: 20px;
//   text-align: center;
// `;

// const TeacherCard = styled.div`
//   background: white;
//   padding: 20px;
//   margin: 10px;
//   border-radius: 10px;
//   box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
//   width: 100%;
//   max-width: 600px;
//   display: flex;
//   flex-direction: column;
//   align-items: flex-start;
// `;

// const TeacherInfo = styled.p`
//   font-size: 1rem;
//   color: #555;
//   margin: 5px 0;
// `;

// const ResponsiveWrapper = styled.div`
//   display: grid;
//   grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
//   gap: 20px;
//   width: 100%;
// `;

// const TeacherList = () => {
//   const [teachers, setTeachers] = useState([]);
//   const [classes, setClasses] = useState({});
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState("");

//   useEffect(() => {
//     fetchTeachers();
//     fetchClasses();
//   }, []);

//   const fetchTeachers = async () => {
//     try {
//       const response = await axios.get("https://hotsalesng.com/ephad_api/fetch_all_teachers.php");
//       if (response.data.success) {
//         setTeachers(response.data.teachers);
//       } else {
//         setError(response.data.error || "Failed to load teachers.");
//       }
//     } catch (err) {
//       setError("An error occurred while fetching teachers.");
//     }
//   };

//   const fetchClasses = async () => {
//     try {
//       const response = await axios.get("https://hotsalesng.com/ephad_api/fetch_classes.php");
//       if (response.data.success) {
//         const classMapping = {};
//         response.data.classes.forEach((cls) => {
//           classMapping[cls.id] = cls.name;
//         });
//         setClasses(classMapping);
//         console.log(response.data)
//       } else {
//         setError(response.data.error || "Error fetching classes.");
//       }
//     } catch (err) {
//       setError("Failed to fetch classes. Please try again.");
//     } finally {
//       setLoading(false);
//     }
//   };

//   if (loading) {
//     return <Container>Loading...</Container>;
//   }

//   if (error) {
//     return <Container>Error: {error}</Container>;
//   }

//   return (
//     <Container>
//       <Title>Teachers</Title>
//       <ResponsiveWrapper>
//         {teachers.map((teacher) => (
//           <TeacherCard key={teacher.id}>
//             <TeacherInfo>
//               <strong>Name:</strong> {teacher.first_name} {teacher.last_name}
//             </TeacherInfo>
//             <TeacherInfo>
//               <strong>Email:</strong> {teacher.email}
//             </TeacherInfo>
//             <TeacherInfo>
//               <strong>Phone:</strong> {teacher.phone_number}
//             </TeacherInfo>
//             <TeacherInfo>
//               <strong>Class:</strong> {classes[teacher.class_id] || "Unknown"}
//             </TeacherInfo>
//           </TeacherCard>
//         ))}
//       </ResponsiveWrapper>
//     </Container>
//   );
// };

// export default TeacherList;





import React, { useState, useEffect } from "react";
import styled from "styled-components";
import axios from "axios";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
  background-color: #f9f9f9;
`;

const Title = styled.h1`
  font-size: 2.5rem;
  color: #333;
  margin-bottom: 20px;
  text-align: center;
`;

const TeacherCard = styled.div`
  background: white;
  padding: 20px;
  margin: 10px;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  width: 100%;
  max-width: 600px;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
`;

const TeacherInfo = styled.p`
  font-size: 1rem;
  color: #555;
  margin: 5px 0;
`;

const ResponsiveWrapper = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 20px;
  width: 100%;
`;

const TeacherList = () => {
  const [teachers, setTeachers] = useState([]);
  const [classes, setClasses] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    fetchTeachers();
    fetchClasses();
  }, []);

  const fetchTeachers = async () => {
    try {
      const response = await axios.get("https://hotsalesng.com/ephad_api/fetch_all_teachers.php");
      if (response.data.success) {
        setTeachers(response.data.teachers);
      } else {
        setError(response.data.error || "Failed to load teachers.");
      }
    } catch (err) {
      setError("An error occurred while fetching teachers.");
    }
  };

  const fetchClasses = async () => {
    try {
      const response = await axios.get("https://hotsalesng.com/ephad_api/fetch_classes.php");
      if (response.data.success) {
        const classMapping = {};
        response.data.classes.forEach((cls) => {
          // Use `level` as the class name (and append department if needed)
          classMapping[cls.id] = cls.level; // Adjust if more fields are needed
        });
        setClasses(classMapping);
      } else {
        setError(response.data.error || "Error fetching classes.");
      }
    } catch (err) {
      setError("Failed to fetch classes. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <Container>Loading...</Container>;
  }

  if (error) {
    return <Container>Error: {error}</Container>;
  }

  return (
    <Container>
      <Title>Teachers</Title>
      <ResponsiveWrapper>
        {teachers.map((teacher) => (
          <TeacherCard key={teacher.id}>
            <TeacherInfo>
              <strong>Name:</strong> {teacher.first_name} {teacher.last_name}
            </TeacherInfo>
            <TeacherInfo>
              <strong>Email:</strong> {teacher.email}
            </TeacherInfo>
            <TeacherInfo>
              <strong>Phone:</strong> {teacher.phone_number}
            </TeacherInfo>
            <TeacherInfo>
              <strong>Class:</strong> {classes[teacher.class_id] || "Unknown"}
            </TeacherInfo>
          </TeacherCard>
        ))}
      </ResponsiveWrapper>
    </Container>
  );
};

export default TeacherList;

