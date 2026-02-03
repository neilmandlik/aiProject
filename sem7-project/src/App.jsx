import { createBrowserRouter, Route, createRoutesFromElements, RouterProvider } from 'react-router-dom'
import { Provider } from 'react-redux'
// import TestComponent, { testLoader } from './pages/TestComponent';
import store from './store/store';
import Layout from './component/Layout';
import AccrediatationPDFs, {accreditationLoader} from './pages/AccreditationPDFs';
import PerformanceHistory, {performanceLoader} from './pages/PerformanceHistory';
import PerformanceSummary, { performanceSummaryLoader } from './pages/PerformanceSummary';
import SyllabusPDFs, { syllabusLoader } from './pages/SyllabusPDFs';
import AddFile from './pages/AddFile';
function App() {

  const router = createBrowserRouter(createRoutesFromElements(
    <>
      <Route path='/' element={<Layout />}>
        {/* <Route index element={<TestComponent />} loader={testLoader}></Route> */}
        <Route path='accreditation-pdf' element={<AccrediatationPDFs />} loader={accreditationLoader} />
        <Route path='syllabus-pdf' element={<SyllabusPDFs />} loader={syllabusLoader}/>
        <Route path='performance-summary/:id' element={<PerformanceSummary />} loader={performanceSummaryLoader} />
        <Route path='performance-history' element={<PerformanceHistory />} loader={performanceLoader}/>
      </Route>
      <Route path='/add-file' element={<AddFile />} />
    </>
  ))

  return (
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  );
}

export default App;
