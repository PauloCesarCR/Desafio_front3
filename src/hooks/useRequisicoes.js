import toast from '../utils/toast';
import api from '../services/api';

function useRequisicoes(){
  
    async function get(rota){
        try {
            const response = await api.get(`/${rota}`)
            const {data} = response

            if (response.status > 205) {
               throw new Error(data)    
              }
              return data;
        } catch (error) {
          toast.notifyError(error.response.data.mensagem)
        }
    }


    async function getUm(rota,id){
        try {
            const response = await api.get(`/${rota}/${id}`)
            const {data} = response   
            if (response.status > 205) {
              throw new Error(data)    
             }
             return data;
        } catch (error) {
          toast.notifyError(error.response.data.mensagem)
        }
    }

    async function post(rota,body){
        try {
          
            const response = await api.post(`/${rota}`,body)    
            const {data} = response  
        
            if (response.status > 205) {
              throw new Error(data)    
             }
             return data;
        } catch (error) {
          console.log(error.response)
          toast.notifyError(error.response.data.mensagem)
        }
    }

    async function del(rota,id) {
        try {
          const response = await api.delete(`/${rota}/${id}`) 

          const {data} = response   
          if (response.status > 205) {
            throw new Error(data)    
           }
           return data;
        } catch (error) {
          toast.notifyError(error.response.data.mensagem)
        }
      }

      async function put(rota,body) {
        try {
          const response = await api.put(`/${rota}`,body)
          const {data} = response   
          if (response.status > 205) {
            throw new Error(data)    
           }
           return data;
        } catch (error) {
          toast.notifyError(error.response.data.mensagem)
        }
      }

      return {
        get,
        getUm,
        post,
        del,
        put
      }

}
    export default useRequisicoes;