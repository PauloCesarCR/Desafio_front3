import './style.css'
import { Link } from 'react-router-dom'
import Logo from '../../assets/Logo.png'
import { useState, useEffect } from 'react'
import { getItem } from '../../services/storage'
import useRequisicoes from '../../hooks/useRequisicoes'
import { useNavigate } from 'react-router-dom'

export default function Cadastrar() {
  const navigate = useNavigate()
  const requisicoes = useRequisicoes()
  const [formCadastro, setFormCadastro] = useState({
    nome: '',
    email: '',
    senha: '',
    confirmSenha: '',
  })
  const [erroCadastro, setErroCadastro] = useState('')

  async function trocarValorInputCadastro(e) {
    setFormCadastro({ ...formCadastro, [e.target.name]: e.target.value })
  }

  async function cadastrarUsuario() {
    
    const result = await requisicoes.post('usuarios', {
        nome: formCadastro.nome,
        email: formCadastro.email,
        senha: formCadastro.senha,
      })
      
      if (result){
        setErroCadastro('')
        navigate('/login')
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
          <span className="erro">{erroCadastro ? erroCadastro : ''}</span>
          <button className="btn-entrar">Cadastre-se</button>
          <Link to="/login">Já tem cadastro? Clique aqui!</Link>
        </form>
      </div>
    </div>
  )
}
