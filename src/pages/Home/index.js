import NavBar from '../../Componentes/NavBar'
import './style.css'
import 'react-toastify/dist/ReactToastify.min.css'
import Transacoes from '../../Componentes/TransacoesDoUsuario'
import ModalRegistro from '../../Componentes/ModalRegistro'
import { useEffect, useState } from 'react'
import ModalEditarPerfil from '../../Componentes/ModalEditarPerfil'
import ListaDeSpans from '../../Componentes/listaDeSpans'
import Extrato from '../../Componentes/extrato'
import { format, parseISO} from 'date-fns'
import useGlobal from '../../hooks/useGlobal'
import useRequisicoes from '../../hooks/useRequisicoes'
import fracionarDigitos from '../../hooks/usefracionarDigitos'
import headerConfig from '../../utils/headerConfig'
import { getItem } from '../../services/storage'
import toast from '../../utils/toast'
function Home() {
  const requisicoes = useRequisicoes()
  const {editPerfil} = useGlobal()
  const [regAberto, setRegAberto] = useState(false)
  const [tipo, setTipo] = useState('')
  const [form, setForm] = useState({ valor: '', data: ' ', descricao: ' ' })
  const [transitionID, setTrasitionID] = useState('')
  const [categorias, setCategorias] = useState({ options: [] })
  const [QualModal, setQualModal] = useState('')
  const [erroRegistro, setErroRegistro] = useState('')
  const [transacoesOk, setTransacoes] = useState([])
  const [extrato, setExtrato] = useState({})
  const [categoriaFiltrada, setCategoriaFiltrada] = useState([])
  const token = getItem('token')
  const config = headerConfig(token)
  
  async function saldo() {
  
      const data = await requisicoes.get('transacao/extrato',config)
      if (!data){
        setExtrato({ entrada: 0, saida: 0, saldo: 0 })
        return;
      }
      const entrada = fracionarDigitos(data.entrada)

      const saida = fracionarDigitos(data.saida)

      const saldo = data.entrada - data.saida

      const saldoEmPT = fracionarDigitos(saldo)

      setExtrato({ entrada: entrada, saida: saida, saldo: saldoEmPT })
  
  }
  async function transacoes() {
    try {
      const transacoes = await requisicoes.get('transacao',config)
      setTransacoes(transacoes)
    } catch (error) {}
  }
  function filtrarCategoria(){
    const categoria = categorias.options.find((categoria) => categoria.descricao === form.categoria)
    if(categoria){
      setCategoriaFiltrada(categoria)
    } else {
      setCategoriaFiltrada([])
    }
  }
  function pegarID(transacaoID) {
    setTrasitionID(transacaoID)
    const modalDeletar = document.getElementById(`${transacaoID}`)
    const estadoModal = modalDeletar.style.display

    if (estadoModal === 'none') {
      return (modalDeletar.style.display = 'block')
    }
    return (modalDeletar.style.display = 'none')
  }
  async function EditarTransacaoID(transacaoID) {

    const transacao = await requisicoes.getUm('transacao', transacaoID,config)

    let dataFormatada = parseISO(transacao.data)
    dataFormatada = format(dataFormatada, 'dd/MM/yyyy')

    setForm({
      valor: transacao.valor,
      data: dataFormatada,
      descricao: transacao.descricao,
    })
    setTrasitionID(transacaoID)
    setRegAberto(true)
    setQualModal('Editar Registro')
  }
  async function editarTransacao() {
  
      if (!form.valor || !categoriaFiltrada.id || !form.data  || !form.descricao || !tipo){
        return toast.notifyError('Todos os campos são obrigatórios')
      }
      const atualizarTransacao = {
        valor: form.valor,
        categoria_id: categoriaFiltrada.id,
        data: form.data,
        descricao: form.descricao,
        tipo: tipo,
      }
      const data = await requisicoes.put(`transacao/${transitionID}`, atualizarTransacao, config)
      console.log(data)
      setForm({ valor: '', data: ' ', descricao: ' ' })
      setRegAberto(false)
      toast.notifySucess('Transação editada com sucesso')
      saldo()
      transacoes()
    } 
  
  async function getCategorias() {
      const data = await requisicoes.get('categoria',config)

      const opcoes = data.map((categoria) => ({
        id: categoria.id,
        descricao: categoria.descricao,
      }))

      setCategorias({ options: opcoes })
    } 

  async function trocarValorInput(e) {
    setForm({ ...form, [e.target.name]: e.target.value })
  }
  async function handleSubmit(e) {
    e.preventDefault()

    if (QualModal === 'Adicionar Registro') {
      adicionarRegistro()
    } else if (QualModal === 'Editar Registro') {
      editarTransacao()
    } else {
      return
    }
  }
  async function adicionarRegistro() {
  
      if (!form.valor || !form.data || !form.descricao) {
        return setErroRegistro('Todos os campos são obrigatórios')
      }

      if (!categoriaFiltrada) {
        return setErroRegistro('Categoria não encontrada')
      }
      const newTransacao = {
        valor: form.valor,
        categoria_id:categoriaFiltrada.id,
        data: form.data,
        descricao: form.descricao,
        tipo: tipo,
      }
      const resultado = await requisicoes.post('transacao', newTransacao, config)
      console.log(resultado)
      if (resultado){
        transacoes()
        saldo()
        toast.notifySucess('Transação adicionada com sucesso')
        setForm({ valor: '', data: ' ', descricao: ' ' })
        setRegAberto(false)
      }
    } 

  useEffect(()=>{
    filtrarCategoria()
  })
  useEffect(() => {
    getCategorias()
    transacoes()
    saldo()
  },[])

  return (
    <div className="container">
      <nav>
        <NavBar/>
      </nav>
      <div className="content-page">
        <div className="conteudo-home">
          <div className="transacoes">
            <ListaDeSpans />
            {transacoesOk.map((transacao) => (
              <Transacoes
                key={transacao.id}
                transacao={transacao}
                transacaoID={transacao.id}
                categorias={categorias.options}
                pegarID={pegarID}
                EditarTransacaoID={EditarTransacaoID}
                saldo={saldo}
                transacoes={transacoes}
              />
            ))}
          </div>

          <div className="content-resumo">
           <Extrato
           extrato={extrato}
           />
            <button
              onClick={() => {
                setRegAberto(true)
                setQualModal('Adicionar Registro')
              }}
              className="adicionarRegistro"
            >
              Adicionar Registro
            </button>
          </div>
        </div>

        {regAberto ? (
          <ModalRegistro
            setRegAberto={setRegAberto}
            trocarValorInput={trocarValorInput}
            handleSubmit={handleSubmit}
            form={form}
            setForm={setForm}
            setTipo={setTipo}
            categorias={categorias.options}
            QualModal={QualModal}
            erroRegistro={erroRegistro}
          />
        ) : (
          ''
        )}

        { editPerfil ?
          <ModalEditarPerfil/>
          : ''
        }
      </div>
    </div>
  )
  
}
export default Home;
