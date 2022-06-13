import './style.css'
import { useNavigate } from 'react-router-dom'
import poligono from '../../assets/poligono.png'
import poligonoDois from '../../assets/poligonoDois.png'
import bolinha from '../../assets/bolinha.png'
import iconeSair from '../../assets/iconeSair.png'
import boneco from '../../assets/boneco.png'
import useGlobal from '../../hooks/useGlobal'
import useRequisicoes from '../../hooks/useRequisicoes'
import { getItem, clear } from '../../services/storage'
import toast from '../../utils/toast'

export default function NavBar({ deslogar }) {
  
  const nome = getItem('nome')
  const { setEditPerfil, setFormPerfil, setErroPerfil } = useGlobal()
  const navigate = useNavigate()
  const requisicoes = useRequisicoes()

  async function abrirModalPerfil() {
    setEditPerfil(true)
    try {
      const usuario = await requisicoes.get('usuario')
      setFormPerfil({
        nome: usuario.nome,
        email: usuario.email,
        senha: '',
        confirmSenha: '',
      })
    } catch (error) {
      setErroPerfil(error.response.data.mensagem)
    }
  }

  function deslogar() {
    clear()
    toast.notifySucess("Até logo")
    navigate('/login')
  }

  return (
    <nav>
      <div className="nav-bar-icon">
        <img className="poligono" src={poligono} alt="" />
        <img className="poligonoDois" src={poligonoDois} alt="" />
        <h2>Dindin</h2>
      </div>
      <div className="nav-bar-profile">
        <img src={bolinha} alt="" />
        <img
          onClick={() => abrirModalPerfil()}
          className="boneco"
          src={boneco}
          alt=""
        />
        <h3>{nome}</h3>
        <img
          onClick={() => deslogar()}
          className="deslogar"
          src={iconeSair}
          alt=""
        />
      </div>
    </nav>
  )
}
