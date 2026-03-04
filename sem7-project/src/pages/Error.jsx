import { useNavigate } from "react-router-dom"
import { navObj, progressStep } from "../component/enums/SyllabusEvaluatorEnum"
import { setProgressStep } from "../store/progress/progressSlice"
import store from "../store/store"
import { useSelector } from "react-redux"

export const errorLoader = () => {
    store.dispatch(setProgressStep(progressStep.Error))
}

function Error() {

    const navigate = useNavigate()
    const performanceSlice = useSelector(state=>state.performance)

    const handleGoBackClick = () => {
        navigate(`/${navObj[progressStep.Accreditation].to}`)
    }

    return (
        <>
            <div className="flex items-center justify-center h-[calc(100vh-130px)]">

                <div className="bg-white rounded-2xl shadow-md w-full max-w-lg overflow-hidden">

                    <div className="h-1 bg-gradient-to-r from-red-600 to-orange-400"></div>

                    <div className="p-10">

                        <div className="flex justify-center mb-6">
                        <div className="bg-red-50 rounded-full p-4">
                            <svg className="w-10 h-10 text-red-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5"
                                d="M12 9v3.75m9-.75a9 9 0 11-18 0 9 9 0 0118 0zm-9 3.75h.008v.008H12v-.008z" />
                            </svg>
                        </div>
                        </div>

                        <h1 className="text-xl font-semibold text-gray-900 text-center mb-3">
                        We're sorry — it looks like something is missing.
                        </h1>

                        <p className="text-sm text-gray-500 leading-relaxed text-center mb-3">
                            {performanceSlice.errMsg}                        
                        </p>


                        <div className="flex gap-3">
                        <button
                            onClick={handleGoBackClick}
                            className="flex-1 px-5 py-2 border border-indigo-500 text-indigo-600 hover:bg-indigo-50 font-medium rounded-lg transition shadow-sm"
                        >
                            ← Go Back
                        </button>
                        </div>

                    </div>
                </div>
            </div>


        </>
    )

}

export default Error