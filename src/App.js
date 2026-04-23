import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Loans from './pages/Loans';
import Cards from './pages/Cards';
import ConsumerLoans from './pages/ConsumerLoans';
import AutoLoans from './pages/AutoLoans';
import CollateralLoans from './pages/CollateralLoans';
import Job from './pages/Job';
import './App.css';

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/loans" element={<Loans />} />
        <Route path="/cards" element={<Cards />} />
        <Route path="/consumer-loans" element={<ConsumerLoans />} />
        <Route path="/auto-loans" element={<AutoLoans />} />
        <Route path="/collateral-loans" element={<CollateralLoans />} />
        <Route path="/Job" element={<Job />} />
      </Routes>
    </BrowserRouter>
  );
}
export default App;