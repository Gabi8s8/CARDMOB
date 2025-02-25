import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

import Counter from './components/Count'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <Counter title="Contando..."/>
      <Counter initial="100"/>
    </>
  );
}

export default App
