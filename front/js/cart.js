//Récupération des élements du panier.
let articles = JSON.parse(localStorage.getItem("panier"));
console.table(articles);

//récupération des donnée de l'API.
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

//Créations de constances pout total+Quantité.
 const  total = document.getElementById("totalPrice");
 total.innerHTML = totalPrice

 const quantite = document.getElementById("totalQuantity");
 quantite.innerHTML = totalQuantity

 //Changer la quantité.

 const inputQantity = document.querySelectorAll(".itemQuantity");
//Changement de la quantité au change
 inputQantity.forEach(function(input){
     input.addEventListener('change',function(event){
         //La valeur doit être comprise entre 0 et 100.
         if(event.target.value <=0 || event.target.value > 100){
             alert('La quantité doit être entre 1 et 100.')
             window.location.reload();
             return;
         }
         const idProduct = input.closest('article').dataset.id
         const choiceColors = input.closest('article').dataset.color
         
         const products = articles.map((element)=> element.idProduct === idProduct && element.choiceColors === choiceColors ? { ...element,choiceQuantity:parseInt(event.target.value)} : element)
         localStorage.setItem("panier",JSON.stringify(products))
         location.reload()
         
     })
 })
 //Supprimer un article.
 const deleteButton = document.querySelectorAll('.deleteItem');
//Suppression au clique.
 deleteButton.forEach(function (button) {
     button.addEventListener('click', function() {
         const idProduct = button.closest('article').dataset.id
         const choiceColors = button.closest('article').dataset.color

         const index = articles.findIndex((element) => element.idProduct === idProduct && element.choiceColors === choiceColors)

         articles.splice(index, 1);

         localStorage.setItem("panier", JSON.stringify(articles));

         window.location.reload()
     })
 })
//Réglage du formulaire.
const firstName = document.getElementById("firstName")
const lastName = document.getElementById("lastName")
const address = document.getElementById("address")
const city = document.getElementById("city")
const email = document.getElementById("email")
//Texte valide sans chiffre dedans.
function validateText(value) {
     if(value.match(/^([^0-9]*)$/)) {
         return true
     }
     return false
}
//Adresse valide avec une valeur dedans.
function validateAddress(value) {
     if(value) {
         return true;
     }
     return false;
}
//Mail valide si @.
function validateEmail(value) {
     if(value.match(/\b[\w\.-]+@[\w\.-]+\.\w{2,4}\b/gi)) {
         return true
     }
     return false;
}
//Validation au change.
firstName.addEventListener('change', function(event) {
    if(validateText(event.target.value)) {
        document.getElementById("firstNameErrorMsg").innerHTML = ""
    } else {
        document.getElementById("firstNameErrorMsg").innerHTML = "Le prénom ne doit contenir que des lettres"
    }
})

lastName.addEventListener('change', function(event) {
    if(validateText(event.target.value)) {
        document.getElementById("lastNameErrorMsg").innerHTML = ""
    } else {
        document.getElementById("lastNameErrorMsg").innerHTML = "Le nom ne doit contenir que des lettres"
    }
})

validateAddress.addEventListener('change', function(event) {
    if(validateText(event.target.value)) {
        document.getElementById("addressErrorMsg").innerHTML = ""
    } 
})

alidateEmai.addEventListener('change', function(event) {
    if(validateText(event.target.value)) {
        document.getElementById("emailErrorMsg").innerHTML = ""
    } else {
        document.getElementById("emailErrorMsg").innerHTML = "L'email doit contenir une @"
    }
})

// Confirmation du formulaire à l'envoie.
const form = document.querySelector(".cart__order__form");

 form.addEventListener('submit', function(event) {
     event.preventDefault();

     if(validateOnSubmit(event)) {
         sendOrder()
     }
 })

function sendOrder() {

     const contact = {
         firstName: firstName.value,
         lastName: lastName.value,
         address: address.value,
         city: city.value,
         email: email.value
     }

     const products = articles.map((element) => element.idProduct)

    const data = {
         contact,
        products
    }

    fetch("http://localhost:3000/api/products/order", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data)
    })
        .then((res) => res.json())
        .then((res) => {
            window.location.replace(`./confirmation.html?id=${res.orderId}`)

            // Dans confirmation.js, récupérer l'identifiant depuis l'URL comme dans product.js
            // Puis insérer l'indentifiant dans le HTML
            // Vider le panier => localStorage.clear()
        })
        .catch((e) => console.log(e))

}

function validateOnSubmit(event) {

     if(
         validateText(firstName.value) &&
         validateText(lastName.value) &&
         validateAddress(address.value) &&
         validateText(city.value) &&
         validateEmail(email.value)
     ) {
         return true
     }
     return false

}