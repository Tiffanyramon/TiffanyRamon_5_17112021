//Récupéreation des paramètre de l'url.
var str = window.location.href;
var url = new URL(str);
var idProduct = url.searchParams.get("id");
console.log(idProduct)


// Récupération des articles de l'API
fetch(" http://localhost:3000/api/products/" +idProduct) 
     .then(function (result){
         return result.json();
         }) 
    .then(function(article){
        getPost(article)
    })

function getPost(article){
    // Insertion de l'image avec la méthode Post
    let productImg = document.createElement("img");
    document.querySelector(".item__img").appendChild(productImg);
    productImg.src = article.imageUrl;
    productImg.alt = article.altTxt;

    // Modification du titre "h1"
    let productName = document.getElementById('title');
    productName.innerHTML = article.name;

    // Modification du prix
    let productPrice = document.getElementById('price');
    productPrice.innerHTML = article.price;

    // Modification de la description
    let productDescription = document.getElementById('description');
    productDescription.innerHTML = article.description;
    
    let productColors = document.getElementById('colors');
    article.colors.forEach(element => { 
        productColors.innerHTML += `<option value="${element}">${element}</option>`
        
    });
    let button = document.getElementById ('addToCart');
    button.addEventListener('click',function(){
        window.localStorage.setItem('panier',JSON.stringify(article))
    })
    
}




