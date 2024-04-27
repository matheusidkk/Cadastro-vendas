import { BrowserRouter } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'

import Menu from './content/Menu'
import Content from './content/Content'

import './App.css'

function App() {


  return (
    <div className='App'>
      <BrowserRouter>
        <Menu/>
        <Content/>
        <ToastContainer position="bottom-left"/>
      </BrowserRouter>
    </div>
  )
}

export default App
