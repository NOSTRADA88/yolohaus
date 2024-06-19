
import { BrowserRouter,  Route, Routes } from "react-router-dom";
import Layout from '../layouts/layout';
import { Home } from "../page";

const useRoutes = () => {
  return (
    <BrowserRouter>
    <Routes>
      <Route path="/" element={<Layout><Home /></Layout>} />
    </Routes>
  </BrowserRouter>
  )
}

export default useRoutes