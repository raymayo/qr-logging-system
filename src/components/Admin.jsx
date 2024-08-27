import React, { useState, useEffect } from 'react';
import RecentLogs from './RecentLogs.jsx';
import {
	ChevronRight,
	ChevronLeft,
	User,
	Clock,
	LibraryBig,
} from 'lucide-react';
import DoughnutChart from './DoughtnutChart';

const Admin = () => {
	const [logs, setLogs] = useState([]);
	const [loading, setLoading] = useState(true);

	const [currentPage, setCurrentPage] = useState(1);
	const [logsPerPage] = useState(8); // Number of logs per page
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

	const data = {
		labels: ['Hackers', 'Executives', 'Hoteliers', 'Conquerors'],
		datasets: [
			{
				label: 'Dataset',
				data: [200, 120, 90, 50],
				backgroundColor: ['#18181b', '#27272a', '#3f3f46', '#52525b'],
				// backgroundColor: ['#a855f7', '#fcd34d', '#ef4444','#3b82f6'],
				borderColor: '#fff',
				borderWidth: 0,
			},
		],
	};

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
		<div id="adminPanel" className="w-full h-full p-6 gap-4">
			<div className="w-full h-full flex flex-col gap-4">
				<div className="h-fit border border-zinc-200 rounded-xl p-4 shadow">
					<h1 className="text-3xl font-bold">Dashboard</h1>
					<p className="text-zinc-500">
						Student information table and statistics.
					</p>
				</div>
				<div id="stats" className="w-full gap-6">
					<div className="w-full border border-zinc-200 rounded-xl shadow p-6 flex flex-col justify-center gap-2">
						<div className="flex justify-between text-sm">
							<label className="font-medium">Total Visitor</label>
							<User size={20} className="text-zinc-500" />
						</div>
						<h1 className="font-bold text-4xl flex flex-row items-center">
							1,014
						</h1>
					</div>
					<div className="w-full border border-zinc-200 rounded-xl shadow p-6 flex flex-col justify-center gap-2">
						<div className="flex justify-between text-sm">
							<label className="font-medium">Average Time Spent</label>
							<Clock size={20} className="text-zinc-500" />
						</div>
						<h1 className="font-bold text-4xl flex flex-row items-center">
							30m 42s
						</h1>
					</div>
					<div className="w-full border border-zinc-200 rounded-xl shadow p-6 flex flex-col justify-center gap-2">
						<div className="flex justify-between text-sm">
							<label className="font-medium">Most Active Year Level</label>
							<Clock size={20} className="text-zinc-500" />
						</div>
						<h1 className="font-bold text-4xl flex flex-row items-center">
							30m 42s
						</h1>
					</div>
					<div className="w-full border border-zinc-200 rounded-xl shadow p-6 flex flex-col justify-center gap-2">
						<div className="flex justify-between text-sm">
							<label className="font-medium">Most Active Course</label>
							<LibraryBig size={20} className="text-zinc-500" />
						</div>
						<h1 className="font-bold text-4xl flex flex-row items-center">
							BSCS
						</h1>
						{/* <DoughnutChart data={data} /> */}
					</div>
				</div>
				<div className="h-full flex flex-col justify-between border border-zinc-200 p-6 rounded-xl shadow">
					<div className="h-full">
						<h1 className="text-xl font-semibold py-2">Student Logs</h1>
						<table className="border-collapse table-auto min-w-full overflow-auto">
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
										className="border-t border-zinc-200 hover:bg-zinc-50 transition-all">
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
											<p
												className={`'border border-red-500 w-fit px-2 rounded text-black ' ${
													item.studentInfo.Course === 'BSCS'
														? 'bg-purple-500'
														: item.studentInfo.Course === 'BSBA HRM' ||
														  item.studentInfo.Course === 'BSBA FM' ||
														  item.studentInfo.Course === 'BSA'
														? 'bg-amber-300'
														: item.studentInfo.Course === 'BSED MATH & FIL' ||
														  item.studentInfo.Course === 'BSED SOCSTUD' ||
														  item.studentInfo.Course === 'BEED' ||
														  item.studentInfo.Course === 'CPE'
														? 'bg-blue-500'
														: item.studentInfo.Course === 'BSHM'
														? 'bg-red-500'
														: ''
												}`}>
												{item.studentInfo.Course}
											</p>
										</td>
										<td className="text-left py-3">
											{new Date(item.logAt).toLocaleString()}
										</td>
									</tr>
								))}
							</tbody>
						</table>
					</div>
					<div className=" flex justify-between items-center self-end w-fit gap-4">
						<button
							onClick={() => handlePageChange(currentPage - 1)}
							disabled={currentPage === 1}
							className="border border-zinc-200 shadow-sm px-2 py-1 rounded-md cursor-pointer hover:bg-zinc-100">
							<ChevronLeft />
						</button>
						<span>
							Page {currentPage} of {totalPages}
						</span>
						<button
							onClick={() => handlePageChange(currentPage + 1)}
							disabled={currentPage === totalPages}
							className="border border-zinc-200 shadow-sm px-2 py-1 rounded-md cursor-pointer hover:bg-zinc-100">
							<ChevronRight />
						</button>
					</div>
				</div>
			</div>

			<div className="w-full h-full">
				<RecentLogs />
			</div>
		</div>
	);
};

export default Admin;
