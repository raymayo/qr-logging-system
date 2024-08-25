import React, { useState, useEffect } from 'react';

const RecentLogs = () => {
	const [logs, setLogs] = useState([]);
	const [loading, setLoading] = useState(true);

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

	if (loading) return <p>Loading...</p>;
	return (
		<div className="w-full h-full border border-zinc-200 p-4 rounded-xl shadow bg-white">
			<h1 className="text-xl font-semibold text-left pb-3">Recent Logs</h1>
			<div className="flex flex-col gap-4 overflow-auto h-full">
				{logs.map((item) => (
					<div
						key={item._id}
						className="border border-zinc-200 rounded-md shadow p-3 hover:bg-zinc-200 transition-all">
						<div className="pb-1">
							<div className='flex flex-col float-end mt-3'>
								<p className="">{new Date(item.logAt).toLocaleDateString()}</p>
								<p className="">{new Date(item.logAt).toLocaleTimeString()}</p>
							</div>

							<h1 className="text-xs text-zinc-400">#{item.studentInfo.No}</h1>
							<h1 className="text-lg font-semibold">{item.studentInfo.Name}</h1>
						</div>
						<div className="flex gap-1">
							<p className="text-xs text-white font-semibold bg-black px-2 py-1 rounded-md flex justify-center items-center">
								{item.studentInfo.Year}
							</p>
							<p className="text-xs text-zinc-900 font-semibold bg-zinc-200 px-3 rounded-md flex justify-center items-center">
								{item.studentInfo.Course}
							</p>
						</div>
					</div>
				))}
			</div>
			{/* <table className="border-collapse table-auto min-w-full overflow-auto">
				<thead>
					<tr className="text-left hover:bg-zinc-50">
						<th className="py-3 pr-20 text-left font-medium text-zinc-500">Student No</th>
						<th className="py-2 text-left font-medium text-zinc-500 text-sm">
							Name
						</th>
						<th className="py-3 pr-20 text-left font-medium text-zinc-500">Year</th>
						<th className="py-3 pr-20 text-left font-medium text-zinc-500">Course</th>
						<th className="py-2 text-left font-medium text-zinc-500 text-sm">
							Log
						</th>
					</tr>
				</thead>
				<tbody>
					{logs.map((item) => (
						<tr
							key={item._id}
							className="border-t border-zinc-200 hover:bg-zinc-50">
							<td className="text-left py-3 pr-20 font-semibold">{item.studentInfo.No}</td>
							<td className="text-left py-2  text-sm">
								{item.studentInfo.Name}
							</td>
							<td className="text-left py-3 pr-20">{item.studentInfo.Year}</td>
							<td className="text-left py-3 pr-20">{item.studentInfo.Course}</td>
							<td className="text-left py-2 text-sm">
								{new Date(item.logAt).toLocaleString()}
							</td>
						</tr>
					))}
				</tbody>
			</table> */}
		</div>
	);
};

export default RecentLogs;
