
import api from '../services/api';

function useRequisicoes(){

    async function get(rota,config){
        try {
            const {data} = await api.get(`/${rota}`, config)
                return data
        } catch (error) {
                console.log(error.response.data.mensagem)
        }
    }


    async function getUm(rota,id,config){
        try {
            const {data} = await api.get(`/${rota}/${id}`, config)
            return data
        } catch (error) {
                console.log(error.response.data.mensagem)
        }
    }

    async function post(rota,body,config){
        try {
            const {data} = await api.post(`/${rota}`,body, config)
                return data
        } catch (error) {
                console.log(error.response.data.mensagem)
        }
    }

    async function del(rota,id,config) {
        try {
          const { data } = await api.delete(`/${rota}/${id}`, config)
          return data
        } catch (error) {
            console.log(error.response.data.mensagem)
        }
      }

      async function put(rota,body,config) {
        try {
          const { data } = await api.put(`/${rota}`,body, config)
          return data
        } catch (error) {
            console.log(error.response.data.mensagem)
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