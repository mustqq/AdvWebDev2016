import { Routes, Route } from 'react-router-dom';
import './index.css';
import Navbar from './components/Navbar';
import Header from './components/Header';
import About from './components/About';
import Footer from './components/Footer';
import FormPage from './pages/FormPage';

function Home() {
  return (
    <>
      <Header />
      <About />
    </>
  );
}

function App() {
  return (
    <div className="d-flex flex-column h-100">
      <main className="flex-shrink-0">
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/form" element={<FormPage />} />
        </Routes>
      </main>
      <Footer />
    </div>
  )
}

export default App;