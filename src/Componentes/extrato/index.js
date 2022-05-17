import './style.css'


function Extrato({extrato}) {

  return (
    <div className="resumo">
      <h1>Resumo</h1>
      <div>
        <h4>Entradas</h4>
        <span className="entradas">
          R$ {extrato.entrada ? extrato.entrada : 0}
        </span>
      </div>
      <div className="div-saidas">
        <h4>Saidas</h4>
        <span className="saidas">R$ {extrato.saida ? extrato.saida : 0}</span>
      </div>
      <div>
        <h4>
          <strong>Saldo</strong>
        </h4>
        <span className="saldo">R$ {extrato.saldo ? extrato.saldo : 0}</span>
      </div>
    </div>
  )
}
    export default Extrato;
