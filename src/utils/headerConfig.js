function headerConfig(token){
    const config = { headers: { Authorization: `Bearer ${token}` } }
    return config;
}
export default headerConfig;