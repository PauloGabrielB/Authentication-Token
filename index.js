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

function imprimirProdutos(products){
    const table = document.querySelector('#tabela-produtos');
    const tbody = document.createElement('tbody');
    products.forEach((product) => {
        const tr = document.createElement('tr');
        for (const key in product) {
            const tdName = document.createElement('td');
            const valor = product[key];
            tdName.textContent = valor;
            tr.appendChild(tdName);
        }   
        tbody.appendChild(tr); 
    });
    table.appendChild(tbody);
}

imprimirProdutos(meusProdutos);
