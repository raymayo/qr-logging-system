import React, { useState } from 'react';
import './App.css';
import RegisterStudent from './components/RegisterStudent.jsx';
import ReadQR from './components/ReadQR.jsx';
import Admin from './components/Admin.jsx';
import { Sidebar, SidebarItem } from './components/Sidebar';
import { UserPlus, ScanQrCode, Monitor } from 'lucide-react';

function App() {
	const [activeComponent, setActiveComponent] = useState('RegisterStudent');

	const renderComponent = () => {
		switch (activeComponent) {
			case 'RegisterStudent':
				return <RegisterStudent />;
			case 'ReadQR':
				return <ReadQR />;
			case 'Admin':
				return <Admin />;
			default:
				return <RegisterStudent />;
		}
	};

	return (
		<div className="w-dvw h-dvh flex bg-black">
			<Sidebar>
				<SidebarItem
					icon={<UserPlus />}
					text="Register Student"
					active={activeComponent === 'RegisterStudent'}
					onClick={() => setActiveComponent('RegisterStudent')}
				/>
				<SidebarItem
					icon={<ScanQrCode />}
					text="Scan QR"
					active={activeComponent === 'ReadQR'}
					onClick={() => setActiveComponent('ReadQR')}
				/>
				<SidebarItem
					icon={<Monitor />}
					text="Administrator"
					active={activeComponent === 'Admin'}
					onClick={() => setActiveComponent('Admin')}
				/>
			</Sidebar>

			<div className="w-full h-full bg-white">{renderComponent()}</div>
		</div>
	);
}

export default App;

{
	/* <Router>
				<Routes>
					<Route path="/" element={<RegisterStudent />} />
					<Route path="/scan" element={<ReadQR />} />
					<Route path="/admin" element={<Admin/>} />
				</Routes>
			</Router> */
}
