import { createBrowserRouter, Route, createRoutesFromElements, RouterProvider } from 'react-router-dom'
import { Provider } from 'react-redux'
import TestComponent, { testLoader } from './pages/TestComponent';
import store from './store/store';
import Layout from './component/Layout';
import AccrediatationPDFs from './pages/AccreditationPDFs';
function App() {

  const router = createBrowserRouter(createRoutesFromElements(
    <Route path='/' element={<Layout />}>
      {/* <Route index element={<TestComponent />} loader={testLoader}></Route> */}
      <Route index element={<AccrediatationPDFs />} />
    </Route>
  ))

  return (
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  );
}

export default App;
