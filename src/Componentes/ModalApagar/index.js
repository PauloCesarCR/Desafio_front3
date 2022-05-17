import './style.css'
import useRequisicoes from '../../hooks/useRequisicoes'
import headerConfig from '../../utils/headerConfig'
import { getItem } from '../../services/storage'


export default function ModalApagaritem({transacaoID,saldo,transacoes}) {
  const token = getItem('token')
  const config = headerConfig(token)
  const requisicoes = useRequisicoes()

    function fecharModal(){
    
        const modalDeletar = document.getElementById(`${transacaoID}`)
          
        return modalDeletar.style.display = 'none'
      }

    async function apagarTransacao() {
        try {
          await requisicoes.del('transacao',transacaoID,config )
          transacoes()
          saldo()
          const modalDeletar = document.getElementById(`${transacaoID}`)
          return modalDeletar.style.display = 'none'

        } catch (error) {
            console.log(error)
        }
      }

    return (
        <>
            <div className='modal tooltiptext'>
            <span>Apagar item?</span>
            <div className='btn-modal'>
                <button onClick={()=> apagarTransacao()} className='btn-sim'>Sim</button>
                <button onClick={()=> fecharModal()}  className='btn-nao'>Não</button>
            </div>
        </div>
        </>
    )
} 