import { BrowserRouter, Route, Routes } from 'react-router-dom' 
import Home from './pages/Home'
import Navbar from './components/Navbar'
import JobDetail from './pages/JobDetail'
import JobApplicationForm from './pages/JobApplicationForm'

const App = () => {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/job/:id' element={<JobDetail />} />
        <Route path='/jobform/:id' element={<JobApplicationForm />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
