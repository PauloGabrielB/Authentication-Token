const API = 'https://products-api-i6m5.onrender.com';

async function obterProdutos() {
    const response = await fetch(`${API}/products`);
    const data = await response.json();
    return data;
}

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
        
        const linkRemover = document.createElement('a');
        linkRemover.setAttribute('href', '#');
        linkRemover.classList.add('font-medium', 'text-red-600', 'hover:underline');
        linkRemover.textContent = 'Excluir';
        linkRemover.addEventListener('click', async (event) => {
            event.preventDefault();
            await excluirProduto(product.id);
            const novosProdutos = await obterProdutos();
            imprimirProdutos(novosProdutos);
        });

        const linkEditar = document.createElement('a');
        linkEditar.setAttribute('href', '#');
        linkEditar.classList.add('font-medium', 'text-blue-600', 'hover:underline');
        linkEditar.textContent = 'Editar';
        linkEditar.addEventListener('click', async (event) => {
            event.preventDefault();
            preencherForm(product);
            // capturar o produto para edição
        });

        tdAcoes.appendChild(linkEditar);
        tdAcoes.appendChild(linkRemover);

        tr.appendChild(tdAcoes);
         
        tbody.appendChild(tr); 
    });

    const tfoot = criarRodape(products);

    table.appendChild(tfoot);

    table.appendChild(tbody);
}

function preencherForm(produto){
    const inputNome = document.querySelector('#name');
    const inputCor = document.querySelector('#color');
    const inputQuantidade = document.querySelector('#amount');
    const inputPreco = document.querySelector('#price');

    inputNome.value = produto.name;
    inputCor.value = produto.color;
    inputQuantidade.value = produto.amount;
    inputPreco.value = produto.price;
};

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

async function salvarProduto(event){
    event.preventDefault();
    const produto = obterFormData();
    // identificar se é um produto novo ou edição
    // const resp = await fetch(`${API}/products/${id}`, {
    //     method: 'PUT',
    //     headers: { 'Content-Type': 'application/json' },
    //     body: JSON.stringify(produto)
    // });
    const response = await fetch(`${API}/products`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(produto)
    });
    if (response.status !== 201) {
        console.error('Erro ao adicionar produto');
        return;
    }
    const meusProdutos = await obterProdutos();
    imprimirProdutos(meusProdutos);
}

async function excluirProduto(id){
    const response = await fetch(`${API}/products/${id}`, { method: 'DELETE' });
    if (response.status !== 204) {
        console.error('Erro ao excluir produto');
    }
}

function registrarListeners(){
    const form = document.querySelector('#form-produto');
    form.addEventListener('submit', salvarProduto);
}

async function init(){
    registrarListeners();
    const produtos = await obterProdutos();
    imprimirProdutos(produtos);
}

init();
