'use client'

import { QrScanner } from '@yudiel/react-qr-scanner';
import { useEffect, useRef, useState } from 'react';

const ClientProtectPage = () => {


  const handleScan = (data:string) => {
    if (data) {
      console.log('Scanned QR code:', data);
      // Handle the scanned QR code data
      fetch('/api/ScanTicket', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ ticketId: data }),
      })
        .then((res) => res.json())
        .then((json) => {
          alert(json.message);
          window.location.reload();
        });
    }
  };


  return (
    <div style={{ width: '300px', margin: 'auto' }}>
      <QrScanner
        onDecode={(result) => handleScan(result)}
        onError={(error) => console.log(error?.message)}
        videoStyle={{ width: '100%' }}
        scanDelay={3000}
      />
    </div>
  );
};

export default ClientProtectPage;