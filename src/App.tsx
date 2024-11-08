import './App.css'
import Loader from './components/loader';
import { useEffect, useState } from "react";
import NavBar from './components/NavBar';
import Home from './Home';
import Footer from './components/Footer';
function App() {
  const [loading, setLoading] = useState(true)
  useEffect(() => {
    setTimeout(() => setLoading(false), 900)
  }, [])
  if (loading) {
    return <Loader/>
  }
  return (
    <>
    <NavBar/>
    <Home/>
    <Footer/>
    </>
  )
}

export default App;
