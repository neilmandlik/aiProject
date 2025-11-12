import { useSelector } from "react-redux";
import CircularProgress from "./ProgressIndicator";

const ReviewDetails = ({ index }) => {

    const reviewData = useSelector(state=>state.performance.performanceRecords[index].reviewData);

    if(Object.entries(reviewData).length === 0){
        return <p>No records available.. </p>
    }

    return (
        <div className="px-6 pb-6">
        <div className="flex gap-6 items-start">
            {/* Circular Percentage */}
            <div className="w-24 h-24">
            <CircularProgress percentage = {reviewData.performancePercent} />
            </div>

            {/* Rubrics Section */}
            <div className="flex flex-col gap-4 w-full">
            {Object.keys(reviewData.rubrics).map((item, index) => (
                <div key={index} className="flex flex-col">
                    <div className="flex justify-between">
                        <span className="text-gray-700 font-medium text-sm">
                        {item}
                        </span>
                        <span className="text-gray-600 text-sm">
                        {reviewData.rubrics[item].score}/10
                        </span>
                    </div>
                    {/* Optional rating bar */}
                    {/* <div className="w-full h-2 rounded-full bg-gray-300 overflow-hidden">
                        <div
                        className="h-full bg-indigo-500 transition-all"
                        style={{ width: `${(item.rating / 10) * 100}%` }}
                        ></div>
                    </div> */}
                </div>
            ))}
            </div>
        </div>
        </div>
    );
};

export default ReviewDetails;
