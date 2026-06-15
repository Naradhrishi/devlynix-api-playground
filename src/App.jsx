import { useState } from 'react'
import './App.css'
import HeroNavbar from "./components/HeroNavbar";
import RequestBar from './components/RequestBar';

function App() {

  return (
    <div className="min-h-screen bg-[#1a1a1a]">
      <HeroNavbar />
      <RequestBar />
    </div>
  )
}

export default App
