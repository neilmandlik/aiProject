import { NavLink, Outlet, useNavigate } from "react-router-dom";
import { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { UserCircle2 } from "lucide-react";
import { decrement, increment } from "../store/progress/progressSlice";
import { button, loader } from "./ApplicationCSS";
import { setSelectedAccFiles } from "../store/accreditation/accSlice";
function Layout(){
    
    const navObj = {
        1: {
            name: "Accreditation PDFs",
            to: "accreditation-pdf"
        },
        
        2: {
            name: "Syllabus Structure PDF",
            to: "syllabus-pdf",
        },
        
        3: {
            name: "Peformance Summary",
            to: "performance-summary",
        },
    }

    
    const navigate = useNavigate();
    const accSlice = useSelector(state=>state.accreditation);
    const performanceSlice = useSelector(state=>state.performance);
    const progressSlice = useSelector(state=>state.progress)
    const dispatch = useDispatch()
    
    useEffect(()=>{
        if(!progressSlice.isOnPerformanceHistory){
            navigate(navObj[progressSlice.step].to)
        }
    },[progressSlice.step])

    const handleClick = (direction) => {
        if(direction){
            if(progressSlice.step===1){
                dispatch(setSelectedAccFiles())
            }
            dispatch(increment())
        }
        else{
            dispatch(decrement())
        }          
    }

    return (
        <>
            <div className="flex items-center justify-between bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 px-6 py-3 shadow-md">
      
                {/* Left side - Navigation Links */}
                <div className="flex items-center gap-4">
                    {Object.keys(navObj).map((navItem, index) => (
                    <div
                        key={navItem}
                        className={
                        `px-3 py-2 rounded-md text-sm font-medium transition ${
                            (progressSlice.step == navItem) && !progressSlice.isOnPerformanceHistory
                            ? "bg-indigo-600 text-white shadow-md"
                            : "text-gray-300 hover:bg-gray-700 hover:text-white"
                        }`}
                    >
                        {navObj[navItem].name}
                    </div>
                    ))}
                </div>

                {/* Right side - Profile Button */}
                <div className="flex items-center gap-7 px-4 py-2 rounded-md">                
                    <NavLink 
                        to={`performance-history`} 
                        className={`border border-white px-4 py-2 rounded-md hover:bg-indigo-500 hover:border-transparent text-white font-medium shadow-md transition ${progressSlice.isOnPerformanceHistory?"bg-indigo-500 border-transparent":""}`}>
                        Performance History
                    </NavLink>
                    <button className="text-white shadow-md transition">
                        <UserCircle2 size={30} />
                    </button>
                </div>

            </div>

            {accSlice.loading || performanceSlice.loading?
                <div className="flex justify-center pt-40">
                    <div className={`${loader}`}></div>
                </div>
            :
            <Outlet />
            }

            <div className="fixed bottom-0 left-0 w-full bg-white border-t shadow-md p-4 flex justify-between items-center z-50">

                {/* Back Button */}
                <button 
                    className={`${button}`}
                    onClick={()=>handleClick(0)}
                >
                    Back
                </button>

                {/* Next Button */}
                <button 
                    className={`${button}`}                    
                    onClick={()=>handleClick(1,)}
                >
                    Next
                </button>
            </div>
        </>
    )
}

export default Layout;