import React, { useState, useEffect } from 'react';
import { Scanner } from '@yudiel/react-qr-scanner';

const ReadQR = () => {
  const [data, setData] = useState('');
  const [display, setDisplay] = useState([]);

  useEffect(() => {
    fetch('http://localhost:8000/api/users')
      .then(response => response.json())
      .then(studentData => {
        setDisplay(studentData);;
      })
      .catch(error => console.error('Error fetching data:', error));
  }, []);



  const handleScan = (result) => {
    // if (result[0] && result[0].rawValue) {
    //   setData(result[0].rawValue);
    // } else {
    //   console.error('Invalid QR code result:', result);
    // }
    setData(result[0].rawValue);
    display.forEach(e => {
      if(result[0].rawValue === e.studentNo){
        setData(e);
        console.log(e)
      }
    });
  };
  
  return (
    <>
      <Scanner onScan={handleScan} />
      <h1>Welcome, {data.studentName}!</h1>
      {/* <ul>
        {displayId.map(id => (
          <li key={id}>{id}</li>
        ))}
      </ul> */}
    </>
  );
}

export default ReadQR;
