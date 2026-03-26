import { Pencil, ArrowLeft, Edit2Icon, Save, X } from 'lucide-react'
import { addRubricsThunk, getGetRubricsThunk, saveRubricsThunk, setRubricData, setSelectedAccId } from '../store/accreditation/accSlice'
import { useDispatch, useSelector } from 'react-redux'
import store from '../store/store'
import { button, loader, subtext } from '../component/ApplicationCSS'
import { useEffect, useState } from 'react'
import { useForm, useFieldArray } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'
import { navObj, progressStep } from '../component/enums/SyllabusEvaluatorEnum'

export const rubricLoader = ({params}) => {
    const { id } = params
    store.dispatch(setSelectedAccId(id))
    store.dispatch(getGetRubricsThunk())
}

function Rubrics () {

    const [isInEditMode, setIsInEditMode] = useState(false)
    const accSlice = useSelector(state=>state.accreditation)
    const navigate = useNavigate()
    const dispatch = useDispatch()


    const {register, control, handleSubmit, reset, setValue, getValues} = useForm({
        defaultValues: {
            rubrics: accSlice.rubricData?.rubrics
        }
    })

    const {fields, append, remove} = useFieldArray({
        control,
        name: "rubrics"
    })

    useEffect(()=>{
        reset({rubrics: accSlice.rubricData?.rubrics})
    },[accSlice.isLoadingRubrics])

    const handleEditClick = () => {
        setIsInEditMode(!isInEditMode)
    }

    const handleFormSubmit = (data) => {
        setIsInEditMode(false)
        dispatch(setRubricData(data.rubrics))
        if(accSlice.rubricData.usedInEvaluation){
            dispatch(addRubricsThunk())
        }
        else{
            dispatch(saveRubricsThunk())
        }
    }

    const handleGoBackClick = () => {
        navigate(`/${navObj[progressStep.Accreditation].to}`)
    }

    const handleDetailsChange = (index) => {
        if (getValues(`rubrics.${index}.hasChanged`)) return
        setValue(`rubrics.${index}.hasChanged`, true, {
            shouldDirty: true
        })       
    }

    return (
        <>
            {
            accSlice.isLoadingRubrics || accSlice.isSavingRubrics
            ?
            <div className="flex justify-center pt-40">
                <div className={`${loader}`}></div>
            </div>
            :
            <div className="p-8">

                {/* Header */}

                <button onClick={handleGoBackClick} className={`${button}`}>
                    <div className="flex gap-3 items-center">
                        <ArrowLeft />
                        Go Back
                    </div>
                </button>
                <div className="flex justify-between items-center my-6">

                    <div>
                        <h2 className="text-xl font-semibold">Rubrics</h2>
                        <p className={`${subtext}`}>These rubrics define how the syllabus will be evaluated.</p>
                    </div>

                    <div className="flex items-center gap-3">

                        <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700">
                            Generate Rubrics
                        </button>
                        {
                            isInEditMode
                            ?
                                <>
                                    <button
                                        type='submit'
                                        form='rubricsForm'
                                    >
                                        <Save />
                                    </button>
                                    <button
                                        onClick={handleEditClick}
                                    >
                                        <X />
                                    </button>
                                </>

                            :
                                <button
                                    onClick={handleEditClick}
                                >
                                    <Edit2Icon />
                                </button>
                        }
                    </div>

                </div>


                {/* Rubric Cards */}

                <div className="space-y-4">

                    {
                        isInEditMode
                        ?
                        <form id='rubricsForm' onSubmit={handleSubmit(handleFormSubmit)}>
                            {

                                fields.map((field, index) => (

                                    <div className="my-[2rem] border">

                                        <input
                                        className="w-full border rounded p-3 my-2"
                                        {...register(`rubrics.${index}.accRubTitle`, {required: true, onChange: () => handleDetailsChange(index)})}
                                        />

                                        <textarea
                                        className="w-full border rounded p-4 my-2"
                                        rows={3}
                                        {...register(`rubrics.${index}.accRubDescription`, {required: true, onChange: () => handleDetailsChange(index)})}
                                        />

                                        {/* <input
                                        className='my-2'
                                        type="range"
                                        min="1"
                                        max="10"
                                        /> */}

                                    </div>
                                ))
                            }

                        </form>
                        :
                        accSlice.rubricData?.rubrics?.map(rubric => (                            
                            <div
                                key={rubric.accRubId}
                                className="bg-white shadow-sm border rounded-lg p-5 flex justify-between items-start"
                            >
                        
                                <div>
                        
                                <h3 className="font-semibold text-lg">
                                    {rubric.accRubTitle}
                                </h3>
                        
                                <p className="text-gray-600 text-sm mt-1">
                                    {rubric.accRubDescription}
                                </p>
                        
                                <p className="text-sm text-gray-500 mt-2">
                                    Weightage: 9/10
                                </p>
                        
                                </div>
                        
                            </div>

                            
                        ))
                    }
                </div>
            </div>

            }

        </>
    )
}

export default Rubrics