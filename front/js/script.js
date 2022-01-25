fetch(" http://localhost:3000/api/products") 
     .then(function (result){
         return result.json();
         }) 
//Récupération des données de l'API.

.then (function (articles){
    articles.forEach(element => {
        let items =document.getElementById('items');
       items.innerHTML += `<a href="./product.html?id=${element._id}">
       <article>
         <img src="${element.imageUrl}" alt="${element.altTxt}">
         <h3 class="productName">${element.name}</h3>
         <p class="productDescription">${element.description}</p>
       </article>
     </a>`
       
    });
})
        

        