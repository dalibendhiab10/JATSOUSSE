"use client";
import React, { useEffect, useRef, useState } from "react";
// import { useZxing } from "react-zxing";
// import { BrowserMultiFormatReader } from '@zxing/library';
import BarcodeScannerComponent from "react-qr-barcode-scanner";
// const BarcodeScannerComponent = React.lazy(() => import("react-qr-barcode-scanner")) as React.ComponentType;
const ScanBarcodePage = () => {
  const [result, setResult] = useState("");
  const [data, setData] = React.useState("Not Found");

    const handleScan = (err:any,data: any) => {
        if (result){

            alert(data);
            setResult(data);
        }
        else{
            alert(err)
        }
    }
  return (
    <>
    <div>
      <h1>Scan Barcode</h1>
      <BarcodeScannerComponent
        width={500}
        height={500}
        onUpdate={(err, result) => {
            handleScan(err,result?.getText())
        }}
      />
      <p>{data}</p>
        <span>Last result:</span>
        <span>{result}</span>
    </div>
    </>
  );
};

export default ScanBarcodePage;
