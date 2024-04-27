import { useState, useEffect } from 'react'
import axios from 'axios'

import FormVendas from '../components/FormVendas'
import GridVendas from '../components/GridVendas'

import './styles/UsuarioCompras.css'

export default function UsuarioCompras(props) {

    const [vendas, setVendas] = useState([])
    const [vOnEdit, setVOnEdit] = useState(null)

    const getVendas = async () => {
        try {
        const res = await axios.get("http://localhost:8800/v")
        setVendas(res.data.sort((a, b) => (a.id < b.id ? 1 : -1)))
        } catch (error) {
        console.log("Erro: ", error)
        }
    }

    useEffect(() => {
        getVendas()
    }, [setVendas])

    return (
        <div className='UsuarioCompras'>
            <button className="fechar" onClick={_ => props.clickFechar()}>X</button>
        <GridVendas vendas={vendas} setVendas={setVendas} setVOnEdit={setVOnEdit} getVendas={getVendas} filtrado={props.cpf}/>
        </div>
    )
}
