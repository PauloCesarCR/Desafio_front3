import './style.css'
import useRequisicoes from '../../hooks/useRequisicoes'
import { getItem } from '../../services/storage'
import toast from '../../utils/toast'

export default function ModalApagaritem({transacaoID,saldo,transacoes}) {
  const token = getItem('token')
  const requisicoes = useRequisicoes()

    function fecharModal(){
    
        const modalDeletar = document.getElementById(`${transacaoID}`)
          
        return modalDeletar.style.display = 'none'
      }

    async function apagarTransacao() {
         const result = await requisicoes.del('transacao',transacaoID)
          transacoes()
          saldo()
          toast.notifySucess('Transação deletada com sucesso')
          const modalDeletar = document.getElementById(`${transacaoID}`)
          return modalDeletar.style.display = 'none'
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