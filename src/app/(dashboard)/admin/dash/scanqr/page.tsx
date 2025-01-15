// @ts-nocheck

'use client';

import dynamic from 'next/dynamic';
import { useState } from 'react';

// Dynamically import QrScanner with SSR disabled
const QrScanner = dynamic(() => import('@yudiel/react-qr-scanner'), { ssr: false });

const ClientProtectPage = () => {
  const handleScan = (data: string) => {
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
