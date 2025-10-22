import { createBrowserRouter, Route, createRoutesFromElements, RouterProvider } from 'react-router-dom'
import { Provider } from 'react-redux'
// import TestComponent, { testLoader } from './pages/TestComponent';
import store from './store/store';
import Layout from './component/Layout';
import AccrediatationPDFs, {accreditationLoader} from './pages/AccreditationPDFs';
import SyllabusStructure from './pages/SyllabusStructure';
import PerformanceHistory from './pages/PerformanceHistory';
function App() {

  const router = createBrowserRouter(createRoutesFromElements(
    <Route path='/' element={<Layout />}>
      {/* <Route index element={<TestComponent />} loader={testLoader}></Route> */}
      <Route index element={<AccrediatationPDFs />} loader={accreditationLoader} />
      <Route path='syllabus-pdf' element={<SyllabusStructure />} />
      <Route path='performance-history' element={<PerformanceHistory />} />
    </Route>
  ))

  return (
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  );
}

export default App;
