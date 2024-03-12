"use client";
import React, { useEffect, useRef, useState } from "react";
import { useZxing } from 'react-zxing';
const ScanBarcodePage = () => {
    const [data, setData] = React.useState("Not Found");
      
  return (
    <>
      <div>
        <h1>Scan Barcode</h1>
        
      <p>{data}</p>
      </div>
    </>
  );
};

export default ScanBarcodePage;