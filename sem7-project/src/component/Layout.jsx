import { NavLink, Outlet } from "react-router-dom";

function Layout(){

    const navList = [
        {
            name: "Accreditation PDFs",
            to: "."
        },
        {
            name: "Syllabus Structure PDF",
            to: "syllabus-pdf"
        },
        {
            name: "Peformance History",
            to: "performance-history"
        },
    ]

    return (
        <>
            <div className="flex items-center gap-4 bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 px-6 py-3 shadow-md">
                {navList.map((navItem, index) => 
                    <NavLink 
                        key={index}
                        end={index===0}
                        className={({ isActive }) =>
                            `px-3 py-2 rounded-md text-sm font-medium transition ${
                            isActive
                                ? "bg-indigo-600 text-white shadow-md" // Active link highlight
                                : "text-gray-300 hover:bg-gray-700 hover:text-white"
                            }`}
                        to = {navItem.to}>{navItem.name}
                    </NavLink>
                )}               
            </div>
            <Outlet />
        </>
    )
}

export default Layout;