import React, { useState, useEffect } from 'react';
import QRCode from 'react-qr-code';
import axios from 'axios';

//TODO add react hot toast

const RegisterStudent = () => {
	const [formData, setFormData] = useState({
		studentNo: '',
		studentName: '',
		studentYear: '',
		studentCourse: '',
	});

	const handleChange = (e) => {
		const { name, value } = e.target;
		setFormData({ ...formData, [name]: value });
	};

	const handleSubmit = (e) => {
		e.preventDefault();
		axios
			.post('http://localhost:8000/api/users', formData) // Adjust port if necessary
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
	console.log(formData.studentNo);

	return (
		<div id='registerBox'>
			<form onSubmit={handleSubmit}>
				<label>
					Student No.:
					<input
						type="text"
						name="studentNo"
						value={formData.studentNo}
						onChange={handleChange}
						required
					/>
				</label>
				<br />
				<label>
					Student Name:
					<input
						type="text"
						name="studentName"
						value={formData.studentName}
						onChange={handleChange}
						required
					/>
				</label>
				<br />
				<label>
					Student Year:
					<input
						type="text"
						name="studentYear"
						value={formData.studentYear}
						onChange={handleChange}
						required
					/>
				</label>
				<br />
				<label>
					Student Course:
					<input
						type="text"
						name="studentCourse"
						value={formData.studentCourse}
						onChange={handleChange}
						required
					/>
				</label>
				<br />
				<button type="submit" 
				        onClick={() => {
							const svg = document.getElementById("QRCode");
							const svgData = new XMLSerializer().serializeToString(svg);
							const canvas = document.createElement("canvas");
							const ctx = canvas.getContext("2d");
							const img = new Image();
							img.onload = () => {
							  canvas.width = img.width;
							  canvas.height = img.height;
							  ctx.drawImage(img, 0, 0);
							  const pngFile = canvas.toDataURL("image/png");
							  const downloadLink = document.createElement("a");
							  downloadLink.download = "QRCode";
							  downloadLink.href = `${pngFile}`;
							  downloadLink.click();
							};
							img.src = `data:image/svg+xml;base64,${btoa(svgData)}`;
						  }}
				>Submit</button>
			</form>
			<div className='qrContainer'
				>
				<QRCode
					size={256}
					style={{ height: 'auto', maxWidth: '100%', width: '100%' }}
					value={formData.studentNo}
					viewBox={`0 0 256 256`}
					id='QRCode'
				/>
			</div>
		</div>
	);
};

export default RegisterStudent;
