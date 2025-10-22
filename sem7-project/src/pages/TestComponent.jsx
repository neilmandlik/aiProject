import store from "../store/store"
import { getTestThunk } from "../store/test/testSlice"
import { useLoaderData } from "react-router-dom"

export const testLoader = async() => {
    await store.dispatch(getTestThunk())
    return store.getState().test
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