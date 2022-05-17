import toast from '../utils/toast';
import api from '../services/api';

function useRequisicoes(){
  
    async function get(rota,config){
        try {
            const response = await api.get(`/${rota}`, config)
            const {data} = response

            if (response.status > 205) {
               throw new Error(data)    
              }
              return data;
        } catch (error) {
          toast.notifyError(error.response.data.mensagem)
        }
    }


    async function getUm(rota,id,config){
        try {
            const response = await api.get(`/${rota}/${id}`, config)
            const {data} = response   
            if (response.status > 205) {
              throw new Error(data)    
             }
             return data;
        } catch (error) {
          toast.notifyError(error.response.data.mensagem)
        }
    }

    async function post(rota,body,config){
        try {
          
            const response = await api.post(`/${rota}`,body, config)    
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

    async function del(rota,id,config) {
        try {
          const response = await api.delete(`/${rota}/${id}`, config) 

          const {data} = response   
          if (response.status > 205) {
            throw new Error(data)    
           }
           return data;
        } catch (error) {
          toast.notifyError(error.response.data.mensagem)
        }
      }

      async function put(rota,body,config) {
        try {
          const response = await api.put(`/${rota}`,body, config)
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