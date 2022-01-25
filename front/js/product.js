//Récupéreation des paramètre de l'url.
var str = window.location.href;
var url = new URL(str);
var idProduct = url.searchParams.get("id");

// Récupération des articles de l'API.
fetch(" http://localhost:3000/api/products/" +idProduct) 
     .then(function (result){
         return result.json();
         }) 
    .then(function(article){
        getPost(article)
    })

function getPost(article){
    // Insertion de l'image avec la méthode Post.
    let productImg = document.createElement("img");
    document.querySelector(".item__img").appendChild(productImg);
    productImg.src = article.imageUrl;
    productImg.alt = article.altTxt;

    // Modification du titre "h1".
    let productName = document.getElementById('title');
    productName.innerHTML = article.name;

    // Modification du prix.
    let productPrice = document.getElementById('price');
    productPrice.innerHTML = article.price;

    // Modification de la description.
    let productDescription = document.getElementById('description');
    productDescription.innerHTML = article.description;
    
    //Modification choix de la couleur.
    let productColors = document.getElementById('colors');
    article.colors.forEach(element => { 
        productColors.innerHTML += `<option value="${element}">${element}</option>`
        
    });
    // Récupération du panier pour la quantité et la couleur.
    let button = document.getElementById ('addToCart');
    button.addEventListener('click',function(){
        let colors = document.getElementById('colors');
        let quantity = document.getElementById('quantity');
       

        //Récupération du choix de la couleur + alerte si produit non choisie.
        let choiceColors = colors.value;
        if (choiceColors === ""){
            alert("Veuillez séléctionner une couleur.")
            return;
        }
        

        //récupération de la quantité choisie + alerte si quantité nul.
        let choiceQuantity = parseInt(quantity.value);
        if (choiceQuantity < 1 || choiceQuantity > 100){
            alert("Veuillez choisir une quantité entre 1 et 100.")
            return;
        }
        if (!choiceQuantity){
            alert("Veuillez choisir une quantité.")
            return;
        }
      


        //Récupération de la fiche produit dans le panier.

        let choiceProduct = {
            idProduct: idProduct,
            choiceColors: choiceColors,
            choiceQuantity: choiceQuantity,
            productName: article.name,
            productPrice: article.price,
            productDescription: article.description,
            productImgSrc: article.imageUrl,
            productImgAlt: article.altTxt,
        }

        //Fonction fênetre pop up.
       const popUpConfirm = () => {
         if(window.confirm(`Votre commande de ${choiceQuantity} ${article.name}a bien été ajouté au panier
           Pour consulter votre panier, cliquez sur OK `)){
               window.location.href = "cart.html";
           }
        }  

        let productLocalStorage = JSON.parse(window.localStorage.getItem(
            'panier'
        ))
     
        //Mettre dans le local storage.
        //Si le panier a déjà 1 article.
        if(productLocalStorage && productLocalStorage.length){
            const resultFind = productLocalStorage.find(
                (el) => el.idProduct === idProduct && el.choiceColors === choiceColors)
            //Si le produit commandé est déjà dans le panier
            if (resultFind) {
                let newQuantity = parseInt(choiceProduct.choiceQuantity) + parseInt(resultFind.choiceQuantity);
                resultFind.choiceQuantity = newQuantity;
                localStorage.setItem('panier',JSON.stringify(productLocalStorage));
                console.table(productLocalStorage);
                popUpConfirm();
            //Si le produit commandé n'est pas dans le panier.
            }else {
                productLocalStorage.push(choiceProduct);
                localStorage.setItem('panier',JSON.stringify(productLocalStorage));
                console.table(productLocalStorage);
                popUpConfirm();
            }
            //Si le panier est vide
        } else {
            productLocalStorage = [];
            productLocalStorage.push(choiceProduct);
            localStorage.setItem('panier',JSON.stringify(productLocalStorage));
            console.table(productLocalStorage);
            popUpConfirm();
        }
        

        
        
        
       
    })        
        

    
    
}



