import React from 'react'
import { Routes, Route } from 'react-router-dom'

import Usuarios from '../pages/Usuarios'
import Vendas from '../pages/Vendas'
import About from '../pages/About'

export default function Content() {
  return (
    <main className='Content'>
        <Routes>
            <Route path="/usuarios" element={<Usuarios/>}/>
            <Route path="/vendas" element={<Vendas/>}/>
            <Route path="/sobre" element={<About/>}/>
        </Routes>
    </main>
  )
}
