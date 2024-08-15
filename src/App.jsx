import React, { useEffect, useState } from 'react';
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import GenerateQR from './components/GenerateQR.jsx'
import RegisterStudent from './components/RegisterStudent.jsx';

function App() {
  const [count, setCount] = useState(0)


  return (
    <>
    <GenerateQR/>
    <RegisterStudent/>
    </>
  )
}

export default App
