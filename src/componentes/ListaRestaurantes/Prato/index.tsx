import { useEffect, useState } from 'react';
import IPrato from '../../../interfaces/IPrato';
import estilos from './Prato.module.scss';
import axios from 'axios';
import { IPaginacao } from '../../../interfaces/IPaginacao';

interface PratoProps {
  prato: IPrato
}

const Prato = ({ prato }: PratoProps) => {

  const [pratos, setPratos] = useState<IPrato[]>([])

  useEffect(() => {
    axios.get<IPaginacao<IPrato>>("http://localhost:8000/api/v1/pratos/")
      .then((res) => {
        setPratos(res.data.results)
      })
  })

  return (<div className={estilos.Prato}>
    <div className={estilos.Container}>
      <div>
        <div className={estilos.EfeitoTorcao}>
          <img src={prato.imagem} alt={prato.descricao}/>
        </div>
      </div>
    </div>
    <div className={estilos.Conteudo}>
      <h3>{prato.nome}</h3>
      <div className={estilos.Tag}>
        {prato.tag}
      </div>
      <div>
        {prato.descricao}
      </div>
    </div>
  </div>)
}

export default Prato