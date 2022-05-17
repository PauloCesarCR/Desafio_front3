import toast from '../utils/toast'
import api from '../services/api';

function useRequisicoes(){

    async function get(rota,config){
        try {
            const response = await api.get(`/${rota}`, config)
            const data = response.data  

            if (!response.ok) {
               throw new Error(data)    
              }
              return data;
        } catch (error) {
                toast.messageError(error.message)
        }
    }


    async function getUm(rota,id,config){
        try {
            const response = await api.get(`/${rota}/${id}`, config)
            const data = response.data   
            if (!response.ok) {
              throw new Error(data)    
             }
             return data;
        } catch (error) {
          toast.messageError(error.message)
        }
    }

    async function post(rota,body,config){
        try {
            const response = await api.post(`/${rota}`,body, config)    
   
            const data = response.data   
            if (!response.ok) {
              throw new Error(data)    
             }
             return data;
        } catch (error) {
          toast.messageError(error.message)
        }
    }

    async function del(rota,id,config) {
        try {
          const response = await api.delete(`/${rota}/${id}`, config) 

          const data = response.data   
          if (!response.ok) {
            throw new Error(data)    
           }
           return data;
        } catch (error) {
            console.log(error.message)
        }
      }

      async function put(rota,body,config) {
        try {
          const response = await api.put(`/${rota}`,body, config)
          const data = response.data   
          if (!response.ok) {
            throw new Error(data)    
           }
           return data;
        } catch (error) {
          toast.messageError(error.message)
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