import { useState, useEffect } from 'react';
import axios from "axios";
import Venda from './Venda.jsx';
import { toast } from 'react-toastify'

import './styles/Grid.css';
import 'react-toastify/ReactToastify.css'

export default function Grid({vendas, setVendas, setVOnEdit, getVendas, filtrado}) {
  
  const [vendasFiltradas, setVendasFiltradas] = useState([]);

  useEffect(() => {
    if (filtrado !== false) {
      setVendasFiltradas(vendas.filter(venda => venda.comprador === filtrado));
    } else {
      setVendasFiltradas(vendas);
    }
  }, [vendas, filtrado]);

  const handleEdit = (item) => {
    setVOnEdit(item);
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete("http://localhost:8800/v" + id);
      const newArray = vendas.filter((venda) => venda.id !== id)
      setVendas(newArray);
      setVOnEdit(null);
      getVendas();
      toast.success('Compra excluída com sucesso!')
    } catch (error) {
      console.log("Erro: ", error);
      toast.success('Falha ao excluír a compra.')
    }
  };

  return (
    <div className='Grid'>
        <div className={`gridVNames ${filtrado !== false ? 'filtrado' : ''}`}>
            <div className="gridName">Item</div>
            <div className="gridName">Marca</div>
            <div className="gridName">Valor</div>
            <div className="gridName">Comprador CPF</div>
            <div className="gridName data">Data</div>
            <div className="gridName">Horario</div>
        </div>
        <div className="gridItens">
          {vendasFiltradas.map((item, i) => (
            <Venda key={i} item={item.item} marca={item.marca} preco={item.preco} comprador={item.comprador} data={item.data} hora={item.horario} itemI={item} clickEdit={handleEdit} clickExc={handleDelete} filtrado={filtrado}/>
          ))}
        </div>
    </div>
  );
}
