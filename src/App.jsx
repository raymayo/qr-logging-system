import React, { useEffect, useState } from 'react';
import './App.css';
import RegisterStudent from './components/RegisterStudent.jsx';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import ReadQR from './components/ReadQR.jsx';

function App() {
	const [count, setCount] = useState(0);

	return (
		<>
			<Router>
				<Routes>
					<Route path="/" element={<RegisterStudent />} />
					<Route path="/scan" element={<ReadQR />} />
				</Routes>
			</Router>
		</>
	);
}

export default App;
