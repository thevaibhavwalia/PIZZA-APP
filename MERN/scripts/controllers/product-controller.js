// Product Controller - It is a Glue B/w View and Model
// Controller - I/O View Layer

import productOperations from "../services/product-operations.js";

// Data Exchange B/w View and Model.
async function loadPizzas(){
    const pizzas = await productOperations.loadProducts();
    console.log('Pizzas are ', pizzas);
    for(let pizza of pizzas){
        preparePizzaCard(pizza);
    }
}
loadPizzas();



function addToCart(){
  // this - keyword (Current calling object reference)
  console.log('Add to Cart Called...', this);
  const currentButton = this;
  const pizzaId = currentButton.getAttribute('product-id');
  console.log('Pizza Id is ', pizzaId);
  productOperations.search(pizzaId);
  printBasket();
 
}








function printBasket() {
  const cartProducts = productOperations.getProductsInCart();
  const basket = document.querySelector('#basket');
  basket.innerHTML = '';

  var sum = 0;
 

  for (let product of cartProducts) {
    function remove()
    {
      basket.removeChild(li);
      sum-=product.price;
      console.log("sum is ",sum)
      if(sum<=0)
      {
        basket.removeChild(parac);
        basket.removeChild(parad);

      }
      if(sum > 30){
        parac.innerHTML= `<strong>DISCOUNTED PRICE IS $ ${sum-4}</strong>`;
    
      }
      else{
        parac.innerHTML='';
      }

      parad.innerHTML=`<strong> FINAL PAYMENT AFTER GST AND DELIVERY CHARGE IS <mark>$${sum+(sum-4)*0.18}</mark></strong>`

     
      
    }

    const buttonz=document.createElement('button');
    buttonz.innerText=' x ';
    buttonz.addEventListener('click', remove);
    buttonz.className = 'btn btn-danger li';
    
    
    const li = document.createElement('li');
    li.className='fw-bold';
    li.innerHTML= `${product.name} ${product.price}`;
    
    basket.appendChild(li);

    
    li.appendChild(buttonz);

    sum += parseFloat(product.price);

  
  }
  console.log('the current sum is ',sum);
  const parac = document.createElement('p');
  parac.className='fw-bold';
  const parad = document.createElement('p');
  parad.className='fw-bold';
  parad.innerHTML=`<strong> FINAL PAYMENT AFTER GST AND DELIVERY CHARGE IS <mark>$${sum+(sum-4)*0.18}</mark></strong>`
  
  if(sum > 30){
    parac.innerHTML= `<strong>DISCOUNTED PRICE IS $ ${sum-4}</strong>`;

  }
  basket.appendChild(parac);
  basket.appendChild(parad);
 

  
}



  
  





function preparePizzaCard(pizza){
    const outputDiv = document.querySelector('#output');
    const colDiv = document.createElement('div');
    colDiv.className = 'col-4';
    const cardDiv = document.createElement('div');
    cardDiv.className = 'card';
    cardDiv.style = "width: 18rem;";
    cardDiv.classList.add('height');
    colDiv.appendChild(cardDiv);
    const img = document.createElement('img');
    img.src = pizza.url;
    img.className = 'card-img-top';
    cardDiv.appendChild(img);
    const cardBody = document.createElement('div');
    cardBody.className = 'card-body';
    cardDiv.appendChild(cardBody);
    const h5 = document.createElement('h5');
    h5.className = 'card-title';
    h5.innerText = pizza.name;
    const pTag = document.createElement('p');
    pTag.className = 'card-text';
    pTag.innerText = pizza.desc;
    const button = document.createElement('button');
    button.setAttribute('product-id', pizza.id);
    button.addEventListener('click', addToCart);// Event Bind
    button.innerText = 'Add to Cart';
    button.className = 'btn btn-primary';
    cardBody.appendChild(h5);
    cardBody.appendChild(pTag);
    cardBody.appendChild(button);
    outputDiv.appendChild(colDiv);


}