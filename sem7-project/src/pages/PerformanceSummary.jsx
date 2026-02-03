import { getPerformanceReviewThunk, setSelectedId } from "../store/performance/performanceSlice"
import store from "../store/store"
import CircularProgress from "./ProgressIndicator"
import { useDispatch, useSelector } from "react-redux"
import { loader } from "../component/ApplicationCSS";
import { setIsOnPerformanceHistory, setProgressStep } from "../store/progress/progressSlice";
import { progressStep } from "../component/enums/SyllabusEvaluatorEnum";
import { useEffect } from "react";

export const performanceSummaryLoader = async({params}) => {
    const {id} = params
    store.dispatch(setSelectedId(parseInt(id))) 
    store.dispatch(setIsOnPerformanceHistory(false))   
    store.dispatch(setProgressStep(progressStep.Review))
    await store.dispatch(getPerformanceReviewThunk())
}

function PerformanceSummary(){

    const performanceSlice = useSelector(state => state.performance)
    const progressSlice = useSelector(state => state.progress)
    const dispatch = useDispatch()

    useEffect(()=>{
        dispatch(setIsOnPerformanceHistory(false))
        dispatch(setProgressStep(progressStep.Review))
    },[])


    return(
        <>
            {
                performanceSlice.reviewLoading
                ?
                <div className="flex justify-center pt-40">
                    <div className={`${loader}`}></div>
                </div>
                :
                <div className="flex gap-4 p-6 items-stretch">
    
                    {/* Left Column */}
                    <div className="flex flex-col gap-4 flex-[1]">
                        <div className="rounded-xl flex-1 min-h-40 flex items-center justify-center text-white shadow-md">
                            <CircularProgress percentage={87} />
                        </div>
                        <div className="bg-indigo-500 rounded-xl flex-1 min-h-80 flex items-center justify-center text-white shadow-md">
                        Box 2
                        </div>
                    </div>

                    {/* Right Column */}
                    <div className="bg-indigo-400 rounded-xl flex-[2] flex items-center justify-center text-white shadow-md">
                        Box 3
                    </div>

                </div>
            }

        </>
    )

}

export default PerformanceSummary