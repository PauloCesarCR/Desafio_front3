import axios  from "axios";

export default axios.create({
   
    baseURL: 'https://api-dindincubos.herokuapp.com',
    timeout: 10000,
    headers: {'Content-Type': 'application/json'}

});

