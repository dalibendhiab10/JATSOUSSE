"use client"
import axios from 'axios';
import { use, useEffect, useState } from 'react';
import Table from 'react-bootstrap/Table';

function BasicExample() {
  const [data,setData]=useState([]);  
  const loadData=async ( ) =>{
    
    await axios.post('/api/getEtickets').then((response) => {
      console.log(response.data);
      setData(response.data);
    }).catch((error) => {
      console.log(error);
    })

  }
  useEffect(() => {
    loadData();
  }
  , []);
  
  return (
    <Table striped bordered hover>
      <thead>
        <tr>
          <th>#</th>
          <th>First Name</th>
          <th>Last Name</th>
          <th>Username</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>1</td>
          <td>Mark</td>
          <td>Otto</td>
          <td>@mdo</td>
        </tr>
        <tr>
          <td>2</td>
          <td>Jacob</td>
          <td>Thornton</td>
          <td>@fat</td>
        </tr>
        <tr>
          <td>3</td>
          <td colSpan={2}>Larry the Bird</td>
          <td>@twitter</td>
        </tr>
      </tbody>
    </Table>
  );
}

export default BasicExample;  