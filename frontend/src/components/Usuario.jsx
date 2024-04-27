import React from 'react'
import { FaSearch, FaTrash, FaEdit } from "react-icons/fa"

import './styles/itemFilho.css'

export default function Usuario(props) {

  return (
    <div className='Usuario'>
        <div className="itemFilho buttonProcurar" onClick={_ => props.nomeClicado(props.cpf)}>
            <FaSearch />
        </div>
        <div className="itemFilho">
            {props.nome}
        </div>
        <div className="itemFilho">
            {props.email}
        </div>
        <div className="itemFilho">
            {props.telefone}
        </div>
        <div className="itemFilho">
            {props.cpf}
        </div>
        <div className="itemFilho buttonEdit" onClick={() => props.clickEdit(props.item)}>
            <FaEdit/>
        </div>
        <div className="itemFilho buttonExc" onClick={() => props.clickExc(props.item.id)}>
            <FaTrash/>
        </div>
    </div>
  )
}
