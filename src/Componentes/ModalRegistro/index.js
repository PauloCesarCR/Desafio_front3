import './style.css'
import fechar from '../../assets/fechar.png'
import useGlobal from '../../hooks/useGlobal'
import { useState } from 'react'

export default function ModalRegistro ({setRegAberto,trocarValorInput,form,setForm,handleSubmit,setTipo,categorias,QualModal,erroRegistro }) {
  
  const [entradaEstado, setEntradaEstado] = useState('btn-desativado')
  const [saidaEstado, setSaidaEstado] = useState('btn-desativado')

  function btnEntrada() {
      setTipo('entrada')
      setSaidaEstado('btn-desativado')
     if (entradaEstado === 'btn-desativado'){
        setEntradaEstado('btn-entrada')
      } else {
        setEntradaEstado('btn-desativado')
        setTipo('')
      }
  }

  function btnSaida() {

    setTipo('saida')
    setEntradaEstado('btn-desativado')
   if (saidaEstado === 'btn-desativado'){
    setSaidaEstado('btn-saida')
    } else {
    setSaidaEstado('btn-desativado')
    setTipo('')
    }
}
  function limparFormEFechar(){
    setRegAberto(false)
    setForm({ valor: '', data: ' ', descricao: ' ' })
  }

    return (
        <div className='container-form'>
        <form onSubmit={handleSubmit}>
            <div className='div-fechar'>
                <h1>{QualModal}</h1>
                <img onClick={()=> {limparFormEFechar()}} className='btn-fechar' src={fechar} alt='' />
            </div>
            <div className='btns-form'>
                <button
                onClick={()=> btnEntrada()}
                type='button'
                className= {entradaEstado}>Entrada</button>

                <button 
                onClick={()=> btnSaida()}
                type='button' 
                className={saidaEstado}>Saída
                </button>
            </div>
        <label className='label-valor'>
           <span>Valor</span>   
            <input 
            onChange={trocarValorInput}
            name='valor'
            value={form.valor}
            type='number'
            
            />
        </label>

        <label>
        <span>Categoria</span>   
            <select
            onChange={trocarValorInput}
            name='categoria'
            value={form.categoria}

            >
            <option>
            Escolha sua Categoria
            </option>
            {
            categorias.map((categoria)=>
            <option
            key={categoria.id}>
            {categoria.descricao}
            </option>
            )
            }
            </select> 
          
        </label>

        <label>
        <span>Data</span>  
            <input 
            onChange={trocarValorInput}
            name='data'
            value={form.data}
            type='text'
            />
        </label>

        <label>
        <span>Descrição</span>  
            <input
             onChange={trocarValorInput}
             name='descricao'
             value={form.descricao}
             type='text'
            />
        </label>
        <div className='div-btn-confirmar'>
        <button className='btn-confirmar'>Confirmar</button>
        </div>
        <span className='erro'>{erroRegistro ? erroRegistro : ''}</span>
        </form>
        </div>
    )
}