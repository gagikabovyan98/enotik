import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { useEffect, useState } from 'react';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Loans from './pages/Loans';
import Cards from './pages/Cards';
import ConsumerLoans from './pages/ConsumerLoans';
import AutoLoans from './pages/AutoLoans';
import CollateralLoans from './pages/CollateralLoans';
import Job from './pages/Job';
import './App.css';
import FooterBar from './components/FooterBar';
import { MetrikaCounter } from 'react-metrika';
import Education from './pages/Education';
import AdminPage from './pages/AdminPage';
import { apiFetch } from './api';

function App() {
  const [content, setContent] = useState(null);
  const [error, setError] = useState('');

  useEffect(() => {
    const loadContent = async () => {
      try {
        const data = await apiFetch('/content');
        setContent(data);
      } catch (loadError) {
        setError(loadError.message);
      }
    };

    loadContent();
  }, []);

  return (
    <>
      <MetrikaCounter id={108751085} />
      <BrowserRouter>
        <Navbar settings={content?.settings} navItems={content?.nav_items || []} />
        {error && <div className="app-error-banner">Ошибка загрузки данных: {error}</div>}
        <Routes>
          <Route path="/" element={<Home settings={content?.settings} homeFeatures={content?.home_features || []} galleryItems={content?.gallery_items || []} reviews={content?.reviews || []} />} />
          <Route path="/loans" element={<Loans products={content?.products?.['loans'] || []} />} />
          <Route path="/cards" element={<Cards products={content?.products?.['cards'] || []} />} />
          <Route path="/consumer-loans" element={<ConsumerLoans products={content?.products?.['consumer-loans'] || []} />} />
          <Route path="/auto-loans" element={<AutoLoans products={content?.products?.['auto-loans'] || []} />} />
          <Route path="/collateral-loans" element={<CollateralLoans products={content?.products?.['collateral-loans'] || []} />} />
          <Route path="/job" element={<Job products={content?.products?.['job'] || []} />} />
          <Route path="/Job" element={<Job products={content?.products?.['job'] || []} />} />
          <Route path="/education" element={<Education products={content?.products?.['education'] || []} />} />
          <Route path="/Education" element={<Education products={content?.products?.['education'] || []} />} />
          <Route path="/admin" element={<AdminPage />} />
        </Routes>
        <FooterBar settings={content?.settings} />
      </BrowserRouter>
    </>
  );
}




export default App;
