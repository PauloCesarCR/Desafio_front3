import './style.css'
import editar from '../../assets/editar.png'
import excluir from '../../assets/excluir.png'
import { format, parseISO } from 'date-fns'
import  {DiaDaSemana}  from '../../utils/DiaDaSemana'
import ModalApagaritem from '../ModalApagar/index'

export default function Transacoes({categorias,transacao,pegarID,transacaoID,EditarTransacaoID,saldo,transacoes}) {
  const categoria = categorias.find(
    (categoria) => categoria.id === transacao.categoria_id,
  )
  let color = ''
  if (transacao.tipo === 'entrada') {
    color = 'purple'
  } else {
    color = 'orange'
  }
  let dataFormatada = parseISO(transacao.data)
  dataFormatada = format(dataFormatada, 'dd/MM/yyyy')
  const indiceDay = parseISO(transacao.data).getDay()

  return (
    <div className="transacao tooltip">
      <div className="dataFormatada">
        <span>{dataFormatada}</span>
      </div>
      <div className="dia">
        <span>{DiaDaSemana[indiceDay]}</span>
      </div>
      <div className="descricao">
        <span>{transacao.descricao}</span>
      </div>
      <div className="categoria">
        <span>{categoria ? categoria.descricao : ''}</span>
      </div>
      <div className="valor">
        <span className={color}>
          R${transacao.valor.toLocaleString('pt-br', { minimumFractionDigits: 2 })}
        </span>
      </div>

      <div className="btns">
        <img
          onClick={() => EditarTransacaoID(transacaoID)}
          className="editar"
          src={editar}
          alt=""
        />
        <img
          onClick={() => pegarID(transacaoID)}
          className="excluir"
          src={excluir}
          alt=""
        />
      </div>

      <div style={{ display: 'none' }} id={transacaoID}>
        <ModalApagaritem
          transacaoID={transacaoID}
          saldo={saldo}
          transacoes={transacoes}
        />
      </div>
    </div>
  )
}
