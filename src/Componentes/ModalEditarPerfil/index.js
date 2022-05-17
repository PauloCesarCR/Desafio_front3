import './style.css'
import fechar from '../../assets/fechar.png'
import useRequisicoes from '../../hooks/useRequisicoes'
import useGlobal from '../../hooks/useGlobal'
import { setItem,getItem } from '../../services/storage'
import headerConfig from '../../utils/headerConfig'
import trocarTipoInput from '../../utils/trocarTipoInput'
import VisibilityIcon from '@mui/icons-material/Visibility'
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff'
import { useState } from 'react'
function ModalEditarPerfil() {
  const token = getItem('token')
  const config = headerConfig(token)
  const {
    formPerfil,
    setFormPerfil,
    setErroPerfil,
    setEditPerfil,
    erroPerfil,
  } = useGlobal()
  const requisicoes = useRequisicoes()

  async function atualizarUsuario() {
    try {
      if (formPerfil.senha !== formPerfil.confirmSenha) {
        return setErroPerfil(
          'A senha de confirmação e a senha precisam ser idênticas.',
        )
      }
      const formPerfilAtualizar = {
        nome: formPerfil.nome,
        email: formPerfil.email,
        senha: formPerfil.senha,
      }
      await requisicoes.put('usuario', formPerfilAtualizar, config)
      setItem('nome', formPerfil.nome)
      setEditPerfil(false)
      setFormPerfil({ nome: '', email: '', senha: '', confirmSenha: '' })
    } catch (error) {
      setErroPerfil(error.response.data.mensagem)
    }
  }
  async function handleSubmitAtualizarUsuario(e) {
    e.preventDefault()
    atualizarUsuario()
  }
  async function trocarValorInput(e) {
    setFormPerfil({ ...formPerfil, [e.target.name]: e.target.value })
  }
  function fecharModal() {
    setEditPerfil(false)
    setErroPerfil('')
  }
  const [typeInput, setTypeInput] = useState(false)

  return (
    <div className="container-form">
      <form onSubmit={handleSubmitAtualizarUsuario}>
        <div className="editar-perfil">
          <h1>Editar Perfil </h1>
          <img
            onClick={() => fecharModal()}
            className="btn-fechar"
            src={fechar}
            alt=""
          />
        </div>
        <label>
          <span>Nome</span>
          <input
            onChange={trocarValorInput}
            name="nome"
            value={formPerfil.nome}
            type="text"
          />
        </label>

        <label>
          <span>E-mail</span>
          <input
            onChange={trocarValorInput}
            name="email"
            value={formPerfil.email}
            type="email"
          />
        </label>

        <label className="label-senha">
          <span>Senha</span>
          <input
            onChange={trocarValorInput}
            name="senha"
            value={formPerfil.senha}
            type={typeInput ? 'text' : 'password'}
          />
          <div
            onClick={() => trocarTipoInput(typeInput, setTypeInput)}
            className="icon-perfil"
          >
            {typeInput === false ? <VisibilityOffIcon /> : <VisibilityIcon />}
          </div>
        </label>

        <label>
          <span>Confirmação de Senha</span>
          <input
            onChange={trocarValorInput}
            name="confirmSenha"
            value={formPerfil.confirmSenha}
            type={typeInput ? 'text' : 'password'}
          />
        </label>

        <div className="div-btn-confirmar">
          <button className="btn-confirmar">Confirmar</button>
        </div>
        <span className="erro">{erroPerfil ? erroPerfil : ''}</span>
      </form>
    </div>
  )
}

export default ModalEditarPerfil
