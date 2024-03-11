"use client";
import React, { useEffect, useRef, useState } from "react";
import { useZxing } from 'react-zxing';
import BarcodeScannerComponent from "./BarcodeScanner"
const ScanBarcodePage = () => {
    const [data, setData] = React.useState("Not Found");
      
  return (
    <>
      <div>
        <h1>Scan Barcode</h1>
        <BarcodeScannerComponent
            setBarcode={(barcode) => {
                setData(barcode);
            }}
            setError={(error) => {
                setData(error);
            }}
        
        />
      <p>{data}</p>
      </div>
    </>
  );
};

export default ScanBarcodePage;