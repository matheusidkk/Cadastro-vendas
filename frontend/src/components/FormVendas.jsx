import React, { useState, useEffect, useRef } from 'react'
import axios from 'axios'
import { toast } from 'react-toastify'
import { FaAngleRight } from "react-icons/fa";

import './styles/Form.css'
import 'react-toastify/ReactToastify.css'

export default function FormVendas({ getVendas, vOnEdit, setVOnEdit }) {

  const [cpf, setCpf] = useState('');
  const [preco, setPreco] = useState('');

  const ref = useRef()

  useEffect(() => {
    if (vOnEdit) {
      const venda = ref.current

      venda.item.value = vOnEdit.item
      venda.marca.value = vOnEdit.marca
      venda.preco.value = vOnEdit.preco
      venda.comprador.value = vOnEdit.comprador
    }
  }, [vOnEdit])

  const handleSubmit = async (e) => {
    e.preventDefault()

    const dateNow = new Date()
    const dia = dateNow.getDate().toString().padStart(2, '0');
    const mes = (dateNow.getMonth() + 1).toString().padStart(2, '0');
    const ano = dateNow.getFullYear();
    const horas = dateNow.getHours().toString().padStart(2, '0');
    const minutos = dateNow.getMinutes().toString().padStart(2, '0');
    const dataFormatada = `${dia}-${mes}-${ano}`;
    const horarioFormatado = `${horas}:${minutos}`;

    const venda = ref.current

    if (!venda.item.value || !venda.marca.value || !venda.preco.value || venda.comprador.value.length < 14) {
      toast.error('Preencha todos os campos.')

    } else {
      if (vOnEdit) {
        await axios.put("http://localhost:8800/v" + vOnEdit.id, {
          item: venda.item.value,
          marca: venda.marca.value,
          preco: venda.preco.value,
          comprador: venda.comprador.value,
          data: vOnEdit.data,
          horario: vOnEdit.horario,
        })
        venda.item.value = ""
        venda.marca.value = ""
        venda.preco.value = ""
        venda.comprador.value = ""
    
        setVOnEdit(null)
        toast.success('Compra alterada com sucesso!')
      } else {
        await axios.post("http://localhost:8800/v", {
          item: venda.item.value,
          marca: venda.marca.value,
          preco: venda.preco.value,
          comprador: venda.comprador.value,
          data: dataFormatada,
          horario: horarioFormatado,
        })
        venda.item.value = ""
        venda.marca.value = ""
        venda.preco.value = ""
        venda.comprador.value = ""
    
        setVOnEdit(null)
        toast.success('Compra Criada com sucesso!')
      }
      setPreco('')
      setCpf('')
    }
    getVendas()
  }


  function formatarCPF(valor) {
      // Remove caracteres indesejados
      const cpfFormatado = valor.replace(/\D/g, '');

      // Adiciona os pontos e o hífen
      const cpfFormatadoFinal = cpfFormatado.replace(/(\d{3})(\d)/, '$1.$2')
          .replace(/(\d{3})(\d)/, '$1.$2')
          .replace(/(\d{3})(\d{1,2})$/, '$1-$2');

      // Atualiza o estado do CPF
      setCpf(cpfFormatadoFinal);
  }

  function formatarPreco(valor) {
    // Remove caracteres indesejados e mantém apenas os números
    const precoFormatado = valor.replace(/\D/g, '');

    // Adiciona a formatação de preço
    let precoFormatadoFinal = (precoFormatado / 100).toLocaleString('pt-BR', {
        style: 'currency',
        currency: 'BRL'
    });

    // Atualiza o estado do preço
    setPreco(precoFormatadoFinal);
}

  return (
    <form className='Form' ref={ref} onSubmit={handleSubmit}>
        <div className="inputArea">
          <label>Item</label>
          <input type="text" name="item"/>
        </div>
        <div className="inputArea">
          <label>Marca</label>
          <input type="text" name="marca"/>
        </div>
        <div className="inputArea">
          <label>Preco</label>
          <input type="text" name="preco" value={preco} onChange={(e) => formatarPreco(e.target.value)}/>
        </div>
        <div className="inputArea">
          <label>Comprador CPF</label>
          <input type="text" name="comprador" value={cpf} onChange={(e) => formatarCPF(e.target.value)} maxLength="14"/>
        </div>
        <button type="submit" className="submit"><FaAngleRight/></button>
    </form>
  )
}
