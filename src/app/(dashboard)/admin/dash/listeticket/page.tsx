'use client';
import axios from 'axios';
import { useEffect, useState } from 'react';

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
      setPayments(response.data.data); 
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  return (
    <div className="table-responsive">
      <table className="custom-table">
        <thead>
          <tr>
            <th className="text-center">#</th>
            <th>Payment ID</th>
            <th>Amount</th>
            <th>Status</th>
            <th>Created At</th>
          </tr>
        </thead>
        <tbody>
          {payments.map((payment, index) => (
            <tr key={payment.id}>
              <td className="text-center">{index + 1}</td>
              <td>{payment.id}</td>
              <td>{payment.amount}</td>
              <td>{payment.status}</td>
              <td>{new Date(payment.createdAt).toLocaleDateString()}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default PaymentTable;