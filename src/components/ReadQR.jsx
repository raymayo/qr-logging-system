import React, { useState, useEffect } from 'react';
import { Scanner } from '@yudiel/react-qr-scanner';
import moment from 'moment';
import axios from 'axios';


const ReadQR = () => {
	const date = moment();
	const formattedDate = date.format('dddd, MMM D YYYY, h:mm A');
	// const [data, setData] = useState('');

	console.log(formattedDate)

	const [display, setDisplay] = useState([]);
	const [condition, setCondition] = useState(false);

	const handleScan = async (result) => {
		try {
			// Fetch student data
			const response = await fetch(
				`http://localhost:8000/api/users/${result[0].rawValue}`
			);
			const studentData = await response.json();
			const student = studentData[0];

			// Update display with student data
			setDisplay(student);

			// Prepare student info for posting
			const studentInfo = {
				No: student.studentNo,
				Name: student.studentName,
				Year: student.studentYear,
				Course: student.studentCourse,
			};

			setCondition((prevCondition) => !prevCondition);

			// Get current date and time using Moment.js
			const logAt = formattedDate; // Example format: "Monday, 08-20-2024 11:30"
			console.log(logAt);

			// Post student info and logAt
			const postResponse = await axios.post('http://localhost:8000/api/scan/', {
				studentInfo,
				logAt,
			}); // Adjust port if necessary
			console.log('User created:', postResponse.data);
		} catch (error) {
			console.error('Error:', error);
			// Optionally, show an error message to the user
		}

	};
	console.log(Date().toLocaleString())

	return (
			<div className='w-full h-full flex flex-col justify-center items-center'>
		<div className="w-2/4 h-96 mx-auto grid grid-cols-2 gap-6">
			<div className="">
				<Scanner onScan={handleScan} />
			</div>
			<div className="p-4 border border-zinc-200 shadow rounded-xl flex flex-col gap-3">
				<h1>Student Information</h1>
				<div>
					<label className="block mb-1.5 text-sm font-medium">ID Number</label>
					<input
						type="text"
						value={condition ? display.studentNo : '313232'}
						className="w-full text-black font-semibold bg-white border border-zinc-200 shadow-sm rounded-md focus:border-black block text-base p-2 pl-3"
						disabled
					/>
				</div>
				<div>
					<label className="block mb-1.5 text-sm font-medium">Name</label>
					<input
						type="text"
						value={condition ? display.studentName : 'Name'}
						className="w-full text-black font-semibold bg-white border border-zinc-200 shadow-sm rounded-md focus:border-black block text-base p-2 pl-3"
						disabled
					/>
				</div>
				<div>
					<label className="block mb-1.5 text-sm font-medium">Year Lever</label>
					<input
						type="text"
						value={condition ? display.studentYear : 'Year Level'}
						className="w-full text-black font-semibold bg-white border border-zinc-200 shadow-sm rounded-md focus:border-black block text-base p-2 pl-3"
						disabled
					/>
				</div>
				<div>
					<label className="block mb-1.5 text-sm font-medium">Course</label>
					<input
						type="text"
						value={condition ? display.studentCourse : 'Course'}
						className="w-full text-black font-semibold bg-white border border-zinc-200 shadow-sm rounded-md focus:border-black block text-base p-2 pl-3"
						disabled
					/>
				</div>
				<div>
					<label className="block mb-1.5 text-sm font-medium">Log At</label>
					<input
						type="text"
						value={condition ? formattedDate : 'Log At'}
						className="w-full text-black font-semibold bg-white border border-zinc-200 shadow-sm rounded-md focus:border-black block text-base p-2 pl-3"
						disabled
					/>
				</div>

			</div>

			{/* <ul>
        {displayId.map(id => (
          <li key={id}>{id}</li>
        ))}
      </ul> */}
		</div>
		</div>
	);
};

export default ReadQR;
