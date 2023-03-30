import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

function App() {
  const [file, setFile] = useState(null)

  async function loadFile(file) {
    await file.text()
      .then((data) => {
        setFile(data);
        console.log(data)
      })
      .catch(() => console.error("Erro ao abrir arquivo"))
  }

  return (
    <div className="App">
      <input type="file" onChange={(e) => loadFile(e.target.files[0])} />
      <br />
      <pre>{file}</pre>
    </div>
  )
}

export default App
