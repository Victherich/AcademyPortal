

import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import axios from 'axios';
import Swal from 'sweetalert2';
import PaystackPop from '@paystack/inline-js';

const Container = styled.div`
  padding: 20px;
  max-width: 1200px;
  margin: 0 auto;
`;

const Title = styled.h1`
  text-align: center;
  color: #4caf50;
  margin-bottom: 20px;
`;

const CardContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
  justify-content: center;
`;

const Card = styled.div`
  background-color: #f9f9f9;
  border: 1px solid #ddd;
  border-radius: 10px;
  padding: 15px;
  width: 300px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);

  @media (max-width: 768px) {
    width: 100%;
  }
`;

const CardHeader = styled.h3`
  color: #333;
  margin-bottom: 10px;
`;

const CardDetail = styled.p`
  color: #555;
  margin: 5px 0;
`;

const Button = styled.button`
  padding: 10px 20px;
  background-color: #4caf50;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;

  &:hover {
    background-color: #45a049;
  }
`;

const StudentSchoolFees = ({ studentID }) => {
  const [schoolFees, setSchoolFees] = useState([]);
  const [student, setStudent] = useState({});
  const [error, setError] = useState('');
  const [paymentDetails,setPaymentDetails]= useState([])

  // console.log(student)

 
    const fetchUserDetails = async () => {
      try {
        const response = await fetch(
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
          setStudent(data.student);
          fetchSchoolFees(data.student.department_id, data.student.class_id);
        } else {
          setError(data.error || 'Error fetching user details.');
        }
      } catch (err) {
        setError('Failed to fetch user details. Please try again.');
      }
    };

    useEffect(() => {
    fetchUserDetails();
  }, [studentID]);

  const fetchSchoolFees = async (departmentId, classId) => {
    try {
      const response = await axios.get(
        'https://ephadacademyportal.com.ng/ephad_api/fetch_school_fees_for_student.php',
        {
          params: {
            department_id: departmentId,
            class_id: classId,
          },
        }
      );

      if (response.data.success) {
        setSchoolFees(response.data.school_fees);
        console.log(response.data.school_fees);
      } else {
        Swal.fire('Error', response.data.error || 'Failed to fetch school fees', 'error');
      }
    } catch (error) {
      Swal.fire('Error', 'Failed to fetch school fees', 'error');
    }
  };
 


  const [semesters, setSemesters] = useState([]);

  // Fetch semesters and current semester on component mount
  useEffect(() => {
    fetchSemesters();
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





  const handlePayNow = async (fee) => {
    const { value: formValues } = await Swal.fire({
      title: 'Pay Now',
      html:
        `<input type="text" id="first-name" class="swal2-input" placeholder="First Name" required>` +
        `<input type="text" id="last-name" class="swal2-input" placeholder="Last Name" required>` +
        `<input type="email" id="email" class="swal2-input" placeholder="Email" required>` +
        `<input type="tel" id="phone" class="swal2-input" placeholder="Phone Number" required>`,
      focusConfirm: false,
      preConfirm: () => {
        return {
          firstName: document.getElementById('first-name').value,
          lastName: document.getElementById('last-name').value,
          email: document.getElementById('email').value,
          phone: document.getElementById('phone').value,
        };
      },
    });
  
    if (formValues) {
      const { firstName, lastName, email, phone } = formValues;
  
      // Initialize Paystack payment
      const paystack = new PaystackPop();
      paystack.newTransaction({
        key: 'pk_test_60e1f53bba7c80b60029bf611a26a66a9a22d4e4',
        email,
        amount: fee.school_fee * 100, // Amount in kobo
        currency: 'NGN',
        onSuccess: async (response) => {
          // Payment success
          const paymentReference = response.reference;
          Swal.fire({text:"Payment Successful, saving details..."})
          Swal.showLoading();
  
          try {
            // Send payment details to the backend
            const response = await axios.post('https://ephadacademyportal.com.ng/ephad_api/handle_fees_payment.php', {
              student_id: studentID,  // Assume this is available on your page
              fee_id: fee.fee_id,
              first_name: firstName,
              last_name: lastName,
              email,
              phone,
              payment_reference: paymentReference,
              class_level: fee.class_level,
              semester_name: fee.semester_name,
              school_fee: fee.school_fee,
              semester_id:fee.semester_id,
              class_id:student.class_id,
            });

            
  
            if (response.data.success) {
              Swal.fire('Success', 'Payment successful! Receipt sent. Please check your email inbox or spam folder.', 'success');
            fetchPaymentDetails()
            } else {
              Swal.fire('Error', response.data.error || 'An error occurred.', 'error');
            }
          } catch (error) {
            Swal.fire('Error', 'Failed to save payment or send receipt.', 'error');
            console.error(error)
          }
        },
        onCancel: () => {
          Swal.fire('Payment Cancelled', 'You cancelled the payment process.', 'info');
        },
      });
    }
  };
  




useEffect(()=>{
  fetchPaymentDetails()
  // fetchSchoolFee()
},[])


const fetchPaymentDetails = async () => {

  
  try {
    const response = await fetch(`https://ephadacademyportal.com.ng/ephad_api/fetch_payment_by_student_id2.php?student_id=${studentID}`);
    const data = await response.json();
   
    if (data.success) {
      setPaymentDetails(data.fee_payments);
        // console.log(data.fee_payments)   
      setError('');
    } else {
      // setSchoolFee(null);
      setError(data.error || 'Failed to fetch school fee.');
    }
  } catch (error) {
    // setSchoolFee(null);
    console.error(error)
    setError('Error fetching data.');
  }
};




const paidFeeIds = new Set(paymentDetails.map(payment => payment.fee_id));
// console.log(paymentDetails)

  return (
    <Container>
      <Title>Student School Fees</Title>

      <CardContainer>
        {schoolFees.map((fee) =>{ 
            const isPaid = paidFeeIds.has(fee.fee_id);
          return (
          <Card key={fee.fee_id}>
            <CardHeader>{fee.class_level}</CardHeader>
            <CardDetail><strong>Level:</strong> {fee.class_level}</CardDetail>
            <CardDetail><strong>Department:</strong> {fee.department_name}</CardDetail>
            <CardDetail><strong>Term:</strong> {fee.semester_name}</CardDetail>
            <CardDetail><strong>School Fee:</strong> NGN {fee.school_fee}</CardDetail>
            {!isPaid && <Button onClick={() => handlePayNow(fee)} style={{backgroundColor:"red"}}>Pay Now</Button>}
            {isPaid && <Button disabled >Already Paid</Button>}
          </Card>
        )})}
      </CardContainer>
    </Container>
  );
};

export default StudentSchoolFees;
