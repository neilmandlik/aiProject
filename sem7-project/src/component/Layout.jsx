import { NavLink, Outlet, useNavigate } from "react-router-dom";
import { useRef } from "react";
import { useSelector } from "react-redux";
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

    const navigate = useNavigate();
    const stepNo = useRef(0);
    const accSlice = useSelector(state=>state.accreditation);

    const handleClick = (direction) => {
        if(!!direction){
            stepNo.current++;
        }
        else if(!!!direction){
            stepNo.current--;
        }    
        
        if(stepNo.current < 0){
            stepNo.current = 0;
        }
        else if(stepNo.current >= navList.length){
            stepNo.current = navList.length - 1;
        }
        else{
            navigate(navList[stepNo.current].to);
        }
        
    }

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

            {accSlice.loading?
                <div class="flex justify-center pt-40">
                    <div class="w-10 h-10 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
                </div>
            :
            <Outlet />
            }

            <div className="fixed bottom-0 left-0 w-full bg-white border-t shadow-md p-4 flex justify-between items-center z-50">

                {/* Back Button */}
                <button 
                    className="px-5 py-2 border border-indigo-500 text-indigo-600 hover:bg-indigo-50 font-medium rounded-lg transition shadow-sm"
                    onClick={()=>handleClick(0)}
                >
                    Back
                </button>

                {/* Next Button */}
                <button 
                    className="px-5 py-2 border border-indigo-500 text-indigo-600 hover:bg-indigo-50 font-medium rounded-lg transition shadow-sm"
                    onClick={()=>handleClick(1)}
                >
                    Next
                </button>
            </div>
        </>
    )
}

export default Layout;