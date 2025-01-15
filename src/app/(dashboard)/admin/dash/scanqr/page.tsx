// @ts-nocheck

'use client';

import dynamic from 'next/dynamic';
import { useState,useRef } from 'react';

// Dynamically import QrScanner with SSR disabled
const QrScanner = dynamic(
  () => import('@yudiel/react-qr-scanner').then(mod => mod.QrScanner), // Access the named export
  { ssr: false }
);

const ClientProtectPage = () => {

  const scannerRef = useRef(null);
  const [isScanned, setIsScanned] = useState(false);

  const handleScan = (data: string) => {
    if (data && !isScanned) {
      setIsScanned(true);

      if (scannerRef.current && scannerRef.current.stop) {
        scannerRef.current.stop();
      }

      fetch('/api/ScanTicket', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ ticketId: data }),
      })
        .then((res) => res.json())
        .then((json) => {
          alert(json.message).then(() => {
            setIsScanned(false);
          })
        });
    }
  };

  return (
    <div style={{ width: '300px', margin: 'auto' }}>
      {!isScanned && (
        <QrScanner
          ref={scannerRef} // Attach a ref to the scanner
          onDecode={(result) => handleScan(result)}
          onError={(error) => console.log(error?.message)}
          videoStyle={{ width: '100%' }}
          scanDelay={3000}
        />
      )}
      {isScanned && <p>QR code scanned successfully!</p>}
    </div>
  );
};

export default ClientProtectPage;