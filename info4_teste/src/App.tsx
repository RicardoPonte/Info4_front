import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import LoginPage from './pages/Login'
import HomePage from './pages/Home'
import Atualizar from './pages/Atualizar';

function App() {
 

  return (
     <Router>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/home" element={<HomePage />} />
        <Route path="/atualizar/:id" element={<Atualizar />} />
      </Routes>
    </Router>
  )
}

export default App
