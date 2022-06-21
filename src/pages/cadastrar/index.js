import './style.css'
import { Link } from 'react-router-dom'
import Logo from '../../assets/Logo.png'
import { useState, useEffect } from 'react'
import { getItem } from '../../services/storage'
import useRequisicoes from '../../hooks/useRequisicoes'
import { useNavigate } from 'react-router-dom'
import toast from '../../utils/toast'
export default function Cadastrar() {
  const navigate = useNavigate()
  const requisicoes = useRequisicoes()
  const [formCadastro, setFormCadastro] = useState({
    nome: '',
    email: '',
    senha: '',
    confirmSenha: '',
  })

  async function trocarValorInputCadastro(e) {
    setFormCadastro({ ...formCadastro, [e.target.name]: e.target.value })
  }

  async function cadastrarUsuario() {

    if (!formCadastro.nome || !formCadastro.email || !formCadastro.senha || !formCadastro.confirmSenha){
      return toast.notifyError('Todos os campos são obrigatórios!')
    }
    if (formCadastro.senha !== formCadastro.confirmSenha){
      return toast.notifyError('As senhas precisam ser idênticas')
    }
    const data = await requisicoes.post('usuarios', {
        nome: formCadastro.nome,
        email: formCadastro.email,
        senha: formCadastro.senha,
      })

      if (data){
        navigate('/login')
        toast.notifySucess('Cadastrado com Sucesso')
      }
  
  }

  async function handleSubmitCadastro(e) {
    e.preventDefault()
    cadastrarUsuario()
  }

  useEffect(() => {
    const token = getItem('token')
    if (token) {
      navigate('/home')
    }
  })
  return (
    <div className="container-cadastro">
      <div className="nav-bar-login">
        <div className="logo">
          <img src={Logo} alt="" />
        </div>
      </div>
      <div className="content-form-cadastrar">
        <form className="form-cadastrar" onSubmit={handleSubmitCadastro}>
          <h1>Cadastre-se</h1>
          <label>
            <span>Nome</span>
            <input
              onChange={trocarValorInputCadastro}
              name="nome"
              value={formCadastro.nome}
              type="text"
            />
          </label>

          <label>
            <span>E-mail</span>
            <input
              onChange={trocarValorInputCadastro}
              name="email"
              value={formCadastro.email}
              type="email"
            />
          </label>

          <label>
            <span>Senha</span>
            <input
              onChange={trocarValorInputCadastro}
              name="senha"
              value={formCadastro.senha}
              type="password"
            />
          </label>

          <label>
            <span>Confirmação de Senha</span>
            <input
              onChange={trocarValorInputCadastro}
              name="confirmSenha"
              value={formCadastro.confirmSenha}
              type="password"
            />
          </label>
          <button className="btn-entrar">Cadastre-se</button>
          <Link to="/login">Já tem cadastro? Clique aqui!</Link>
        </form>
      </div>
    </div>
  )
}
