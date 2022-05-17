import './style.css'
import Logo from '../../assets/Logo.png'
import { useEffect, useState } from 'react'
import VisibilityIcon from '@mui/icons-material/Visibility'
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff'
import { useNavigate } from 'react-router-dom'
import trocarTipoInput from '../../utils/trocarTipoInput'
import useRequisicoes from '../../hooks/useRequisicoes'
import { getItem, setItem } from '../../services/storage';
import toast from '../../utils/toast'


export default function Login() {


  const navigate = useNavigate()
  const requisicoes = useRequisicoes()
  const [formLogin, setFormLogin] = useState({ email: '', senha: '' })
  const [erro, setErro] = useState('')
  const [typeInput, setTypeinput] = useState(false)

  async function trocarValorInput(e) {
    setFormLogin({ ...formLogin, [e.target.name]: e.target.value })
  }

  async function fazerLogin() {
    if (!formLogin.email || !formLogin.senha) {
      return
    }
      const data= await requisicoes.post('login',formLogin)

      if(data){
        setItem('token', data.token)
        setItem('nome', data.nome)
        setErro('')
        navigate('/home')
        toast.notifySucess(`Bem Vindo,${data.nome}`)
      }
  }

  async function handleSubmitLogin(e) {
    e.preventDefault()
    fazerLogin()
  }

  useEffect(() => {
    const token = getItem('token')
    if (token) {
      navigate('/home')
      
    }
  })

  return (
    <div className="container-login">
      <div className="nav-bar-login">
        <div className="logo">
          <img src={Logo} alt="" />
        </div>
      </div>
      <div className="content-login">
        <div className="login-text">
          <h1>
            Controle suas <strong>finanças</strong>,<br></br>
            sem planilha chata.
          </h1>

          <p>
            Organizar as suas finanças nunca foi tão fácil,<br></br> com o
            DINDIN, você tem tudo num único lugar,<br></br>e em um clique de
            distância.
          </p>
          <button
            onClick={() => navigate('/cadastre-se')}
            className="cadastre-se"
          >
            Cadastre-se
          </button>
        </div>

        <div className="login-form">
          <form onSubmit={handleSubmitLogin} className="form-login">
            <h2>Login</h2>

            <label className="label-login">
              <span>E-mail</span>
              <input
                className="input-login"
                onChange={trocarValorInput}
                name="email"
                value={formLogin.email}
                type="email"
              />
            </label>

            <label className="label-login">
              <span>Senha</span>
              <input
                className="input-login"
                onChange={trocarValorInput}
                name="senha"
                value={formLogin.senha}
                type={typeInput ? 'text' : 'password'}
              />
              <div onClick={() => trocarTipoInput(typeInput,setTypeinput)} className="icon-visivel">
                {typeInput === false ? (
                  <VisibilityOffIcon />
                ) : (
                  <VisibilityIcon />
                )}
              </div>
            </label>
            <span className="erro">{erro ? erro : ''}</span>
            <button className="btn-entrar">Entrar</button>
          </form>
        </div>
      </div>
    </div>
  )
}
