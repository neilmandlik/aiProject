import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { button, loader } from "../component/ApplicationCSS";
import { ArrowLeft } from "lucide-react";
import { setCurrentAccBody, setCurrentCollectionName, setSelectedAccId} from "../store/accreditation/accSlice";
import { postFileThunk } from "../store/file/fileSlice";
import { navObj, progressStep } from "../component/enums/SyllabusEvaluatorEnum";

function AddFile(){
    const [file, setFile] = useState(null);
    const [accBodyName, setAccBodyNameState] = useState('');
    const [collectionName, setCollectionName] = useState('');

    const [hasClicked,setHasClicked] = useState(false);
    const [isOpen, setIsOpen] = useState(false)
    const [dragActive, setDragActive] = useState(false);

    const progressSlice = useSelector(state=>state.progress);
    const fileSlice = useSelector(state=>state.file);
    const accSlice = useSelector(state=>state.accreditation);

    const dispatch = useDispatch();
    const navigate = useNavigate();

    // useEffect(()=>{
    //     if(fileSlice.errMsg && hasClicked){
    //         alert(`File upload error: ${fileSlice.errMsg}`);
    //         setHasClicked(false);
    //     }

    //     else if(!fileSlice.loading && !fileSlice.errMsg && hasClicked){
    //         navigate(`${progressSlice.step===1?'/accreditation-pdf':'/syllabus-pdf'}`);
    //         setHasClicked(false);
    //     }
    // },[fileSlice]);

    useEffect(()=>{
        if(accSlice.selectedAccId){
            setIsOpen(true)
        }
    },[accSlice.selectedAccId])


    useEffect(()=>{
        if(hasClicked && progressSlice.step === progressStep.Accreditation){

            dispatch(setSelectedAccId(fileSlice.data?.acc_id ?? 0))
    
            setHasClicked(false)
        }
    },[fileSlice.data])

    const handleFileSelect = (e) => {
        setHasClicked(true);
        if (file?.type === "application/pdf") {
            if(progressSlice.step === 1){
                dispatch(setCurrentAccBody(accBodyName));
                dispatch(setCurrentCollectionName(collectionName))
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

    const handleAddRubricsClick = (accId) => {
        navigate(`/${navObj[progressStep.Rubric].to}/${accId}`)
    }

    const handleAccBodyNameChange = (e) => {
        setAccBodyNameState(e.target.value);
    }

    const handleCollectionNameChange = (e) => {
        setCollectionName(e.target.value)
    }

    const handleDragOver = (e) => {
        e.preventDefault();
        setDragActive(true);
    };

    const handleOnCancelClick = () => {
        navigate(`/${progressSlice.step===2?`${navObj[progressStep.Syllabus].to}`:`${navObj[progressStep.Accreditation].to}`}`);        
    };

    const handleGoBackModalClick = () => {
        setIsOpen(false)
        navigate(`/${navObj[progressStep.Accreditation].to}`)
    }

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

    const AddRubricModal = () => {
        if (!isOpen) return null;

        return (
            <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm">

            {/* Modal Box */}
            <div className="bg-white w-full max-w-md rounded-xl shadow-lg p-6">

                {/* Header */}
                <h2 className="text-lg font-semibold mb-2">
                Add Rubrics?
                </h2>

                {/* Body */}
                <p className="text-gray-600 text-sm mb-6">
                    Your file has been saved. You can immediately add rubrics to start evaluation.                
                </p>

                {/* Actions */}
                <div className="flex justify-end gap-3">

                <button
                    onClick={()=>handleGoBackModalClick()}
                    className="px-4 py-2 rounded-lg border text-gray-600 hover:bg-gray-50"
                >
                    Back To Accreditation Collections
                </button>

                <button
                    onClick={() => handleAddRubricsClick(accSlice.selectedAccId)}
                    className="px-4 py-2 rounded-lg bg-blue-600 text-white hover:bg-blue-700"
                >
                    Add Rubrics
                </button>

                </div>
            </div>
            </div>
        );
        }

    return (
        <>
            <div>
                <button 
                onClick={()=>handleOnCancelClick()}
                className={`${button} flex items-center gap-2 m-3`}>
                    <ArrowLeft className="w-5 h-5" />
                    Go Back
                </button>
            </div>
            {
            fileSlice.loading && hasClicked
            ?
            <div className="flex justify-center pt-40">
                <div className={`${loader}`}></div>
            </div>
            :
            progressSlice.step === 1 && !fileSlice.loading && (
                <>

                    <div className="text-center mb-2">
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
                    <div className="text-center">
                        <label
                            htmlFor="collectionName"
                            className="text-gray-700 font-medium me-4"
                        >
                            Rubric Collection Name:
                        </label>

                        <input
                            onChange={handleCollectionNameChange}
                            value={collectionName}
                            type="text"
                            id="collectionName"
                            className="w-full max-w-md border border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-300 rounded-lg px-4 py-2 text-gray-800 shadow-sm outline-none transition"
                        />
                    </div>
                </>
            )}
            {
            !fileSlice.loading && 
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
            }

            {AddRubricModal()}
        </>
    )
}

export default AddFile