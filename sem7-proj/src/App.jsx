import { createBrowserRouter, createRoutesFromElements, RouterProvider, Route} from 'react-router-dom'
import TestComponent, { testLoader } from './components/TestComponent'
import { Provider } from 'react-redux'
import { store } from './store/store'

function App(){

  const router = createBrowserRouter(createRoutesFromElements(
    <Route path='/' element={<TestComponent />} loader={testLoader} />
  ))

  return(
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>

  )

}

export default App