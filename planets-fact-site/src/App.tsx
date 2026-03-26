import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from './assets/vite.svg'
import heroImg from './assets/hero.png'
import './App.css'
import Button from './components/Button'
function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <Button text='overview' number='01' option='overview' active={true}/>
    </>
  )
}

export default App
