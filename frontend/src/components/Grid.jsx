import React from 'react'
import axios from "axios"
import { toast } from 'react-toastify'

import './styles/Grid.css'
import 'react-toastify/ReactToastify.css'


import Usuario from './Usuario'

export default function Grid({users, setUsers, setOnEdit, getUsers, clickUsuario}) {

  const handleEdit = (item) => {
    setOnEdit(item)
  }

  const handleDelete = async (id) => {
    try {
      await axios.delete("http://localhost:8800/u" + id)

      const newArray = users.filter((users) => users.id !== id)

      setUsers(newArray)
      setOnEdit(null)
      getUsers()
      toast.success('Usuário excluído com sucesso!')
    } catch (error) {
      console.log("Erro: ", error)
      
      toast.success('Falha ao excluír o usuario.')
    }
  }

  function abrirCompras(valor) {
    clickUsuario(valor)
  }

  return (
    <div className='Grid'>
        <div className="gridNames">
            <div className='procurar'></div>
            <div className="gridName">Nome</div>
            <div className="gridName">E-mail</div>
            <div className="gridName">Telefone</div>
            <div className="gridName">CPF</div>
        </div>
        <div className="gridItens">
          {users.map((item, i) => (
            <Usuario nomeClicado={abrirCompras} key={i} nome={item.nome} email={item.email} telefone={item.fone} cpf={item.cpf} item={item} clickEdit={handleEdit} clickExc={handleDelete}/>
          ))}
        </div>
    </div>
  )
}
