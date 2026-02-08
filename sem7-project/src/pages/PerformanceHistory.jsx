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
import { navObj, progressStep } from "../component/enums/SyllabusEvaluatorEnum"

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

    const goToSummary = (performanceId) => {
        navigate(`../${navObj[progressStep.Review].to}/${performanceId}`)
        // dispatch(toggleReviewVisibility(index))
    }

    return (
        <>
            <div className="flex flex-col gap-4 mt-6">
                {
                    performanceSlice.errMsg
                    ?<p>{performanceSlice.errMsg}</p>
                    :
                    <div className="h-[70dvh] overflow-y-auto p-2 space-y-3">  
                        {performanceSlice.performanceRecords.map((item) => (
                            <>
                                <div className="w-full rounded-xl bg-gray-100 shadow-sm transition hover:shadow-md">
                                    
                                    <div
                                        onClick={()=>goToSummary(item.performanceId)}
                                        className="flex items-center justify-between px-6 py-4 cursor-pointer"
                                    >
                                        <span className="text-gray-700 font-medium text-lg">{item.performanceName}</span>
                                    </div>
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