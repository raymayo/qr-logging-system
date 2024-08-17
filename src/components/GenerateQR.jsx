// import QRCode from "qrcode.react";
import React, { useEffect, useState } from 'react';

const GenerateQR = () => {

  const [studentId, setStudentId] = useState([]);

  useEffect(() => {
		fetch('http://localhost:8000/api/users')
		  .then(response => response.json())
		  .then(data => 
			setStudentId(data)
			// console.log(data)
		)
		  .catch(error => console.error('Error fetching data:', error));
	  }, []);

  return (
    <>
    {/* <QRCode title="title"
    value={studentId}
/> */}
</>
  )
}

export default GenerateQR