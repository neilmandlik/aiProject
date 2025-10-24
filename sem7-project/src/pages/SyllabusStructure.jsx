import { useState } from "react";

function SyllabusStructure(){
    const [file, setFile] = useState(null);
    const [dragActive, setDragActive] = useState(false);

    const handleFileSelect = (e) => {
        const selected = e.target.files[0];
        if (selected?.type === "application/pdf") {
        setFile(selected);
        } else {
        alert("Please upload a valid PDF file.");
        }
    };

    const handleDragOver = (e) => {
        e.preventDefault();
        setDragActive(true);
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
                    onChange={handleFileSelect}
                    className="hidden"
                    />
                    <span className="text-indigo-700 text-lg font-semibold tracking-wide">
                        {file ? file.name : "Drag & Drop PDF here or Click to Upload"}
                    </span>
                </label>

                {file && (
                    <div className="mt-4 flex gap-4">
                        <button className="px-4 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700 transition">
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

export default SyllabusStructure