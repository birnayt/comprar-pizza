const valuesCart = {
    subtotal: 0,
    discount: 0,
    total: 0,
    count: 0
};

const sizePrice = {P: 0, M: 1, G: 2};

function showWindowArea(pizza) {
    document.querySelector('.pizzaBig img').src = `${pizzaJson[pizza].img}`;
    document.querySelector('.pizzaInfo h1').innerHTML = `${pizzaJson[pizza].name}`;
    document.querySelector('.pizzaInfo--desc').innerHTML = `${pizzaJson[pizza].description}`;
    document.querySelector('.pizzaInfo--actualPrice').innerHTML = `R$ ${pizzaJson[pizza].price[2]}`;
    document.querySelector('.pizzaWindowArea').style.display = 'block';
};

function selectSize(e) {
    for (let i = 0; i < 3; i++) {
        const pizza = document.querySelectorAll('.pizzaInfo--size')[i];
        const newPizza = pizza.className.split(' ');

        if (newPizza.some((attribute) => attribute == 'selected')) {
            newPizza.splice(newPizza.indexOf('selected'), 1);
            pizza.className = newPizza.join('');
        }

        if (pizza.attributes['data-key'] == e.target.attributes['data-key']) {
            pizza.classList.add('selected');
            document.querySelector('.pizzaInfo--actualPrice').innerHTML = `R$ ${pizzaPrices.promotion[i]}`;
        }
    }

};

function quantityToogle(e) {
    const updateCartValues = () => {
        const pizzaSize = e.target.parentElement.previousElementSibling.innerHTML.split(/[()]/g)[1];
        const pricePizza = pizzaPrices.promotion[sizePrice[pizzaSize]];

        if (e.target.innerText == '+') {
            valuesCart.subtotal += pricePizza;
            valuesCart.discount += pricePizza * 0.1;
            valuesCart.total += pricePizza - (pricePizza * 0.1);
        }
        else {
            valuesCart.subtotal -= pricePizza;
            valuesCart.discount -= pricePizza * 0.1;
            valuesCart.total -= pricePizza - (pricePizza * 0.1); 
        }

        renderValuesCart();
    }

    if (e.target.innerText == '+') {
        e.target.previousElementSibling.innerHTML = Number(e.target.previousElementSibling.innerHTML) + 1;
        
        if (e.target.parentElement.className == 'cart--item--qtarea') {
            updateCartValues();
        }
    }
    else {
        if (e.target.nextElementSibling.innerHTML == 1) {
            e.target.parentElement.parentElement.remove();
            valuesCart.count -= 1;
            document.querySelector('.menu-openner span').innerHTML = valuesCart.count;
        }

        e.target.nextElementSibling.innerHTML = Number(e.target.nextElementSibling.innerHTML) - 1;
       
        if (e.target.parentElement.className == 'cart--item--qtarea') {
            updateCartValues();
        }
    }
};

function hideWindowArea() {
    document.querySelector('.pizzaWindowArea').style.display = 'none';
    document.querySelector('.pizzaInfo--qt').innerHTML = 1;

    document.querySelector('.pizzaInfo--size:nth-child(1)').classList.remove('selected');
    document.querySelector('.pizzaInfo--size:nth-child(2)').classList.remove('selected');
    document.querySelector('.pizzaInfo--size:nth-child(3)').classList.add('selected');
};

function renderCartArea(quantity, price, img, name) {
    const qt = Number(quantity.innerText);
    const dollar = Number(price.innerText.split(' ')[1]);
    const subtotal = qt * dollar;
    const discount = subtotal * 0.1;
    const total = subtotal - discount;

    const cartItem = document.createElement('div');
    cartItem.classList.add('cart--item');

    const imgItem = document.createElement('img');
    imgItem.setAttribute('src', `${img}`);

    const cartItemName = document.createElement('div');
    cartItemName.classList.add('cart--item-nome');
    cartItemName.innerHTML = `${name}`;
    const cartItemQtarea = document.createElement('div');
    cartItemQtarea.classList.add('cart--item--qtarea');

    const cartItemQtminus = document.createElement('button');
    cartItemQtminus.classList.add('cart--item-qtmenos');
    cartItemQtminus.innerHTML = '-';
    cartItemQtminus.setAttribute('onclick', 'quantityToogle(event)');

    const cartItemQt = document.createElement('div');
    cartItemQt.classList.add('cart--item--qt');
    cartItemQt.classList.add('operation');
    cartItemQt.innerHTML = quantity.innerHTML;

    const cartItemQtplus = document.createElement('button');
    cartItemQtplus.classList.add('cart--item-qtmais');
    cartItemQtplus.innerHTML = '+';
    cartItemQtplus.setAttribute('onclick', 'quantityToogle(event)');

    cartItemQtarea.append(cartItemQtminus, cartItemQt, cartItemQtplus);
    cartItem.append(imgItem, cartItemName, cartItemQtarea);

    valuesCart.subtotal += subtotal;
    valuesCart.discount += discount;
    valuesCart.total += total;

    document.querySelector('.cart').append(cartItem);
    renderValuesCart();
};

function renderValuesCart() {
    document.querySelector('.subtotal span:nth-child(2)').innerHTML = `R$ ${(valuesCart.subtotal).toFixed(2)}`;
    document.querySelector('.desconto span:nth-child(2)').innerHTML = `R$ ${(valuesCart.discount).toFixed(2)}`;
    document.querySelector('.total span:nth-child(2)').innerHTML = `R$ ${(valuesCart.total).toFixed(2)}`;
};

function openCartArea(quantity, price, img, name) {

    renderCartArea(quantity, price, img, name);
    openMenu()
    hideWindowArea();

    valuesCart.count += 1;
    document.querySelector('.menu-openner span').innerHTML = valuesCart.count;
};

function openMenu() {
    if (window.innerWidth > 840) {
        document.querySelector('aside').style.width = '20vw';
    }
    else {
        document.querySelector('aside').style.left = '0vw';
    }
}

function closePurchase() {
    if (window.innerWidth > 840) {
        document.querySelector('aside').style.width = '0vw';
    }
    else {
        document.querySelector('aside').style.left = '100vw';
    }
    document.querySelector('.pizzaInfo--qt').innerHTML = 1;

};

function finishPurchase() {
    closePurchase();

    for (let i = 0; i < valuesCart.count; i++) {
        document.querySelectorAll('.cart .cart--item')[i].remove()
    }

    valuesCart.subtotal = 0;
    valuesCart.discount = 0;
    valuesCart.total = 0;
    valuesCart.count = 0;

    renderValuesCart();
    document.querySelector('.menu-openner span').innerHTML = 0;
};
