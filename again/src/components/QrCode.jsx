import React, { useState } from "react";
import axios from "axios";
const QrCode = () => {
  const [qrCode, setQrCode] = useState("");

  const generateQRCode = async () => {
    const data = "Ruthvikh thope ra lafoot"; // Replace with your data
    const response = await axios.get(
      `http://localhost:5000/generateQR?data=${data}`
    );
    setQrCode(response.data);
    console.log(response.data);
  };

  return (
    <main id="main" className="main">
      <button onClick={generateQRCode}>Generate QR Code</button>
      {qrCode && <img src={qrCode} alt="QR Code" />}
    </main>
  );
};

export default QrCode;
