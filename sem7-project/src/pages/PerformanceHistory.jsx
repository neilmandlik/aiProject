import { getPerformanceThunk, toggleReviewVisibility } from "../store/performance/performanceSlice"
import { ChevronDown, ChevronUp } from "lucide-react"
import store from "../store/store"
import ReviewDetails from "./ReviewDetails"
import { useDispatch, useSelector } from "react-redux"

export const performanceLoader = async() => {
    await store.dispatch(getPerformanceThunk())
    return store.getState().performance.performanceRecords
}

function PerformanceHistory(){

    const performanceHistory = useSelector(state=>state.performance.performanceRecords)
    const dispatch = useDispatch()

    const handleReviewVisibility = (index) => {
        dispatch(toggleReviewVisibility(index))

    }

    return (
        <>
            <div className="flex flex-col gap-4 mt-6">
                {
                    performanceHistory.map((item, index) => (
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
                    ))
                }
            </div>
        </>
    )
}

export default PerformanceHistory