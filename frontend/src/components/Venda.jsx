import React from 'react';
import { FaTrash, FaEdit } from "react-icons/fa";

import './styles/itemFilho.css';

export default function Venda(props) {
  return (
    <div className={`Venda ${props.filtrado !== false ? 'filtrado' : ''}`}>
      <div className="itemFilho">
        {props.item}
      </div>
      <div className="itemFilho">
        {props.marca}
      </div>
      <div className="itemFilho">
        {props.preco}
      </div>
      <div className="itemFilho">
        {props.comprador}
      </div>
      <div className="itemFilho data">
        {props.data}
      </div>
      <div className="itemFilho">
        {props.hora}
      </div>
      {props.filtrado == false ? 
        <>
          <div className="itemFilho buttonEdit" onClick={() => props.clickEdit(props.itemI)}>
            <FaEdit/>
          </div>
          <div className="itemFilho buttonExc" onClick={() => props.clickExc(props.itemI.id)}>
            <FaTrash/>
          </div>
        </>
        : ''}
    </div>
  );
}
