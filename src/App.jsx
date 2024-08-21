import React, { useEffect, useState } from 'react';
import './App.css';
import RegisterStudent from './components/RegisterStudent.jsx';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import ReadQR from './components/ReadQR.jsx';
import Admin from './components/Admin.jsx';

function App() {
	const [count, setCount] = useState(0);

	return (
		<>
			<Router>
				<Routes>
					<Route path="/" element={<RegisterStudent />} />
					<Route path="/scan" element={<ReadQR />} />
					<Route path="/admin" element={<Admin/>} />
				</Routes>
			</Router>
		</>
	);
}

export default App;
