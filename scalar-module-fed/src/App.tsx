import { useState } from 'react'
import { RemoteConfig } from './RemoteConfig';
import ComponentLoader from './ComponentLoader';
import './App.css'

function App() {
  const [count, setCount] = useState(0)

  return (
    <div className='shellApp'>
      <h1>Scalar Microfrontend</h1>
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
        <ComponentLoader {...RemoteConfig.ScalarRemote} />
      </div>

    </ div>
  )
}

export default App
