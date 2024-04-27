import { useState, useEffect } from 'react'
import axios from 'axios'

import Form from '../components/Form'
import Grid from '../components/Grid'
import UsuarioCompras from '../components/UsuarioCompras'

import './styles/geral.css'

export default function Usuarios() {

  const [users, setUsers] = useState([])
  const [onEdit, setOnEdit] = useState(null)

  const getUsers = async () => {
    try {
      const res = await axios.get("http://localhost:8800/u")
      setUsers(res.data.sort((a, b) => (a.nome > b.nome ? 1 : -1)))
    } catch (error) {
      console.log("Erro: ", error)
    }
  }

  useEffect(() => {
    getUsers()
  }, [setUsers])

  const [mostrarCompras, setMostrarCompras] = useState(false)
  const [mostrarCpf, setMostrarCpf] = useState(false)

  function funcMostrarCompras(valor) {
    setMostrarCompras(true)
    setMostrarCpf(valor)
  }

  return (
    <div className='page'>
      {mostrarCompras ? <UsuarioCompras cpf={mostrarCpf} clickFechar={_ => setMostrarCompras(false)}/> : ''}
      <Form onEdit={onEdit} setOnEdit={setOnEdit} getUsers={getUsers}/>
      <Grid users={users} setUsers={setUsers} setOnEdit={setOnEdit} getUsers={getUsers} clickUsuario={funcMostrarCompras}/>
    </div>
  )
}
