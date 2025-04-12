import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Header from './components/header'
import Homepage from './pages/homepage'
import Footer from './components/footer'
import Results from './pages/results'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <div style={{ position: 'fixed', top: 0, width: '100%', zIndex: 1000 }}>
        <Header />
      </div>
      <div style={{ marginTop: '64px', marginBottom: '64px' }}>
        <Homepage/>
      </div>
      <Results/>
      <div style={{ position: 'fixed', bottom: 0, width: '100%', zIndex: 1000 }}>
        <Footer />
      </div>
    </>
  )
}

export default App
