import CircularProgress from "./ProgressIndicator"

function PerformanceSummary(){
    return(
        <>
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

        </>
    )

}

export default PerformanceSummary