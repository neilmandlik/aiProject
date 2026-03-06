import { getPerformanceThunk } from "../store/performance/performanceSlice"
import store from "../store/store"
import { useSelector } from "react-redux"
import { useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { navObj, progressStep } from "../component/enums/SyllabusEvaluatorEnum"
import { setProgressStep } from "../store/progress/progressSlice"

export const performanceLoader = () => {
    store.dispatch(setProgressStep(progressStep.PerformanceHistory))
    store.dispatch(getPerformanceThunk())
}

function PerformanceHistory(){

    const performanceSlice = useSelector(state=>state.performance)
    const navigate = useNavigate()

    const goToSummary = (performanceId) => {
        navigate(`../${navObj[progressStep.Review].to}/${performanceId}`)
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