import axios from 'axios';
import { getItem } from '../services/storage'
const token = getItem('token')

export default axios.create({
    baseURL: 'https://api-dindincubos.herokuapp.com',
    headers: { 'Content-Type': 'application/json', 
    'Authorization': `Bearer ${token}` }
});