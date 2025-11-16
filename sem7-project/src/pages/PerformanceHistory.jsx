import { getPerformanceThunk, toggleReviewVisibility } from "../store/performance/performanceSlice"
import { ChevronDown, ChevronUp } from "lucide-react"
import store from "../store/store"
import ReviewDetails from "./ReviewDetails"
import { useDispatch, useSelector } from "react-redux"
import { button } from "../component/ApplicationCSS"
import {ArrowLeft} from 'lucide-react'
import { useEffect } from "react"
import { setIsOnPerformanceHistory } from "../store/progress/progressSlice"
import { useNavigate } from "react-router-dom"

export const performanceLoader = async() => {
    await store.dispatch(getPerformanceThunk())
    return store.getState().performance.performanceRecords
}

function PerformanceHistory(){

    
    const progressSlice = useSelector((state)=>state.progress)
    const performanceSlice = useSelector(state=>state.performance)
    const dispatch = useDispatch()
    const navigate = useNavigate()
    
    useEffect(()=>{
        dispatch(setIsOnPerformanceHistory(true))
    },[])

    const handleReviewVisibility = (index) => {
        dispatch(toggleReviewVisibility(index))
    }

    const handleOnNewSummaryClick = () => {
        navigate('../accreditation-pdf',{relative: 'path'})
    }

    return (
        <>
            <div>
                <button 
                onClick={()=>handleOnNewSummaryClick()}
                className={`${button} flex items-center gap-2 m-3`}>
                    <ArrowLeft className="w-5 h-5" />
                    Generate New Summary
                </button>
            </div>
            <div className="flex flex-col gap-4 mt-6">
                {
                    performanceSlice.errMsg
                    ?<p>{performanceSlice.errMsg}</p>
                    :
                    <div className="h-[70dvh] overflow-y-auto p-2 space-y-3">  
                        {performanceSlice.performanceRecords.map((item, index) => (
                            <>
                                <div className="w-full rounded-xl bg-gray-100 shadow-sm transition hover:shadow-md">
                                    
                                    <div
                                        onClick={()=>handleReviewVisibility(index)}
                                        className="flex items-center justify-between px-6 py-4 cursor-pointer"
                                    >
                                        <span className="text-gray-700 font-medium text-lg">{item.reviewName}</span>
                                        {item.isReviewVisible ? (
                                        <ChevronUp className="text-gray-500" size={22} />
                                        ) : (
                                        <ChevronDown className="text-gray-500" size={22} />
                                        )}
                                    </div>

                                    {/* Optional expandable content */}
                                    {item.isReviewVisible && (
                                        <ReviewDetails index={index} />                                     
                                    )}
                                </div>
                            </>
                        ))}
                    </div>
                }
            </div>
        </>
    )
}

export default PerformanceHistory