import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { button } from "../component/ApplicationCSS";
import { ArrowLeft } from "lucide-react";
import { setCurrentAccBody} from "../store/accreditation/accSlice";
import { postFileThunk } from "../store/file/fileSlice";

function AddFile(){
    const [file, setFile] = useState(null);
    const [hasClicked,setHasClicked] = useState(false);
    const [dragActive, setDragActive] = useState(false);
    const progressSlice = useSelector(state=>state.progress);
    const fileSlice = useSelector(state=>state.file);
    const [accBodyName, setAccBodyNameState] = useState('');
    const dispatch = useDispatch();
    const navigate = useNavigate();

    useEffect(()=>{
        if(!hasClicked) return;
        if(fileSlice.errMsg && hasClicked){
            alert(`File upload error: ${fileSlice.errMsg}`);
        }
        else{
            return;
        }
        setHasClicked(false);
    },[fileSlice]);

    const handleFileSelect = (e) => {
        setHasClicked(true);
        if (file?.type === "application/pdf") {
            if(progressSlice.step === 1){
                dispatch(setCurrentAccBody(accBodyName));
            }

            dispatch(postFileThunk(file))
        } else {
        alert("Please upload a valid PDF file.");
        }
    };

    const handleFileChange = (e) => {
        const selected = e.target.files[0];
        setFile(selected);
    };

    const handleAccBodyNameChange = (e) => {
        setAccBodyNameState(e.target.value);
    }

    const handleDragOver = (e) => {
        e.preventDefault();
        setDragActive(true);
    };

    const handleOnCancelClick = () => {
        navigate(`${progressSlice.step===2?'/syllabus-pdf':'/accreditation-pdf'}`);        
    };

    const handleDragLeave = () => setDragActive(false);

    const handleDrop = (e) => {
        e.preventDefault();
        setDragActive(false);
        const dropped = e.dataTransfer.files[0];
        if (dropped?.type === "application/pdf") {
        setFile(dropped);
        } else {
        alert("Please upload a valid PDF file.");
        }
    };
    return (
        <>
            <div>
                <button 
                onClick={()=>handleOnCancelClick()}
                className={`${button} flex items-center gap-2 m-3`}>
                    <ArrowLeft className="w-5 h-5" />
                    Cancel
                </button>
            </div>
            {progressSlice.step === 1 && (
                <div className="text-center">
                    <label
                    htmlFor="accreditationBody"
                    className="text-gray-700 font-medium me-4"
                    >
                    Accreditation Body Name:
                    </label>

                    <input
                    onChange={handleAccBodyNameChange}
                    value={accBodyName}
                    type="text"
                    id="accreditationBody"
                    placeholder="e.g., NAAC, NBA, ISO"
                    className="w-full max-w-md border border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-300 rounded-lg px-4 py-2 text-gray-800 shadow-sm outline-none transition"
                    />
                </div>
            )}
            <div className="flex flex-col items-center justify-center mt-10">
                <label
                    onDragOver={handleDragOver}
                    onDragLeave={handleDragLeave}
                    onDrop={handleDrop}
                    className={`w-[40rem] h-[25rem] border-2 border-dashed rounded-lg flex flex-col items-center justify-center cursor-pointer transition ${
                    dragActive ? "border-indigo-500 bg-indigo-100" : "border-gray-400 bg-emerald-50"
                    }`}
                >
                    <input
                    type="file"
                    accept="application/pdf"
                    onChange={handleFileChange}
                    className="hidden"
                    />
                    <span className="text-indigo-700 text-lg font-semibold tracking-wide">
                        {file ? file.name : `Drag & Drop PDF here or Click to Upload${progressSlice.step===1?" an Accreditation File":""}${progressSlice.step===2?" a Syllabus File":""}`}
                    </span>
                </label>

                {file && (
                    <div className="mt-4 flex gap-4">
                        <button 
                            className="px-4 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700 transition"
                            onClick={handleFileSelect}
                        >
                        Upload PDF
                        </button>

                        <button
                        onClick={() => setFile(null)}
                        className="px-4 py-2 border border-indigo-500 text-indigo-600 hover:bg-indigo-50 font-medium rounded-lg transition shadow-sm"
                        >
                        Deselect
                        </button>
                    </div>
                )}
            </div>
        </>
    )
}

export default AddFile