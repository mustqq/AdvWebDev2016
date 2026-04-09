import './index.css';
import Navbar from './components/Navbar';
import Header from './components/Header';
import About from './components/About';
import Footer from './components/Footer';

function App() {
  return (
    <div className="d-flex flex-column h-100">
      <main className="flex-shrink-0">
        <Navbar />
        <Header />
        <About />
      </main>
      <Footer />
    </div>
  )
}

export default App;