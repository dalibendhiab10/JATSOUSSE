'use client';
import axios from 'axios';
import { useEffect, useState } from 'react';
import Table from 'react-bootstrap/Table';

interface Payment {
 id: string;
 amount: number;
 status: string;
 createdAt: string;
}

function PaymentTable() {
 const [payments, setPayments] = useState<Payment[]>([]);

 const loadData = async () => {
    try {
      const response = await axios.post('/api/getEtickets');
      console.log(response.data);
      setPayments(response.data.data); // Assuming the data you want is in response.data.data
    } catch (error) {
      console.log(error);
    }
 };

 useEffect(() => {
    loadData();
 }, []);

 return (
    <Table striped bordered hover>
      <thead>
        <tr>
          <th>#</th>
          <th>Payment ID</th>
          <th>Amount</th>
          <th>Status</th>
          <th>Created At</th>
        </tr>
      </thead>
      <tbody>
        {payments.map((payment, index) => (
          <tr key={payment.id}>
            <td>{index + 1}</td>
            <td>{payment.id}</td>
            <td>{payment.amount}</td>
            <td>{payment.status}</td>
            <td>{new Date(payment.createdAt).toLocaleDateString()}</td>
          </tr>
        ))}
      </tbody>
    </Table>
 );
}

export default PaymentTable;