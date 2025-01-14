'use client'

import { QrScanner } from '@yudiel/react-qr-scanner';
import { useEffect, useRef, useState } from 'react';

const ClientProtectPage = () => {


  const handleScan = (data) => {
    console.log(data);
    if (data) {
      console.log('Scanned QR code:', data);
      // Handle the scanned QR code data
      fetch('/api/protected/scan', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ ticketid: data }),
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
        style={{ width: '100%' }}
        scanDelay={3000}
      />
    </div>
  );
};

export default ClientProtectPage;