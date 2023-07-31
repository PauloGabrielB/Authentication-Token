const meusProdutos = [
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

const cabecalho = {
    'col1': 'Nome do produto',
    'col2': 'Cor',
    'col3': 'Quantidade',
    'col4': 'Preço',
};

function imprimirProdutos(products){
    const table = document.querySelector('#tabela-produtos');
    table.innerHTML = '';
    table.classList.add('w-full', 'text-sm', 'text-left', 'text-gray-500', 'dark:text-gray-400');

    const thead = document.createElement('thead');
    thead.classList.add('text-xs', 'text-gray-700', 'uppercase', 'bg-gray-50', 'dark:bg-gray-700', 'dark:text-gray-400');
    
    const trHead = document.createElement('tr');

    for (const chave in cabecalho) {
        const nomeCabecalho = cabecalho[chave];
        const th = document.createElement('th');
        th.setAttribute('scope', 'col');
        th.classList.add('px-6', 'py-3');
        th.textContent = nomeCabecalho;
        trHead.appendChild(th);
    }

    thead.appendChild(trHead);

    table.appendChild(thead);

    const tbody = document.createElement('tbody');
    products.forEach((product) => {
        const tr = document.createElement('tr');
        tr.classList.add('bg-white', 'border-b', 'dark:bg-gray-800', 'dark:border-gray-700', 'hover:bg-gray-50', 'dark:hover:bg-gray-600');
        for (const key in product) {
            let coluna = document.createElement('td');
            coluna.classList.add('px-6', 'py-4');
            if (key === 'name') {
                coluna = document.createElement('th');
                coluna.classList.add('font-medium', 'text-gray-900', 'whitespace-nowrap', 'dark:text-white');
                coluna.setAttribute('scope', 'row');
            }
            const valor = product[key];
            coluna.textContent = valor;
            if (key === 'price') {
                coluna.textContent = valor.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
            }
            tr.appendChild(coluna);
        }   
        tbody.appendChild(tr); 
    });

    const tfoot = document.createElement('tfoot');
    const trRodape = document.createElement('tr');
    trRodape.classList.add('font-semibold', 'text-gray-900', 'dark:text-white');

    const thTotal = document.createElement('th');
    thTotal.setAttribute('colspan', '2');
    thTotal.setAttribute('scope', 'row');
    thTotal.classList.add('px-6', 'py-3', 'text-base');
    thTotal.textContent = 'Total';
    trRodape.appendChild(thTotal);
    
    const tdQuantidade = document.createElement('td');
    tdQuantidade.classList.add('px-6', 'py-3');
    tdQuantidade.textContent = products.reduce((acumulador, produto) => acumulador + produto.amount, 0 );
    trRodape.appendChild(tdQuantidade);

    const tdPrecoTotal = document.createElement('td');
    tdPrecoTotal.classList.add('px-6', 'py-3');
    const somaTotal = products.reduce((acumulador, produto) => acumulador + produto.price, 0 );
    tdPrecoTotal.textContent = somaTotal.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
    trRodape.appendChild(tdPrecoTotal);

    tfoot.appendChild(trRodape);

    table.appendChild(tfoot);

    table.appendChild(tbody);
}

imprimirProdutos(meusProdutos);

function obterFormData(){
    const inputNome = document.querySelector('#name');
    const inputCor = document.querySelector('#color');
    const inputQuantidade = document.querySelector('#amount');
    const inputPreco = document.querySelector('#price');
    const meuObj = {
        name: inputNome.value,
        color: inputCor.value,
        amount: inputQuantidade.value,
        price: inputPreco.value,
    };
    return meuObj;
};

function adicionarProduto(event){
    event.preventDefault();
    const produto = obterFormData();
    meusProdutos.push(produto);
    imprimirProdutos(meusProdutos);
}

const form = document.querySelector('#form-produto');
form.addEventListener('submit', adicionarProduto);
