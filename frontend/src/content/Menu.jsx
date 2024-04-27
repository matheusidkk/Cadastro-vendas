import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { FiAlignJustify } from "react-icons/fi";
import { FaShopify } from "react-icons/fa";

import './styles/Menu.css'

export default function Menu() {
    const [abaSelecionada, setAbaSelecionada] = useState(1)
    const [aberto, setAberto] = useState(false)

  return (
    <aside className='Menu' style={{left: aberto == false ? '-130px' : '0', }}>
        <button className='openMenu'  onClick={() => aberto == false ? setAberto(true) : setAberto(false)} style={{left: aberto == false ? '1px' : '130px'}}>
            <FiAlignJustify className='icone'/>
        </button>
        <nav>
            <ul>
                <li>
                    <FaShopify className='iconP'/>
                </li>
                <li>
                    <Link className={`link ${abaSelecionada === 2 ? 'selected' : ''}`} onClick={() => setAbaSelecionada(2)} to="/usuarios">Usuarios</Link>
                </li>
                <li>
                    <Link className={`link ${abaSelecionada === 3 ? 'selected' : ''}`} onClick={() => setAbaSelecionada(3)} to="/vendas">Vendas</Link>
                </li>
                <li>
                    <Link className={`link ${abaSelecionada === 4 ? 'selected' : ''}`} onClick={() => setAbaSelecionada(4)} to="/sobre">Sobre</Link>
                </li>
            </ul>
        </nav>
    </aside>
  )
}
