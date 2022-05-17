import { useState } from 'react';

function useGlobalProvider() {
  const [erroPerfil, setErroPerfil] = useState('')
  const [formPerfil, setFormPerfil] = useState({nome: '',email: '',senha: '',confirmSenha: ''})
  const [editPerfil, setEditPerfil] = useState(false)
  

  return {
    erroPerfil,
    setErroPerfil,
    formPerfil,
    setFormPerfil,
    editPerfil,
    setEditPerfil,
  }
}

export default useGlobalProvider;