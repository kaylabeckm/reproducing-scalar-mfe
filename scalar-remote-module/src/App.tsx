// src/App.jsx
import { ApiReferenceReact } from '@scalar/api-reference-react'
import '@scalar/api-reference-react/style.css'

function App() {
  return (
    <div className='remote'>
        <ApiReferenceReact
        configuration={{
            spec: {
                url: 'https://cdn.jsdelivr.net/npm/@scalar/galaxy/dist/latest.yaml',
                },
            }}
            />
    </div>
  )
}

export default App