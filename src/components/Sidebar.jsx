import { MoreVertical, ChevronLast, ChevronFirst } from 'lucide-react';
import { useContext, createContext, useState } from 'react';
import { UserPlus, QrCode } from 'lucide-react';

const SidebarContext = createContext();

const Sidebar = ({ children }) => {
	const [expanded, setExpanded] = useState(true);

	return (
		<aside className="h-screen">
			<nav className="h-full flex flex-col bg-white border-r border-zinc-200">
				<div className="w-full p-4 pb-2 flex justify-between items-center">
					<div
						className={`overflow-hidden flex gap-1 text-xl transition-all ${
              expanded ? "w-44" : "w-0"
            }`}>
						{/* <QrCode /> */}
            <h1 className='font-bold'>QRID System</h1>
					</div>

					<button
						onClick={() => setExpanded((curr) => !curr)}
						className="p-1.5 rounded-lg bg-gray-50 hover:bg-gray-100">
						{expanded ? <ChevronFirst /> : <ChevronLast />}
					</button>
				</div>

				<SidebarContext.Provider value={{ expanded }}>
					<ul className="flex-1 px-3">{children}</ul>
				</SidebarContext.Provider>
			</nav>
		</aside>
	);
};

const SidebarItem = ({ icon, text, active, alert, onClick }) => {
  const { expanded } = useContext(SidebarContext);

  return (
    <li
      onClick={onClick}  // Add this line to handle the click event
      className={`
        relative flex items-center py-2 px-3 my-1
        font-medium text-base rounded-md text-zinc-950 cursor-pointer
        transition-colors group
        ${
          active
            ? ' bg-zinc-100 text-zinc-950'
            : 'hover:bg-zinc-100 text-zinc-950'
        }
      `}>
      {icon}
      <span
        className={`overflow-hidden transition-all ${
          expanded ? 'w-52 ml-3' : 'w-0'
        }`}>
        {text}
      </span>
      {alert && (
        <div
          className={`absolute right-2 w-2 h-2 rounded bg-zinc-400 ${
            expanded ? '' : 'top-2'
          }`}
        />
      )}

      {!expanded && (
        <div
          className={`
            absolute left-full rounded-md px-2 py-1 ml-6
            bg-zinc-100 text-zinc-950 shadow text-sm
            invisible opacity-20 -translate-x-3 transition-all
            group-hover:visible group-hover:opacity-100 group-hover:translate-x-0
        `}>
          {text}
        </div>
      )}
    </li>
  );
};


export { Sidebar, SidebarItem };
