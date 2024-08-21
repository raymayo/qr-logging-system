import React from 'react';

const Admin = () => {
	const data = [
		{
			studentInfo: {
				No: '23-0875',
				Name: 'John Ray Ormillada',
				Year: '3rd Year',
				Course: 'BSCS',
				createdAt: '2024-08-21T13:14:37.978Z',
			},
			_id: '66c5e83d788e6a33e24a21ee',
			logAt: '2024-08-21T13:14:37.979Z',
			__v: 0,
		},
		{
			studentInfo: {
				No: '23-0875',
				Name: 'John Ray Ormillada',
				Year: '3rd Year',
				Course: 'BSCS',
				createdAt: '2024-08-21T14:49:07.681Z',
			},
			_id: '66c5fe63a164e0992c2e2a73',
			logAt: '2024-08-21T14:48:00.000Z',
			__v: 0,
		},
		{
			studentInfo: {
				No: '23-0875',
				Name: 'John Ray Ormillada',
				Year: '3rd Year',
				Course: 'BSCS',
				createdAt: '2024-08-21T14:49:15.510Z',
			},
			_id: '66c5fe6ba164e0992c2e2a76',
			logAt: '2024-08-21T14:49:00.000Z',
			__v: 0,
		},
	];

	console.log(Date.now());
	return (
		<div className="border border-zinc-200 p-6 rounded-xl shadow max-w-full overflow-x-auto">
			<h1 className="text-xl font-semibold py-2">Recent Student Logs</h1>
			{/* <p className="text-zinc-500">
				Input the student's information and click submit button to get unique QR
				Code.
			</p> */}
			<table className="border-collapse table-auto min-w-full">
				<thead>
					<tr className="text-left hover:bg-zinc-50">
						<th className="py-3 pr-20 text-left font-medium text-zinc-500">
							Student No
						</th>
						<th className="py-3 pr-20 text-left font-medium text-zinc-500">
							Name
						</th>
						<th className="py-3 pr-20 text-left font-medium text-zinc-500">
							Year
						</th>
						<th className="py-3 pr-20 text-left font-medium text-zinc-500">
							Course
						</th>
						<th className="py-3 text-left font-medium text-zinc-500">
							Log At
						</th>
					</tr>
				</thead>
				<tbody>
					{data.map((item) => (
						<tr key={item._id} className="border-t border-zinc-200 hover:bg-zinc-50">
							<td className="text-left py-3 pr-20 font-semibold">
								{item.studentInfo.No}
							</td>
							<td className="text-left py-3 pr-20">{item.studentInfo.Name}</td>
							<td className="text-left py-3 pr-20">{item.studentInfo.Year}</td>
							<td className="text-left py-3 pr-20">
								{item.studentInfo.Course}
							</td>
							<td className="text-left py-3">{new Date(item.logAt).toLocaleDateString}</td>
						</tr>
					))}
				</tbody>
			</table>
		</div>
	);
};

export default Admin;
