import { getPerformanceReviewThunk, setSelectedId } from "../store/performance/performanceSlice"
import store from "../store/store"
import CircularProgress from "./ProgressIndicator"
import { useDispatch, useSelector } from "react-redux"
import { button, loader } from "../component/ApplicationCSS";
import { setIsOnPerformanceHistory, setProgressStep } from "../store/progress/progressSlice";
import { navObj, progressStep } from "../component/enums/SyllabusEvaluatorEnum";
import { useEffect } from "react";
import { ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { accBodyName, accFileName, accHeader, rubricHeader, rubricItem, rubricJustification, rubricList, rubricName, scoreBadge, scoreGood, scoreLow, scoreMid, summaryMeta, summaryMetaLabel, summaryMetaValue } from "./PerformanceSummmary.module";

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
    const navigate = useNavigate()
    const summary = performanceSlice.performanceSummary
    const accDetails = summary.accreditationDetails

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
                <>

                    <div className="flex gap-4 p-6 items-stretch h-[calc(100vh-130px)]">
        
                        {/* Left Column */}
                        <div className="flex flex-col gap-4 flex-[1]">
                            <div className="rounded-xl flex-1 min-h-25 flex items-center justify-center shadow-md">
                                <div>
                                    <div className="flex justify-center">
                                        <CircularProgress percentage={87} />
                                    </div>
                                    <p className="mt-3">Overall Alignment Score</p>
                                </div>
                            </div>
                            <div className="rounded-xl flex-1 min-h-25 flex items-center justify-center shadow-md">
                                <div className={`${summaryMeta}`}>
                                    <div>
                                    <p className={`${summaryMetaLabel}`}>Syllabus File</p>
                                    <p className={`${summaryMetaValue}`}>{summary.syllFileName}</p>
                                    </div>

                                    <div>
                                    <p className={`${summaryMetaLabel}`}>Performance Name</p>
                                    <p className={`${summaryMetaValue}`}>{summary.performanceName}</p>
                                    </div>

                                    <div>
                                    <p className={`${summaryMetaLabel}`}>Created On</p>
                                    <p className={`${summaryMetaValue}`}>02 Feb 2026</p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Right Column */}
                        <div className="rounded-xl flex-[4] shadow-md p-6 bg-white space-y-8 overflow-y-auto min-h-0">
                            {Object.keys(accDetails).map(ele=>(
                                <div>
                                    <div className={`${accHeader}`}>
                                        <p class={`${accBodyName}`}>{accDetails[ele].accBodyName}</p>
                                        <p class={`${accFileName}`}>{accDetails[ele].accFileName}</p>
                                    </div>
                                    <div className={`${rubricList}`}>                                        
                                        {accDetails[ele].performanceDetails.map(det=>(
                                            <>
                                                <div className={`${rubricItem}`}>
                                                    <div className={`${rubricHeader}`}>
                                                        <p className={`${rubricName}`}>{det.accRubricName}</p>
                                                        <span className={`${scoreBadge} ${det.performanceScore<4?`${scoreLow}`:det.performanceScore<8?`${scoreMid}`:`${scoreGood}`}`}>{det.performanceScore}/10</span>
                                                    </div>
                                                    <p>{`${det.performanceJustification}`}</p>
                                                </div>
                                            </>
                                        ))}
                                    </div>

                                </div>
                            ))}
                        </div>

                    </div>
                </>
            }

        </>
    )

}

export default PerformanceSummary