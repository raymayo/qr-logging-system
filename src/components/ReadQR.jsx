import React, { useState, useEffect } from 'react';
import { Scanner } from '@yudiel/react-qr-scanner';

const ReadQR = () => {
	// const [data, setData] = useState('');
	const [display, setDisplay] = useState([]);

	useEffect(() => {}, []);

	const handleScan = (result) => {
		fetch(`http://localhost:8000/api/users/${result[0].rawValue}`)
			.then((response) => response.json())
			.then((studentData) => {
				setDisplay(studentData[0]);
        // console.log(studentData[0])
			})
			.catch((error) => console.error('Error fetching data:', error));
	};

	return (
		<>
			<Scanner onScan={handleScan} />
			<p>Student No: {display.studentNo}</p>
			<p>Student Name: {display.studentName}</p>
			<p>Student Year: {display.studentYear}</p>
			<p>Student Course: {display.studentCourse}</p>

			{/* <ul>
        {displayId.map(id => (
          <li key={id}>{id}</li>
        ))}
      </ul> */}
		</>
	);
};

export default ReadQR;
