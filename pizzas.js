let pizzaJson = [
    { id: 1, name: 'Mussarela', img: 'images/pizza.png', price: 20.19, sizes: ['100g', '530g', '860g'], description: 'Descrição da pizza em mais de uma linha muito legal bem interessante' },
    { id: 2, name: 'Calabresa', img: 'images/pizza2.png', price: 18.00, sizes: ['320g', '530g', '860g'], description: 'Descrição da pizza em mais de uma linha muito legal bem interessante' },
    { id: 3, name: 'Quatro Queijos', img: 'images/pizza3.png', price: 17.45, sizes: ['320g', '530g', '860g'], description: 'Descrição da pizza em mais de uma linha muito legal bem interessante' },
    { id: 4, name: 'Americana', img: 'images/pizza4.png', price: 19.77, sizes: ['320g', '530g', '860g'], description: 'Descrição da pizza em mais de uma linha muito legal bem interessante' },
    { id: 5, name: 'Sorvete', img: 'images/pizza5.png', price: 21.43, sizes: ['320g', '530g', '860g'], description: 'Descrição da pizza em mais de uma linha muito legal bem interessante' },
    { id: 6, name: 'Moda da Casa', img: 'images/pizza6.png', price: 18.55, sizes: ['320g', '530g', '860g'], description: 'Descrição da pizza em mais de uma linha muito legal bem interessante' },
    { id: 7, name: 'Chocolate', img: 'images/pizza7.png', price: 22.36, sizes: ['320g', '530g', '860g'], description: 'Descrição da pizza em mais de uma linha muito legal bem interessante' }
];

function createPizzas() {
    for (pizza in pizzaJson) {
        const pizzaItem = document.createElement('div');
        pizzaItem.classList.add('pizza-item');

        const aItem = document.createElement('a');
        const pizzaPrice = document.createElement('div');
        const pizzaName = document.createElement('div');
        const pizzaDesc = document.createElement('div');

        pizzaPrice.classList.add('pizza-item--price');
        pizzaName.classList.add('pizza-item--name');
        pizzaDesc.classList.add('pizza-item--desc');

        const pizzaItemImg = document.createElement('div');
        const itemImg = document.createElement('img');
        const pizzaItemAdd = document.createElement('div');


        pizzaItemImg.classList.add('pizza-item--img');
        pizzaItemAdd.classList.add('pizza-item--add');
        pizzaItemAdd.setAttribute('onclick', `showWindowArea(${pizzaJson[pizza].id - 1})`);

        itemImg.src = `${pizzaJson[pizza].img}`;
        pizzaItemAdd.innerHTML = '+';
        pizzaPrice.innerHTML = `R$ ${pizzaJson[pizza].price}`;
        pizzaName.innerHTML = `${pizzaJson[pizza].name}`;
        pizzaDesc.innerHTML = `R$ ${pizzaJson[pizza].description}`;


        pizzaItemImg.appendChild(itemImg);
        aItem.append(pizzaItemImg, pizzaItemAdd);
        pizzaItem.append(aItem, pizzaPrice, pizzaName, pizzaDesc);

        document.querySelector('.pizza-area').appendChild(pizzaItem);
    }
};

createPizzas();
