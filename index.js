// fetch('https://my-json-server.typicode.com/rtio/products-api-demo/products')
//     .then((response) => {
//         console.log(response.status);
//         response.json()
//     })
//     .then((data) => {
//         console.log(data);
//     })
//     .catch(error => console.log('Oops erro!'));
// console.log('Olá, mundo!');


async function obterProdutos() {
    const response = await fetch('https://my-json-server.typicode.com/rtio/products-api-demo/products');
    const data = await response.json();
    imprimirProdutos(data);
    console.log(data);
    return data;
}

obterProdutos();

const meusProdutos = [
    {
        id: 1,
        name: 'Apple MacBook Pro 17"',
        color: 'Prata',
        amount: 1,
        price: 2999,
    },
    {
        id: 2,
        name: 'Microsoft Surface Pro',
        color: 'Branco',
        amount: 5,
        price: 1999,
    },
    {
        id: 3,
        name: 'Magic Mouse 2',
        color: 'Preto',
        amount: 2,
        price: 99,
    },
    {
        id: 4,
        name: 'Google Pixel Phone',
        color: 'Cinza',
        amount: 2,
        price: 799,
    },
    {
        id: 5,
        name: 'Apple Watch 5',
        color: 'Vermelho',
        amount: 3,
        price: 999,
    },
    {
        id: 6,
        name: 'Apple iPad Pro 10.5"',
        color: 'Dourado',
        amount: 1,
        price: 599,
    },
];

const cabecalho = [
    'id',
    'Nome do produto',
    'Cor',
    'Quantidade',
    'Preço',
    'Ações',
];

function criarCabecalho(){
    const thead = document.createElement('thead');
    thead.classList.add('text-xs', 'text-gray-700', 'uppercase', 'bg-gray-50');
    
    const trHead = document.createElement('tr');

    cabecalho.forEach((nomeCabecalho) => {
        const th = document.createElement('th');
        th.setAttribute('scope', 'col');
        th.classList.add('px-6', 'py-3');
        th.textContent = nomeCabecalho;
        trHead.appendChild(th);
    });

    thead.appendChild(trHead);
    return thead;
};

function criarRodape(produtos){
    const tfoot = document.createElement('tfoot');
    const trRodape = document.createElement('tr');
    trRodape.classList.add('font-semibold', 'text-gray-900');

    const thTotal = document.createElement('th');
    thTotal.setAttribute('colspan', '3');
    thTotal.setAttribute('scope', 'row');
    thTotal.classList.add('px-6', 'py-3', 'text-base');
    thTotal.textContent = 'Total';
    trRodape.appendChild(thTotal);

    const tdQuantidade = document.createElement('td');
    tdQuantidade.classList.add('px-6', 'py-3');
    tdQuantidade.textContent = produtos.reduce((acumulador, produto) => acumulador + produto.amount, 0 );
    trRodape.appendChild(tdQuantidade);

    const tdPrecoTotal = document.createElement('td');
    tdPrecoTotal.classList.add('px-6', 'py-3');
    const somaTotal = produtos.reduce((acumulador, produto) => acumulador + produto.price, 0 );
    tdPrecoTotal.textContent = somaTotal.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
    trRodape.appendChild(tdPrecoTotal);

    tfoot.appendChild(trRodape);
    return tfoot;
}

function imprimirProdutos(products){
    const table = document.querySelector('#tabela-produtos');
    table.innerHTML = '';
    table.classList.add('w-full', 'text-sm', 'text-left', 'text-gray-500');

    const thead = criarCabecalho();
    table.appendChild(thead);

    const tbody = document.createElement('tbody');
    products.forEach((product) => {
        const tr = document.createElement('tr');
        tr.classList.add('bg-white', 'border-b', 'hover:bg-gray-50');
        for (const key in product) {
            let coluna = document.createElement('td');
            coluna.classList.add('px-6', 'py-4');
            if (key === 'name') {
                coluna = document.createElement('th');
                coluna.classList.add('px-6', 'py-4', 'font-medium', 'text-gray-900', 'whitespace-nowrap');
                coluna.setAttribute('scope', 'row');
            }
            const valor = product[key];
            coluna.textContent = valor;
            if (key === 'price') {
                coluna.textContent = valor.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
            }
            tr.appendChild(coluna);
        }
        
        const tdAcoes = document.createElement('td');
        tdAcoes.classList.add('flex', 'items-center', 'px-6', 'py-4', 'space-x-3');
        
        const linkEditar = document.createElement('a');
        linkEditar.setAttribute('href', '#');
        linkEditar.classList.add('font-medium', 'text-red-600', 'hover:underline');
        linkEditar.textContent = 'Excluir';
        linkEditar.addEventListener('click', (event) => {
            event.preventDefault();
            const novaLista = excluirProduto(product.id);
            imprimirProdutos(novaLista);
        });

        tdAcoes.appendChild(linkEditar);

        tr.appendChild(tdAcoes);
         
        tbody.appendChild(tr); 
    });

    const tfoot = criarRodape(products);

    table.appendChild(tfoot);

    table.appendChild(tbody);
}

// imprimirProdutos(meusProdutos);

function obterFormData(){
    const inputNome = document.querySelector('#name');
    const inputCor = document.querySelector('#color');
    const inputQuantidade = document.querySelector('#amount');
    const inputPreco = document.querySelector('#price');

    const quantidade = Number(inputQuantidade.value);
    const preco = Number(inputPreco.value);

    return {
        id: null,
        name: inputNome.value,
        color: inputCor.value,
        amount: quantidade,
        price: preco,
    };
};

function adicionarProduto(event){
    event.preventDefault();
    const produto = obterFormData();
    produto.id = meusProdutos.length + 1;
    meusProdutos.push(produto);
    imprimirProdutos(meusProdutos);
}

function excluirProduto(id){
    const produtoIndice = meusProdutos.findIndex((produto) => produto.id === id);
    meusProdutos.splice(produtoIndice, 1);
    return meusProdutos;
}

function registrarListeners(){
    const form = document.querySelector('#form-produto');
    form.addEventListener('submit', adicionarProduto);
}

registrarListeners();
