import './style.css'

function ListaDeSpans() {
  return (
    <div className="listaDindin">
      <span className="data">
        Data <b className="seta"></b>
      </span>
      <span>Dia da semana</span>
      <span>Descrição</span>
      <span>Categoria</span>
      <span>Valor</span>
    </div>
  )
}

export default ListaDeSpans;
