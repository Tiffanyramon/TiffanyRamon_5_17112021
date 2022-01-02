//Récupération des élements du panier.
let productLocalStorage = JSON.parse(localStorage.getItem("produit"));
console.table(productLocalStorage);

//récipération des donnée de l'API.
then (function (){
    articles.forEach(element => {
        let items = document.getElementById(' cart_items');
items.innerHTML += `<a href="./js/cart.js data-id=${element.idProduct}" data-color="${element.choiceColor}">             <div class="cart__item__img">
                  <img src="${element.article.imageUrl}" alt="${element.article.altTxt}">
                </div>
                <div class="cart__item__content">
                  <div class="${element.article.description}">
                    <h2>class="productName">${element.name}</h2>
                    <p>class="color">${element.choiceColor}</p>
                    <p>class="price">${element.article.price}</p>
                  </div>
                  <div class="cart__item__content__settings">
                    <div class="${element.choiceQuantity}">
                      <p>Qté : </p>
                      <input type="number" class="${element.choiceQuantity}" name="itemQuantity" min="1" max="100" value="42">
                    </div>
                    <div class="cart__item__content__settings__delete">
                      <p class="deleteItem">Supprimer</p>
                    </div>
                  </div>
                </div>
              </article>`
        
    });
 })

 //Calcul du prix total par produit.

 const inputQantity = document.querySelectorAll("choiceQuantity");

 inputQantity.forEach(function(input){
     input.addEventListener('change',function(event){
         const idProduct = input.closest('article').dataset.idProduct
         const choiceColors = input.closest('article').dataset.colorColors
     })
 })

// document.addEventListener('DOMContentLoader', function()



 //Trouver un produit similaire dans le panier. 


 //Si l'élément existe, mettre à jour la quantité. 

 //Nouvelle quantité. 

 //Supprimer un produit.

 function deleteProduct(){
     let todelete = document.querySelectorAll('.deleteItem');
   //Choisir le produit à supprimer.
   let idDelete = productLocalStorage.idProduct;
   let colorDelete = productLocalStorage.ChoiceColors;

   productLocalStorage = productLocalStorage.filter( el => el.idProduct || el.choiceColors == colorDelete );
   localStorage.setItem("produit",JSON.stringify(productLocalStorage));


 }
//Mettre à jour le localstorage avec la nouvelle quantité. 

//window.location.relard() => rafraîchir la page.
location.roload();
