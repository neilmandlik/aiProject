import { useSelector } from "react-redux"
import { getSyllabusFileNameThunk } from "../store/syllabus/syllabusSlice"
import store from "../store/store"
import { Plus, Eye, Trash2, MoreHorizontal } from "lucide-react"
import { useEffect } from "react"

export const syllabusLoader = async() => {
    await store.dispatch(getSyllabusFileNameThunk())
}

function SyllabusPDFs() {

    const syllabusSlice = useSelector((state)=>state.syllabus)

    useEffect(()=>{
        console.log(syllabusSlice)
    },[])

    return(
        <>
            <div className="flex flex-col gap-4 p-2">
                <div className='flex justify-end'>
                    <button className='flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg shadow-md transition'>
                        <Plus className="w-5 h-5" />                        
                        Add Syllabus PDF File
                    </button>
                </div>

                {syllabusSlice.errMsg
                ?<p>{syllabusSlice.errMsg}</p>
                :
                <div className='bg-gradient-to-r from-gray-100 to-gray-200 shadow-md rounded-lg p-5 flex justify-between items-center hover:shadow-xl transition'>
                    <p className='font-medium text-gray-800 truncate'>{syllabusSlice.syllabusFile.fileName}</p>

                    <div className='flex gap-3'>
                        <button
                            className="p-2 bg-blue-100 hover:bg-blue-200 rounded-full"
                        >
                            <Eye className="w-5 h-5 text-blue-600" />
                        </button>

                        <button
                            className="p-2 bg-red-100 hover:bg-red-200 rounded-full"
                        >
                            <Trash2 className="w-5 h-5 text-red-600" />
                        </button>

                        <button
                            className="p-2 bg-gray-100 hover:bg-gray-200 rounded-full"
                        >
                            <MoreHorizontal className="w-5 h-5 text-gray-600" />
                        </button>
                    </div>
                </div>
    }
            </div>
        </>
    )

}

export default SyllabusPDFs