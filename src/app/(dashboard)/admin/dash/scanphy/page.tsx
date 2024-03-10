"use client";
import React, { useEffect, useRef } from "react";
import BarcodeScannerComponent from "react-qr-barcode-scanner";

const ScanBarcodePage = () => {
    const [data, setData] = React.useState("Not Found");

    
  return (
    <>
      <div>
        <h1>Scan Barcode</h1>
        <BarcodeScannerComponent
        width={500}
        height={500}
        onUpdate={(err, result) => {
          if (result) {
            setData(result.getText());
            alert(result.getText());
          }
          
          else {
            setData("Not Found");
            alert(err)
          };
        }}
      />
      <p>{data}</p>
      </div>
    </>
  );
};

export default ScanBarcodePage;