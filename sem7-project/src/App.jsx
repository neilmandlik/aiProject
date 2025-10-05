import { createBrowserRouter, Route, createRoutesFromElements, RouterProvider } from 'react-router-dom'
import { Provider } from 'react-redux'
import TestComponent, { testLoader } from './pages/TestComponent';
import store from './store/store';
function App() {

  const router = createBrowserRouter(createRoutesFromElements(
    <Route path='/' element={<TestComponent />} loader={testLoader} >
      <Route path='syllabus-review' element={<SyllabusReview />} />
    </Route>
  ))

  return (
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  );
}

export default App;
