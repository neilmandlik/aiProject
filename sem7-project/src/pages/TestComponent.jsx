import { useSelector } from "react-redux"
import store from "../store/store"
import { getTestThunk } from "../store/test/testSlice"
import { useLoaderData } from "react-router-dom"
import { useEffect } from "react"

export const testLoader = async() => {
    await store.dispatch(getTestThunk())
    const state = store.getState()
    return state.test
}

function TestComponent(){
    const {message} = useLoaderData()

    return(
        <>
            <p>Hello</p>
            <p>{message}</p>
        </>
    )
}

export default TestComponent