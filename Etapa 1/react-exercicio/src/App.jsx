import { useState } from 'react'
import './App.css'
import ListaContato from './Components/ListaContato'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
    <ListaContato/>
    </>
  )
}

export default App
