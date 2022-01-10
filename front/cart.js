//Récupération des élements du panier.
let articles = JSON.parse(localStorage.getItem("panier"));
console.table(articles);

//récipération des donnée de l'API.
let totalPrice = 0;
let totalQuantity = 0; 
    articles.forEach(element => {
        let items = document.getElementById('cart__items');
items.innerHTML += `<article class="cart__item" data-id="${element.idProduct}" data-color="${element.choiceColors}">            
                  <div class="cart__item__img">
                  <img src="${element.productImgSrc}" alt="${element.productImgAlt}">
                </div>
                <div class="cart__item__content">
                  <div class="${element.productDescription}">
                    <h2 class="productName">${element.productName}</h2>
                    <p class="color">${element.choiceColors}</p>
                    <p class="price">${element.productPrice}</p>
                  </div>
                  <div class="cart__item__content__settings">
                    <div class="cart__item__content__settings__quantity">
                      <p>Qté : </p>
                      <input type="number" class="itemQuantity" name="itemQuantity" min="1" max="100" value="${element.choiceQuantity}">
                    </div>
                    <div class="cart__item__content__settings__delete">
                      <p class="deleteItem">Supprimer</p>
                    </div>
                  </div>
                </div>
              </article>`
            totalPrice += element.productPrice * element.choiceQuantity
            totalQuantity += element.choiceQuantity
   
    });
 const  total = document.getElementById("totalPrice");
 total.innerHTML = totalPrice

 const quantite = document.getElementById("totalQuantity");
 quantite.innerHTML = totalQuantity

 //Changer la quantité.

 const inputQantity = document.querySelectorAll(".itemQuantity");

 inputQantity.forEach(function(input){
     input.addEventListener('change',function(event){
         const idProduct = input.closest('article').dataset.id
         const choiceColors = input.closest('article').dataset.color
         
         const products = articles.map((element)=> element.idProduct === idProduct && element.choiceColors === choiceColors ? { ...element,choiceQuantity:parseInt(event.target.value)} : element)
         localStorage.setItem("panier",JSON.stringify(products))
         location.reload()
         
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

//window.location.reload() => rafraîchir la page.
//location.reload();
