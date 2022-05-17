function fracionarDigitos(valor) {

    const valorRefatorado = valor.toLocaleString('pt-br', {
            minimumFractionDigits: 2,
          })
          return valorRefatorado;
}

export default fracionarDigitos