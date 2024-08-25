import React, { useState, useEffect } from 'react';
import { useRef } from 'react';
import html2canvas from 'html2canvas';
import QRCode from 'react-qr-code';
import axios from 'axios';
// import { Button } from "@shadcn/ui";

//TODO add react hot toast

const RegisterStudent = () => {
	const [formData, setFormData] = useState({
		studentNo: '',
		studentName: '',
		studentYear: '',
		studentCourse: '',
	});

	const divRef = useRef();

	const handleDownload = () => {
		html2canvas(divRef.current).then((canvas) => {
			const link = document.createElement('a');
			link.download = `${formData.studentName} QR Code.png`;
			link.href = canvas.toDataURL('image/png');
			link.click();
		});
	};

	const handleChange = (e) => {
		const { name, value } = e.target;
		setFormData({ ...formData, [name]: value });
	};

	const handleSubmit = (e) => {
		e.preventDefault();
		axios
			.post('http://localhost:8000/api/users/', formData) // Adjust port if necessary
			.then((response) => {
				console.log('User created:', response.data);
				// Optionally, clear the form or show a success message
				setFormData({
					studentNo: '',
					studentName: '',
					studentYear: '',
					studentCourse: '',
				});
			})
			.catch((error) => {
				console.error('Error creating user:', error);
				// Optionally, show an error message to the user
			});
	};

	return (
		<div className='w-full h-full flex flex-col justify-center items-center'>
		<div
			id="registerBox"
			className="container w-2/5 border border-zinc-200 p-6 rounded-2xl shadow grid grid-cols-2 gap-6">
			<div className='col-span-2 text-left'>
				<h1 className="text-xl font-semibold">Register student</h1>
				<p className='text-zinc-500'>Input the student's information and click submit button to get unique QR Code.</p>
			</div>
			<form onSubmit={handleSubmit} className="">
				<div className="w-full flex flex-col gap-4 ">
					<div className="">
						<label className="block mb-1 text-sm font-medium">ID</label>
						<input
							className="w-full bg-white border border-zinc-200 p-2 pl-3 text-base rounded-md shadow-sm placeholder-zinc-500 focus:border focus:border-black"
							name="studentNo"
							placeholder="Student Number"
							value={formData.studentNo}
							onChange={handleChange}
							required
						/>
					</div>
					<div>
						<label className="block mb-1.5 text-sm font-medium">Name</label>
						<input
							className="w-full bg-white border border-zinc-200 p-2 pl-3 text-base rounded-md shadow-sm placeholder-zinc-500 focus:border-black"
							type="text"
							name="studentName"
							placeholder="Student Name"
							value={formData.studentName}
							onChange={handleChange}
							required
						/>
					</div>
					<div>
						<label className="block mb-1.5 text-sm font-medium">
							Year Level
						</label>
						<select
							className="w-full border border-zinc-200 shadow-sm text-gray-900 rounded-md focus:border-black block text-base p-2 pl-3"
							name="studentYear"
							value={formData.studentYear}
							onChange={handleChange}
							required>
							<option value="" disabled>
								Select Year Level
							</option>
							<option value="1st Year">1st Year</option>
							<option value="2nd Year">2nd Year</option>
							<option value="3rd Year">3rd Year</option>
							<option value="4th Year">4th Year</option>
						</select>
					</div>
					<div>
						<label className="block mb-1.5 text-sm font-medium">Course</label>

						<select
							className="w-full border border-zinc-200 shadow-sm text-gray-900 rounded-md focus:border-black block text-base p-2 pl-3"
							name="studentCourse"
							value={formData.studentCourse}
							onChange={handleChange}
							required>
							<option value="" disabled>
								Select Course
							</option>
							<option value="BSBA HRM">BSBA HRM</option>
							<option value="BSBA FM">BSBA FM</option>
							<option value="BSA">BSA</option>
							<option value="BSCS">BSCS</option>
							<option value="BSED MATH & FIL">BSED MATH & FIL</option>
							<option value="BSED SOCSTUD">BSED SOCSTUD</option>
							<option value="BEED">BEED</option>
							<option value="CPE">CPE</option>
							<option value="BSHM">BSHM</option>
						</select>
					</div>
				</div>
			</form>
			<div className="qrContainer p-6 border border-zinc-200 rounded-md shadow" ref={divRef}>
				<QRCode
					size={256}
					style={{ height: '100%', maxWidth: '100%', width: '100%' }}
					value={formData.studentNo}
					viewBox={`0 0 256 256`}
					id="QRCode"
				/>
			</div>
			<button
				className="col-span-2 bg-zinc-900 text-white inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground shadow h-9 px-4 py-2"
				type="submit"
				onClick={handleDownload}>
				Generate QR Code
			</button>
		</div>
		</div>
	);
};

export default RegisterStudent;
