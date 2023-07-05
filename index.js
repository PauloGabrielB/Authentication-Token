const products = [
    {
        name: 'Apple MacBook Pro 17"',
        color: 'Prata',
        amount: 1,
        price: 2999,
    },
    {
        name: 'Microsoft Surface Pro',
        color: 'Branco',
        amount: 5,
        price: 1999,
    },
    {
        name: 'Magic Mouse 2',
        color: 'Preto',
        amount: 2,
        price: 99,
    },
    {
        name: 'Google Pixel Phone',
        color: 'Cinza',
        amount: 2,
        price: 799,
    },
    {
        name: 'Apple Watch 5',
        color: 'Vermelho',
        amount: 3,
        price: 999,
    },
    {
        name: 'Apple iPad Pro 10.5"',
        color: 'Dourado',
        amount: 1,
        price: 599,
    },
];

function criarLinha() {
    const linha = document.createElement('tr');
    return linha;
}

function criarCelula(valor) {
    const celula = document.createElement('td');
    celula.innerHTML = valor;
    return celula;
}

function criarCabecalho() {
    const cabecalho = document.createElement('thead');
    return cabecalho;
}

function criarCorpo() {
    const corpo = document.createElement('tbody');
    return corpo;
}

function criarCelulaCabecalho(valor) {
    const cabecalho = document.createElement('th');
    cabecalho.innerHTML = valor;
    return cabecalho;
}

function criarRodape() {
    const rodape = document.createElement('tfoot');
    return rodape;
}

function criarTabela() {
    const tabela = document.createElement('table');

    const cabecalho = criarCabecalho();
    const celulaCabecalhoNome = criarCelulaCabecalho('Nome do produto');
    const celulaCabecalhoCor = criarCelulaCabecalho('Cor');
    const celulaCabecalhoQuantidade = criarCelulaCabecalho('Quantidade');
    const celulaCabecalhoPreco = criarCelulaCabecalho('Preço');
    const linhaCabecalho = criarLinha();

    linhaCabecalho.appendChild(celulaCabecalhoNome);
    linhaCabecalho.appendChild(celulaCabecalhoCor);
    linhaCabecalho.appendChild(celulaCabecalhoQuantidade);
    linhaCabecalho.appendChild(celulaCabecalhoPreco);

    cabecalho.appendChild(linhaCabecalho);
    tabela.appendChild(cabecalho);

    const corpo = criarCorpo();
    products.forEach((produto) => {
        const celulaNome = criarCelula(produto.name);
        const celulaCor = criarCelula(produto.color);
        const celulaQuantidade = criarCelula(produto.amount);
        const celulaPreco = criarCelula(produto.price);

        const linha = criarLinha();

        linha.appendChild(celulaNome);
        linha.appendChild(celulaCor);
        linha.appendChild(celulaQuantidade);
        linha.appendChild(celulaPreco);

        corpo.appendChild(linha);
    });
    tabela.appendChild(corpo);

    const rodape = criarRodape();
    const celulaRodapeTotal = criarCelulaCabecalho('Total');
    const celulaRodapeQuantidadeTotal = criarCelula('12121')
    const celulaRodapePrecoTotal = criarCelula('12121')

    const linhaRodape = criarLinha();

    linhaRodape.appendChild(celulaRodapeTotal);
    linhaRodape.appendChild(celulaRodapeQuantidadeTotal);
    linhaRodape.appendChild(celulaRodapePrecoTotal);

    rodape.appendChild(linhaRodape);
    tabela.appendChild(rodape);

    return tabela;
}

function renderizar() {
    const tabela = criarTabela();
    const containerPrincipal = document.getElementById('container');
    containerPrincipal.appendChild(tabela);
}

renderizar();