const paginate = (followers) => {
    const itemsPerPage = 10
    // Definimos a quantidade de páginas que terá. Para não ficar números quebrados, usamos o método Math.ceil para arredondar para cima
    const pages = Math.ceil(followers.length / itemsPerPage)

    // estou criando um array que terá o tamanho igual ao de paginas. A ideia é de que cada array do array novo vai ter a quantidade de informações da página
    const newFollowers = Array.from({length:pages},(_,index)=>{
        const start = index * itemsPerPage
        // slice ele transforma um array novo pegando uma parte do original, no caso indo de starte até start+items. Lembrando que o start vai mudar a cada interação. No primeiro entao vamos ter um array novo pegando da posição 0 até a 8(start+items = 9, mas o slice ele pega ATÉ antes do 9)
        return followers.slice(start, start + itemsPerPage)
    })
    return newFollowers
}

export default paginate
