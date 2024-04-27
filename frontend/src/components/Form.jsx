import React, { useState, useEffect, useRef } from 'react'
import axios from 'axios'
import { toast } from 'react-toastify'
import { FaAngleRight } from "react-icons/fa";

import './styles/Form.css'
import 'react-toastify/ReactToastify.css'

export default function Form({ getUsers, onEdit, setOnEdit }) {

  const [cpf, setCpf] = useState('');
  const [telefone, setTelefone] = useState('');

  const ref = useRef()

  useEffect(() => {
    if (onEdit) {
      const user = ref.current

      user.nome.value = onEdit.nome
      user.email.value = onEdit.email
      user.fone.value = onEdit.fone
      user.cpf.value = onEdit.cpf
    }
  }, [onEdit])

  const handleSubmit = async (e) => {
    e.preventDefault()

    const user = ref.current

    if (!user.nome.value || !user.email.value || user.fone.value.length < 14 || user.cpf.value.length < 14) {
      toast.error('Preencha todos os campos.')

    } else {
      if (onEdit) {
        await axios.put("http://localhost:8800/u" + onEdit.id, {
          nome: user.nome.value,
          email: user.email.value,
          fone: user.fone.value,
          cpf: user.cpf.value,
        })
        user.nome.value = ""
        user.email.value = ""
        user.fone.value = ""
        user.cpf.value = ""

        setOnEdit(null)
        toast.success('Usuário alterado com sucesso!')
      } else {
        await axios.post("http://localhost:8800/u", {
          nome: user.nome.value,
          email: user.email.value,
          fone: user.fone.value,
          cpf: user.cpf.value,
        })
        user.nome.value = ""
        user.email.value = ""
        user.fone.value = ""
        user.cpf.value = ""

        setOnEdit(null)
        toast.success('Usuário criado com sucesso!')
      }
      setTelefone('')
      setCpf('')
    }
    getUsers()
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

  function formatarTelefone(valor) {
    // Remove caracteres indesejados
    const telefoneFormatado = valor.replace(/\D/g, '');

    // Adiciona os parênteses, o traço e formata o número
    let telefoneFormatadoFinal = telefoneFormatado.replace(/(\d{2})(\d)/, '($1)$2');
    telefoneFormatadoFinal = telefoneFormatadoFinal.replace(/(\d{5})(\d)/, '$1-$2');

    // Atualiza o estado do telefone
    setTelefone(telefoneFormatadoFinal);
}

  return (
    <form className='Form' ref={ref} onSubmit={handleSubmit}>
        <div className="inputArea">
          <label>Nome</label>
          <input type="text" name="nome"/>
        </div>
        <div className="inputArea">
          <label>E-mail</label>
          <input type="email" name="email"/>
        </div>
        <div className="inputArea">
          <label>Telefone</label>
          <input type="text" name="fone" value={telefone} onChange={(e) => formatarTelefone(e.target.value)} maxLength="14"/>
        </div>
        <div className="inputArea">
          <label>CPF</label>
          <input type="text"  name="cpf" value={cpf} onChange={(e) => formatarCPF(e.target.value)} maxLength="14"/>
        </div>
        <button type="submit" className="submit"><FaAngleRight/></button>
    </form>
  )
}
