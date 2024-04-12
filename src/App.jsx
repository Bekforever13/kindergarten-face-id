import { Route, Routes } from 'react-router-dom'
import Home from './pages/home/Home'
import Layout from './components/layout/Layout'
import Report from './pages/report/Report'

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Home />} />
        <Route path='/report' element={<Report />} />
      </Route>
    </Routes>
  )
}

export default App
