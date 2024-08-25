import React, { useState, useEffect } from 'react';
import RecentLogs from './RecentLogs.jsx';

const Admin = () => {
	const [logs, setLogs] = useState([]);
	const [loading, setLoading] = useState(true);

	const [currentPage, setCurrentPage] = useState(1);
	const [logsPerPage] = useState(10); // Number of logs per page
	const [sortConfig, setSortConfig] = useState({ key: '', direction: '' });

	const sortedLogs = [...logs].sort((a, b) => {
		if (sortConfig.key) {
			if (sortConfig.direction === 'ascending') {
				return a.studentInfo[sortConfig.key] > b.studentInfo[sortConfig.key]
					? 1
					: -1;
			} else if (sortConfig.direction === 'descending') {
				return a.studentInfo[sortConfig.key] < b.studentInfo[sortConfig.key]
					? 1
					: -1;
			}
		}
		return 0;
	});

	// Pagination
	const indexOfLastLog = currentPage * logsPerPage;
	const indexOfFirstLog = indexOfLastLog - logsPerPage;
	const currentLogs = sortedLogs.slice(indexOfFirstLog, indexOfLastLog);
	const totalPages = Math.ceil(logs.length / logsPerPage);

	useEffect(() => {
		setCurrentPage(1); // Reset to the first page when logs or sorting changes
	}, [logs, sortConfig]);

	useEffect(() => {
		const fetchLog = async () => {
			try {
				const response = await fetch('http://localhost:8000/api/admin/');
				if (!response.ok) {
					throw new Error('Network response was not ok');
				}
				const result = await response.json();
				setLogs(result);
			} catch (error) {
				console.error(error);
			} finally {
				setLoading(false);
			}
		};

		fetchLog();
	}, []);

	const requestSort = (key) => {
		let direction = 'ascending';
		if (sortConfig.key === key && sortConfig.direction === 'ascending') {
			direction = 'descending';
		}
		setSortConfig({ key, direction });
	};

	const handlePageChange = (pageNumber) => {
		setCurrentPage(pageNumber);
	};

	if (loading) return <p>Loading...</p>;
	return (
		<div className="w-full h-full grid justify-center items-center border border-red-500 grid-cols-7 grid-rows-7 p-6 gap-6">
			<div id='stats' className='w-full h-full flex flex-row gap-6 border border-blue-500 col-start-1 col-end-6 row-span-2'>
				<div className='w-full border border-zinc-200 p-6 rounded-xl shadow max-w-full'>number of all students</div>
				<div className='w-full border border-zinc-200 p-6 rounded-xl shadow max-w-full'>bar data</div>
				<div className='w-full border border-zinc-200 p-6 rounded-xl shadow max-w-full'>chart data</div>
			</div>
			<div className="w-full h-full border border-zinc-200 p-6 rounded-xl shadow max-w-full overflow-x-auto col-start-1 col-end-6 row-start-3 row-end-8 ">
				<h1 className="text-xl font-semibold py-2">Student Logs</h1>
				<table className="border-collapse table-auto min-w-full">
					<thead>
						<tr className="text-left hover:bg-zinc-50">
							<th
								onClick={() => requestSort('No')}
								className="py-3 pr-20 text-left font-medium text-zinc-500 cursor-pointer">
								Student No
							</th>
							<th
								onClick={() => requestSort('Name')}
								className="py-3 pr-20 text-left font-medium text-zinc-500 cursor-pointer">
								Name
							</th>
							<th
								onClick={() => requestSort('Year')}
								className="py-3 pr-20 text-left font-medium text-zinc-500 cursor-pointer">
								Year
							</th>
							<th
								onClick={() => requestSort('Course')}
								className="py-3 pr-20 text-left font-medium text-zinc-500 cursor-pointer">
								Course
							</th>
							<th className="py-3 text-left font-medium text-zinc-500">
								Log At
							</th>
						</tr>
					</thead>
					<tbody>
						{currentLogs.map((item) => (
							<tr
								key={item._id}
								className="border-t border-zinc-200 hover:bg-zinc-50">
								<td className="text-left py-3 pr-20 font-semibold">
									{item.studentInfo.No}
								</td>
								<td className="text-left py-3 pr-20">
									{item.studentInfo.Name}
								</td>
								<td className="text-left py-3 pr-20">
									{item.studentInfo.Year}
								</td>
								<td className="text-left py-3 pr-20">
									{item.studentInfo.Course}
								</td>
								<td className="text-left py-3">
									{new Date(item.logAt).toLocaleString()}
								</td>
							</tr>
						))}
					</tbody>
				</table>
				<div className="flex justify-between items-center">
					<button
						onClick={() => handlePageChange(currentPage - 1)}
						disabled={currentPage === 1}>
						Previous
					</button>
					<span>
						Page {currentPage} of {totalPages}
					</span>
					<button
						onClick={() => handlePageChange(currentPage + 1)}
						disabled={currentPage === totalPages}>
						Next
					</button>
				</div>

			</div>
				<RecentLogs />
		</div>
	);
};

export default Admin;
